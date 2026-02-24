import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useThemeStore = create((set) => ({
  isDarkMode: false,
  toggleTheme: async () => {
    set((state) => {
      const newMode = !state.isDarkMode;
      console.log("🌙 Theme Toggled. Dark Mode:", newMode);
      AsyncStorage.setItem("isDarkMode", JSON.stringify(newMode));
      return { isDarkMode: newMode };
    });
  },
  setTheme: async (value) => {
    console.log("🌙 Theme Set. Dark Mode:", value);
    await AsyncStorage.setItem("isDarkMode", JSON.stringify(value));
    set({ isDarkMode: value });
  },
  loadTheme: async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("isDarkMode");
      console.log("🌙 Loading Stored Theme:", storedTheme);
      if (storedTheme !== null) {
        set({ isDarkMode: JSON.parse(storedTheme) });
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  },
}));

export default useThemeStore;
