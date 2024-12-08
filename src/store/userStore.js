import { create } from 'zustand';
import { replace } from '../utils/navigation';
import { instance } from '../services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create(set => ({
  user: null,
  loading: false,
  error: null,
  allRank: null,
  cityRank: null,
  countryRank: null,
  achievements: null,
  tip: null,

  setError: error => set({ error }),
  setLoading: loading => set({ loading }),

  // Set or clear user
  setUser: async user => {
    set({ loading: true, error: null });
    try {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        set({ user });
      } else {
        await AsyncStorage.clear();
        set({ user: null });
        replace('Login');
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch all necessary data
  fetchData: async () => {
    const { user, allRank, cityRank, countryRank, achievements, tip } = get();
    if (user || allRank || cityRank || countryRank || achievements || tip)
      return;

    set({ loading: true, error: null });
    try {
      const [
        { data: user },
        {
          data: { rank: allRank },
        },
        {
          data: { rank: cityRank },
        },
        {
          data: { rank: countryRank },
        },
        {
          data: { count: achievements },
        },
        {
          data: {
            data: { title: tip },
          },
        },
      ] = await Promise.all([
        instance.get('/auth/me'),
        instance.get('/leaderboard/allRank'),
        instance.get('/leaderboard/cityRank'),
        instance.get('/leaderboard/countryRank'),
        instance.get('/achievements/c/count'),
        instance.get('/tip'),
      ]);

      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user, allRank, cityRank, countryRank, achievements, tip });
    } catch (error) {
      set({ error: error?.response?.data?.message || error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Clear user data
  clearUser: () =>
    set({
      user: null,
      allRank: null,
      cityRank: null,
      countryRank: null,
      achievements: null,
    }),
}));
