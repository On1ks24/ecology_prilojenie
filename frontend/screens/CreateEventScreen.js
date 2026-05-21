import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_URL = 'http://10.0.2.2:5000/api';

const CreateEventScreen = ({ route, navigation }) => {
  const { schoolId, classId, userRole } = route.params || {};

  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (field, value) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!eventData.name.trim()) {
      Alert.alert('Ошибка', 'Введите название мероприятия');
      return false;
    }
    if (!eventData.date.trim()) {
      Alert.alert('Ошибка', 'Введите дату проведения');
      return false;
    }
    if (!eventData.location.trim()) {
      Alert.alert('Ошибка', 'Введите место проведения');
      return false;
    }
    return true;
  };

  const getToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };

  const handleCreateEvent = async () => {
    if (!validateForm()) return;

    try {
      setIsCreating(true);
      const token = await getToken();

      let parsedDate;
      if (eventData.date.includes('.')) {
        const [day, month, year] = eventData.date.split('.');
        parsedDate = `${year}-${month}-${day}`;
      } else {
        parsedDate = eventData.date;
      }

      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: eventData.name,
          date: parsedDate,
          location: eventData.location,
          is_school_event: userRole === 'user' ? false : true,
          school_id: userRole === 'user' ? null : schoolId,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create event');
      }

      const data = await response.json();

      Alert.alert(
        'Успешно!',
        `Мероприятие "${data.name}" создано!\n\nВсе ученики школы автоматически добавлены к участию.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );

    } catch (error) {
      Alert.alert('Ошибка', error.message || 'Не удалось создать мероприятие');
    } finally {
      setIsCreating(false);
    }
  };

  const isFormFilled = eventData.name && eventData.date && eventData.location;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent />
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        {/* Кнопка назад */}
        <TouchableOpacity 
          style={{
            position: 'absolute',
            top: 50,
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

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[styles.scrollContainer, { paddingTop: 80 }]}
        >
          <View style={styles.createEventContainer}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' }}>
              Создать субботник
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.requiredLabel}>
                Название мероприятия <Text style={styles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={eventData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholder="Например: Весенний субботник"
                maxLength={100}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.requiredLabel}>
                Дата проведения <Text style={styles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={eventData.date}
                onChangeText={(text) => handleInputChange('date', text)}
                placeholder="2026-03-25 или 25.03.2026"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.requiredLabel}>
                Место проведения <Text style={styles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={eventData.location}
                onChangeText={(text) => handleInputChange('location', text)}
                placeholder="Школьный парк, актовый зал..."
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.requiredLabel}>Описание</Text>
              <TextInput
                style={styles.inputMultiline}
                value={eventData.description}
                onChangeText={(text) => handleInputChange('description', text)}
                placeholder="Опишите суть мероприятия..."
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.generateButton,
                (!isFormFilled || isCreating) && styles.generateButtonDisabled
              ]}
              onPress={handleCreateEvent}
              disabled={!isFormFilled || isCreating}
            >
              {isCreating ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.generateButtonText}>Создать мероприятие</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.subtext}>
              * После создания все ученики школы автоматически станут участниками
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default CreateEventScreen;