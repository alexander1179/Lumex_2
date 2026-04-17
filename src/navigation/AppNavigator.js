// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrivacyScreen from '../screens/PrivacyScreen';
import GraciasScreen from '../screens/GraciasScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainScreen from '../screens/MainScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyTokenScreen from '../screens/VerifyTokenScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Privacy">
      <Stack.Screen 
        name="Privacy" 
        component={PrivacyScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Gracias" 
        component={GraciasScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="VerifyToken" 
        component={VerifyTokenScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ResetPassword" 
        component={ResetPasswordScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}