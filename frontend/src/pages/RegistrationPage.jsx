import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { layout } from '../styles/layout';
import { buttons } from '../styles/buttons';
import { forms } from '../styles/forms';
import { cards } from '../styles/cards';

const RegistrationPage = ({ onLogin }) => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    
    if (!email.includes('@')) {
      Alert.alert('Ошибка', 'Введите корректный email');
      return;
    }

    onLogin({ 
      role: isTeacher ? 'teacher' : 'student', 
      name: name.trim() 
    });
  };

  return (
    <KeyboardAvoidingView 
      style={[layout.container, { 
        backgroundColor: `linear-gradient(135deg, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)` 
      }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[layout.content, { justifyContent: 'center' }]}>
          <View style={{ marginBottom: 30 }}>
            <Text style={[typography.h1, { color: colors.white, textAlign: 'center', marginBottom: 8 }]}>
              ЭКОЛОГИЯ
            </Text>
            <Text style={[typography.body1, { color: colors.white, textAlign: 'center', opacity: 0.9 }]}>
              Приложение для субботников
            </Text>
          </View>
          
          <View style={[cards.card, { backgroundColor: colors.white }]}>
            <Text style={[typography.h4, { textAlign: 'center', marginBottom: 24 }]}>
              Вход в приложение
            </Text>
            
            <View>
              <View style={forms.inputGroup}>
                <Text style={forms.label}>Имя:</Text>
                <TextInput
                  style={forms.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Введите ваше имя"
                  placeholderTextColor={colors.lightGray}
                />
              </View>
              
              <View style={forms.inputGroup}>
                <Text style={forms.label}>Email:</Text>
                <TextInput
                  style={forms.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Введите email"
                  placeholderTextColor={colors.lightGray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={forms.inputGroup}>
                <Text style={forms.label}>Выберите роль:</Text>
                <View style={forms.radioGroup}>
                  <TouchableOpacity 
                    style={forms.radioOption} 
                    onPress={() => setIsTeacher(false)}
                  >
                    <View style={[forms.radio, !isTeacher && forms.radioSelected]}>
                      {!isTeacher && <View style={forms.radioInner} />}
                    </View>
                    <Text style={forms.radioText}>👨‍🎓 Ученик</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={forms.radioOption} 
                    onPress={() => setIsTeacher(true)}
                  >
                    <View style={[forms.radio, isTeacher && forms.radioSelected]}>
                      {isTeacher && <View style={forms.radioInner} />}
                    </View>
                    <Text style={forms.radioText}>👨‍🏫 Учитель</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity 
                style={[
                  buttons.primary,
                  buttons.fullWidth,
                  (!name || !email) && buttons.disabled
                ]}
                onPress={handleSubmit}
                disabled={!name || !email}
              >
                <Text style={buttons.primaryText}>Войти в приложение</Text>
              </TouchableOpacity>
            </View>
            
            <View style={{ 
              backgroundColor: colors.secondaryLight,
              padding: 16,
              borderRadius: 12,
              marginTop: 20,
            }}>
              <Text style={{ color: colors.info, fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>
                📱 Демо-режим: вход без пароля
              </Text>
              <Text style={{ color: colors.info, fontSize: 13, lineHeight: 20, opacity: 0.8 }}>
                После входа вы сможете:
                {'\n'}• Участвовать в субботниках
                {'\n'}• Делать фото до/после уборки
                {'\n'}• Получать результаты от нейросети
                {'\n'}• Соревноваться в рейтинге
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationPage;