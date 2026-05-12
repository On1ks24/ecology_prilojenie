import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import UserAccountScreen from './screens/UserAccountScreen';
import StudentAccountScreen from './screens/StudentAccountScreen';
import TeacherAccountScreen from './screens/TeacherAccountScreen';
import SchoolAccountScreen from './screens/SchoolAccountScreen';
import CleanSendingScreen from './screens/CleanSendingScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import ProfileScreen from './screens/ProfileScreen';
import GenerateInviteScreen from './screens/GenerateInviteScreen';
import ManageUsersScreen from './screens/ManageUsersScreen';
import RatingScreen from './screens/RatingScreen';
import EventsListScreen from './screens/EventsListScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import ReviewRequestScreen from './screens/ReviewRequestScreen';
import SchoolsRatingScreen from './screens/SchoolsRatingScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Регистрация' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Вход' }}
        />
        <Stack.Screen
          name="UserAccount"
          component={UserAccountScreen}
          options={{ title: 'Личный кабинет' }}
        />
        <Stack.Screen
          name="StudentAccount"
          component={StudentAccountScreen}
          options={{ title: 'Ученик' }}
        />
        <Stack.Screen
          name="TeacherAccount"
          component={TeacherAccountScreen}
          options={{ title: 'Учитель' }}
        />
        <Stack.Screen
          name="SchoolAccount"
          component={SchoolAccountScreen}
          options={{ title: 'Директор' }}
        />
        <Stack.Screen
          name="CleanSending"
          component={CleanSendingScreen}
          options={{ title: 'Отправка фотографий' }}
        />

        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={{ title: 'Создание мероприятия' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Профиль' }}
        />
        <Stack.Screen 
          name="GenerateInvite" 
          component={GenerateInviteScreen}
          options={{ title: 'Пригласительный код' }} 
        />
        <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="RatingScreen" component={RatingScreen} />
        <Stack.Screen name="EventsList" component={EventsListScreen} />
        <Stack.Screen name="ReviewRequest" component={ReviewRequestScreen} />
        <Stack.Screen name="SchoolsRating" component={SchoolsRatingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
