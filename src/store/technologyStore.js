import { create } from 'zustand';
import { instance } from '../services/services';

export const useTechnologyStore = create((set, get) => ({
  technologies: [],
  loading: false,
  error: null,

  fetchTechnologies: async () => {
    const { technologies } = get();
    if (technologies.length > 0) return;

    set({ loading: true, error: null });
    try {
      const { data } = await instance.get('/technologies');
      set({ technologies: data, loading: false });
    } catch (error) {
      set({
        error: error?.response?.data?.message || error.message,
        loading: false,
      });
    }
  },
}));
