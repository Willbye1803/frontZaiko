import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    console.log('Iniciando sesión:', { email, password });
  };

  return (
    <View style={styles.container}>
      
      <Image 
        source={require('../../assets/images/OIP.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Ingresa a tu cuenta</Text>

      
      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="tucorreo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      
      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Inicio Rápido</Text>
      </TouchableOpacity>

      
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿Aún no estás registrado?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Crea Cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#322F35',
  },
  logo: {
    width: 150,
    height: 80,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  registerText: {
    color: '#FFFFFF',
  },
  registerLink: {
    color: '#1E90FF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;