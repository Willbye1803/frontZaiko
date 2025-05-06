import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Inventario: undefined;
  Citas: undefined;
  Finanzas: undefined;
  Mas: undefined;
  [key: string]: undefined;
};

type AppNavigatorProps = {
  title?: string;
  navigation: StackNavigationProp<RootStackParamList>;
};

const AppNavigator: React.FC<AppNavigatorProps> = ({ 
  
  navigation 
}) => {
  return (
    <View style={styles.navbar}>
      <View style={styles.navLinks}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Inventario')}
        >
          <Text style={styles.navText}>Inventario</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Citas')}
        >
          <Text style={styles.navText}>Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Finanzas')}
        >
          <Text style={styles.navText}>Favorable</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Mas')}
        >
          <Text style={styles.navText}>Año</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  navLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
  },
  navText: {
    color: '#34495e',
    fontWeight: '500',
  },
});

export default AppNavigator;