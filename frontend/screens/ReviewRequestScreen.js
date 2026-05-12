// screens/ReviewRequestScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_URL = 'http://10.0.2.2:5000/api';

const ReviewRequestScreen = ({ route, navigation }) => {
  const { requestId, eventId } = route.params || {};

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customScore, setCustomScore] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadRequest();
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };

  const loadRequest = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/checks/${requestId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to load');

      const data = await response.json();
      setRequest(data);
      // Предзаполняем AI-оценку если есть
      if (data.score) {
        setCustomScore(String(data.score));
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить запрос');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    const score = parseInt(customScore, 10);
    
    if (isNaN(score) || score < 1 || score > 5) {
      Alert.alert('Ошибка', 'Введите баллы от 1 до 5');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/checks/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'approved',
          score: score,
          comment: comment || `Одобрено. Баллы: ${score}`,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      Alert.alert('Успешно', `Запрос одобрен! Начислено ${score} баллов`, [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);

    } catch (error) {
      Alert.alert('Ошибка', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      Alert.alert('Внимание', 'Укажите причину отклонения');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/checks/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'rejected',
          score: 0,
          comment: comment,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      Alert.alert('Отклонено', 'Запрос отклонён', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);

    } catch (error) {
      Alert.alert('Ошибка', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFullImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${API_URL.replace('/api', '')}${path}`;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!request) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Запрос не найден</Text>
      </View>
    );
  }

  const fullBeforeUrl = getFullImageUrl(request.before_photo);
  const fullAfterUrl = getFullImageUrl(request.after_photo);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>
          Проверка работы
        </Text>
        <Text style={{ fontSize: 14, color: '#666' }}>
          Ученик: {request.User?.name || 'Неизвестно'}
        </Text>
        <Text style={{ fontSize: 14, color: '#666' }}>
          Мероприятие: {request.Event?.name || '—'}
        </Text>
        {request.score && (
          <Text style={{ fontSize: 14, color: '#4CAF50', marginTop: 4 }}>
            AI оценка: {request.score}/5
          </Text>
        )}
      </View>

      {/* Фото ДО */}
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' }}>
          📸 Фото ДО уборки
        </Text>
        {fullBeforeUrl ? (
          <Image
            source={{ uri: fullBeforeUrl }}
            style={{ width: '100%', height: 250, borderRadius: 12 }}
            resizeMode="cover"
          />
        ) : (
          <View style={{ height: 150, backgroundColor: '#f5f5f5', borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#999' }}>Фото недоступно</Text>
          </View>
        )}
      </View>

      {/* Фото ПОСЛЕ */}
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' }}>
          📸 Фото ПОСЛЕ уборки
        </Text>
        {fullAfterUrl ? (
          <Image
            source={{ uri: fullAfterUrl }}
            style={{ width: '100%', height: 250, borderRadius: 12 }}
            resizeMode="cover"
          />
        ) : (
          <View style={{ height: 150, backgroundColor: '#f5f5f5', borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#999' }}>Фото недоступно</Text>
          </View>
        )}
      </View>

      {/* Баллы */}
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' }}>
          Начислить баллы (1-5)
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 12,
            padding: 14,
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          value={customScore}
          onChangeText={setCustomScore}
          placeholder="1-5"
          keyboardType="number-pad"
          maxLength={1}
        />
        <Text style={{ fontSize: 12, color: '#999', marginTop: 8, textAlign: 'center' }}>
          {request.score ? `AI предложил: ${request.score} баллов` : 'Введите оценку вручную'}
        </Text>
      </View>

      {/* Комментарий */}
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' }}>
          Комментарий (обязателен при отклонении)
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 12,
            padding: 14,
            fontSize: 14,
            minHeight: 80,
            textAlignVertical: 'top',
          }}
          value={comment}
          onChangeText={setComment}
          placeholder="Комментарий к проверке..."
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Кнопки */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#4CAF50',
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            opacity: isSubmitting ? 0.6 : 1,
          }}
          onPress={handleApprove}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
              ✓ Одобрить
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#f44336',
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            opacity: isSubmitting ? 0.6 : 1,
          }}
          onPress={handleReject}
          disabled={isSubmitting}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
            ✗ Отклонить
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ReviewRequestScreen;