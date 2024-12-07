import { create } from 'zustand';
import { replace } from '../utils/navigation';
import { instance } from '../services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

  setError: error => set({ error }), // Set error state
  setLoading: loading => set({ loading }), // Set loading state

  setUser: async user => {
    set({ loading: true, error: null }); // Start loading
    try {
      if (user) {
        // Save user to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));
        set({ user }); // Update user in the store
      } else {
        // Remove user from AsyncStorage
        await AsyncStorage.clear();
        set({ user: null }); // Clear user in the store
        replace('Login');
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false }); // Stop loading
    }
  },

  fetchUser: async () => {
    set({ loading: true, error: null }); // Start loading
    try {
      const storedUser = await AsyncStorage.getItem('user');
      set({ user: storedUser ? JSON.parse(storedUser) : null }); // Load user into the store
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false }); // Stop loading
    }
  },

  fetchData: async () => {
    // const { allRank, cityRank, countryRank, achievements, user, tip } = get();
    // if (allRank || cityRank || countryRank || achievements || user || tip)
    //   return

    set({ loading: true, error: null });
    try {
      const [allRes, cityRes, countryRes, achievementsRes, userRes, tipRes] =
        await Promise.all([
          instance.get('/leaderboard/allRank'),
          instance.get('/leaderboard/cityRank'),
          instance.get('/leaderboard/countryRank'),
          instance.get('/achievements/c/count'),
          instance.get('/auth/me'),
          instance.get('/tip'),
        ]);
      set({ allRank: allRes.data.rank });
      set({ cityRank: cityRes.data.rank });
      set({ countryRank: countryRes.data.rank });
      set({ achievements: achievementsRes.data.count });
      set({ user: userRes.data });
      set({ tip: tipRes.data.data.title });
      set({ loading: false, error: null });
    } catch (error) {
      set({
        error: error?.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  // clearUser: () => {
  //   set({ allRank: null });
  //   set({ cityRank: null });
  //   set({ countryRank: null });
  //   set({ achievements: null });
  //   set({ user: null });
  // },
}));
