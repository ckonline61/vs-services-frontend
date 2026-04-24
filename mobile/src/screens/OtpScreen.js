import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import BrandLogo from '../components/BrandLogo';
import { verifyOTP } from '../services/authService';
import { COLORS } from '../theme/colors';

export default function OtpScreen({ route, navigation }) {
  const { mobile, devOtp } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) return Alert.alert('Error', 'Enter 6-digit OTP');
    setLoading(true);
    try {
      const res = await verifyOTP(mobile, otp);
      setLoading(false);
      if (res.success) {
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Error', e?.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <View style={styles.container}>
      <BrandLogo compact />
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.sub}>OTP sent to +91 {mobile}</Text>
      {devOtp && <Text style={styles.devOtp}>Dev OTP: {devOtp}</Text>}

      <TextInput
        style={styles.input}
        placeholder="______"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.btn} onPress={handleVerify} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'Verifying...' : 'Verify & Continue'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 24, color: COLORS.text },
  sub: { color: COLORS.textLight, marginTop: 4, marginBottom: 30 },
  devOtp: { color: COLORS.accent, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 16, fontSize: 22, textAlign: 'center', letterSpacing: 10 },
  btn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
