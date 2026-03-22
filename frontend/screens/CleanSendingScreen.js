import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import styles from './styles';

const SubbotnikParticipationScreen = () => {
  const [beforePhoto, setBeforePhoto] = useState(null);
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subbotnikData = {
    id: 1,
    title: 'Весенний субботник',
    date: '25 марта 2026',
    location: 'Школьный парк',
  };

  const handleTakePhoto = (type) => {
    // TODO: Открыть камеру для фото
    // Для теста используем заглушку с имитацией выбора фото
    Alert.alert(
      'Сделать фото',
      type === 'before' ? 'Сделайте фото ДО уборки' : 'Сделайте фото ПОСЛЕ уборки',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Сделать фото',
          onPress: () => {
            // Имитация добавления фото
            const mockPhotoUrl = 'https://via.placeholder.com/400x300?text=Photo';
            if (type === 'before') {
              setBeforePhoto(mockPhotoUrl);
            } else {
              setAfterPhoto(mockPhotoUrl);
            }
            Alert.alert('Успех', 'Фото добавлено');
          },
        },
      ]
    );
    
    // Реальная реализация с камерой:
    // import { launchCamera } from 'react-native-image-picker';
    // launchCamera({ mediaType: 'photo' }, (response) => {
    //   if (response.didCancel) return;
    //   if (response.error) {
    //     Alert.alert('Ошибка', response.error);
    //     return;
    //   }
    //   const source = { uri: response.assets[0].uri };
    //   if (type === 'before') {
    //     setBeforePhoto(source);
    //   } else {
    //     setAfterPhoto(source);
    //   }
    // });
  };

  const handleSubmit = () => {
    if (!beforePhoto) {
      Alert.alert('Ошибка', 'Пожалуйста, сделайте фото ДО уборки');
      return;
    }

    if (!afterPhoto) {
      Alert.alert('Ошибка', 'Пожалуйста, сделайте фото ПОСЛЕ уборки');
      return;
    }

    setIsSubmitting(true);

    // TODO: Отправить фото на сервер
    // const formData = new FormData();
    // formData.append('before_photo', beforePhoto);
    // formData.append('after_photo', afterPhoto);
    // formData.append('subbotnik_id', subbotnikData.id);
    // 
    // try {
    //   const response = await fetch('API_URL/submit', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     setIsSubmitted(true);
    //   }
    // } catch (error) {
    //   Alert.alert('Ошибка', 'Не удалось отправить фото');
    // } finally {
    //   setIsSubmitting(false);
    // }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      Alert.alert('Успешно', 'Фото отправлены на проверку учителю');
    }, 1500);
  };

  const handleReset = () => {
    setBeforePhoto(null);
    setAfterPhoto(null);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.subbotnikContainer}>
          <View style={styles.subbotnikHeader}>
            <Text style={styles.subbotnikTitle}>{subbotnikData.title}</Text>
            <Text style={styles.subbotnikDate}>{subbotnikData.date}</Text>
            <Text style={styles.subbotnikLocation}>{subbotnikData.location}</Text>
          </View>

          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              ✅ Фото успешно отправлены на проверку!
            </Text>
            <Text style={[styles.instructionText, { marginTop: 10 }]}>
              Учитель проверит ваши фото и начислит баллы
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleReset}>
            <Text style={styles.submitButtonText}>Участвовать в другом субботнике</Text>
          </TouchableOpacity>

          {/* TODO: Переход на главный экран */}
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.instructionText}>Вернуться назад</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.subbotnikContainer}>
        <View style={styles.subbotnikHeader}>
          <Text style={styles.subbotnikTitle}>{subbotnikData.title}</Text>
          <Text style={styles.subbotnikDate}>{subbotnikData.date}</Text>
          <Text style={styles.subbotnikLocation}>{subbotnikData.location}</Text>
        </View>

        <View style={styles.photoSection}>
          <Text style={styles.photoTitle}>Фото ДО уборки</Text>
          <Text style={styles.photoSubtitle}>Сфотографируйте место до начала уборки</Text>
          
          <View style={styles.photoContainer}>
            {beforePhoto ? (
              <Image source={{ uri: beforePhoto }} style={styles.photoImage} />
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
              {beforePhoto ? 'Фото добавлено ✓' : '📷 Сделать фото до уборки'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.photoSection}>
          <Text style={styles.photoTitle}>Фото ПОСЛЕ уборки</Text>
          <Text style={styles.photoSubtitle}>Сфотографируйте результат после уборки</Text>
          
          <View style={styles.photoContainer}>
            {afterPhoto ? (
              <Image source={{ uri: afterPhoto }} style={styles.photoImage} />
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
              {afterPhoto ? 'Фото добавлено ✓' : '📷 Сделать фото после уборки'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, (!beforePhoto || !afterPhoto || isSubmitting) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!beforePhoto || !afterPhoto || isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Отправка...' : 'Отправить на проверку'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.instructionText}>
          * После отправки фото будут проверены учителем. За успешное участие вы получите эко-баллы
        </Text>
      </View>
    </ScrollView>
  );
};

export default SubbotnikParticipationScreen;