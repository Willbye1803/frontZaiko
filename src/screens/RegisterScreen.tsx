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

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleRegister = () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    console.log('Registrando:', { email, username, password });
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
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarme</Text>
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