import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { COLORS } from './src/theme/colors';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <RootNavigator />
      <Toast />
    </NavigationContainer>
  );
}
