import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { StatusBar, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните email и пароль');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://10.0.2.2:5000/api/auth/login', {
        email,
        password
      });
      console.log('Успешный ответ:', JSON.stringify(response.data, null, 2));
      const { role, userId, name, schoolId, classId, isActive, message } = response.data;
      if (!isActive) {
        Alert.alert('Внимание', message || 'Ваш аккаунт не активирован');
        return;
      }
      const { accessToken, refreshToken } = response.data;
      if (accessToken) {
        await AsyncStorage.setItem('accessToken', accessToken);
        console.log('Токен сохранён:', accessToken.substring(0, 15) + '...');
      }
      if (refreshToken) {
        await AsyncStorage.setItem('refreshToken', refreshToken);
      }
      switch (role) {
        case 'user':
          navigation.navigate('UserAccount', { userId, name, role });
          break;
        case 'student':
          navigation.navigate('StudentAccount', { userId, name, role, schoolId, classId });
          break;
        case 'teacher':
          navigation.navigate('TeacherAccount', { userId, name, role, schoolId, classId });
          break;
        case 'director':
          navigation.navigate('SchoolAccount', { userId, name, role, schoolId });
          break;
        default:
          navigation.navigate('UserAccount', { userId, name, role });
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      console.error('Ответ сервера с ошибкой:', error.response?.data);
      console.error('Статус:', error.response?.status);

      const errorMessage = error.response?.data?.error ||
                          error.response?.data?.message ||
                          'Неверный email или пароль';
      Alert.alert('Ошибка', errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    Alert.alert('Восстановление', 'Функция восстановления пароля будет доступна в следующей версии');
  };

  return (
    
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.loginScrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.loginBackgroundImageContainer}>
              <Image 
                source={require('../assets/images/fon5.png')} 
                style={styles.loginBackgroundImage}
                resizeMode="cover"
              />
            </View>
        <View style={styles.loginContainer}>
          
          <View style={styles.loginHeader}>
            <View style={styles.loginLogoContainer}>
              <Image 
                source={require('../assets/images/logo2.png')} 
                style={styles.loginImage}
                resizeMode="contain"
              />
            </View>
            
            
            
            <Text style={styles.loginTitle}>Добро пожаловать!</Text>
            <Text style={styles.loginSubtitle}>Войдите в свой аккаунт</Text>
          </View>

          <View style={styles.loginForm}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="example@school.ru"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Пароль</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Введите пароль"
                placeholderTextColor="#aaa"
                secureTextEntry
              />
            </View>


            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Войти</Text>
              )}
            </TouchableOpacity>

            <View style={styles.registerLinkContainer}>
              <Text style={styles.registerLinkText}>Нет аккаунта?</Text>
              <TouchableOpacity onPress={handleRegisterPress}>
                <Text style={styles.registerLinkButton}> Зарегистрироваться</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;