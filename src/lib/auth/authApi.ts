import api from "@/services/api";
import { User } from "./authStore";

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

export interface ActionResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}

// Email + password login
export async function login(data: LoginReqeust): Promise<ActionResponse> {
  const response = await api.post<ActionResponse>("/auth/login", data);
  return response.data;
}

// Email + password registeration
export async function register(data: RegisterRequest): Promise<ActionResponse> {
  const response = await api.post<ActionResponse>("/auth/register", data);
  return response.data;
}

// Guest login (no email/password)
export async function loginAsGuest(): Promise<ActionResponse> {
  const response = await api.post<ActionResponse>("/auth/guest");
  return response.data;
}

// Refrest access token
export async function refrestTokens(
  refreshToken: string,
): Promise<ActionResponse> {
  const response = await api.post<ActionResponse>(
    "/auth/refresh",
    { refreshToken },
    {
      headers: {
        // Don't include auth header for refresh endpoint
        Authorization: undefined,
      },
    },
  );
  return response.data;
}

// Logout
export async function logout(): Promise<ActionResponse> {
  const response = await api.post<ActionResponse>("/auth/logout");
  return response.data;
}

// Convert Guest account to Regular user
export async function convertGuesttoUser(
  data: RegisterRequest,
): Promise<ActionResponse> {
  const response = await api.post<ActionResponse>("/auth/convert-guest", data);
  return response.data;
}

// Get user profile
export async function getUserProfile(): Promise<User> {
  const response = await api.get<User>("/profile");
  return response.data;
}
