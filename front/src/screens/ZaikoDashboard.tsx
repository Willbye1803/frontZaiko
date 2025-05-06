import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  ScrollView,
  ListRenderItem,
 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';



type Cita = {
  id: string;
  nombre: string;
  fecha: string;
};

type Venta = {
  articulosVendidos: number;
  totalVentas: number;
};

type ZaikoDashboardProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const ZaikoDashboard: React.FC<ZaikoDashboardProps> = ({ navigation }) => {
  const [ventas] = useState<Venta>({
    articulosVendidos: 15,
    totalVentas: 654
  });

  const [citas] = useState<Cita[]>([
    { id: '1', nombre: 'Sabritas', fecha: '20/02/2023' },
    { id: '2', nombre: 'Bimbo', fecha: '20/02/2023' },
    { id: '3', nombre: 'Coca-Cola', fecha: '22/02/2023' },
  ]);
  
  const [mostrarTodasCitas, setMostrarTodasCitas] = useState<boolean>(false);

  const renderCita: ListRenderItem<Cita> = ({ item }) => (
    <View style={styles.citaCard}>
      <Text style={styles.citaNombre}>{item.nombre}</Text>
      <Text style={styles.citaFecha}>{item.fecha}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Sección de Ventas del Día */}
        <View style={styles.section}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Ventas del Día</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{ventas.articulosVendidos}</Text>
              <Text style={styles.statLabel}>Artículos vendidos</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.amountBox}>
                <Text style={styles.amountText}>${ventas.totalVentas}</Text>
              </View>
              <Text style={styles.statLabel}>En ventas</Text>
            </View>
          </View>

          {/* Botones de ventas */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.primaryButton]}
              
            >
              {/*<Image source={salesIcon} style={styles.buttonIcon} /> */}
              <Text style={styles.buttonText}>Ver Ventas</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton]}
              
            >
             {/* <Image source={newSaleIcon} style={styles.buttonIcon} /> */}
              <Text style={styles.buttonText}>Nueva Venta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Separador */}
        <View style={styles.separator} />

        {/* Sección de Próximas Citas */}
        <View style={styles.section}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Próximas Citas</Text>
          </View>
          
          <FlatList
            data={mostrarTodasCitas ? citas : citas.slice(0, 3)}
            keyExtractor={(item) => item.id}
            renderItem={renderCita}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.citaSeparator} />}
          />
          
          <TouchableOpacity 
            style={styles.moreButton}
            onPress={() => setMostrarTodasCitas(!mostrarTodasCitas)}
          >
            <Text style={styles.moreButtonText}>
              {mostrarTodasCitas ? 'Ver menos citas' : 'Ver más citas'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navbar Inferior Mejorado */}
      <View style={styles.bottomNavbar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Inventario')}
        >
          {/* <Image source={inventoryIcon} style={styles.navIcon} />  */}
          <Text style={styles.navButtonText}>Inventario</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Citas')}
        >
          {/*<Image source={appointmentsIcon} style={styles.navIcon} /> */}
          <Text style={styles.navButtonText}>Citas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Finanzas')}
        >
         {/* <Image source={reportsIcon} style={styles.navIcon} /> */}
          <Text style={styles.navButtonText}>Favorable</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Mas')}
        >
      {/*    <Image source={annualIcon} style={styles.navIcon} /> */}
          <Text style={styles.navButtonText}>Año</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#322F35',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 90, 
  },
  headerContainer: {
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#424242',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  amountBox: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  amountText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#BDBDBD',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  secondaryButton: {
    backgroundColor: '#424242',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#555',
    marginVertical: 16,
  },
  citaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  citaSeparator: {
    height: 8,
  },
  citaNombre: {
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  citaFecha: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  moreButton: {
    marginTop: 12,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#424242',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  moreButtonText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#3498db',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80, 
  },
  navButton: {
    alignItems: 'center',
    flex: 1,
    padding: 4,
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#FFFFFF',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 12,
  },
});

export default ZaikoDashboard;