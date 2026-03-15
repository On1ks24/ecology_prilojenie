import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { layout } from '../styles/layout';
import { buttons } from '../styles/buttons';
import { cards } from '../styles/cards';

const PhotoSendingPage = () => {
  const [beforePhoto, setBeforePhoto] = useState(null);
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const takePhoto = (type) => {
    Alert.alert(
      'Камера',
      `Сделать фото ${type === 'before' ? 'ДО' : 'ПОСЛЕ'} уборки?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Сделать фото',
          onPress: () => {
            const mockPhotoUri = `mock_${type}_${Date.now()}.jpg`;
            if (type === 'before') {
              setBeforePhoto(mockPhotoUri);
            } else {
              setAfterPhoto(mockPhotoUri);
            }
            Alert.alert('Успешно', `Фото "${type === 'before' ? 'ДО' : 'ПОСЛЕ'}" готово`);
          }
        }
      ]
    );
  };

  const handleSendPhotos = () => {
    if (!beforePhoto || !afterPhoto) {
      Alert.alert('Ошибка', 'Сделайте оба фото: "До" и "После"');
      return;
    }

    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      Alert.alert(
        'Успешно',
        'Фото отправлены! Нейросеть обрабатывает результат.',
        [
          {
            text: 'OK',
            onPress: () => {
              setBeforePhoto(null);
              setAfterPhoto(null);
            }
          }
        ]
      );
    }, 2000);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 24 }}>
        <Text style={[typography.h4, { marginBottom: 8 }]}>📸 Фотофиксация уборки</Text>
        <Text style={[typography.body2, { color: colors.gray }]}>
          Сделайте фотографии территории ДО и ПОСЛЕ уборки
        </Text>
      </View>

      <View style={{ gap: 20, marginBottom: 24 }}>
        {/* Фото ДО */}
        <View style={[
          cards.photo,
          beforePhoto && cards.photoFilled
        ]}>
          <Text style={[typography.h6, { marginBottom: 16 }]}>📍 Фото ДО</Text>
          <View style={[layout.center, { minHeight: 80, marginBottom: 16 }]}>
            {beforePhoto ? (
              <>
                <Text style={{ fontSize: 40, marginBottom: 8 }}>📷✅</Text>
                <Text style={{ fontSize: 16, color: colors.primary, fontWeight: '600', marginBottom: 4 }}>
                  Фото сделано
                </Text>
                <Text style={{ fontSize: 12, color: colors.gray }} numberOfLines={1}>
                  {beforePhoto}
                </Text>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 40, marginBottom: 8 }}>📸</Text>
                <Text style={{ fontSize: 14, color: colors.lightGray }}>Фото не выбрано</Text>
              </>
            )}
          </View>
          <TouchableOpacity
            style={[
              buttons.photoButton,
              beforePhoto && buttons.photoButtonActive
            ]}
            onPress={() => takePhoto('before')}
            disabled={isSending}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: beforePhoto ? colors.primary : colors.black }}>
              {beforePhoto ? '🔄 Переснять' : '📷 Сделать фото'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Фото ПОСЛЕ */}
        <View style={[
          cards.photo,
          afterPhoto && cards.photoFilled
        ]}>
          <Text style={[typography.h6, { marginBottom: 16 }]}>📍 Фото ПОСЛЕ</Text>
          <View style={[layout.center, { minHeight: 80, marginBottom: 16 }]}>
            {afterPhoto ? (
              <>
                <Text style={{ fontSize: 40, marginBottom: 8 }}>📷✅</Text>
                <Text style={{ fontSize: 16, color: colors.primary, fontWeight: '600', marginBottom: 4 }}>
                  Фото сделано
                </Text>
                <Text style={{ fontSize: 12, color: colors.gray }} numberOfLines={1}>
                  {afterPhoto}
                </Text>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 40, marginBottom: 8 }}>📸</Text>
                <Text style={{ fontSize: 14, color: colors.lightGray }}>Фото не выбрано</Text>
              </>
            )}
          </View>
          <TouchableOpacity
            style={[
              buttons.photoButton,
              afterPhoto && buttons.photoButtonActive
            ]}
            onPress={() => takePhoto('after')}
            disabled={isSending}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: afterPhoto ? colors.primary : colors.black }}>
              {afterPhoto ? '🔄 Переснять' : '📷 Сделать фото'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[
          buttons.primary,
          buttons.fullWidth,
          buttons.large,
          (!beforePhoto || !afterPhoto || isSending) && buttons.disabled,
          { marginBottom: 24 }
        ]}
        onPress={handleSendPhotos}
        disabled={!beforePhoto || !afterPhoto || isSending}
      >
        {isSending ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={buttons.primaryText}>📤 Отправить фото на проверку нейросети</Text>
        )}
      </TouchableOpacity>

      <View style={{
        backgroundColor: colors.secondaryLight,
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
      }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.info, marginBottom: 12 }}>
          ℹ️ Как это работает:
        </Text>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, color: colors.info, lineHeight: 20 }}>1. Сделайте фото до начала уборки</Text>
          <Text style={{ fontSize: 14, color: colors.info, lineHeight: 20 }}>2. Проведите уборку</Text>
          <Text style={{ fontSize: 14, color: colors.info, lineHeight: 20 }}>3. Сделайте фото после уборки</Text>
          <Text style={{ fontSize: 14, color: colors.info, lineHeight: 20 }}>4. Отправьте оба фото</Text>
          <Text style={{ fontSize: 14, color: colors.info, lineHeight: 20 }}>5. Нейросеть YOLO проанализирует результаты</Text>
          <Text style={{ fontSize: 14, color: colors.info, lineHeight: 20 }}>6. Получите баллы в рейтинг</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PhotoSendingPage;