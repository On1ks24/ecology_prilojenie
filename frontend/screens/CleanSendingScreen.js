import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { launchImageLibrary } from 'react-native-image-picker';

const API_URL = 'http://10.0.2.2:5000/api';
const AI_URL = 'http://10.0.2.2:5001';

const CleanSendingScreen = ({ route, navigation }) => {
  const { eventId, eventName, eventDate, eventLocation } = route.params || {};

  const [beforePhoto, setBeforePhoto] = useState(null);  // ← теперь объект
  const [afterPhoto, setAfterPhoto] = useState(null);    // ← теперь объект
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const getToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };

  const handleTakePhoto = async (type) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.didCancel || result.errorCode) return;
    
    const asset = result.assets?.[0];
    if (!asset) return;

    const source = {
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || `photo_${Date.now()}.jpg`,
    };

    if (type === 'before') {
      setBeforePhoto(source);
    } else {
      setAfterPhoto(source);
    }
  };

  const handleSubmit = async () => {
    if (!beforePhoto || !afterPhoto) {
      Alert.alert('Ошибка', 'Добавьте оба фото');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getToken();
      
      // 1. Загружаем фото на сервер Node.js
      const formData = new FormData();
      formData.append('before', {
        uri: beforePhoto.uri,
        type: beforePhoto.type,
        name: beforePhoto.name,
      });
      formData.append('after', {
        uri: afterPhoto.uri,
        type: afterPhoto.type,
        name: afterPhoto.name,
      });
      formData.append('event_id', String(eventId));

      const uploadRes = await fetch(`${API_URL}/checks/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || 'Upload failed');
      }

      const uploadData = await uploadRes.json();

      // 2. Отправляем в нейросеть
      const aiFormData = new FormData();
      aiFormData.append('before', {
        uri: beforePhoto.uri,
        type: beforePhoto.type,
        name: beforePhoto.name,
      });
      aiFormData.append('after', {
        uri: afterPhoto.uri,
        type: afterPhoto.type,
        name: afterPhoto.name,
      });

      const aiRes = await fetch(`${AI_URL}/evaluate`, {
        method: 'POST',
        body: aiFormData,
      });

      let aiScore = { score: 3, percentage_cleaned: 60, trash_before: 5, trash_after: 2 };
      if (aiRes.ok) {
        aiScore = await aiRes.json();
      }

      // 3. Обновляем в БД
      await fetch(`${API_URL}/checks/${uploadData.requestId}/evaluate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          score: aiScore.score,
          ai_percentage: aiScore.percentage_cleaned,
          ai_trash_before: aiScore.trash_before,
          ai_trash_after: aiScore.trash_after,
        }),
      });

      setAiResult(aiScore);
      setIsSubmitted(true);
      Alert.alert('Успешно!', `AI оценка: ${aiScore.score}/5\nУбрано: ${aiScore.percentage_cleaned}%`);

    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Ошибка', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setBeforePhoto(null);
    setAfterPhoto(null);
    setIsSubmitted(false);
    setAiResult(null);
  };

  if (isSubmitted) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.subbotnikContainer}>
          <View style={styles.subbotnikHeader}>
            <Text style={styles.subbotnikTitle}>{eventName || 'Субботник'}</Text>
            <Text style={styles.subbotnikDate}>{eventDate}</Text>
            <Text style={styles.subbotnikLocation}>{eventLocation}</Text>
          </View>

          <View style={styles.successContainer}>
            <Text style={styles.successText}>✅ Отправлено на проверку!</Text>
            {aiResult && (
              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#4CAF50' }}>
                  AI оценка: {aiResult.score}/5
                </Text>
                <Text style={{ fontSize: 14, color: '#666' }}>
                  Убрано: {aiResult.percentage_cleaned}%
                </Text>
              </View>
            )}
            <Text style={[styles.instructionText, { marginTop: 10 }]}>
              Учитель проверит и начислит баллы
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleReset}>
            <Text style={styles.submitButtonText}>Отправить ещё</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: '#666', marginTop: 10 }]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.submitButtonText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.subbotnikContainer}>
        <View style={styles.subbotnikHeader}>
          <Text style={styles.subbotnikTitle}>{eventName || 'Субботник'}</Text>
          <Text style={styles.subbotnikDate}>{eventDate}</Text>
          <Text style={styles.subbotnikLocation}>{eventLocation}</Text>
        </View>

        {/* Фото ДО */}
        <View style={styles.photoSection}>
          <Text style={styles.photoTitle}>Фото ДО уборки</Text>
          <Text style={styles.photoSubtitle}>Сфотографируйте место до начала уборки</Text>
          
          <View style={styles.photoContainer}>
            {beforePhoto ? (
              <Image source={{ uri: beforePhoto.uri }} style={styles.photoImage} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderIcon}>📸</Text>
                <Text style={styles.photoPlaceholderText}>Фото не добавлено</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity
            style={[styles.photoButton, beforePhoto && styles.photoButtonDisabled]}
            onPress={() => handleTakePhoto('before')}
            disabled={!!beforePhoto}
          >
            <Text style={styles.photoButtonText}>
              {beforePhoto ? '✓ Добавлено' : '📷 Сделать фото'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Фото ПОСЛЕ */}
        <View style={styles.photoSection}>
          <Text style={styles.photoTitle}>Фото ПОСЛЕ уборки</Text>
          <Text style={styles.photoSubtitle}>Сфотографируйте результат после уборки</Text>
          
          <View style={styles.photoContainer}>
            {afterPhoto ? (
              <Image source={{ uri: afterPhoto.uri }} style={styles.photoImage} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderIcon}>📸</Text>
                <Text style={styles.photoPlaceholderText}>Фото не добавлено</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity
            style={[styles.photoButton, afterPhoto && styles.photoButtonDisabled]}
            onPress={() => handleTakePhoto('after')}
            disabled={!!afterPhoto}
          >
            <Text style={styles.photoButtonText}>
              {afterPhoto ? '✓ Добавлено' : '📷 Сделать фото'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, (!beforePhoto || !afterPhoto || isSubmitting) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!beforePhoto || !afterPhoto || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Отправить на проверку</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.instructionText}>
          * Фото пройдут AI-оценку и проверку учителя
        </Text>
      </View>
    </ScrollView>
  );
};

export default CleanSendingScreen;