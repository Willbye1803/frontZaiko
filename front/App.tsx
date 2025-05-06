import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ZaikoDashboard from './src/screens/ZaikoDashboard';
import { RootStackParamList } from './src/navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Register"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Registro' }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Iniciar sesión' }} 
        />
        <Stack.Screen 
          name="Dashboard"
          component={ZaikoDashboard}
          options={{
            gestureEnabled: false, 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}