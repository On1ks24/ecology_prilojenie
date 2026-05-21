import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_URL = 'http://10.0.2.2:5000/api';

const TeacherDashboardScreen = ({ route, navigation }) => {
  const { userId, name, role, schoolId, classId } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    studentsCount: 0,
    subbotniksCount: 0,
    classPoints: 0,
    classRank: 1,
    totalClasses: 1,
  });
  const [students, setStudents] = useState([]);
  const [activeSubbotniks, setActiveSubbotniks] = useState([]);
  const [showInviteLink, setShowInviteLink] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [activeEvents, setActiveEvents] = useState([]);
  const [finishedEvents, setFinishedEvents] = useState([]);

  useEffect(() => {
    loadAllData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAllData().then(() => setRefreshing(false));
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };

  const getInitialLetter = () => {
    if (!name) return 'У';
    return name.charAt(0).toUpperCase();
  };

  const loadAllData = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const fetchTeacherStats = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/stats/teacher/${user.userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Ошибка', 'Не удалось загрузить статистику');
      }
    };  
      // Параллельно загружаем статистику, учеников, субботники и активный код
      const [statsRes, studentsRes, eventsRes, inviteRes] = await Promise.all([
        fetch(`${API_URL}/users/teacher-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/users/class-students`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/events?school=true`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/invites/my-active`, {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => null),
      ]);

      if (statsRes.ok) {
        const s = await statsRes.json();
        setStats({
          studentsCount: s.studentsCount,
          subbotniksCount: s.eventsCount,
          classPoints: s.classPoints,
          classRank: s.classRank,
          totalClasses: s.totalClasses,
        });
      }

      if (studentsRes.ok) {
        const studs = await studentsRes.json();
        setStudents(studs.map(s => ({
          id: s.id,
          name: s.name,
          points: s.totalPoints,
          status: s.is_active ? 'active' : 'pending',
          is_active: s.is_active,
        })));
      }

      if (eventsRes.ok) {
        const events = await eventsRes.json();
        setActiveSubbotniks(events.slice(0, 5).map(e => ({
          id: e.id,
          name: e.name,
          date: new Date(e.date).toLocaleDateString('ru-RU'),
          participants: 0, // Можно доработать отдельно
        })));
      }

      if (inviteRes && inviteRes.ok) {
        const inv = await inviteRes.json();
        setInviteLink(`https://school-eco.ru/invite/${inv.code}`);
        setShowInviteLink(true);
      }
      const [activeEventsRes, finishedEventsRes] = await Promise.all([
      fetch(`${API_URL}/events?my_events=true&status=active`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${API_URL}/events?my_events=true&status=finished`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (activeEventsRes.ok) {
      const events = await activeEventsRes.json();
      setActiveEvents(events.map(e => ({
        id: e.id,
        name: e.name,
        date: new Date(e.date).toLocaleDateString('ru-RU'),
        location: e.location,
      })));
    }

    if (finishedEventsRes.ok) {
      const events = await finishedEventsRes.json();
      const finishedWithStats = await Promise.all(
        events.map(async (e) => {
          const detailsRes = await fetch(`${API_URL}/events/${e.id}/details`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (detailsRes.ok) {
            const details = await detailsRes.json();
            return {
              id: e.id,
              name: e.name,
              date: new Date(e.date).toLocaleDateString('ru-RU'),
              totalParticipants: details.stats.totalParticipants,
              totalPoints: details.stats.totalEventPoints,
            };
          }
          return { ...e, totalParticipants: 0, totalPoints: 0 };
        })
      );
      setFinishedEvents(finishedWithStats);
    }

    } catch (error) {
      console.error('Error loading teacher data:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  // Генерация приглашения
  const handleCreateInvite = () => {
    navigation.navigate('GenerateInvite', { 
      userId, 
      role, 
      schoolId, 
      classId 
    });
  };

  const handleCopyLink = () => {
    // Clipboard.setString(inviteLink);
    Alert.alert('Скопировано', 'Ссылка скопирована в буфер обмена');
  };

  // Переходы
  const handleViewSubbotniks = () => {
    navigation.navigate('EventsList', { schoolId });
  };

  const handleConfirmResults = () => {
    navigation.navigate('CleaningChecks', { classId });
  };

  const handleStudentPress = (studentId, studentName) => {
    navigation.navigate('StudentProfile', { studentId, studentName });
  };

  // ВСЕ УЧЕНИКИ — новый экран
  const handleViewAllStudents = () => {
    navigation.navigate('ManageUsers', { 
      userRole: 'teacher',
      userType: 'students',
      classId,
      schoolId
    });
  };


  // В loadAllData добавь:
  

  // Обработчики:
  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent', { schoolId, classId, userRole: role });
  };

  const handleFinishEvent = async (eventId) => {
    Alert.alert(
      'Завершить мероприятие?',
      'После завершения ученики не смогут отправлять новые запросы.',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Завершить',
          onPress: async () => {
            try {
              const token = await getToken();
              const response = await fetch(`${API_URL}/events/${eventId}/finish`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
              });
              if (response.ok) {
                Alert.alert('Готово', 'Мероприятие завершено');
                loadAllData();
              }
            } catch (error) {
              Alert.alert('Ошибка', 'Не удалось завершить');
            }
          },
        },
      ]
    );
  };

  const handleActiveEventPress = (eventId) => {
    navigation.navigate('EventDetails', { eventId, userRole: 'teacher', userId });
  };
  const pendingStudentsCount = students.filter(s => s.status === 'pending').length;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.teacherScrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />}
      >
        <View style={styles.teacherContainer}>
          {/* Шапка как у ученика */}
          <View style={styles.teacherHeader}>
            <View style={styles.teacherAvatar}>
              <Image
                source={require('../assets/images/fon7.png')}
                style={styles.teacherAvatarImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.teacherName}>Здравствуйте, {name || 'Учитель'}!</Text>
            <Text style={styles.teacherRole}>Классный руководитель</Text>

            <View style={styles.teacherStatsRow}>
              <TouchableOpacity style={styles.teacherStatButton} onPress={handleViewAllStudents}>
                <Text style={styles.teacherStatButtonValue}>{stats.studentsCount}</Text>
                <Text style={styles.teacherStatButtonLabel}>учеников в классе</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.teacherStatButton} onPress={handleViewSubbotniks}>
                <Text style={styles.teacherStatButtonValue}>{stats.subbotniksCount}</Text>
                <Text style={styles.teacherStatButtonLabel}>субботников проведено</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.teacherStatButton} onPress={() => navigation.navigate('RatingScreen', { type: 'class', classId, schoolId, userId })}>
                <Text style={styles.teacherStatButtonValue}>{stats.classPoints}</Text>
                <Text style={styles.teacherStatButtonLabel}>баллов</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Кнопки действий */}
          <View style={styles.teacherActionsContainer}>
            <TouchableOpacity style={styles.teacherActionCard} onPress={handleCreateInvite}>
              <View style={styles.teacherActionContent}>
                <Text style={styles.teacherActionTitle}>Создать приглашение для учеников</Text>
                <Text style={styles.teacherActionDescription}>Сгенерировать ссылку для регистрации</Text>
              </View>
              <Text style={styles.teacherActionArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.teacherActionCard} onPress={handleCreateEvent}>
              <View style={styles.teacherActionContent}>
                <Text style={styles.teacherActionTitle}>Создать субботник</Text>
                <Text style={styles.teacherActionDescription}>Организовать новое мероприятие</Text>
              </View>
              <Text style={styles.teacherActionArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Активные ученики */}
          <View style={styles.teacherStudentsList}>
            <View style={styles.teacherSectionHeader}>
              <Text style={styles.teacherSectionTitle}>Активные ученики</Text>
              <TouchableOpacity onPress={handleViewAllStudents}>
                <Text style={styles.teacherSectionLink}>все ученики →</Text>
              </TouchableOpacity>
            </View>
            
            {students.slice(0, 5).map((student) => (
              <TouchableOpacity
                key={student.id}
                style={styles.teacherStudentItem}
                onPress={() => handleStudentPress(student.id, student.name)}
              >
                <View style={styles.teacherStudentInfo}>
                  <Text style={styles.teacherStudentName}>{student.name}</Text>
                  <Text style={styles.teacherStudentPoints}>{student.points} баллов</Text>
                </View>
                <View style={styles.teacherStudentStatus}>
                  <Text style={styles.teacherStudentStatusText}>Активен</Text>
                </View>
              </TouchableOpacity>
            ))}
            <Text style={styles.teacherSubtext}>Всего учеников: {stats.studentsCount}</Text>
          </View>

          {/* Текущие субботники */}
          <View style={styles.teacherEventsSection}>
            <Text style={styles.teacherSectionTitle}>Текущие субботники</Text>
            {activeEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.teacherEventItem}
                onPress={() => handleActiveEventPress(event.id)}
              >
                <View style={styles.teacherEventInfo}>
                  <Text style={styles.teacherEventName}>{event.name}</Text>
                  <Text style={styles.teacherEventDate}>{event.date}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.teacherFinishButton}
                  onPress={() => handleFinishEvent(event.id)}
                >
                  <Text style={styles.teacherFinishButtonText}>Завершить</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            {activeEvents.length === 0 && (
              <View style={styles.teacherEmptyState}>
                <Text style={styles.teacherEmptyText}>Нет активных субботников</Text>
              </View>
            )}
          </View>

          {/* Прошедшие субботники */}
          <View style={styles.teacherEventsSection}>
            <Text style={styles.teacherSectionTitle}>Прошедшие субботники</Text>
            {finishedEvents.map((event) => (
              <View key={event.id} style={styles.teacherEventItemPast}>
                <View style={styles.teacherEventInfo}>
                  <Text style={styles.teacherEventNamePast}>{event.name}</Text>
                  <Text style={styles.teacherEventDate}>{event.date}</Text>
                </View>
                <View style={styles.teacherEventPastStats}>
                  <Text style={styles.teacherEventPastText}>{event.totalParticipants} участников</Text>
                  <Text style={styles.teacherEventPastPoints}>{event.totalPoints} баллов</Text>
                </View>
              </View>
            ))}
            {finishedEvents.length === 0 && (
              <View style={styles.teacherEmptyState}>
                <Text style={styles.teacherEmptyText}>Нет завершённых субботников</Text>
              </View>
            )}
          </View>

          
          <View style={styles.teacherFooterImage}>
            <Image
              source={require('../assets/images/logo2.png')}
              style={styles.teacherFooterImageStyle}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TeacherDashboardScreen;