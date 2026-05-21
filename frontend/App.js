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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserAccount"
          component={UserAccountScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudentAccount"
          component={StudentAccountScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TeacherAccount"
          component={TeacherAccountScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SchoolAccount"
          component={SchoolAccountScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CleanSending"
          component={CleanSendingScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="GenerateInvite" 
          component={GenerateInviteScreen}
          options={{headerShown: false}} 
        />
        <Stack.Screen name="ManageUsers" component={ManageUsersScreen} options={{headerShown: false}}/>
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="RatingScreen" component={RatingScreen} options={{headerShown: false}} />
        <Stack.Screen name="EventsList" component={EventsListScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ReviewRequest" component={ReviewRequestScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SchoolsRating" component={SchoolsRatingScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
