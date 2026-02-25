import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// Helper to extract error message from nested structures
const extractErrorMessage = (data, defaultMessage) => {
  if (!data) return defaultMessage;

  // If the backend wraps everything in a "data" property
  const result = data.data || data;

  if (typeof result.message === "string") return result.message;
  if (result.error) {
    if (typeof result.error === "string") return result.error;
    if (typeof result.error.message === "string") return result.error.message;
  }

  if (data !== result) {
    return extractErrorMessage(result, defaultMessage);
  }

  return JSON.stringify(data) || defaultMessage;
};

// Helper to get actual data (handles nesting)
const getDataValues = (data) => {
  return data.data || data;
};

const useUserStore = create((set) => ({
  user: null,
  otpSessionId: null,
  isLoading: false,
  error: null,
  expiresInSeconds: null,
  resendAvailableInSeconds: null,
  token: null,
  registrationToken: null,
  resetCompletionToken: null,

  // Action to register a new user
  register: async (userData) => {
    set({ isLoading: true, error: null });
    const formattedData = {
      ...userData,
      email: userData.email?.trim(),
    };
    try {
      console.log("Registering User Request:", formattedData);
      const response = await fetch(`${BASE_URL}/auth/register/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const rawData = await response.json();
      console.log("Register User Response:", {
        status: response.status,
        data: rawData,
      });

      if (!response.ok) {
        throw new Error(extractErrorMessage(rawData, "Registration failed"));
      }

      const data = getDataValues(rawData);
      set({
        otpSessionId: data.otpSessionId,
        expiresInSeconds: data.expiresInSeconds,
        resendAvailableInSeconds: data.resendAvailableInSeconds,
        isLoading: false,
      });

      return data;
    } catch (err) {
      console.error("Register User Error:", err);
      set({ error: err.message || "Xəta baş verdi", isLoading: false });
      throw err;
    }
  },

  // Action to register a new chef
  registerChef: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      console.log("Registering Chef Request (FormData)");
      const response = await fetch(`${BASE_URL}/auth/register/chef`, {
        method: "POST",
        body: formData,
      });

      const rawData = await response.json();
      console.log("Register Chef Response:", {
        status: response.status,
        data: rawData,
      });

      if (!response.ok) {
        throw new Error(
          extractErrorMessage(rawData, "Chef registration failed"),
        );
      }

      const data = getDataValues(rawData);
      set({
        otpSessionId: data.otpSessionId,
        expiresInSeconds: data.expiresInSeconds,
        resendAvailableInSeconds: data.resendAvailableInSeconds,
        isLoading: false,
      });

      return data;
    } catch (err) {
      console.error("Register Chef Error:", err);
      set({ error: err.message || "Xəta baş verdi", isLoading: false });
      throw err;
    }
  },

  // Action to register a new courier
  registerCourier: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      console.log("Registering Courier Request (FormData)");
      const response = await fetch(`${BASE_URL}/auth/register/courier`, {
        method: "POST",
        body: formData,
      });

      const rawData = await response.json();
      console.log("Register Courier Response:", {
        status: response.status,
        data: rawData,
      });

      if (!response.ok) {
        throw new Error(
          extractErrorMessage(rawData, "Courier registration failed"),
        );
      }

      const data = getDataValues(rawData);
      set({
        otpSessionId: data.otpSessionId,
        expiresInSeconds: data.expiresInSeconds,
        resendAvailableInSeconds: data.resendAvailableInSeconds,
        isLoading: false,
      });

      return data;
    } catch (err) {
      console.error("Register Courier Error:", err);
      set({ error: err.message || "Xəta baş verdi", isLoading: false });
      throw err;
    }
  },

  // Action to verify OTP
  verifyOtp: async (otpCode) => {
    const { otpSessionId } = useUserStore.getState();

    if (!otpSessionId) {
      const msg =
        "Sessiya ID tapılmadı. Zəhmət olmasa yenidən qeydiyyatdan keçin.";
      set({ error: msg });
      throw new Error(msg);
    }

    set({ isLoading: true, error: null });
    try {
      console.log("Verifying OTP Request:", { otpSessionId, otpCode });
      const response = await fetch(`${BASE_URL}/auth/register/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otpSessionId,
          otpCode: otpCode?.toString().trim(),
        }),
      });

      const rawData = await response.json();
      console.log("Verify OTP Response:", {
        status: response.status,
        data: rawData,
      });

      if (!response.ok) {
        throw new Error(
          extractErrorMessage(rawData, "OTP verification failed"),
        );
      }

      const data = getDataValues(rawData);
      if (data.registrationToken) {
        console.log("Captured registrationToken:", data.registrationToken);
        set({ registrationToken: data.registrationToken });
      }

      set({ user: data.user, isLoading: false });
      return data;
    } catch (err) {
      console.error("Verify OTP Error:", err);
      set({ error: err.message || "Xəta baş verdi", isLoading: false });
      throw err;
    }
  },

  // Action to complete registration
  completeRegistration: async (role) => {
    const { registrationToken } = useUserStore.getState();

    if (!registrationToken) {
      const msg = "Qeydiyyat tokeni tapılmadı.";
      set({ error: msg });
      throw new Error(msg);
    }

    set({ isLoading: true, error: null });
    try {
      console.log("Completing Registration Request:", { registrationToken, role });
      
      let endpoint = `${BASE_URL}/auth/register/user/complete`;
      if (role === "chef") {
        endpoint = `${BASE_URL}/auth/register/chef/complete`;
      } else if (role === "courier") {
        endpoint = `${BASE_URL}/auth/register/courier/complete`;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationToken }),
      });

      const rawData = await response.json();
      console.log("Complete Registration Response:", {
        status: response.status,
        data: rawData,
      });

      if (!response.ok) {
        throw new Error(
          extractErrorMessage(rawData, "Registration completion failed"),
        );
      }

      const data = getDataValues(rawData);

      // Capture and store authentication tokens if provided
      const actualToken = data.accessToken || data.token;

      if (actualToken) {
        await AsyncStorage.setItem("userToken", actualToken);
        set({ token: actualToken });
      }

      if (data.user) {
        await AsyncStorage.setItem("userData", JSON.stringify(data.user));
        set({ user: data.user });
      }

      set({ isLoading: false });
      return data;
    } catch (err) {
      console.error("Complete Registration Error:", err);
      set({ error: err.message || "Xəta baş verdi", isLoading: false });
      throw err;
    }
  },

  // Action to resend OTP
  resendOtp: async () => {
    const { otpSessionId } = useUserStore.getState();
    if (!otpSessionId) {
      const msg = "Aktiv sessiya tapılmadı.";
      set({ error: msg });
      throw new Error(msg);
    }

    set({ isLoading: true, error: null });
    try {
      console.log("Resending OTP Request:", { otpSessionId });
      const response = await fetch(`${BASE_URL}/auth/register/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otpSessionId }),
      });

      const rawData = await response.json();
      console.log("Resend OTP Response:", {
        status: response.status,
        data: rawData,
      });

      if (!response.ok) {
        throw new Error(extractErrorMessage(rawData, "Failed to resend OTP"));
      }

      const data = getDataValues(rawData);
      set({
        otpSessionId: data.otpSessionId || otpSessionId,
        expiresInSeconds: data.expiresInSeconds,
        resendAvailableInSeconds: data.resendAvailableInSeconds,
        isLoading: false,
      });

      return data;
    } catch (err) {
      console.error("Resend OTP Error:", err);
      set({ error: err.message || "Xəta baş verdi", isLoading: false });
      throw err;
    }
  },

  // Action to login
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    const formattedCredentials = {
      email: credentials.email?.trim(),
      password: credentials.password,
    };
    try {
      console.log("Login Request:", formattedCredentials);
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedCredentials),
      });

      const rawData = await response.json();
      console.log("Login Response:", {
        status: response.status,
        data: rawData,
      });

      if (!response.ok) {
        throw new Error(extractErrorMessage(rawData, "Login failed"));
      }

      const data = getDataValues(rawData);

      // Map accessToken/refreshToken if provided
      const actualToken = data.accessToken || data.token;

      // Critical Check: Ensure token exists before AsyncStorage
      if (!actualToken) {
        console.error("Token missing in success response:", data);
        throw new Error("Sistem xətası: Giriş tokeni tapılmadı.");
      }

      // Store token and user data
      await AsyncStorage.setItem("userToken", actualToken);
      if (data.user) {
        await AsyncStorage.setItem("userData", JSON.stringify(data.user));
      }

      set({
        user: data.user,
        token: actualToken,
        isLoading: false,
      });

      return data;
    } catch (err) {
      console.error("Login Error:", err);
      set({ error: err.message || "Xəta baş verdi", isLoading: false });
      throw err;
    }
  },

  // Action to request password reset
  requestPasswordReset: async (email) => {
    set({ isLoading: true, error: null, resetCompletionToken: null }); // Clear any stale token
    const trimmedEmail = email?.trim();
    try {
      console.log("Request Reset Request:", { identifier: trimmedEmail });
      const response = await fetch(
        `${BASE_URL}/auth/password-reset/request?identifier=${encodeURIComponent(trimmedEmail)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const rawData = await response.json();
      console.log("Request Reset Response:", {
        status: response.status,
        data: rawData,
      });

      if (!response.ok) {
        throw new Error(
          extractErrorMessage(rawData, "Failed to request password reset"),
        );
      }

      const data = getDataValues(rawData);
      set({
        otpSessionId: data.otpSessionId,
        expiresInSeconds: data.expiresInSeconds,
        resendAvailableInSeconds: data.resendAvailableInSeconds,
        isLoading: false,
      });

      return data;
    } catch (err) {
      console.error("Request Reset Error:", err);
      set({ error: err.message || "Xəta baş verdi", isLoading: false });
      throw err;
    }
  },

  // Action to verify reset OTP
  verifyResetOtp: async (otpCode) => {
    const { otpSessionId } = useUserStore.getState();
    if (!otpSessionId) {
      const msg = "Sessiya ID tapılmadı.";
      set({ error: msg });
      throw new Error(msg);
    }

    set({ isLoading: true, error: null });
    try {
      console.log("Verify Reset OTP Request:", { otpSessionId, otpCode });
      const response = await fetch(`${BASE_URL}/auth/password-reset/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otpSessionId,
          otpCode: otpCode?.toString().trim(),
        }),
      });

      const rawData = await response.json();
      console.log("Verify Reset OTP Response:", {
        status: response.status,
        data: rawData,
      });

      if (!response.ok) {
        throw new Error(
          extractErrorMessage(rawData, "OTP verification failed"),
        );
      }

      const data = getDataValues(rawData);
      console.log("Extracted Reset Data:", data);

      const capturedToken =
        data.token ||
        data.resetToken ||
        data.registrationToken ||
        data.accessToken ||
        rawData.resetToken;
      if (capturedToken) {
        console.log("Captured Reset Token successfully:", capturedToken);
        set({ resetCompletionToken: capturedToken });
      } else {
        console.warn(
          "No token found in reset verify response! Check backend response structure.",
        );
      }

      set({ isLoading: false });
      return { ...data, capturedToken }; // Return the token for navigation fallback
    } catch (err) {
      console.error("Verify Reset OTP Error:", err);
      set({ error: err.message || "Xəta baş verdi", isLoading: false });
      throw err;
    }
  },

  // Action to reset password
  resetPassword: async (password, passwordConfirm) => {
    const { resetCompletionToken: token } = useUserStore.getState();

    console.log(
      "ResetPassword - token from state:",
      token ? `"${token}"` : "null/undefined",
    );

    if (!token) {
      const msg = "Token tapılmadı. Zəhmət olmasa yenidən yoxlayın.";
      set({ error: msg });
      throw new Error(msg);
    }

    set({ isLoading: true, error: null });
    try {
      const payload = {
        token: token.trim(),
        newPassword: password,
        confirmPassword: passwordConfirm,
      };

      console.log(
        "Reset Password Request Payload:",
        JSON.stringify(payload, null, 2),
      );

      const response = await fetch(`${BASE_URL}/auth/password-reset/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`, // Added as fallback
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let rawData = {};

      if (responseText) {
        try {
          rawData = JSON.parse(responseText);
        } catch (e) {
          console.warn("Failed to parse response as JSON:", responseText);
        }
      }

      console.log("Reset Password Response:", {
        status: response.status,
        data: rawData,
      });

      if (!response.ok) {
        throw new Error(extractErrorMessage(rawData, "Password reset failed"));
      }

      set({ isLoading: false, resetCompletionToken: null });
      return rawData;
    } catch (err) {
      console.error("Reset Password Error:", err);
      set({ error: err.message || "Xəta baş verdi", isLoading: false });
      throw err;
    }
  },

  // Action to logout
  logout: async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userData");
    set({ user: null, token: null });
  },

  // Action to load stored user session
  loadStoredUser: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userData = await AsyncStorage.getItem("userData");

      if (token && userData) {
        set({
          token,
          user: JSON.parse(userData),
        });
      }
    } catch (err) {
      console.error("Load Stored User Error:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  // Reset error state
  resetError: () => set({ error: null }),
}));

export default useUserStore;
