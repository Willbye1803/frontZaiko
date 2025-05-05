import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Register: undefined; 
    Login: undefined;   
   
  };
  

  export type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Register'  
  >;
  
