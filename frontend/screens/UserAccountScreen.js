// screens/UserAccountScreen.js
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_URL = 'http://10.0.2.2:5000/api';

const UserAccountScreen = ({ route, navigation }) => {
  const { userId, name, role } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('organizer'); // 'organizer' | 'participant'
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

  const loadAllData = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      // Мои мероприятия (где организатор)
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
          participants: 0, // можно доработать
        })));
      }

      // Мероприятия где участник
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

  // Создать мероприятие
  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent', { userRole: 'user' });
  };

  // Присоединиться к мероприятию по ID
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

  // Перейти к мероприятию
  const handleEventPress = (eventId, isOrganizer) => {
    if (isOrganizer) {
      navigation.navigate('EventDetails', { eventId, userRole: 'teacher', userId });
    } else {
      navigation.navigate('EventDetails', { eventId, userRole: 'user', userId });
    }
  };

  // Отправить фото уборки
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
        <Text style={styles.greeting}>Привет, {name || 'Пользователь'}!</Text>
        <Text style={styles.subGreeting}>Экологический активист</Text>

        {/* Присоединиться по ID */}
        <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' }}>
            🔗 Присоединиться к мероприятию
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 10,
              padding: 12,
              fontSize: 16,
              marginBottom: 12,
            }}
            value={joinCode}
            onChangeText={setJoinCode}
            placeholder="Введите ID мероприятия"
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={{ backgroundColor: '#2196F3', borderRadius: 10, padding: 14, alignItems: 'center' }}
            onPress={handleJoinEvent}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Присоединиться</Text>
          </TouchableOpacity>
        </View>

        {/* Табы */}
        <View style={{ flexDirection: 'row', marginBottom: 20, backgroundColor: '#fff', borderRadius: 10, padding: 4 }}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'organizer' && styles.tabActive]}
            onPress={() => setActiveTab('organizer')}
          >
            <Text style={[styles.tabText, activeTab === 'organizer' && styles.tabTextActive]}>
              Организатор ({myEvents.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'participant' && styles.tabActive]}
            onPress={() => setActiveTab('participant')}
          >
            <Text style={[styles.tabText, activeTab === 'participant' && styles.tabTextActive]}>
              Участник ({joinedEvents.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Вкладка Организатор */}
        {activeTab === 'organizer' && (
          <>
            <TouchableOpacity
              style={styles.teacherActionCard}
              onPress={handleCreateEvent}
            >
              <Text style={styles.teacherActionIcon}>➕</Text>
              <View style={styles.teacherActionContent}>
                <Text style={styles.teacherActionTitle}>Создать мероприятие</Text>
                <Text style={styles.teacherActionDescription}>Организовать новый субботник</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.eventsPreview}>
              <Text style={styles.sectionTitle}>Мои мероприятия</Text>
              {myEvents.length === 0 ? (
                <Text style={{ textAlign: 'center', color: '#999', padding: 20 }}>
                  Вы ещё не создавали мероприятий
                </Text>
              ) : (
                myEvents.map((event) => (
                  <TouchableOpacity
                    key={event.id}
                    style={styles.eventItem}
                    onPress={() => handleEventPress(event.id, true)}
                  >
                    <View style={styles.eventInfo}>
                      <Text style={styles.eventName}>{event.name}</Text>
                      <Text style={styles.eventDate}>{event.date}</Text>
                      <Text style={{ fontSize: 12, color: '#999' }}>📍 {event.location}</Text>
                    </View>
                    <View style={[
                      { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
                      event.status === 'active' ? { backgroundColor: '#E8F5E9' } : { backgroundColor: '#E3F2FD' }
                    ]}>
                      <Text style={{ 
                        fontSize: 12, 
                        color: event.status === 'active' ? '#2E7D32' : '#1565C0',
                        fontWeight: '600'
                      }}>
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
        <View style={styles.eventsPreview}>
          <Text style={styles.sectionTitle}>Мероприятия где я участвую</Text>
          {joinedEvents.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#999', padding: 20 }}>
              Вы не участвуете ни в одном мероприятии
            </Text>
          ) : (
            joinedEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventItem}
                onPress={() => navigation.navigate('EventDetails', {
                  eventId: event.id,
                  userRole: 'user',
                  userId
                })}
              >
                <View style={styles.eventInfo}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <Text style={{ fontSize: 12, color: '#999' }}>📍 {event.location}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#4CAF50' }}>
                    {event.myScore} баллов
                  </Text>
                  <TouchableOpacity
                    style={{ 
                      backgroundColor: '#FF9800', 
                      paddingHorizontal: 12, 
                      paddingVertical: 6, 
                      borderRadius: 8,
                      marginTop: 6
                    }}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleSendPhotos(event.id, event.name, event.date, event.location);
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
                      📷 Отправить фото
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
      </View>
    </ScrollView>
  );
};

export default UserAccountScreen;