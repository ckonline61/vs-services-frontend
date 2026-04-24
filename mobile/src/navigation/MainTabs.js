import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import AccessoriesScreen from '../screens/AccessoriesScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home', Accessories: 'cart', Bookings: 'calendar', Profile: 'person'
          };
          return <Icon name={icons[route.name]} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'VS SERVICES' }} />
      <Tab.Screen name="Accessories" component={AccessoriesScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
