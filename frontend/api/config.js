import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Для Android эмулятора используй 10.0.2.2 вместо localhost
// Для iOS эмулятора используй localhost
// Для реального устройства используй IP компьютера в локальной сети
const BASE_URL = 'http://10.0.2.2:5000/api'; // Android emulator

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для добавления токена
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token'); // Нужно установить @react-native-async-storage/async-storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;