// src/theme/colors.ts
export const colors = {
  light: {
    background: "#ffffff",
    foreground: "#111827",
    primary: "#208aef",
    primaryForeground: "#ffffff",
    muted: "#9ca3af",
    surface: "#f3f4f6",
    border: "#e5e7eb",
    shadow: "rgba(0,0,0,0.08)",
    card: "#ffffff",
    danger: "#ef4444",
  },
  dark: {
    background: "#000000",
    foreground: "#ffffff",
    primary: "#208aef",
    primaryForeground: "#ffffff",
    muted: "#6b7280",
    surface: "#1f2937",
    border: "#374151",
    shadow: "rgba(0,0,0,0.3)",
    card: "#1a1a1a",
    danger: "#f87171",
  },
} as const;

export type ThemeColors = (typeof colors)["light"];
