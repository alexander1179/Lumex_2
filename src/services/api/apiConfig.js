// src/services/api/apiConfig.js
import { Platform } from 'react-native';

export const API_URL = Platform.OS === "web" 
  ? "http://localhost:3000" 
  : "http://10.157.26.210:3000";

export const endpoints = {
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  verifyToken: '/verify-token',
  resetPassword: '/reset-password',
};