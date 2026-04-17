// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n'; // Importar configuración de i18n
import { loadSavedLanguage } from './src/i18n';

export default function App() {
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}