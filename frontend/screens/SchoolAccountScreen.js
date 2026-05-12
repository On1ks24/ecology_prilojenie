import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_URL = 'http://10.0.2.2:5000/api'; // поменяй на свой URL

const SchoolAccountScreen = ({ route, navigation }) => {
  // Получаем данные из авторизации
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


  // Загрузка всех данных при монтировании
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

  const loadSchoolData = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      // Параллельно загружаем данные школы, статистику и учителей
      const [schoolRes, statsRes, teachersRes] = await Promise.all([
        fetch(`${API_URL}/schools/${schoolId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/stats/school/${schoolId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/classes`, { // получаем все классы школы
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Данные школы
      if (schoolRes.ok) {
        const school = await schoolRes.json();
        setSchoolData({
          id: school.id,
          name: school.name,
          address: school.address || 'Адрес не указан',
          director: school.director || name || 'Не указан',
          logo: school.logo || '🏫',
        });
      }

      // Статистика школы
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(prev => ({
          ...prev,
          subbotniksCount: statsData.eventsCount || 0,
          totalPoints: statsData.totalPoints || 0,
        }));
      }

      // Учителя школы (получаем через отдельный запрос к users)
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

      // Подсчёт учителей и учеников отдельно
      

      // Рейтинг школы (получаем общий рейтинг и ищем позицию)
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
// Обработчики кликов:
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

const handleCreateInvite = () => {
  navigation.navigate('GenerateInvite', { 
    userId, 
    role, 
    schoolId, 
    classId: route.params?.classId 
  });
};

  // Копирование ссылки
  const handleCopyLink = () => {
    // Для React Native используем Clipboard API
    // import Clipboard from '@react-native-clipboard/clipboard';
    // Clipboard.setString(inviteLink);
    Alert.alert('Ссылка скопирована', 'Пригласительная ссылка скопирована в буфер обмена');
  };

  // Переход на рейтинг школ
  const handleViewUchenikRating = () => {
    navigation.navigate('RatingScreen', { type: 'school', schoolId, userId: route.params?.userId });
  };

  const handleViewSchoolRating = () => {
    navigation.navigate('SchoolsRating');
  };

  // Редактирование школы
  const handleEditSchool = () => {
    navigation.navigate('EditSchool', { schoolId, schoolData });
  };

  // Просмотр профиля учителя
  const handleViewTeacher = (teacherId, teacherName) => {
    navigation.navigate('TeacherProfile', { teacherId, teacherName });
  };

  // Все учителя
  const handleViewAllTeachers = () => {
    navigation.navigate('AllTeachers', { schoolId });
  };

  if (loading) {
    return (
      <View style={[styles.schoolContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Загрузка...</Text>
      </View>
    );
  }

  if (!schoolData) {
    return (
      <View style={[styles.schoolContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Данные школы не найдены</Text>
        <TouchableOpacity onPress={loadSchoolData} style={{ marginTop: 20 }}>
          <Text style={{ color: '#4CAF50' }}>Обновить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.schoolContainer}>
        {/* Шапка школы */}
        <View style={styles.schoolHeader}>
          <View style={styles.schoolLogo}>
            <Text style={styles.schoolLogoText}>{schoolData.logo}</Text>
          </View>
          <Text style={styles.schoolName}>{schoolData.name}</Text>
          <Text style={styles.schoolAddress}>{schoolData.address}</Text>
          <Text style={styles.schoolDirector}>Директор: {schoolData.director}</Text>
        </View>

        {/* Статистика */}
        <View style={styles.schoolStatsGrid}>
            <TouchableOpacity 
              style={styles.schoolStatCard}
              onPress={handleViewTeachers}
              activeOpacity={0.7}
            >
              <Text style={styles.schoolStatIcon}>👩‍🏫</Text>
              <Text style={styles.schoolStatValue}>{stats.teachersCount}</Text>
              <Text style={styles.schoolStatLabel}>Учителей</Text>
            </TouchableOpacity>

          <TouchableOpacity 
            style={styles.schoolStatCard}
            onPress={handleViewStudents}
            activeOpacity={0.7}
          >
            <Text style={styles.schoolStatIcon}>🧑‍🎓</Text>
            <Text style={styles.schoolStatValue}>{stats.studentsCount}</Text>
            <Text style={styles.schoolStatLabel}>Учеников</Text>
          </TouchableOpacity>

          <View style={styles.schoolStatCard}>
            <Text style={styles.schoolStatIcon}>🌍</Text>
            <Text style={styles.schoolStatValue}>{stats.subbotniksCount}</Text>
            <Text style={styles.schoolStatLabel}>Субботников</Text>
          </View>

          <View style={styles.schoolStatCard}>
            <Text style={styles.schoolStatIcon}>⭐</Text>
            <Text style={styles.schoolStatValue}>{stats.totalPoints}</Text>
            <Text style={styles.schoolStatLabel}>Всего баллов</Text>
          </View>
        </View>

        {/* Рейтинг */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingInfo}>
            <Text style={styles.ratingTitle}>Рейтинг среди школ</Text>
            <Text style={styles.ratingValue}>{rating.position} место</Text>
            <Text style={styles.ratingPosition}>
              из {rating.totalSchools} школ • {rating.points} баллов
            </Text>
          </View>
          <TouchableOpacity style={styles.ratingButton} onPress={handleViewSchoolRating}>
            <Text style={styles.ratingButtonText}>Подробнее</Text>
          </TouchableOpacity>
        </View>

        {/* Действия */}
        <View style={styles.schoolActionsContainer}>
          <TouchableOpacity style={styles.schoolActionCard} onPress={handleCreateInvite}>
            <Text style={styles.schoolActionIcon}>🔗</Text>
            <View style={styles.schoolActionContent}>
              <Text style={styles.schoolActionTitle}>
                {role === 'director' ? 'Пригласить учителей' : 'Пригласить учеников'}
              </Text>
              <Text style={styles.schoolActionDescription}>
                {role === 'director' 
                  ? 'Сгенерировать код для регистрации учителей' 
                  : 'Сгенерировать код для регистрации учеников в класс'}
              </Text>
            </View>
          </TouchableOpacity>

          {showInviteLink && (
            <View style={styles.inviteLinkBox}>
              <Text style={styles.inviteLinkText} numberOfLines={1}>
                {inviteLink}
              </Text>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
                <Text style={styles.copyButtonText}>Копировать</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.schoolActionCard} onPress={handleViewUchenikRating}>
            <Text style={styles.schoolActionIcon}>🏆</Text>
            <View style={styles.schoolActionContent}>
              <Text style={styles.schoolActionTitle}>Посмотреть рейтинг учеников</Text>
              <Text style={styles.schoolActionDescription}>Сравните учеников</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.schoolActionCard} onPress={handleEditSchool}>
            <Text style={styles.schoolActionIcon}>⚙️</Text>
            <View style={styles.schoolActionContent}>
              <Text style={styles.schoolActionTitle}>Настройки школы</Text>
              <Text style={styles.schoolActionDescription}>Редактировать информацию о школе</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Список учителей */}
        <View style={styles.teachersList}>
          <Text style={styles.sectionTitle}>Учителя школы</Text>
          {teachers.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#999', padding: 20 }}>
              Учителя не найдены
            </Text>
          ) : (
            teachers.slice(0, 3).map((teacher) => (
              <TouchableOpacity
                key={teacher.id}
                style={styles.teacherItem}
                onPress={() => handleViewTeacher(teacher.id, teacher.name)}
              >
                <View style={styles.teacherInfo}>
                  <Text style={styles.teacherName}>{teacher.name}</Text>
                  <Text style={styles.teacherSubject}>{teacher.subject}</Text>
                </View>
                <Text style={styles.teacherClass}>{teacher.class}</Text>
              </TouchableOpacity>
            ))
          )}
          {teachers.length > 3 && (
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllTeachers}>
              <Text style={styles.viewAllText}>Все учителя →</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SchoolAccountScreen;