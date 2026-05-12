import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthScreen from '../screens/AuthScreen';
import TeacherDashboardScreen from '../screens/TeacherDashboardScreen';
import StudentDashboardScreen from '../screens/StudentDashboardScreen';
import ConfirmResultsScreen from '../screens/ConfirmResultsScreen';
import SubbotnikParticipationScreen from '../screens/SubbotnikParticipationScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('AuthScreen'); // ← ВСЕГДА AuthScreen по умолчанию

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem('user');
      
      // Сохраняем в глобальную переменную или context, но НЕ меняем initialRoute
      // Пользователь должен явно войти через экран авторизации
      // Можно добавить логику "запомнить меня", но по умолчанию — всегда логин
      
      setIsLoading(false);
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Или Splash Screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="AuthScreen"  // ← ВСЕГДА начинаем с авторизации
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen 
          name="TeacherDashboardScreen" 
          component={TeacherDashboardScreen}
        />
        <Stack.Screen 
          name="StudentDashboardScreen" 
          component={StudentDashboardScreen}
        />
        <Stack.Screen 
          name="ConfirmResultsScreen" 
          component={ConfirmResultsScreen}
          options={{ headerShown: true, title: 'Проверка результатов' }}
        />
        <Stack.Screen 
          name="SubbotnikParticipationScreen" 
          component={SubbotnikParticipationScreen}
          options={{ headerShown: true, title: 'Участие в субботнике' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;