import { create } from 'zustand';
import { instance } from '../services/services';

export const useLeaderboardStore = create((set, get) => ({
  users: [],
  cache: {},
  loading: false,
  error: null,

  // Fetch leaderboard data based on activeTab
  fetchData: async (
    activeTab,
    selectedBadge = null,
    selectedTechnology = null,
  ) => {
    let endpoint;

    // Determine the endpoint based on activeTab
    switch (activeTab) {
      case 'All':
        endpoint = '/leaderboard/allUsers';
        break;
      case 'Country':
        endpoint = '/leaderboard/byCountry';
        break;
      case 'City':
        endpoint = '/leaderboard/byCity';
        break;
      case 'Badge':
        if (!selectedBadge) {
          const cachedAllUsers = get().cache['/leaderboard/allUsers'];
          if (cachedAllUsers) {
            set({ users: cachedAllUsers });
            return; // Use cached 'allUsers' data
          }
          endpoint = '/leaderboard/allUsers';
        } else {
          endpoint = `/leaderboard/byBadge/${selectedBadge}`;
        }
        break;
      case 'Technology':
        if (!selectedTechnology) {
          const cachedAllUsers = get().cache['/leaderboard/allUsers'];
          if (cachedAllUsers) {
            set({ users: cachedAllUsers });
            return; // Use cached 'allUsers' data
          }
          endpoint = '/leaderboard/allUsers';
        } else {
          endpoint = `/leaderboard/byTechnology/${selectedTechnology}`;
        }
        break;
      default:
        return; // Return early if no valid activeTab is found
    }

    // Use cache if available
    const cacheKey = endpoint;
    const cachedData = get().cache[cacheKey];

    if (cachedData) {
      set({ users: cachedData });
      return; // Exit early if data is cached
    }

    // Set loading state
    set({ loading: true, error: null });

    try {
      // Fetch data from the API
      const { data } = await instance.get(endpoint);

      // Cache the data and update the state
      set(state => ({
        users: data.data,
        cache: { ...state.cache, [cacheKey]: data.data },
        loading: false,
      }));
    } catch (error) {
      // Handle errors
      set({ error: error.message, loading: false });
    }
  },

  // Clear the cache for a specific endpoint or all cached data
  clearCache: (endpoint = null) => {
    if (endpoint) {
      const cache = { ...get().cache };
      delete cache[endpoint];
      set({ cache });
    } else {
      set({ cache: {} });
    }
  },
}));
