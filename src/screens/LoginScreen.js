// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Checkbox from "expo-checkbox";
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/useAuth';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { CustomButton } from '../components/common/CustomButton';
import { LanguageSelector } from '../components/common/LanguageSelector';

const icon = require('../../assets/lumex.jpeg');

export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [acepta, setAcepta] = useState(false);
  const { loading, login } = useAuth(navigation);

  const handleLogin = () => {
    login(usuario, password, acepta);
  };

  return (
    <View style={globalStyles.loginContainer}>
      {/* Selector de idioma en la esquina superior derecha */}
      <View style={styles.languageSelectorContainer}>
        <LanguageSelector />
      </View>
      
      <Image source={icon} style={styles.logo} />
      <Text style={styles.subtitle}>{t('login.title')}</Text>

      <View style={globalStyles.card}>
        <TextInput
          placeholder={t('login.username')}
          placeholderTextColor="#aaa"
          style={globalStyles.input}
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />

        <View style={styles.passwordRow}>
          <TextInput
            placeholder={t('login.password')}
            placeholderTextColor="#aaa"
            secureTextEntry={!visible}
            style={styles.inputPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Text style={styles.eyeIcon}>
              {visible ? "👁" : "👁‍🗨"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgot}>{t('login.forgotPassword')}</Text>
        </TouchableOpacity>

        <View style={styles.checkboxRow}>
          <Checkbox 
            value={acepta} 
            onValueChange={setAcepta} 
            color={acepta ? colors.primary : undefined} 
          />
          <Text style={styles.checkboxText}>{t('login.acceptTerms')}</Text>
        </View>

        <CustomButton 
          title={loading ? t('common.loading') : t('login.loginButton')}
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />

        <Text style={styles.divider}>──────── o ────────</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.register}>{t('login.noAccount')}</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
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
  logo: {
    width: 350,
    height: 150,
    marginBottom: 10,
    marginTop: 40,
  },
  subtitle: {
    color: "#fff",
    marginBottom: 20,
    fontSize: 16
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10
  },
  inputPassword: {
    flex: 1,
    color: "white",
    paddingVertical: 15,
    fontSize: 16
  },
  eyeIcon: {
    color: "#aaa",
    fontSize: 20
  },
  forgot: {
    color: colors.primary,
    textAlign: "right",
    marginBottom: 15,
    fontSize: 14
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  checkboxText: {
    color: "#ccc",
    marginLeft: 10,
    fontSize: 14
  },
  divider: {
    color: "#aaa",
    textAlign: "center",
    marginVertical: 15,
    fontSize: 14
  },
  register: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
});