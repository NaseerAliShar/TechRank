import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(set => ({
  user: null,
  setUser: async user => {
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user });
    } else {
      const storedUser = await AsyncStorage.getItem('user');
      set({ user: storedUser ? JSON.parse(storedUser) : null });
    }
  },

  loading: true,
  setLoading: newLoading => set(() => ({ loading: newLoading })),

  users: [],
  setUsers: newUsers => set(() => ({ users: newUsers })),

  badges: [],
  setBadges: newBadges => set(() => ({ badges: newBadges })),

  technologies: [],
  setTechnologies: newTechnologies =>
    set(() => ({ technologies: newTechnologies })),
}));
