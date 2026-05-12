import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_URL = 'http://10.0.2.2:5000/api';

const StudentDashboardScreen = ({ route, navigation }) => {
  const { userId, name, role, schoolId, classId } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    points: 0,
    classRank: 1,
    classTotal: 1,
    schoolRank: 1,
    schoolTotal: 1,
  });
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

  const loadAllData = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const [statsRes, ratingRes, activeEventsRes, finishedEventsRes] = await Promise.all([
        fetch(`${API_URL}/stats/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/stats/rating?school=${schoolId}&limit=100`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/events?school=true&status=active`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/events?school=true&status=finished`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (statsRes.ok) {
        const s = await statsRes.json();
        setStats(prev => ({ ...prev, points: s.totalPoints || 0 }));
      }

      if (ratingRes.ok) {
        const schoolRating = await ratingRes.json();
        const mySchoolRank = schoolRating.findIndex(r => (r.userId === userId || r.id === userId)) + 1;
        setStats(prev => ({
          ...prev,
          schoolRank: mySchoolRank || schoolRating.length,
          schoolTotal: schoolRating.length || 1,
        }));

        // Рейтинг в классе
        const classRatingRes = await fetch(
          `${API_URL}/stats/rating?class=${classId}&limit=100`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (classRatingRes.ok) {
          const classRating = await classRatingRes.json();
          const myClassRank = classRating.findIndex(r => (r.userId === userId || r.id === userId)) + 1;
          setStats(prev => ({
            ...prev,
            classRank: myClassRank || classRating.length,
            classTotal: classRating.length || 1,
          }));
        }
      }

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
        // Для каждого прошедшего получаем мои баллы и место
        const finishedWithStats = await Promise.all(
          events.map(async (e) => {
            const detailsRes = await fetch(`${API_URL}/events/${e.id}/details`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (detailsRes.ok) {
              const details = await detailsRes.json();
              const myRating = details.rating.find(r => r.id === userId);
              return {
                id: e.id,
                name: e.name,
                date: new Date(e.date).toLocaleDateString('ru-RU'),
                myScore: myRating?.totalScore || 0,
                myRank: myRating?.rank || '-',
                totalParticipants: details.stats.totalParticipants,
              };
            }
            return { ...e, myScore: 0, myRank: '-', totalParticipants: 0 };
          })
        );
        setFinishedEvents(finishedWithStats);
      }

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  // Переходы
  const handleClassRating = () => {
    navigation.navigate('RatingScreen', { type: 'class', classId, schoolId, userId });
  };

  const handleSchoolRating = () => {
    navigation.navigate('RatingScreen', { type: 'school', schoolId, userId });
  };

  const handleActiveEventPress = (eventId) => {
    navigation.navigate('EventDetails', { eventId, userRole: 'student', userId });
  };

  const handleViewAllActive = () => {
    navigation.navigate('EventsList', { status: 'active', schoolId });
  };

  const handleViewAllFinished = () => {
    navigation.navigate('EventsList', { status: 'finished', schoolId });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={styles.scrollContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />}
    >
      <View style={styles.container}>
        <Text style={styles.greeting}>Привет, {name || 'Ученик'}!</Text>
        <Text style={styles.subGreeting}>Твой экологический вклад</Text>

        {/* Статистика */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.points}</Text>
            <Text style={styles.statLabel}>Эко-баллов</Text>
          </View>

          <TouchableOpacity style={styles.statCard} onPress={handleClassRating}>
            <Text style={styles.statValue}>{stats.classRank}/{stats.classTotal}</Text>
            <Text style={styles.statLabel}>Место в классе</Text>
            <Text style={{ fontSize: 11, color: '#4CAF50', marginTop: 2 }}>→ Подробнее</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statCard} onPress={handleSchoolRating}>
            <Text style={styles.statValue}>{stats.schoolRank}/{stats.schoolTotal}</Text>
            <Text style={styles.statLabel}>Место в школе</Text>
            <Text style={{ fontSize: 11, color: '#4CAF50', marginTop: 2 }}>→ Подробнее</Text>
          </TouchableOpacity>
        </View>

        {/* Текущие мероприятия */}
        <View style={styles.eventsPreview}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Текущие субботники</Text>
            <TouchableOpacity onPress={handleViewAllActive}>
              <Text style={{ color: '#4CAF50', fontSize: 14 }}>Все →</Text>
            </TouchableOpacity>
          </View>
          
          {activeEvents.slice(0, 3).map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventItem}
              onPress={() => handleActiveEventPress(event.id)}
            >
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={{ fontSize: 12, color: '#999' }}>📍 {event.location}</Text>
              </View>
              <View style={styles.eventPoints}>
                <Text style={{ fontSize: 20 }}>→</Text>
              </View>
            </TouchableOpacity>
          ))}

          {activeEvents.length === 0 && (
            <Text style={{ textAlign: 'center', color: '#999', padding: 20 }}>
              Нет активных мероприятий
            </Text>
          )}
        </View>

        {/* Прошедшие мероприятия */}
        <View style={[styles.eventsPreview, { marginTop: 16 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Прошедшие субботники</Text>
            <TouchableOpacity onPress={handleViewAllFinished}>
              <Text style={{ color: '#4CAF50', fontSize: 14 }}>Все →</Text>
            </TouchableOpacity>
          </View>
          
          {finishedEvents.slice(0, 3).map((event) => (
            <View
              key={event.id}
              style={[styles.eventItem, { opacity: 0.7 }]}
            >
              <View style={styles.eventInfo}>
                <Text style={[styles.eventName, { color: '#666' }]}>{event.name}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#4CAF50' }}>
                  {event.myScore} баллов
                </Text>
                <Text style={{ fontSize: 12, color: '#999' }}>
                  {event.myRank} место из {event.totalParticipants}
                </Text>
              </View>
            </View>
          ))}

          {finishedEvents.length === 0 && (
            <Text style={{ textAlign: 'center', color: '#999', padding: 20 }}>
              Нет завершённых мероприятий
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentDashboardScreen;