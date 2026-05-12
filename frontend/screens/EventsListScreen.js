import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const title = status === 'active' ? 'Текущие субботники' : 'Прошедшие субботники';

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ backgroundColor: '#fff', padding: 16, paddingTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>{title}</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
          Всего: {events.length}
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          {events.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}
              onPress={() => handleEventPress(event.id)}
            >
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>
                {event.name}
              </Text>
              <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
                📅 {new Date(event.date).toLocaleDateString('ru-RU')}
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                📍 {event.location}
              </Text>
              {status === 'finished' && (
                <View style={{ 
                  backgroundColor: '#E8F5E9', 
                  paddingHorizontal: 10, 
                  paddingVertical: 4, 
                  borderRadius: 8,
                  marginTop: 8,
                  alignSelf: 'flex-start'
                }}>
                  <Text style={{ color: '#2E7D32', fontSize: 12, fontWeight: '600' }}>
                    ✓ Завершено
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}

          {events.length === 0 && (
            <Text style={{ textAlign: 'center', color: '#999', padding: 40 }}>
              {status === 'active' 
                ? 'Нет активных мероприятий' 
                : 'Нет завершённых мероприятий'}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default EventsListScreen;