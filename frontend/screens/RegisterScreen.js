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
import styles from './styles';
import axios from 'axios';
import { Image } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState('user');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [teacherClass, setTeacherClass] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    if (selectedRole === 'director' && (!schoolName || !schoolAddress)) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните название и адрес школы');
      return;
    }

    if ((selectedRole === 'teacher' || selectedRole === 'student') && !inviteCode) {
      Alert.alert('Ошибка', 'Пожалуйста, введите пригласительный код');
      return;
    }

    setIsLoading(true);

    try {
      let response;
      if (selectedRole === 'director') {
        response = await axios.post('http://10.0.2.2:5000/api/auth/register-director', {
          name: fullName,
          email,
          password,
          schoolName,
          schoolAddress
        });
      } else if (selectedRole === 'user') {
        response = await axios.post('http://10.0.2.2:5000/api/auth/register', {
          name: fullName,
          email,
          password
        });
      } else {
        const payload = {
          code: inviteCode,
          name: fullName,
          email,
          password
        };

        if (selectedRole === 'teacher') {
          payload.class_name = teacherClass;
        }

        response = await axios.post('http://10.0.2.2:5000/api/auth/register-invite', payload);
      }

      Alert.alert(
        'Успех',
        response.data.message || 'Регистрация успешна!'
      );

      navigation.navigate('Login');
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);

      const errorMessage = error.response?.data?.error ||
                          error.response?.data?.message ||
                          error.message ||
                          'Произошла ошибка при регистрации';
      Alert.alert('Ошибка', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoleSelector = () => (
    <View style={styles.registerRoleContainer}>
      

      <TouchableOpacity
        style={[
          styles.registerRoleButton,
          selectedRole === 'director' && styles.registerRoleButtonActive,
        ]}
        onPress={() => setSelectedRole('director')}
      >
        <Text
          style={[
            styles.registerRoleText,
            selectedRole === 'director' && styles.registerRoleTextActive,
          ]}
        >
          Директор
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.registerRoleButton,
          selectedRole === 'teacher' && styles.registerRoleButtonActive,
        ]}
        onPress={() => setSelectedRole('teacher')}
      >
        <Text
          style={[
            styles.registerRoleText,
            selectedRole === 'teacher' && styles.registerRoleTextActive,
          ]}
        >
          Учитель
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.registerRoleButton,
          selectedRole === 'student' && styles.registerRoleButtonActive,
        ]}
        onPress={() => setSelectedRole('student')}
      >
        <Text
          style={[
            styles.registerRoleText,
            selectedRole === 'student' && styles.registerRoleTextActive,
          ]}
        >
          Ученик
        </Text>
        
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.registerRoleButton,
          selectedRole === 'user' && styles.registerRoleButtonActive,
        ]}
        onPress={() => setSelectedRole('user')}
      >
        <Text
          style={[
            styles.registerRoleText,
            selectedRole === 'user' && styles.registerRoleTextActive,
          ]}
        >
          Пользователь
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={styles.registerScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loginBackgroundImageContainer2}>
          <Image 
            source={require('../assets/images/fon5.png')} 
            style={styles.loginBackgroundImage2}
            resizeMode="cover"
          />
        </View>
        <View style={styles.registerContainer}>
          
          <View style={styles.registerHeader}>
            <Text style={styles.registerTitle}>Создайте аккаунт</Text>
            <Text style={styles.registerSubtitle}>Зарегистрируйтесь, чтобы начать</Text>
          </View>

          <View style={styles.registerForm}>
            {renderRoleSelector()}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>ФИО</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Введите ФИО"
                placeholderTextColor="#aaa"
              />
            </View>

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

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Подтверждение пароля</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Повторите пароль"
                placeholderTextColor="#aaa"
                secureTextEntry
              />
            </View>

            {selectedRole === 'director' && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Название школы</Text>
                  <TextInput
                    style={styles.input}
                    value={schoolName}
                    onChangeText={setSchoolName}
                    placeholder="Введите название школы"
                    placeholderTextColor="#aaa"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Адрес школы</Text>
                  <TextInput
                    style={styles.input}
                    value={schoolAddress}
                    onChangeText={setSchoolAddress}
                    placeholder="Введите адрес школы"
                    placeholderTextColor="#aaa"
                  />
                </View>

                <View style={styles.registerInfoBox}>
                  <Text style={styles.registerInfoText}>
                    После регистрации ваш аккаунт будет ожидать подтверждения. Мы свяжемся с вами в течение 24 часов.
                  </Text>
                </View>
              </>
            )}

            {(selectedRole === 'teacher' || selectedRole === 'student') && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Пригласительный код</Text>
                  <TextInput
                    style={styles.input}
                    value={inviteCode}
                    onChangeText={setInviteCode}
                    placeholder="Введите пригласительный код"
                    placeholderTextColor="#aaa"
                  />
                </View>

                {selectedRole === 'teacher' && (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ваш класс</Text>
                    <TextInput
                      style={styles.input}
                      value={teacherClass}
                      onChangeText={setTeacherClass}
                      placeholder="Например: 7А, 8Б, 10В"
                      placeholderTextColor="#aaa"
                    />
                    <Text style={styles.registerHelperText}>
                      Введите название класса, который вы курируете
                    </Text>
                  </View>
                )}
              </>
            )}

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>
                  {selectedRole === 'director' ? 'Отправить запрос на подтверждение' : 'Зарегистрироваться'}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.registerLoginLink}>
              <Text style={styles.registerLoginText}>Уже есть аккаунт?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerLoginButton}> Войти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;