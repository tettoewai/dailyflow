import api from "@/services/api";
import { User } from "./authStore";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

export interface LoginReqeust {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
}

// Email + password login
export async function login(data: LoginReqeust): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
}

// Email + password registeration
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/register", data);
  return response.data;
}

// Guest login (no email/password)
export async function loginAsGuest(): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/guest");
  return response.data;
}

// Refrest access token
export async function refrestTokens(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const response = await api.post<{
    access_token: string;
    refresh_token: string;
  }>(
    "/auth/refresh",
    { refreshToken },
    {
      headers: {
        // Don't include auth header for refresh endpoint
        Authorization: undefined,
      },
    },
  );
  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
  };
}

// Logout
export async function logout(): Promise<ActionResponse> {
  const response = await api.post<ActionResponse>("/auth/logout");
  return response.data;
}

// Convert Guest account to Regular user
export async function convertGuesttoUser(
  data: RegisterRequest,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/convert-guest", data);
  return response.data;
}

// Get user profile
export async function getUserProfile(): Promise<User> {
  const response = await api.get<User>("/profile");
  return response.data;
}
