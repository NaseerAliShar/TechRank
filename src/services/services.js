import axios from 'axios';
import { navigate } from '../utils/navigation';
import { apiURL, apiVersion } from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Axios instance
export const instance = axios.create({
  baseURL: `${apiURL}/${apiVersion}`,
  timeout: 5000,
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
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        AsyncStorage.clear();
        navigate('Login');
      }
    }
    console.warn('Response interceptor error:', error);
    return Promise.reject(error);
  },
);

export default instance;
