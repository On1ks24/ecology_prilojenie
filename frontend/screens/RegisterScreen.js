import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import axios from 'axios';

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
    <View style={styles.roleContainer}>
      <TouchableOpacity
        style={[
          styles.roleButton,
          selectedRole === 'user' && styles.roleButtonActive,
        ]}
        onPress={() => setSelectedRole('user')}
      >
        <Text
          style={[
            styles.roleButtonText,
            selectedRole === 'user' && styles.roleButtonTextActive,
          ]}
        >
          Пользователь
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.roleButton,
          selectedRole === 'director' && styles.roleButtonActive,
        ]}
        onPress={() => setSelectedRole('director')}
      >
        <Text
          style={[
            styles.roleButtonText,
            selectedRole === 'director' && styles.roleButtonTextActive,
          ]}
        >
          Директор
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.roleButton,
          selectedRole === 'teacher' && styles.roleButtonActive,
        ]}
        onPress={() => setSelectedRole('teacher')}
      >
        <Text
          style={[
            styles.roleButtonText,
            selectedRole === 'teacher' && styles.roleButtonTextActive,
          ]}
        >
          Учитель
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.roleButton,
          selectedRole === 'student' && styles.roleButtonActive,
        ]}
        onPress={() => setSelectedRole('student')}
      >
        <Text
          style={[
            styles.roleButtonText,
            selectedRole === 'student' && styles.roleButtonTextActive,
          ]}
        >
          Ученик
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Регистрация</Text>
        <Text style={styles.subGreeting}>Создайте новый аккаунт</Text>

        {renderRoleSelector()}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ФИО *</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Введите ФИО"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="example@school.ru"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Пароль *</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Введите пароль"
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Подтверждение пароля *</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Повторите пароль"
            secureTextEntry
          />
        </View>

        {selectedRole === 'director' && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Название школы *</Text>
              <TextInput
                style={styles.input}
                value={schoolName}
                onChangeText={setSchoolName}
                placeholder="Введите название школы"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Адрес школы *</Text>
              <TextInput
                style={styles.input}
                value={schoolAddress}
                onChangeText={setSchoolAddress}
                placeholder="Введите адрес школы"
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                После регистрации ваш аккаунт будет ожидать подтверждения.
                Мы свяжемся с вами в течение 24 часов для проверки данных школы.
              </Text>
            </View>
          </>
        )}

        {(selectedRole === 'teacher' || selectedRole === 'student') && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Пригласительный код *</Text>
              <TextInput
                style={styles.input}
                value={inviteCode}
                onChangeText={setInviteCode}
                placeholder="Введите пригласительный код"
              />
            </View>

            {selectedRole === 'teacher' && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Ваш класс *</Text>
                <TextInput
                  style={styles.input}
                  value={teacherClass}
                  onChangeText={setTeacherClass}
                  placeholder="Например: 7А, 8Б, 10В"
                />
                <Text style={[styles.infoText, { marginTop: 4, fontSize: 12 }]}>
                  Введите название класса, который вы курируете
                </Text>
              </View>
            )}
          </>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {selectedRole === 'director' ? 'Отправить запрос на подтверждение' : 'Зарегистрироваться'}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginLinkContainer}>
          <Text style={styles.registerLinkText}>Уже есть аккаунт? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerLinkButton}>Войти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;