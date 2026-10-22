import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../screens/DashboardScreen';

const Tab = createBottomTabNavigator();
const GREEN = '#047857';

function PlaceholderScreen({ title, icon }) {
  return (
    <View style={styles.placeholder}>
      <View style={styles.placeholderIcon}>
        <Icon name={icon} size={34} color={GREEN} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Tu contenido aparecerá aquí.</Text>
    </View>
  );
}

function TicketsScreen() {
  return <PlaceholderScreen title="Boletos" icon="ticket-outline" />;
}
function HistoryScreen() {
  return <PlaceholderScreen title="Historial" icon="history" />;
}
function MoreScreen() {
  return <PlaceholderScreen title="Más" icon="menu" />;
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: GREEN,
        tabBarInactiveTintColor: '#718096',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'home-outline';
          if (route.name === 'Boletos') iconName = 'ticket-outline';
          if (route.name === 'Historial') iconName = 'history';
          if (route.name === 'Más') iconName = 'menu';
          return <Icon name={focused && route.name === 'Home' ? 'home' : iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={DashboardScreen} />
      <Tab.Screen name="Boletos" component={TicketsScreen} />
      <Tab.Screen name="Historial" component={HistoryScreen} />
      <Tab.Screen name="Más" component={MoreScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 100,
    paddingTop: 7,
    paddingBottom: 7,
    borderTopColor: '#E9EFF1',
    backgroundColor: '#FFFFFF',
    elevation: 10,
  },
  tabLabel: { fontSize: 11, fontWeight: '600' },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F7F8',
    padding: 24,
  },
  placeholderIcon: {
    width: 76,
    height: 76,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5F7EF',
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: '800', color: '#172B3A' },
  subtitle: { marginTop: 8, fontSize: 14, color: '#7C8B98', textAlign: 'center' },
});
