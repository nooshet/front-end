import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const useUserStore = create((set) => ({
  user: null,
  otpSessionId: null,
  isLoading: false,
  error: null,
  expiresInSeconds: null,
  resendAvailableInSeconds: null,
  token: null,

  // Action to register a new user
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/auth/register/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      set({
        otpSessionId: data.otpSessionId,
        expiresInSeconds: data.expiresInSeconds,
        resendAvailableInSeconds: data.resendAvailableInSeconds,
        isLoading: false,
      });
      
      return data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // Action to verify OTP
  verifyOtp: async (otpCode) => {
    const { otpSessionId } = useUserStore.getState();
    
    if (!otpSessionId) {
      set({ error: "Session ID missing. Please register first." });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/auth/register/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otpSessionId,
          otpCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      set({ user: data.user, isLoading: false }); 
      return data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // Action to login
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      await AsyncStorage.setItem("userToken", data.token);
      await AsyncStorage.setItem("userData", JSON.stringify(data.user));

      set({ 
        user: data.user, 
        token: data.token,
        isLoading: false 
      });
      
      return data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // Action to logout
  logout: async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userData");
    set({ user: null, token: null });
  },

  // Reset error state
  resetError: () => set({ error: null }),
}));

export default useUserStore;
