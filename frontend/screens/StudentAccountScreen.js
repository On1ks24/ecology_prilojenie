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

  const getInitialLetter = () => {
    if (!name) return 'У';
    return name.charAt(0).toUpperCase();
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
      <View style={styles.studentLoadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#000000" translucent />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.studentScrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />}
      >
        <View style={styles.studentContainer}>
          <View style={styles.studentHeader}>
            <View style={styles.studentAvatar}>
              <Image
                source={require('../assets/images/fon8.png')}
                style={styles.studentAvatarImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.studentName}>{name || 'Ученик'}</Text>
            <Text style={styles.studentRole}>Ученик</Text>

            <View style={styles.studentStatsRow}>
              <View style={styles.studentStatButton}>
                <Text style={styles.studentStatButtonValue}>{stats.points}</Text>
                <Text style={styles.studentStatButtonLabel}>эко-баллов</Text>
              </View>

              <TouchableOpacity style={styles.studentStatButton} onPress={handleClassRating}>
                <Text style={styles.studentStatButtonValue}>{stats.classRank}/{stats.classTotal}</Text>
                <Text style={styles.studentStatButtonLabel}>место в классе</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.studentStatButton} onPress={handleSchoolRating}>
                <Text style={styles.studentStatButtonValue}>{stats.schoolRank}/{stats.schoolTotal}</Text>
                <Text style={styles.studentStatButtonLabel}>место в школе</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.studentActionsContainer}>
            <TouchableOpacity style={styles.studentActionCard} onPress={handleViewAllActive}>
              <View style={styles.studentActionContent}>
                <Text style={styles.studentActionTitle}>Текущие субботники</Text>
                <Text style={styles.studentActionDescription}>Участвуйте в мероприятиях</Text>
              </View>
              <Text style={styles.studentActionArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.studentActionCard} onPress={handleClassRating}>
              <View style={styles.studentActionContent}>
                <Text style={styles.studentActionTitle}>Рейтинг в классе</Text>
                <Text style={styles.studentActionDescription}>Сравните свои результаты с одноклассниками</Text>
              </View>
              <Text style={styles.studentActionArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.studentActionCard} onPress={handleSchoolRating}>
              <View style={styles.studentActionContent}>
                <Text style={styles.studentActionTitle}>Рейтинг в школе</Text>
                <Text style={styles.studentActionDescription}>Сравните свои результаты с шольными друзьями</Text>
              </View>
              <Text style={styles.studentActionArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.studentMyEvents}>
            <Text style={styles.studentMyEventsTitle}>Мои мероприятия</Text>
            
            {activeEvents.slice(0, 3).map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.studentMyEventItem}
                onPress={() => handleActiveEventPress(event.id)}
              >
                <View style={styles.studentMyEventInfo}>
                  <Text style={styles.studentMyEventName}>{event.name}</Text>
                  <Text style={styles.studentMyEventDate}>
                    {event.date} • {event.location}
                  </Text>
                </View>
                <View style={styles.studentMyEventStatus}>
                  <Text style={styles.studentMyEventStatusText}>Активно</Text>
                </View>
              </TouchableOpacity>
            ))}

            {activeEvents.length === 0 && (
              <View style={styles.studentEmptyEvents}>
                <Text style={styles.studentEmptyEventsText}>Нет активных мероприятий</Text>
              </View>
            )}

            {finishedEvents.length > 0 && finishedEvents.slice(0, 2).map((event) => (
              <View key={event.id} style={[styles.studentMyEventItem, styles.studentMyEventItemPast]}>
                <View style={styles.studentMyEventInfo}>
                  <Text style={[styles.studentMyEventName, styles.studentMyEventNamePast]}>{event.name}</Text>
                  <Text style={styles.studentMyEventDate}>{event.date}</Text>
                  <Text style={styles.studentMyEventScore}>
                    {event.myScore} баллов • {event.myRank} место из {event.totalParticipants}
                  </Text>
                </View>
                <View style={[styles.studentMyEventStatus, styles.studentMyEventStatusPast]}>
                  <Text style={[styles.studentMyEventStatusText, styles.studentMyEventStatusTextPast]}>Завершено</Text>
                </View>
                
              </View>
              
            ))}
            <View style={styles.studentFooterImage}>
                  <Image
                    source={require('../assets/images/uchenik2.png')}
                    style={styles.studentFooterImageStyle}
                    resizeMode="contain"
                  />
                </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default StudentDashboardScreen;