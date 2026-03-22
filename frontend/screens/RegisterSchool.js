import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import styles from './styles';

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' или 'register'
  const [selectedRole, setSelectedRole] = useState('director'); // 'director', 'teacher', 'student'
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [className, setClassName] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните email и пароль');
      return;
    }

    // TODO: Здесь будет переход на главный экран в зависимости от роли
    // Пример: if (selectedRole === 'director') navigation.navigate('DirectorHome')
    Alert.alert('Успех', 'Вход выполнен');
  };

  const handleRegister = () => {
    if (selectedRole === 'director') {
      if (!fullName || !position || !schoolName || !email || !phone || !password) {
        Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
        return;
      }
      setShowNotification(true);
      // TODO: Отправить запрос на подтверждение, затем переход
      // navigation.navigate('SchoolConfirmScreen')
    } 
    else if (selectedRole === 'teacher') {
      if (!fullName || !email || !phone || !password || !className) {
        Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
        return;
      }
      // TODO: Регистрация учителя, затем переход
      // navigation.navigate('TeacherHome')
      Alert.alert('Успех', 'Регистрация учителя выполнена');
    } 
    else if (selectedRole === 'student') {
      if (!fullName || !className || !email || !password) {
        Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
        return;
      }
      // TODO: Регистрация ученика, затем переход
      // navigation.navigate('StudentHome')
      Alert.alert('Успех', 'Регистрация ученика выполнена');
    }
  };

  const renderRoleSelector = () => (
    <View style={styles.roleContainer}>
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
          Директор / Зам.
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

  const renderLoginForm = () => (
    <View>
      {renderRoleSelector()}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
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
        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Введите пароль"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRegisterForm = () => (
    <View>
      {renderRoleSelector()}

      {selectedRole === 'director' && (
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ФИО</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Введите ФИО"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Должность</Text>
            <TextInput
              style={styles.input}
              value={position}
              onChangeText={setPosition}
              placeholder="Директор / Заместитель"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Название школы</Text>
            <TextInput
              style={styles.input}
              value={schoolName}
              onChangeText={setSchoolName}
              placeholder="Введите название школы"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
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
            <Text style={styles.label}>Телефон</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+7 (XXX) XXX-XX-XX"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Пароль</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Введите пароль"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Отправить запрос на подтверждение</Text>
          </TouchableOpacity>

          {showNotification && (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                Ваш запрос отправлен. Мы свяжемся с вами для подтверждения в течение 24 часов.
              </Text>
            </View>
          )}
        </View>
      )}

      {selectedRole === 'teacher' && (
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ФИО</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Введите ФИО"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
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
            <Text style={styles.label}>Телефон</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+7 (XXX) XXX-XX-XX"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Класс</Text>
            <TextInput
              style={styles.input}
              value={className}
              onChangeText={setClassName}
              placeholder="Например: 11А"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Пароль</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Введите пароль"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedRole === 'student' && (
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ФИО</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Введите ФИО"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Класс</Text>
            <TextInput
              style={styles.input}
              value={className}
              onChangeText={setClassName}
              placeholder="Например: 11А"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
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
            <Text style={styles.label}>Пароль</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Введите пароль"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'login' && styles.tabActive]}
            onPress={() => setActiveTab('login')}
          >
            <Text style={[styles.tabText, activeTab === 'login' && styles.tabTextActive]}>
              Вход
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'register' && styles.tabActive]}
            onPress={() => setActiveTab('register')}
          >
            <Text style={[styles.tabText, activeTab === 'register' && styles.tabTextActive]}>
              Регистрация
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'login' ? renderLoginForm() : renderRegisterForm()}
      </View>
    </ScrollView>
  );
};

export default AuthScreen;