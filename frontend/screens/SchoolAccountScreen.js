import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_URL = 'http://10.0.2.2:5000/api';

const SchoolAccountScreen = ({ route, navigation }) => {
  const { userId, name, role, schoolId } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [schoolData, setSchoolData] = useState(null);
  const [stats, setStats] = useState({
    teachersCount: 0,
    studentsCount: 0,
    subbotniksCount: 0,
    totalPoints: 0,
  });
  const [rating, setRating] = useState({
    position: 0,
    totalSchools: 0,
    points: 0,
  });
  const [teachers, setTeachers] = useState([]);
  const [showInviteLink, setShowInviteLink] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    if (!schoolId) {
      Alert.alert('Ошибка', 'ID школы не найден');
      setLoading(false);
      return;
    }
    loadSchoolData();
  }, [schoolId]);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('accessToken');
    } catch (e) {
      return null;
    }
  };

  const getInitialLetter = () => {
    if (!schoolData?.name) return 'Ш';
    return schoolData.name.charAt(0).toUpperCase();
  };

  const loadSchoolData = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const [schoolRes, statsRes, teachersRes] = await Promise.all([
        fetch(`${API_URL}/schools/${schoolId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/stats/school/${schoolId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/classes`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (schoolRes.ok) {
        const school = await schoolRes.json();
        setSchoolData({
          id: school.id,
          name: school.name,
          address: school.address || 'Адрес не указан',
          director: school.director || name || 'Не указан',
        });
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(prev => ({
          ...prev,
          subbotniksCount: statsData.eventsCount || 0,
          totalPoints: statsData.totalPoints || 0,
        }));
      }

      const teachersRes2 = await fetch(
        `${API_URL}/users/school-teachers`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (teachersRes2.ok) {
        const teachersData = await teachersRes2.json();
        setTeachers(teachersData.map(t => ({
          id: t.id,
          name: t.name,
          subject: t.subject || 'Предмет не указан',
          class: t.className || t.Class?.name || (t.class_id ? `Класс ${t.class_id}` : 'Не указан'),
        })));
      }

      const ratingRes = await fetch(
        `${API_URL}/stats/schools-rating?limit=100`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (ratingRes.ok) {
        const ratingData = await ratingRes.json();
        const mySchool = ratingData.find(r => r.schoolId === schoolId);
        const schoolRank = mySchool?.rank || ratingData.length;
        const totalSchools = ratingData.length;
        const schoolPoints = mySchool?.totalScore || 0;
        
        setRating({
          position: schoolRank,
          totalSchools: totalSchools || 1,
          points: schoolPoints,
        });
      }

      const countsRes = await fetch(`${API_URL}/users/school-counts`, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => null);
      
      if (countsRes?.ok) {
        const counts = await countsRes.json();
        setStats(prev => ({
          ...prev,
          teachersCount: counts.teachers || 0,
          studentsCount: counts.students || 0,
        }));
      }

    } catch (error) {
      console.error('Error loading school data:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить данные школы');
    } finally {
      setLoading(false);
    }
  };

  const handleViewTeachers = () => {
    navigation.navigate('ManageUsers', { 
      userRole: 'director',
      userType: 'teachers',
      schoolId
    });
  };

  const handleViewStudents = () => {
    navigation.navigate('ManageUsers', { 
      userRole: 'director',
      userType: 'students',
      schoolId
    });
  };

  const handleViewSubbotniks = () => {
    navigation.navigate('EventsList', { schoolId });
  };

  const handleCreateInvite = () => {
    navigation.navigate('GenerateInvite', { 
      userId, 
      role, 
      schoolId, 
      classId: route.params?.classId 
    });
  };

  const handleCopyLink = () => {
    Alert.alert('Ссылка скопирована', 'Пригласительная ссылка скопирована в буфер обмена');
  };

  const handleViewUchenikRating = () => {
    navigation.navigate('RatingScreen', { type: 'school', schoolId, userId: route.params?.userId });
  };

  const handleViewSchoolRating = () => {
    navigation.navigate('SchoolsRating');
  };

  const handleEditSchool = () => {
    navigation.navigate('EditSchool', { schoolId, schoolData });
  };

  const handleViewTeacher = (teacherId, teacherName) => {
    navigation.navigate('TeacherProfile', { teacherId, teacherName });
  };

  const handleViewAllTeachers = () => {
    navigation.navigate('AllTeachers', { schoolId });
  };

  const handleLogout = async () => {
    Alert.alert(
      'Выход из аккаунта',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('accessToken');
              await AsyncStorage.removeItem('refreshToken');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Ошибка при выходе:', error);
              Alert.alert('Ошибка', 'Не удалось выйти из аккаунта');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.schoolLoadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!schoolData) {
    return (
      <View style={styles.schoolLoadingContainer}>
        <Text>Данные школы не найдены</Text>
        <TouchableOpacity onPress={loadSchoolData} style={{ marginTop: 20 }}>
          <Text style={{ color: '#4CAF50' }}>Обновить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.schoolScrollContainer}
      >
        <View style={styles.schoolContainer}>
          <View style={styles.schoolHeader}>
            <View style={styles.studentAvatar}>
              <Image
                source={require('../assets/images/fon9.png')}
                style={styles.studentAvatarImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.studentName}>{schoolData.name}</Text>
            <Text style={styles.studentRole2}>{schoolData.address}</Text>
            <Text style={styles.studentRole}>Директор: {schoolData.director}</Text>

            <View style={styles.schoolStatsRow}>
              <TouchableOpacity style={styles.schoolStatButton} onPress={handleViewTeachers}>
                <Text style={styles.schoolStatButtonValue}>{stats.teachersCount}</Text>
                <Text style={styles.schoolStatButtonLabel}>учителей</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.schoolStatButton} onPress={handleViewStudents}>
                <Text style={styles.schoolStatButtonValue}>{stats.studentsCount}</Text>
                <Text style={styles.schoolStatButtonLabel}>учеников</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.schoolStatButton} onPress={handleViewSubbotniks}>
                <Text style={styles.schoolStatButtonValue}>{stats.subbotniksCount}</Text>
                <Text style={styles.schoolStatButtonLabel}>субботников</Text>
              </TouchableOpacity>

              <View style={styles.schoolStatButton}>
                <Text style={styles.schoolStatButtonValue}>{stats.totalPoints}</Text>
                <Text style={styles.schoolStatButtonLabel}>всего баллов</Text>
              </View>
            </View>
          </View>

          {/* Рейтинг */}
          <View style={styles.schoolRatingCard}>
            <View style={styles.schoolRatingInfo}>
              <Text style={styles.schoolRatingTitle}>Рейтинг среди школ</Text>
              <Text style={styles.schoolRatingValue}>{rating.position} место</Text>
              <Text style={styles.schoolRatingPosition}>
                из {rating.totalSchools} школ • {rating.points} баллов
              </Text>
            </View>
            <TouchableOpacity style={styles.schoolRatingButton} onPress={handleViewSchoolRating}>
              <Text style={styles.schoolRatingButtonText}>Подробнее →</Text>
            </TouchableOpacity>
          </View>

          {/* Кнопки действий */}
          <View style={styles.schoolActionsContainer}>
            <TouchableOpacity style={styles.schoolActionCard} onPress={handleCreateInvite}>
              <View style={styles.schoolActionContent}>
                <Text style={styles.schoolActionTitle}>Пригласить учителей</Text>
                <Text style={styles.schoolActionDescription}>Сгенерировать код для регистрации учителей</Text>
              </View>
              <Text style={styles.schoolActionArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.schoolActionCard} onPress={handleViewUchenikRating}>
              <View style={styles.schoolActionContent}>
                <Text style={styles.schoolActionTitle}>Посмотреть рейтинг учеников</Text>
                <Text style={styles.schoolActionDescription}>Сравните учеников</Text>
              </View>
              <Text style={styles.schoolActionArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Список учителей */}
          <View style={styles.schoolTeachersList}>
            <View style={styles.schoolSectionHeader}>
              <Text style={styles.schoolSectionTitle}>Учителя школы</Text>
              <TouchableOpacity onPress={handleViewTeachers}>
                <Text style={styles.schoolSectionLink}>все учителя →</Text>
              </TouchableOpacity>
            </View>
            
            {teachers.length === 0 ? (
              <View style={styles.schoolEmptyState}>
                <Text style={styles.schoolEmptyText}>Учителя не найдены</Text>
              </View>
            ) : (
              teachers.slice(0, 3).map((teacher) => (
                <TouchableOpacity
                  key={teacher.id}
                  style={styles.schoolTeacherItem}
                  onPress={() => handleViewTeacher(teacher.id, teacher.name)}
                >
                  <View style={styles.schoolTeacherInfo}>
                    <Text style={styles.schoolTeacherName}>{teacher.name}</Text>
                    <Text style={styles.schoolTeacherSubject}>{teacher.subject}</Text>
                  </View>
                  <Text style={styles.schoolTeacherClass}>{teacher.class}</Text>
                </TouchableOpacity>
              ))
            )}
            {teachers.length > 3 && (
              <TouchableOpacity style={styles.schoolViewAllButton} onPress={handleViewAllTeachers}>
                <Text style={styles.schoolViewAllText}>Все учителя →</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
              style={styles.logoutButton3} 
              onPress={handleLogout}
              activeOpacity={0.1}
            >
              <Text style={styles.logoutButtonText3}>Выйти из аккаунта</Text>
          </TouchableOpacity>
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

export default SchoolAccountScreen;