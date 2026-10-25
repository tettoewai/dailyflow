import { useAuthStore } from "@/lib/auth/authStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

export default function RootLayout() {
  const { user, isLoading, restoreToken, accessToken } = useAuthStore();

  useEffect(() => {
    restoreToken();
  }, []);

  if (isLoading) {
    return (
      <GluestackUIProvider mode="dark">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </GluestackUIProvider>
    );
  }

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
