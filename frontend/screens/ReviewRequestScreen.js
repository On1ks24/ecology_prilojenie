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
  StatusBar,
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
      <View style={styles.reviewLoadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!request) {
    return (
      <View style={styles.reviewLoadingContainer}>
        <Text>Запрос не найден</Text>
      </View>
    );
  }

  const fullBeforeUrl = getFullImageUrl(request.before_photo);
  const fullAfterUrl = getFullImageUrl(request.after_photo);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent />
      <View style={styles.reviewContainer}>
        {/* Кнопка назад */}
        <TouchableOpacity 
          style={styles.reviewBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.reviewBackButtonText}>← Назад</Text>
        </TouchableOpacity>

        <ScrollView 
          contentContainerStyle={styles.reviewScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Информация о запросе */}
          <View style={styles.reviewInfoCard}>
            <Text style={styles.reviewInfoTitle}>Проверка работы</Text>
            <View style={styles.reviewInfoRow}>
              <Text style={styles.reviewInfoLabel}>Ученик:</Text>
              <Text style={styles.reviewInfoValue}>{request.User?.name || 'Неизвестно'}</Text>
            </View>
            <View style={styles.reviewInfoRow}>
              <Text style={styles.reviewInfoLabel}>Мероприятие: </Text>
              <Text style={styles.reviewInfoValue}>{request.Event?.name || '—'}</Text>
            </View>
            {request.score && (
              <View style={styles.reviewAiRow}>
                <Text style={styles.reviewAiLabel}>AI оценка:</Text>
                <View style={styles.reviewAiScore}>
                  <Text style={styles.reviewAiScoreText}>{request.score}/5</Text>
                </View>
              </View>
            )}
          </View>

          {/* Фото ДО */}
          <View style={styles.reviewPhotoCard}>
            <Text style={styles.reviewPhotoTitle}>Фото ДО уборки</Text>
            {fullBeforeUrl ? (
              <Image
                source={{ uri: fullBeforeUrl }}
                style={styles.reviewPhotoImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.reviewPhotoPlaceholder}>
                <Text style={styles.reviewPhotoPlaceholderText}>Фото недоступно</Text>
              </View>
            )}
          </View>

          {/* Фото ПОСЛЕ */}
          <View style={styles.reviewPhotoCard}>
            <Text style={styles.reviewPhotoTitle}>Фото ПОСЛЕ уборки</Text>
            {fullAfterUrl ? (
              <Image
                source={{ uri: fullAfterUrl }}
                style={styles.reviewPhotoImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.reviewPhotoPlaceholder}>
                <Text style={styles.reviewPhotoPlaceholderText}>Фото недоступно</Text>
              </View>
            )}
          </View>

          {/* Начисление баллов */}
          <View style={styles.reviewScoreCard}>
            <Text style={styles.reviewScoreTitle}>Начислить баллы</Text>
            <TextInput
              style={styles.reviewScoreInput}
              value={customScore}
              onChangeText={setCustomScore}
              placeholder="1-5"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
              maxLength={1}
            />
            <Text style={styles.reviewScoreHint}>
              {request.score ? `AI предложил: ${request.score} баллов` : 'Введите оценку вручную (1-5)'}
            </Text>
          </View>

          {/* Комментарий */}
          <View style={styles.reviewCommentCard}>
            <Text style={styles.reviewCommentTitle}>Комментарий</Text>
            <Text style={styles.reviewCommentHint}>* Обязателен при отклонении</Text>
            <TextInput
              style={styles.reviewCommentInput}
              value={comment}
              onChangeText={setComment}
              placeholder="Напишите комментарий к проверке..."
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Кнопки действий */}
          <View style={styles.reviewButtonsContainer}>
            <TouchableOpacity
              style={[styles.reviewApproveButton, isSubmitting && styles.reviewButtonDisabled]}
              onPress={handleApprove}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.reviewApproveButtonText}>Одобрить</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.reviewRejectButton, isSubmitting && styles.reviewButtonDisabled]}
              onPress={handleReject}
              disabled={isSubmitting}
            >
              <Text style={styles.reviewRejectButtonText}>Отклонить</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ReviewRequestScreen;