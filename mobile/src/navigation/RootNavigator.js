import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import MainTabs from './MainTabs';
import ServiceBookingScreen from '../screens/ServiceBookingScreen';
import BookingDetailScreen from '../screens/BookingDetailScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SupportScreen from '../screens/SupportScreen';
import { subscribeAuth } from '../services/authService';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const syncAuthState = () => AsyncStorage.getItem('token').then(t => {
      setIsAuth(!!t);
      setLoading(false);
    });

    syncAuthState();
    const unsubscribe = subscribeAuth(syncAuthState);
    return unsubscribe;
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerStyle: { backgroundColor: '#D32F2F' }, headerTintColor: '#fff' }}
    >
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ServiceBooking" component={ServiceBookingScreen} options={{ title: 'Book Service' }} />
      <Stack.Screen name="BookingDetail" component={BookingDetailScreen} options={{ title: 'Booking Details' }} />
      <Stack.Screen name="Support" component={SupportScreen} options={{ title: 'Support Hub' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product' }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'My Cart' }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, presentation: isAuth ? 'modal' : 'card' }}
      />
      <Stack.Screen name="Otp" component={OtpScreen} options={{ title: 'Verify OTP' }} />
    </Stack.Navigator>
  );
}
