import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_URL = 'http://10.0.2.2:5000/api';

const UserAccountScreen = ({ route, navigation }) => {
  const { userId, name, role } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('organizer');
  const [myEvents, setMyEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [joinCode, setJoinCode] = useState('');

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
    if (!name) return 'П';
    return name.charAt(0).toUpperCase();
  };

  const loadAllData = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const myEventsRes = await fetch(`${API_URL}/events?my_events=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (myEventsRes.ok) {
        const events = await myEventsRes.json();
        setMyEvents(events.map(e => ({
          id: e.id,
          name: e.name,
          date: new Date(e.date).toLocaleDateString('ru-RU'),
          location: e.location,
          status: e.end_date ? 'finished' : 'active',
          participants: 0,
        })));
      }

      const joinedRes = await fetch(`${API_URL}/events/my-joined`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (joinedRes.ok) {
        const events = await joinedRes.json();
        setJoinedEvents(events.map(e => ({
          id: e.id,
          name: e.name,
          date: new Date(e.date).toLocaleDateString('ru-RU'),
          location: e.location,
          myScore: e.myScore || 0,
        })));
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent', { userRole: 'user' });
  };

  const handleJoinEvent = async () => {
    if (!joinCode.trim()) {
      Alert.alert('Ошибка', 'Введите ID мероприятия');
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/events/${joinCode.trim()}/join`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      Alert.alert('Успешно', 'Вы присоединились к мероприятию!');
      setJoinCode('');
      loadAllData();

    } catch (error) {
      Alert.alert('Ошибка', error.message);
    }
  };

  const handleEventPress = (eventId, isOrganizer) => {
    if (isOrganizer) {
      navigation.navigate('EventDetails', { eventId, userRole: 'teacher', userId });
    } else {
      navigation.navigate('EventDetails', { eventId, userRole: 'user', userId });
    }
  };

  const handleSendPhotos = (eventId, eventName, eventDate, eventLocation) => {
    navigation.navigate('CleanSending', {
      eventId,
      eventName,
      eventDate,
      eventLocation,
    });
  };

  if (loading) {
    return (
      <View style={styles.userLoadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.userScrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />}
      >
        <View style={styles.userContainer}>
          
          <View style={styles.userHeader}>
            <View style={styles.studentAvatar}>
              <Image
                source={require('../assets/images/fon10.png')}
                style={styles.studentAvatarImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.studentName}>Привет, {name || 'Пользователь'}!</Text>
            <Text style={styles.studentRole}>Экологический активист</Text>
          </View>

          {/* Присоединиться к мероприятию */}
          <View style={styles.userJoinCard}>
            <Text style={styles.userJoinTitle}>Присоединиться к мероприятию</Text>
            <TextInput
              style={styles.userJoinInput}
              value={joinCode}
              onChangeText={setJoinCode}
              placeholder="Введите ID мероприятия"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.userJoinButton} onPress={handleJoinEvent}>
              <Text style={styles.userJoinButtonText}>Присоединиться</Text>
            </TouchableOpacity>
          </View>

          {/* Табы */}
          <View style={styles.userTabContainer}>
            <TouchableOpacity
              style={[styles.userTab, activeTab === 'organizer' && styles.userTabActive]}
              onPress={() => setActiveTab('organizer')}
            >
              <Text style={[styles.userTabText, activeTab === 'organizer' && styles.userTabTextActive]}>
                Организатор ({myEvents.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.userTab, activeTab === 'participant' && styles.userTabActive]}
              onPress={() => setActiveTab('participant')}
            >
              <Text style={[styles.userTabText, activeTab === 'participant' && styles.userTabTextActive]}>
                Участник ({joinedEvents.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Вкладка Организатор */}
          {activeTab === 'organizer' && (
            <>
              <TouchableOpacity style={styles.userActionCard} onPress={handleCreateEvent}>
                <View style={styles.userActionContent}>
                  <Text style={styles.userActionTitle}>Создать мероприятие</Text>
                  <Text style={styles.userActionDescription}>Организовать новый субботник</Text>
                </View>
                <Text style={styles.userActionArrow}>→</Text>
              </TouchableOpacity>

              <View style={styles.userEventsList}>
                <Text style={styles.userSectionTitle}>Мои мероприятия</Text>
                {myEvents.length === 0 ? (
                  <View style={styles.userEmptyState}>
                    <Text style={styles.userEmptyText}>Вы ещё не создавали мероприятий</Text>
                  </View>
                ) : (
                  myEvents.map((event) => (
                    <TouchableOpacity
                      key={event.id}
                      style={styles.userEventItem}
                      onPress={() => handleEventPress(event.id, true)}
                    >
                      <View style={styles.userEventInfo}>
                        <Text style={styles.userEventName}>{event.name}</Text>
                        <Text style={styles.userEventDate}>{event.date}</Text>
                        <Text style={styles.userEventLocation}>{event.location}</Text>
                      </View>
                      <View style={[
                        styles.userEventStatus,
                        event.status === 'active' ? styles.userEventStatusActive : styles.userEventStatusFinished
                      ]}>
                        <Text style={[
                          styles.userEventStatusText,
                          event.status === 'active' ? styles.userEventStatusTextActive : styles.userEventStatusTextFinished
                        ]}>
                          {event.status === 'active' ? 'Активно' : 'Завершено'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </>
          )}

          {/* Вкладка Участник */}
          {activeTab === 'participant' && (
            <View style={styles.userEventsList}>
              <Text style={styles.userSectionTitle}>Мероприятия где я участвую</Text>
              {joinedEvents.length === 0 ? (
                <View style={styles.userEmptyState}>
                  <Text style={styles.userEmptyText}>Вы не участвуете ни в одном мероприятии</Text>
                </View>
              ) : (
                joinedEvents.map((event) => (
                  <TouchableOpacity
                    key={event.id}
                    style={styles.userEventItem}
                    onPress={() => navigation.navigate('EventDetails', {
                      eventId: event.id,
                      userRole: 'user',
                      userId
                    })}
                  >
                    <View style={styles.userEventInfo}>
                      <Text style={styles.userEventName}>{event.name}</Text>
                      <Text style={styles.userEventDate}>{event.date}</Text>
                      <Text style={styles.userEventLocation}>{event.location}</Text>
                    </View>
                    <View style={styles.userEventParticipantStats}>
                      <Text style={styles.userEventScore}>{event.myScore} баллов</Text>
                      <TouchableOpacity
                        style={styles.userPhotoButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleSendPhotos(event.id, event.name, event.date, event.location);
                        }}
                      >
                        <Text style={styles.userPhotoButtonText}>Отправить фото</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
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

export default UserAccountScreen;