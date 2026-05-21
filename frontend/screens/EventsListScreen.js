import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_URL = 'http://10.0.2.2:5000/api';

const EventsListScreen = ({ route, navigation }) => {
  const { status, schoolId } = route.params || {};
  // status: 'active' | 'finished'

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };

  const loadEvents = async () => {
    try {
      const token = await getToken();
      
      const url = status === 'active'
        ? `${API_URL}/events?school=true&status=active`
        : `${API_URL}/events?school=true&status=finished`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed');
      
      const data = await response.json();
      setEvents(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventPress = (eventId) => {
    navigation.navigate('EventDetails', { eventId });
  };

  if (loading) {
    return (
      <View style={styles.eventsLoadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const title = status === 'active' ? 'Текущие субботники' : 'Прошедшие субботники';

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent />
      <View style={styles.eventsContainer}>
        {/* Кнопка назад */}
        <TouchableOpacity 
          style={styles.eventsBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.eventsBackButtonText}>← Назад</Text>
        </TouchableOpacity>

        <View style={styles.eventsHeader}>
          <Text style={styles.eventsTitle}>{title}</Text>
          <Text style={styles.eventsSubtitle}>
            Всего: {events.length}
          </Text>
        </View>

        <ScrollView style={styles.eventsScrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.eventsListContainer}>
            {events.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventsCard}
                onPress={() => handleEventPress(event.id)}
                activeOpacity={0.8}
              >
                <ImageBackground
                  source={require('../assets/images/jj3.jpg')}
                  style={styles.eventsCardBackground}
                  imageStyle={{ opacity: 0.15 }}
                  resizeMode="cover"
                >
                  <View style={styles.eventsCardContent}>
                    <Text style={styles.eventsCardTitle}>{event.name}</Text>
                    <View style={styles.eventsCardRow}>
                      <Text style={styles.eventsCardIcon}>Дата:</Text>
                      <Text style={styles.eventsCardText}>
                        {new Date(event.date).toLocaleDateString('ru-RU')}
                      </Text>
                    </View>
                    <View style={styles.eventsCardRow}>
                      <Text style={styles.eventsCardIcon}>Место:</Text>
                      <Text style={styles.eventsCardText}>{event.location}</Text>
                    </View>
                    {status === 'finished' && (
                      <View style={styles.eventsFinishedBadge}>
                        <Text style={styles.eventsFinishedText}>Завершено</Text>
                      </View>
                    )}
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}

            {events.length === 0 && (
              <View style={styles.eventsEmptyState}>
                <Text style={styles.eventsEmptyText}>
                  {status === 'active' 
                    ? 'Нет активных мероприятий' 
                    : 'Нет завершённых мероприятий'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default EventsListScreen;