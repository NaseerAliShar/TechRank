import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Axios instance
export const instance = axios.create({
  baseURL: 'https://p3x08xsn-3000.inc1.devtunnels.ms/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token
instance.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle errors
instance.interceptors.response.use(
  response => response,
  error => {
    console.error('Response interceptor error:', error);
    return Promise.reject(error);
  },
);

export default instance;
