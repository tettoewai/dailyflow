import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../../global.css";
import { useAuthStore } from "@/lib/auth/authStore";

export default function RootLayout() {
  const { user, isLoading, restoreToken, accessToken } = useAuthStore();

  if (accessToken && user) {
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
