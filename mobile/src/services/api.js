import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default to the live Render API so physical devices and release APKs work.
// Override this only for local emulator/device testing.
export const API_BASE_URL = 'https://vs-services-api.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('API Error:', err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
