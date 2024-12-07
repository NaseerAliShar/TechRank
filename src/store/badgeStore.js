import { create } from 'zustand';
import { instance } from '../services/services';

export const useBadgeStore = create((set, get) => ({
  badges: [],
  loading: false,
  error: null,

  fetchBadges: async () => {
    const { badges } = get();
    if (badges.length > 0) return;

    set({ loading: true, error: null });
    try {
      const { data } = await instance.get('/badges');
      set({ badges: data, loading: false });
    } catch (error) {
      set({
        error: error?.response?.data?.message || error.message,
        loading: false,
      });
    }
  },
}));
