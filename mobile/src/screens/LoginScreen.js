import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import BrandLogo from '../components/BrandLogo';
import { demoLogin, registerGuest, sendOTP } from '../services/authService';
import { COLORS } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', mobile: '' });
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleGuest = async () => {
    if (form.name.trim().length < 2) return Alert.alert('Error', 'Enter your name');
    if (!/^\d{10}$/.test(form.mobile)) return Alert.alert('Error', 'Enter valid 10-digit mobile');
    setLoading(true);
    try {
      await registerGuest(form);
      navigation.replace('Main');
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setLoading(true);
    try {
      await demoLogin();
      navigation.replace('Main');
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtp = async () => {
    if (!/^\d{10}$/.test(form.mobile)) return Alert.alert('Error', 'Enter valid 10-digit mobile');
    setLoading(true);
    try {
      const res = await sendOTP(form.mobile);
      navigation.navigate('Otp', { mobile: form.mobile, devOtp: res.data.devOtp });
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BrandLogo />
      <Text style={styles.title}>Guest Login / Demo Login</Text>
      <Text style={styles.subtitle}>
        OTP optional hai. Guest flow, demo login, aur later profile complete karne ka option available hai.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={form.name}
        onChangeText={(value) => update('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile number"
        keyboardType="number-pad"
        maxLength={10}
        value={form.mobile}
        onChangeText={(value) => update('mobile', value)}
      />
      <TouchableOpacity style={styles.btn} onPress={handleGuest} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'Please wait...' : 'Continue as Guest'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.secondary]} onPress={handleDemo} disabled={loading}>
        <Text style={[styles.btnText, styles.secondaryText]}>One Tap Demo Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.ghost]} onPress={handleOtp} disabled={loading}>
        <Text style={[styles.btnText, styles.ghostText]}>Use Legacy OTP Instead</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>Guest flow best hai for demo, testing, aur free setup.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: COLORS.bg
  },
  title: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 18
  },
  subtitle: {
    textAlign: 'center',
    color: COLORS.textLight,
    marginTop: 10,
    marginBottom: 28,
    lineHeight: 22
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  ghost: {
    backgroundColor: '#ECF5FB'
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  secondaryText: {
    color: COLORS.primary
  },
  ghostText: {
    color: COLORS.text
  },
  terms: {
    textAlign: 'center',
    color: COLORS.textLight,
    marginTop: 18,
    fontSize: 12
  }
});
