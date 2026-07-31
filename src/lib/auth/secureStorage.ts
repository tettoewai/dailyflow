import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "dailyflow_access_token";
const REFRESH_TOKEN_KEY = "dailyflow_refresh_token";

export const secureStorage = {
  async setAccessToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error("Failed to store access token: ", error);
      throw error;
    }
  },
  async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to retrieve access token: ", error);
      return null;
    }
  },

  async setRefreshToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error("Failed to store refresh token: ", error);
      throw error;
    }
  },

  async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to retrieve refresh token: ", error);
      return null;
    }
  },

  async clearAll(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to clear tokens: ", error);
    }
  },
};
