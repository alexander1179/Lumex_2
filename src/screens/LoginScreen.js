// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Checkbox from "expo-checkbox";
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/useAuth';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
        
        {/* === FONDOS DECORATIVOS === */}
        <View style={styles.bgCircleLarge} />
        <View style={styles.bgCircleSmall} />

        {/* Selector de idioma / Configuración (esquina superior derecha) */}
        <View style={styles.settingsIconWrapper}>
            <LanguageSelector />
        </View>

        {/* === LOGO CENTRAL === */}
        <View style={styles.logoContainer}>
          <View style={styles.logoRingOuter}>
            <View style={styles.logoRingMiddle}>
              <View style={styles.logoCircleInner}>
                <View style={styles.logoTextWrapper}>
                  {/* Rombo y texto */}
                  <Feather name="code" size={20} color="#fff" style={styles.logoIcon} />
                  <Text style={styles.logoText}>LumeX</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* === TÍTULOS === */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleMain}>Acceso de usuario</Text>
          <Text style={styles.subtitleMain}>
            Ingresa con tus credenciales para continuar en un entorno seguro de salud.
          </Text>
        </View>

        {/* === TARJETA DE FORMULARIO === */}
        <View style={styles.card}>
          <TextInput
            placeholder="Usuario"
            placeholderTextColor="#8a9ba8"
            style={styles.inputContainer}
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <View style={styles.passwordRow}>
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#8a9ba8"
              secureTextEntry={!visible}
              style={styles.inputPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Feather name={visible ? "eye" : "eye-off"} size={20} color="#146a71" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgotPass}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <View style={styles.termsRow}>
            <Checkbox 
              value={acepta} 
              onValueChange={setAcepta} 
              color={acepta ? "#146a71" : undefined} 
              style={styles.checkbox}
            />
            <Text style={styles.termsText}>
              Acepto los{' '}
              <Text style={styles.linkText} onPress={() => navigation.navigate("Privacy")}>
                términos y condiciones
              </Text>
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.btnPrimary, loading && styles.btnDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.btnPrimaryText}>{loading ? "Cargando..." : "Iniciar Sesión"}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnSecondary} 
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.btnSecondaryText}>Prueba de registro</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* === MENÚ INFERIOR (Tab Bar Simulado) === */}
      <View style={styles.bottomNavContainer}>
        {/* Usuario (Activo) */}
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <FontAwesome5 name="user" size={18} color="#146a71" />
          <Text style={[styles.navText, styles.navTextActive]}>Usuario</Text>
        </TouchableOpacity>
        
        {/* Administrador */}
        <TouchableOpacity style={styles.navItem} onPress={() => console.log('Admin pressed')}>
          <FontAwesome5 name="shield-alt" size={18} color="#8a9ba8" />
          <Text style={styles.navText}>Administrador</Text>
        </TouchableOpacity>

        {/* Plataforma */}
        <TouchableOpacity style={styles.navItem} onPress={() => console.log('Plataforma pressed')}>
          <FontAwesome5 name="th" size={18} color="#8a9ba8" />
          <Text style={styles.navText}>Plataforma</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e6f7f6',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 80,
    position: 'relative',
  },
  bgCircleLarge: {
    position: 'absolute',
    top: -100,
    left: -150,
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: '#d0f0ee', 
    opacity: 0.6,
  },
  bgCircleSmall: {
    position: 'absolute',
    top: 150,
    left: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#d0f0ee', 
    opacity: 0.8,
  },
  settingsIconWrapper: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 25,
    padding: 5
  },
  logoContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  logoRingOuter: {
    backgroundColor: 'rgba(21,110,121, 0.05)',
    padding: 25,
    borderRadius: 150,
  },
  logoRingMiddle: {
    backgroundColor: 'rgba(21,110,121, 0.1)',
    padding: 25,
    borderRadius: 120,
  },
  logoCircleInner: {
    backgroundColor: '#9e002a',
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  logoTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 5,
    transform: [{ rotate: '45deg' }]
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 1,
  },
  titleContainer: {
    marginTop: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  titleMain: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a3c40',
    marginBottom: 8,
  },
  subtitleMain: {
    fontSize: 14,
    color: '#5b7076',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '85%',
    borderRadius: 20,
    padding: 25,
    elevation: 4,
    shadowColor: '#146a71',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#f8fbfb',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 15,
    color: '#333',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fbfb',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 15,
    color: '#333',
  },
  forgotPass: {
    color: '#146a71',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 20,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkbox: {
    marginRight: 10,
    borderRadius: 4,
    width: 20,
    height: 20,
  },
  termsText: {
    fontSize: 13,
    color: '#5b7076',
  },
  linkText: {
    color: '#146a71',
    fontWeight: '600',
  },
  btnPrimary: {
    backgroundColor: '#146a71',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnSecondary: {
    backgroundColor: '#e6eff0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c6e0e2',
  },
  btnSecondaryText: {
    color: '#146a71',
    fontSize: 15,
    fontWeight: 'bold',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  navItemActive: {
    backgroundColor: '#e6eff0',
    borderRadius: 15,
  },
  navText: {
    fontSize: 11,
    color: '#8a9ba8',
    marginTop: 4,
    fontWeight: '500'
  },
  navTextActive: {
    color: '#146a71',
    fontWeight: 'bold'
  }
});