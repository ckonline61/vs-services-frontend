import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import BrandLogo from '../components/BrandLogo';
import { COLORS } from '../theme/colors';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <BrandLogo light />
      <Text style={styles.tagline}>Car service, accessories, and doorstep care</Text>
      <ActivityIndicator color="#fff" size="large" style={{ marginTop: 30 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  tagline: { fontSize: 14, color: '#fff', marginTop: 16, opacity: 0.95 }
});
