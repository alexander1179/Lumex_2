// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  StyleSheet
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/api/authService';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { validators } from '../utils/validators';
import { MESSAGES } from '../utils/constants';
import { CustomButton } from '../components/common/CustomButton';
import { PasswordRequirements } from '../components/auth/PasswordRequirements';
import { LanguageSelector } from '../components/common/LanguageSelector';

export default function RegisterScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordReqs, setPasswordReqs] = useState({
    length: false, uppercase: false, lowercase: false, number: false
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

  const registrar = async () => {
    if (loading) return;
    
    if (!nombre || !email || !usuario || !password) {
      Alert.alert(t('common.error'), t('errors.requiredFields'));
      return;
    }
    
    if (!validators.validateEmail(email)) {
      Alert.alert(t('common.error'), t('errors.invalidEmail'));
      return;
    }
    
    if (telefono && telefono.trim() !== '') {
      if (!validators.validatePhone(telefono)) {
        Alert.alert(t('common.error'), t('errors.invalidPhone'));
        return;
      }
    }
    
    const passwordValidation = validators.validatePassword(password);
    if (!passwordValidation.isValid) {
      Alert.alert(t('common.error'), t('errors.passwordRequirements'));
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert(t('common.error'), t('errors.passwordMismatch'));
      return;
    }

    setLoading(true);
    
    const datosEnvio = { 
      nombre: nombre.trim(), 
      email: email.trim().toLowerCase(), 
      telefono: telefono && telefono.trim() !== '' ? telefono.trim() : null, 
      usuario: usuario.trim().toLowerCase(), 
      password: password 
    };

    try {
      const data = await authService.register(datosEnvio);
      
      if (data.success) {
        Alert.alert(
          "✅ " + t('common.success'), 
          t('register.registerSuccess'),
          [{ text: "OK", onPress: () => navigation.replace("Login") }]
        );
      } else {
        Alert.alert(t('common.error'), data.message || "Error al registrar");
      }
    } catch (error) {
      Alert.alert(t('common.error'), t('errors.connection'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <LanguageSelector />
      </View>
      
      <Text style={[globalStyles.title, styles.title]}>
        {t('register.title')}
      </Text>

      <View style={globalStyles.card}>
        <TextInput 
          placeholder={t('register.fullName')} 
          placeholderTextColor="#aaa" 
          style={globalStyles.input} 
          value={nombre} 
          onChangeText={setNombre} 
        />
        
        <TextInput 
          placeholder={t('register.email')} 
          placeholderTextColor="#aaa" 
          style={globalStyles.input} 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
          autoCapitalize="none" 
        />
        
        <TextInput 
          placeholder={t('register.phone')} 
          placeholderTextColor="#aaa" 
          style={globalStyles.input} 
          value={telefono} 
          onChangeText={setTelefono} 
          keyboardType="phone-pad"
        />
        <Text style={styles.phoneHint}>
          {t('register.phoneHint')}
        </Text>
        
        <TextInput 
          placeholder={t('register.username')} 
          placeholderTextColor="#aaa" 
          style={globalStyles.input} 
          value={usuario} 
          onChangeText={setUsuario} 
          autoCapitalize="none" 
        />
        
        <TextInput
          placeholder={t('register.password')}
          placeholderTextColor="#aaa"
          secureTextEntry
          style={globalStyles.input}
          value={password}
          onChangeText={(text) => { 
            setPassword(text); 
            validatePassword(text); 
          }}
        />

        <PasswordRequirements requirements={passwordReqs} />

        <TextInput
          placeholder={t('register.confirmPassword')}
          placeholderTextColor="#aaa"
          secureTextEntry
          style={globalStyles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <CustomButton 
          title={loading ? t('common.loading') : t('register.registerButton')}
          onPress={registrar}
          loading={loading}
          disabled={loading}
        />

        <TouchableOpacity 
          style={styles.loginLink} 
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.loginText}>{t('register.haveAccount')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 30,
    width: "100%",
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingTop: 50,
  },
  title: {
    color: "white",
    marginVertical: 20,
  },
  phoneHint: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  loginLink: {
    marginVertical: 15,
  },
  loginText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
});