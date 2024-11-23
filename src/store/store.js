import { create } from 'zustand';

export const useStore = create(set => ({
  users: [],
  setUsers: newUsers => set(() => ({ users: newUsers })),

  loading: true,
  setLoading: newLoading => set(() => ({ loading: newLoading })),

  badges: [],
  setBadges: newBadges => set(() => ({ badges: newBadges })),

  technologies: [],
  setTechnologies: newTechnologies =>
    set(() => ({ technologies: newTechnologies })),
}));
