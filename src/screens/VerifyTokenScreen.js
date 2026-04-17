// src/screens/VerifyTokenScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/api/authService';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { useCountdown } from '../hooks/useCountdown';
import { CustomButton } from '../components/common/CustomButton';
import { LanguageSelector } from '../components/common/LanguageSelector';

export default function VerifyTokenScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { userId, metodo } = route.params;
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const { formatTime, timeLeft } = useCountdown(900);

  const verificarToken = async () => {
    if (loading) return;

    if (!token.trim() || token.length !== 6) {
      Alert.alert(t('common.error'), t('verifyToken.codePlaceholder'));
      return;
    }

    setLoading(true);

    try {
      const data = await authService.verifyToken(userId, token);

      if (data.success) {
        navigation.replace("ResetPassword", { userId, token, metodo });
      } else {
        Alert.alert(t('common.error'), data.message || t('errors.invalidToken'));
      }
    } catch (error) {
      Alert.alert(t('common.error'), t('errors.connection'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.loginContainer}>
      <View style={styles.languageSelectorContainer}>
        <LanguageSelector />
      </View>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← {t('common.back')}</Text>
      </TouchableOpacity>

      <Text style={[globalStyles.title, styles.title]}>
        {t('verifyToken.title')}
      </Text>

      <View style={globalStyles.card}>
        <Text style={styles.description}>
          {t('verifyToken.description')} {metodo === 'email' ? t('forgotPassword.email').toLowerCase() : t('forgotPassword.sms').toLowerCase()}
        </Text>

        <TextInput
          placeholder={t('verifyToken.codePlaceholder')}
          placeholderTextColor="#aaa"
          style={[globalStyles.input, styles.codeInput]}
          value={token}
          onChangeText={setToken}
          maxLength={6}
          keyboardType="number-pad"
        />

        <Text style={styles.timerText}>
          ⏰ {t('verifyToken.timeRemaining')}: {formatTime}
        </Text>

        {timeLeft === 0 && (
          <TouchableOpacity 
            style={styles.resendButton}
            onPress={() => {
              Alert.alert(t('verifyToken.expired'), t('verifyToken.resend'));
              navigation.goBack();
            }}
          >
            <Text style={styles.resendText}>{t('verifyToken.resend')}</Text>
          </TouchableOpacity>
        )}

        <CustomButton
          title={loading ? t('common.loading') : t('verifyToken.verify')}
          onPress={verificarToken}
          loading={loading}
          disabled={loading || timeLeft === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  languageSelectorContainer: {
    position: 'absolute',
    top: 50,
    right: 15,
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: "white",
    marginTop: 80,
    marginBottom: 20,
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  codeInput: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 8,
  },
  timerText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  resendButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  resendText: {
    color: colors.primary,
    fontSize: 14,
  },
});