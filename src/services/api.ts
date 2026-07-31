import { useAuthStore } from "@/lib/auth/authStore";
import { secureStorage } from "@/lib/auth/secureStorage";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as authApi from "@/lib/auth/authApi";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Flag to prevent infinate refresh loops
let isRefreshing = false;
let failedQueue: Array<{
  onSuccess: (token: string) => void;
  onError: (error: AxiosError) => void;
}> = [];

// Request interceptor - attach access token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await secureStorage.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle token refresh
api.interceptors.request.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // access token expired (401), try to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          const refreshToken = await secureStorage.getRefreshToken();
          if (!refreshToken) {
            // No refresh token, user must login again
            await useAuthStore.getState().logout();
            return Promise.reject(error);
          }

          // Call refresh endpoint
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            await authApi.refrestTokens(refreshToken);

          // Update store and storage
          await useAuthStore
            .getState()
            .setToken(newAccessToken, newRefreshToken);

          // Process queued requests
          failedQueue.forEach((prom) => prom.onSuccess(newAccessToken));
          failedQueue = [];

          // Retry original reqeust with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          failedQueue.forEach((prom) =>
            prom.onError(refreshError as AxiosError),
          );
          failedQueue = [];

          await useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((onSuccess, onError) => {
        failedQueue.push({ onSuccess, onError });
      });
    }
    return Promise.reject(error);
  },
);

export default api;
