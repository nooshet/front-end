import { create } from 'zustand';

/**
 * useAppStore - Global state management using Zustand.
 * 
 * This store handles shared application state.
 * Add more slices or state variables as needed.
 */
export const useAppStore = create((set) => ({
  // Sample state
  user: null,
  cart: [],
  isLoading: false,

  // Actions
  setUser: (userData) => set({ user: userData }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Reset store
  resetStore: () => set({ user: null, cart: [], isLoading: false }),
}));
