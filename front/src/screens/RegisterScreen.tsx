import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}


const API_URL = 'http://192.168.1.21:8000/api';

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: password
      });

      Alert.alert('Éxito', 'Registro completado correctamente');
      navigation.navigate('Login');
      
    } catch (error: unknown) {
      let errorMessage = 'Error en el registro';
      if (axios.isAxiosError(error)) {
        console.log('Error del servidor:', error.response?.data);
        errorMessage = error.response?.data?.message || 
                      (error.response?.data?.errors ? 
                       Object.values(error.response.data.errors).join('\n') : 
                       'Error desconocido');
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/OIP.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.subtitle}>¡Crea tu cuenta y empieza a gestionar tu negocio!</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={name}
        onChangeText={setName}  // Corregido: setname → setName
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Registrando...' : 'Registrarme'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya estás registrado? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#322F35',
  },
  logo: {
    width: 150,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22, 
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFFFFF',
    fontWeight: '600', 
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#1E90FF', 
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline', 
    fontWeight: '600', 
  },
});

export default RegisterScreen;