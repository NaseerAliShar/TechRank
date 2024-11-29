import { create } from 'zustand';
import { instance } from '../services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(set => ({
  user: null,
  error: null,
  loading: false,
  users: [],
  badges: [],
  technologies: [],
  setError: error => set({ error }),
  setLoading: loading => set({ loading }),
  setUser: newUsers => set(() => ({ users: newUsers })),

  setUser: async user => {
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user });
    } else {
      const storedUser = await AsyncStorage.getItem('user');
      set({ user: storedUser ? JSON.parse(storedUser) : null });
    }
  },

  setBadges: async () => {
    set({ error: null, loading: true });
    try {
      const { data } = await instance.get('/badges');
      set({
        badges: data,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setTechnologies: async () => {
    set({ error: null, loading: true });
    try {
      const { data } = await instance.get('/technologies');
      set({
        technologies: data,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
