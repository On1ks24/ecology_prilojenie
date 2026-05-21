import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api';

const RatingScreen = ({ route, navigation }) => {
  const { type, classId, schoolId, userId } = route.params || {};
  // type: 'class' | 'school'

  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myRank, setMyRank] = useState(null);
  useEffect(() => {
    loadRating();
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Token получен:', token ? `${token.substring(0, 20)}...` : 'Нет токена');
      return token;
    } catch (error) {
      console.error('Ошибка получения токена:', error);
      return null;
    }
  };

  const loadRating = async () => {
    try {
      setLoading(true);
      console.log('=== Загрузка рейтинга ===');
      console.log('Параметры:', { type, classId, schoolId, userId });
      
      const token = await getToken();
      const fetchRating = async () => {
      try {
        const { schoolId, classId } = route.params || {};
        const response = await axios.get(`${BASE_URL}/api/stats/rating`, {
          params: { school: schoolId, class: classId, limit: 50 },
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setRating(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Ошибка', 'Не удалось загрузить рейтинг');
      }
    };
      if (!token) {
        console.error('Нет токена авторизации');
        Alert.alert('Ошибка', 'Требуется авторизация');
        return;
      }
      
      let url;
      if (type === 'class') {
        if (!classId) {
          console.error('Нет classId для рейтинга класса');
          Alert.alert('Ошибка', 'Не указан ID класса');
          return;
        }
        url = `${API_URL}/stats/rating?class=${classId}&limit=100`;
      } else if (type === 'school') {
        if (!schoolId) {
          console.error('Нет schoolId для рейтинга школы');
          Alert.alert('Ошибка', 'Не указан ID школы');
          return;
        }
        url = `${API_URL}/stats/rating?school=${schoolId}&limit=100`;
      } else {
        console.error('Неизвестный тип рейтинга:', type);
        Alert.alert('Ошибка', 'Неизвестный тип рейтинга');
        return;
      }
      
      console.log('Запрос URL:', url);
      
        const response = await fetch(url, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
      });
      
      console.log('Статус ответа:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка сервера:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Получены данные:', Array.isArray(data) ? `${data.length} записей` : data);
      console.log('Первая запись:', data[0]);
      
      setRating(data);
      
      if (userId && Array.isArray(data)) {
        const myPosition = data.findIndex(r => (r.userId === userId || r.id === userId)) + 1;
        setMyRank(myPosition > 0 ? myPosition : null);
        console.log('Моя позиция:', myPosition);
      }
      
    } catch (error) {
      console.error('Ошибка загрузки рейтинга:', error);
      console.error('Сообщение ошибки:', error.message);
      console.error('Полный стек:', error.stack);
      Alert.alert('Ошибка', `Не удалось загрузить рейтинг: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  const getRankColor = (index) => {
    if (index === 0) return '#FFD700';
    if (index === 1) return '#C0C0C0';
    if (index === 2) return '#CD7F32';
    return '#666';
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const title = type === 'class' ? 'Рейтинг класса' : 'Рейтинг школы';
  const subtitle = type === 'class' ? 'Топ учеников класса' : 'Топ учеников школы';

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent />
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        
        <TouchableOpacity 
          style={{
            position: 'absolute',
            top: 70,
            left: 20,
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 20,
            zIndex: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>← Назад</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: '#fff', padding: 16, paddingTop: 80 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 40 }}>{title}</Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{subtitle}</Text>
          {myRank && myRank > 0 && (
            <Text style={{ fontSize: 14, color: '#4CAF50', marginTop: 4 }}>
              Ваше место: {myRank} из {rating.length}
            </Text>
          )}
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 16 }}>
            {Array.isArray(rating) && rating.map((item, index) => (
              <View 
                key={item.userId || item.id || index}
                style={[
                  {
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                  (item.userId === userId || item.id === userId) && { 
                    backgroundColor: '#E8F5E9',
                    borderLeftWidth: 3,
                    borderLeftColor: '#4CAF50'
                  },
                  index < 3 && { elevation: 2 }
                ]}
              >
                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: 'bold',
                  width: 40,
                  color: getRankColor(index)
                }}>
                  {getRankIcon(index)}
                </Text>
                
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: (item.userId === userId || item.id === userId) ? '600' : '400',
                    color: (item.userId === userId || item.id === userId) ? '#2E7D32' : '#333'
                  }}>
                    {item.name} {(item.userId === userId || item.id === userId) && '(Вы)'}
                  </Text>
                  {type === 'school' && item.classId && (
                    <Text style={{ fontSize: 12, color: '#999' }}>Класс {item.classId}</Text>
                  )}
                </View>
                
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4CAF50' }}>
                  {item.totalScore || item.score || 0}
                </Text>
              </View>
            ))}

            {(!rating || rating.length === 0) && (
              <Text style={{ textAlign: 'center', color: '#999', padding: 40 }}>
                Пока нет данных для рейтинга
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default RatingScreen;