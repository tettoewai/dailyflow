import { create } from "zustand";
import { secureStorage } from "./secureStorage";

export interface User {
  id: string;
  email: string;
  name: string;
  isGuest: boolean;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  isGuest: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (acccessToken: string, refreshToken: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => Promise<void>;
  restoreToken: () => Promise<void>;
  convertGuest: (user: User) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isGuest: false,

  setUser: (user: User | null) =>
    set({ user, isGuest: user?.isGuest ?? false }),

  setToken: async (accessToken: string, refreshToken: string) => {
    set({ accessToken, refreshToken });
    // Save to secure storage
    await secureStorage.setAccessToken(accessToken);
    await secureStorage.setRefreshToken(refreshToken);
  },

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  setError: (error: string | null) => set({ error }),

  logout: async () => {
    await secureStorage.clearAll();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      error: null,
      isGuest: false,
    });
  },

  restoreToken: async () => {
    try {
      set({ isLoading: true });
      const accessToken = await secureStorage.getAccessToken();
      const refreshToken = await secureStorage.getRefreshToken();
      if (accessToken && refreshToken) {
        set({ accessToken, refreshToken });
      } else {
        // No tokens found - user is logged out
        await get().logout();
      }
    } catch (error) {
      console.error("Error restoring tokens: ", error);
      await get().logout();
    } finally {
      set({ isLoading: false });
    }
  },

  convertGuest: (user: User) => {
    set({ user, isGuest: false });
  },

  reset: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      error: null,
      isGuest: false,
    });
  },
}));
