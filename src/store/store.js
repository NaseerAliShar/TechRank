import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(set => ({
  user: null,
  setUser: async () =>
    set({ user: JSON.parse((await AsyncStorage.getItem('user')) || null) }),

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
