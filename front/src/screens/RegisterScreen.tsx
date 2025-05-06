import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  
  const API_URL = 'http://192.168.1.21:8000/api';
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
   
    if (!email || !password || !name) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

   
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Intentando registrar usuario...'); 
      
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        password_confirmation: password
      }, {
        timeout: 10000, 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Respuesta del servidor:', response.data); 

      if (response.status >= 200 && response.status < 300) {
        Alert.alert('Éxito', 'Registro completado correctamente');
        navigation.navigate('Login');
      } else {
        throw new Error(response.data.message || 'Error en el registro');
      }
      
    } catch (error) {
      console.error('Error en el registro:', error); 
      
      let errorMessage = 'Error al conectar con el servidor';
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          errorMessage = 'El servidor no respondió a tiempo';
        } else if (error.response) {
        
          errorMessage = error.response.data?.message || 
                       (error.response.data?.errors ? 
                        Object.values(error.response.data.errors).join('\n') : 
                        `Error ${error.response.status}`);
        } else if (error.request) {
        
          errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
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
        autoCorrect={false}
        editable={!isLoading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isLoading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña (mínimo 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />

      <TouchableOpacity 
        style={[styles.button, isLoading && styles.disabledButton]} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <ActivityIndicator color="#fff" />
            <Text style={styles.buttonText}> Procesando...</Text>
          </>
        ) : (
          <Text style={styles.buttonText}>Registrarme</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        disabled={isLoading}
      >
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
  disabledButton: {
    backgroundColor: '#84b8ff',
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