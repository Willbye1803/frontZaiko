import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Dashboard: undefined;
  Inventario: undefined;
  Citas: undefined;
  Finanzas: undefined;
  Mas: undefined;
  ZaikoDashboard: undefined;
};

  export type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Register'
  >;
  
