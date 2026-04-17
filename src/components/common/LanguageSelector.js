// src/components/common/LanguageSelector.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../styles/colors';

export const LanguageSelector = ({ style }) => {
  const { i18n, t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('user_language');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.log('Error loading language:', error);
    }
  };

  const changeLanguage = async (lang) => {
    try {
      await i18n.changeLanguage(lang);
      await AsyncStorage.setItem('user_language', lang);
      setCurrentLanguage(lang);
      setModalVisible(false);
    } catch (error) {
      console.log('Error changing language:', error);
    }
  };

  const getLanguageName = (code) => {
    switch(code) {
      case 'es': return 'Español';
      case 'en': return 'English';
      default: return 'Español';
    }
  };

  const getLanguageFlag = (code) => {
    switch(code) {
      case 'es': return '🇪🇸';
      case 'en': return '🇺🇸';
      default: return '🌐';
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.selectorButton, style]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flagIcon}>{getLanguageFlag(currentLanguage)}</Text>
        <Text style={styles.languageText}>{getLanguageName(currentLanguage)}</Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccionar Idioma / Select Language</Text>
              
              <TouchableOpacity
                style={[
                  styles.languageOption,
                  currentLanguage === 'es' && styles.selectedOption
                ]}
                onPress={() => changeLanguage('es')}
              >
                <Text style={styles.languageFlag}>🇪🇸</Text>
                <Text style={styles.languageName}>Español</Text>
                {currentLanguage === 'es' && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.languageOption,
                  currentLanguage === 'en' && styles.selectedOption
                ]}
                onPress={() => changeLanguage('en')}
              >
                <Text style={styles.languageFlag}>🇺🇸</Text>
                <Text style={styles.languageName}>English</Text>
                {currentLanguage === 'en' && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  flagIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  languageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
  },
  dropdownIcon: {
    color: 'white',
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxWidth: 300,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  checkMark: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
});