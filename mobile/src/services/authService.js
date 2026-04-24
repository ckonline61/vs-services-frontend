import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const listeners = new Set();

const notifyAuthChanged = () => {
  listeners.forEach(listener => listener());
};

const persistAuth = async (data) => {
  await AsyncStorage.setItem('token', data.token);
  await AsyncStorage.setItem('user', JSON.stringify(data.user));
  notifyAuthChanged();
  return data;
};

export const sendOTP = (mobile) => api.post('/auth/send-otp', { mobile });

export const verifyOTP = async (mobile, otp) => {
  const { data } = await api.post('/auth/verify-otp', { mobile, otp });
  if (data.success) await persistAuth(data);
  return data;
};

export const registerGuest = async ({ name, mobile, email }) => {
  const { data } = await api.post('/auth/register-guest', { name, mobile, email });
  if (data.success) await persistAuth(data);
  return data;
};

export const demoLogin = async () => {
  const { data } = await api.post('/auth/demo-login');
  if (data.success) await persistAuth(data);
  return data;
};

export const logout = async () => {
  await AsyncStorage.multiRemove(['token', 'user']);
  notifyAuthChanged();
};

export const getCurrentUser = async () => {
  const u = await AsyncStorage.getItem('user');
  return u ? JSON.parse(u) : null;
};

export const hasToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return !!token;
};

export const subscribeAuth = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
