// src/screens/ForgotPasswordScreen.js
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
import { LanguageSelector } from '../components/common/LanguageSelector';

export default function ForgotPasswordScreen({ navigation }) {
  const { t } = useTranslation();
  const [metodo, setMetodo] = useState('email');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);

  const solicitarRecuperacion = async () => {
    if (loading) return;

    if (metodo === 'email') {
      if (!email.trim()) {
        Alert.alert(t('common.error'), t('errors.requiredFields'));
        return;
      }
      if (!validators.validateEmail(email)) {
        Alert.alert(t('common.error'), t('errors.invalidEmail'));
        return;
      }
    } else if (metodo === 'sms') {
      if (!telefono.trim()) {
        Alert.alert(t('common.error'), t('errors.requiredFields'));
        return;
      }
      if (!validators.validatePhone(telefono)) {
        Alert.alert(t('common.error'), t('errors.invalidPhone'));
        return;
      }
    }

    setLoading(true);

    try {
      const data = await authService.forgotPassword({
        email: metodo === 'email' ? email : null,
        telefono: metodo === 'sms' ? telefono : null,
        metodo
      });

      if (data.success) {
        Alert.alert(
          "✅ " + t('forgotPassword.codeSent'), 
          `${t('forgotPassword.codeSentMessage')} ${metodo === 'email' ? t('forgotPassword.email').toLowerCase() : t('forgotPassword.sms').toLowerCase()}`,
          [
            { 
              text: "OK", 
              onPress: () => navigation.navigate("VerifyToken", {
                userId: data.userId,
                metodo: data.metodo
              })
            }
          ]
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
        {t('forgotPassword.title')}
      </Text>

      <View style={globalStyles.card}>
        <Text style={styles.description}>
          {t('forgotPassword.description')}
        </Text>

        {/* Selector de método */}
        <View style={styles.methodSelector}>
          <TouchableOpacity
            style={[
              styles.methodButton,
              metodo === 'email' && styles.methodButtonActive
            ]}
            onPress={() => setMetodo('email')}
          >
            <Text style={[
              styles.methodButtonText,
              metodo === 'email' && styles.methodButtonTextActive
            ]}>📧 {t('forgotPassword.email')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodButton,
              metodo === 'sms' && styles.methodButtonActive
            ]}
            onPress={() => setMetodo('sms')}
          >
            <Text style={[
              styles.methodButtonText,
              metodo === 'sms' && styles.methodButtonTextActive
            ]}>📱 {t('forgotPassword.sms')}</Text>
          </TouchableOpacity>
        </View>

        {metodo === 'email' ? (
          <TextInput
            placeholder={t('forgotPassword.emailPlaceholder')}
            placeholderTextColor="#aaa"
            style={globalStyles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        ) : (
          <View>
            <TextInput
              placeholder={t('forgotPassword.phonePlaceholder')}
              placeholderTextColor="#aaa"
              style={globalStyles.input}
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
            <Text style={styles.phoneHint}>
              {t('register.phoneHint')}
            </Text>
          </View>
        )}

        <CustomButton
          title={loading ? t('common.loading') : t('forgotPassword.sendCode')}
          onPress={solicitarRecuperacion}
          loading={loading}
          disabled={loading}
        />

        <TouchableOpacity 
          style={styles.backToLogin}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.backToLoginText}>
            {t('forgotPassword.backToLogin')}
          </Text>
        </TouchableOpacity>
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
  methodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  methodButton: {
    flex: 1,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: 5,
  },
  methodButtonActive: {
    backgroundColor: colors.primary,
  },
  methodButtonText: {
    color: colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  methodButtonTextActive: {
    color: 'white',
  },
  phoneHint: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  backToLogin: {
    marginTop: 15,
  },
  backToLoginText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
});