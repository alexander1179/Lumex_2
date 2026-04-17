// src/screens/ResetPasswordScreen.js
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
import { validators } from '../utils/validators';
import { CustomButton } from '../components/common/CustomButton';
import { PasswordRequirements } from '../components/auth/PasswordRequirements';
import { LanguageSelector } from '../components/common/LanguageSelector';

export default function ResetPasswordScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { userId, token, metodo } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordReqs, setPasswordReqs] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

  const validatePassword = (pass) => {
    const validation = validators.validatePassword(pass);
    setPasswordReqs({
      length: validation.length,
      uppercase: validation.uppercase,
      lowercase: validation.lowercase,
      number: validation.number
    });
  };

  const resetPassword = async () => {
    if (loading) return;

    const passwordValidation = validators.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      Alert.alert(t('common.error'), t('errors.passwordRequirements'));
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(t('common.error'), t('errors.passwordMismatch'));
      return;
    }

    setLoading(true);

    try {
      const data = await authService.resetPassword(userId, token, newPassword);

      if (data.success) {
        Alert.alert(
          "✅ " + t('resetPassword.success'),
          t('resetPassword.successMessage'),
          [{ text: "OK", onPress: () => navigation.replace("Login") }]
        );
      } else {
        Alert.alert(t('common.error'), data.message);
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
        {t('resetPassword.title')}
      </Text>

      <View style={globalStyles.card}>
        <TextInput
          placeholder={t('resetPassword.newPassword')}
          placeholderTextColor="#aaa"
          secureTextEntry
          style={globalStyles.input}
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            validatePassword(text);
          }}
        />

        <PasswordRequirements requirements={passwordReqs} />

        <TextInput
          placeholder={t('resetPassword.confirmPassword')}
          placeholderTextColor="#aaa"
          secureTextEntry
          style={globalStyles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <CustomButton
          title={loading ? t('common.loading') : t('resetPassword.changeButton')}
          onPress={resetPassword}
          loading={loading}
          disabled={loading}
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
});