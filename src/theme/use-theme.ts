// src/theme/use-theme.ts
import { useColorScheme } from "react-native";
import { colors } from "./colors";

export function useCustomTheme() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  return colors[scheme];
}
