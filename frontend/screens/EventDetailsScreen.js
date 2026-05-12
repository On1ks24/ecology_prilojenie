import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api';

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId, userRole, userId } = route.params || {};
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'rating'
  const [eventData, setEventData] = useState(null);
  const [rating, setRating] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const isStudent = useMemo(() => {
    return (userRole === 'student') || (userRole === 'user' && !isOrganizer);
  }, [userRole, isOrganizer]);

  const isTeacher = useMemo(() => {
    return (userRole === 'teacher') || (userRole === 'user' && isOrganizer);
  }, [userRole, isOrganizer]);
  useEffect(() => {
    loadEventDetails();
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };
  const handleNewRequest = () => {
    navigation.navigate('CleanSending', {
      eventId: eventData.id,
      eventName: eventData.name,
      eventDate: new Date(eventData.date).toLocaleDateString('ru-RU'),
      eventLocation: eventData.location,
    });
  };
  const loadEventDetails = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      // Основные данные мероприятия + рейтинг
      const detailsRes = await fetch(`${API_URL}/events/${eventId}/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!detailsRes.ok) throw new Error('Failed');
      const details = await detailsRes.json();
      setEventData(details.event);
      setRating(details.rating);
      setIsOrganizer(details.event.organizer_id === userId); // ← ВОТ ЭТО  
      if (isStudent) {
        // Мои запросы
        const requestsRes = await fetch(`${API_URL}/events/${eventId}/my-requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (requestsRes.ok) {
          setMyRequests(await requestsRes.json());
        }
      } else if (isTeacher) {
        // Необработанные запросы
        const pendingRes = await fetch(`${API_URL}/events/${eventId}/pending-requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (pendingRes.ok) {
          setPendingRequests(await pendingRes.json());
        }
      }

    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Шапка */}
      <View style={{ backgroundColor: '#fff', padding: 16, paddingTop: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333' }}>
          {eventData?.name}
        </Text>
        
        {/* ← ДОБАВЬ ЭТО */}
        <View style={{ 
          backgroundColor: '#f5f5f5', 
          paddingHorizontal: 10, 
          paddingVertical: 4, 
          borderRadius: 6,
          alignSelf: 'flex-start',
          marginTop: 6,
          marginBottom: 4
        }}>
          <Text style={{ color: '#666', fontSize: 13, fontWeight: '500' }}>
            🆔 ID: {eventData?.id}
          </Text>
        </View>
        
        <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
          📅 {new Date(eventData?.date).toLocaleDateString('ru-RU')}
        </Text>
        <Text style={{ fontSize: 14, color: '#666' }}>
          📍 {eventData?.location}
        </Text>
        {eventData?.isFinished && (
          <View style={{ 
            backgroundColor: '#E8F5E9', 
            paddingHorizontal: 10, 
            paddingVertical: 4, 
            borderRadius: 8,
            marginTop: 8,
            alignSelf: 'flex-start'
          }}>
            <Text style={{ color: '#2E7D32', fontSize: 12, fontWeight: '600' }}>
              ✓ Мероприятие завершено
            </Text>
          </View>
        )}
      </View>

      {/* Вкладки */}
      <View style={{ 
        flexDirection: 'row', 
        backgroundColor: '#fff', 
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}>
        <TouchableOpacity
          onPress={() => setActiveTab('info')}
          style={{
            flex: 1,
            paddingVertical: 12,
            alignItems: 'center',
            borderBottomWidth: 3,
            borderBottomColor: activeTab === 'info' ? '#4CAF50' : 'transparent',
          }}
        >
          <Text style={{ 
            fontWeight: activeTab === 'info' ? '600' : '400',
            color: activeTab === 'info' ? '#4CAF50' : '#666'
          }}>
            Информация
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('rating')}
          style={{
            flex: 1,
            paddingVertical: 12,
            alignItems: 'center',
            borderBottomWidth: 3,
            borderBottomColor: activeTab === 'rating' ? '#4CAF50' : 'transparent',
          }}
        >
          <Text style={{ 
            fontWeight: activeTab === 'rating' ? '600' : '400',
            color: activeTab === 'rating' ? '#4CAF50' : '#666'
          }}>
            Рейтинг
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {activeTab === 'info' ? (
          <View style={{ padding: 16 }}>
            {/* Для ученика: мои запросы */}
            {isStudent && (
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' }}>
                  Мои отправленные работы
                </Text>
                
                {myRequests.map((req) => (
                  <View key={req.id} style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <View>
                      <Text style={{ fontSize: 14, color: '#666' }}>
                        Отправлено: {new Date(req.created_at).toLocaleDateString('ru-RU')}
                      </Text>
                      <View style={{ 
                        backgroundColor: 
                          req.status === 'approved' ? '#E8F5E9' : 
                          req.status === 'rejected' ? '#ffebee' : '#FFF3E0',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 6,
                        marginTop: 4,
                        alignSelf: 'flex-start'
                      }}>
                        <Text style={{ 
                          fontSize: 12,
                          color: 
                            req.status === 'approved' ? '#2E7D32' : 
                            req.status === 'rejected' ? '#c62828' : '#E65100'
                        }}>
                          {req.status === 'approved' ? '✓ Подтверждено' : 
                           req.status === 'rejected' ? '✗ Отклонено' : '⏳ На проверке'}
                        </Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4CAF50' }}>
                      {req.score || 0} баллов
                    </Text>
                  </View>
                ))}

                {myRequests.length === 0 && (
                  <Text style={{ color: '#999', textAlign: 'center', padding: 20 }}>
                    Вы ещё не отправляли работы
                  </Text>
                )}

                {/* Кнопка нового запроса */}
                {!eventData?.isFinished && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#4CAF50',
                      padding: 16,
                      borderRadius: 12,
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                    onPress={handleNewRequest}
                  >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                      📷 Отправить новую работу
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Для учителя: необработанные запросы */}
            {isTeacher && (
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' }}>
                  Запросы на проверку
                </Text>
                
                {pendingRequests.map((req) => (
                  <View key={req.id} style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 10,
                  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={{ fontSize: 16, fontWeight: '600' }}>{req.User?.name}</Text>
                      <Text style={{ fontSize: 12, color: '#999' }}>
                        {new Date(req.created_at).toLocaleDateString('ru-RU')}
                      </Text>
                    </View>
                    
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#2196F3',
                        padding: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                      }}
                      onPress={() => navigation.navigate('ReviewRequest', { 
                        requestId: req.id,
                        eventId: eventId 
                      })}
                    >
                      <Text style={{ color: '#fff', fontWeight: '600' }}>
                        🔍 Проверить запрос
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {pendingRequests.length === 0 && (
                  <Text style={{ color: '#999', textAlign: 'center', padding: 20 }}>
                    Нет необработанных запросов
                  </Text>
                )}
              </View>
            )}
          </View>
        ) : (
          /* Вкладка рейтинга */
          <View style={{ padding: 16 }}>
            <View style={{ 
              backgroundColor: '#fff', 
              borderRadius: 12, 
              padding: 12,
              marginBottom: 12,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{ fontWeight: '600', color: '#666' }}>Место</Text>
              <Text style={{ fontWeight: '600', color: '#666' }}>Участник</Text>
              <Text style={{ fontWeight: '600', color: '#666' }}>Баллы</Text>
            </View>

            {rating.map((item) => (
              <View key={item.id} style={[
                {
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
                item.id === userId && { backgroundColor: '#E8F5E9', borderLeftWidth: 3, borderLeftColor: '#4CAF50' }
              ]}>
                <Text style={{ fontSize: 16, fontWeight: '600', width: 50 }}>
                  {item.rank === 1 && '🥇'}
                  {item.rank === 2 && '🥈'}
                  {item.rank === 3 && '🥉'}
                  {item.rank > 3 && `${item.rank}.`}
                </Text>
                <Text style={{ flex: 1, fontSize: 15, color: item.id === userId ? '#2E7D32' : '#333' }}>
                  {item.name} {item.id === userId && '(Вы)'}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4CAF50' }}>
                  {item.totalScore}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default EventDetailsScreen;