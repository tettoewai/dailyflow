import { useCustomTheme } from "@/theme/use-theme";
import LucideIcon from "@react-native-vector-icons/lucide";
import { Tabs } from "expo-router";
import { BottomTabBarButtonProps } from "expo-router/build/layouts/Tabs";
import React, { type ComponentProps, memo, useEffect, useMemo } from "react";
import { type ColorValue, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Constants
const TAB_BAR_CONTENT_HEIGHT = 56;
const CREATE_BUTTON_SIZE = 56;
const ALERT_BADGE_LIMIT = 99;
const ALERT_BADGE_COUNT = 3;

// Types
type LucideIconName = ComponentProps<typeof LucideIcon>["name"];
type TabRouteName =
  "index" | "dashboard" | "create" | "notification" | "setting";

interface TabConfig {
  name: TabRouteName;
  title: string;
  icon: LucideIconName;
  isSpecial?: boolean;
  showBadge?: boolean;
}

// Tab Configuration
const TAB_CONFIG: TabConfig[] = [
  { name: "index", title: "Home", icon: "house" },
  { name: "dashboard", title: "Stats", icon: "layout-grid" },
  { name: "create", title: "Create", icon: "plus", isSpecial: true },
  { name: "notification", title: "Alerts", icon: "bell", showBadge: true },
  { name: "setting", title: "Settings", icon: "settings" },
];

// Utility Functions
const getBadgeDisplay = (count: number): string | undefined => {
  if (count <= 0) return undefined;
  return count > ALERT_BADGE_LIMIT ? `${ALERT_BADGE_LIMIT}+` : String(count);
};

// Memoized Components
interface AnimatedTabIconProps {
  name: LucideIconName;
  color: ColorValue;
  focused: boolean;
  size?: number;
}

const AnimatedTabIcon = memo(
  ({ name, color, focused, size = 26 }: AnimatedTabIconProps) => {
    const scale = useSharedValue(1);

    useEffect(() => {
      scale.value = withSpring(focused ? 1.12 : 1, {
        damping: 14,
        stiffness: 160,
      });
    }, [focused, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <Animated.View style={animatedStyle}>
        <LucideIcon name={name} size={size} color={String(color)} />
      </Animated.View>
    );
  },
);

AnimatedTabIcon.displayName = "AnimatedTabIcon";

interface CreateTabButtonProps {
  onPress?: BottomTabBarButtonProps["onPress"];
  accessibilityState?: BottomTabBarButtonProps["accessibilityState"];
  primary: string;
  primaryForeground: string;
  surface: string;
}

const CreateTabButton = memo(
  ({
    onPress,
    accessibilityState,
    primary,
    primaryForeground,
    surface,
  }: CreateTabButtonProps) => {
    const focused = accessibilityState?.selected ?? false;
    const scale = useSharedValue(1);
    const rotate = useSharedValue(0);

    useEffect(() => {
      scale.value = withSpring(focused ? 1.08 : 1, {
        damping: 14,
        stiffness: 160,
      });
      rotate.value = withSpring(focused ? 45 : 0, {
        damping: 20,
        stiffness: 120,
      });
    }, [focused, scale, rotate]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const iconAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotate.value}deg` }],
    }));

    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Create new item"
        accessibilityHint="Opens the item creation interface"
        accessibilityState={accessibilityState}
        style={styles.createPressable}
      >
        {({ pressed }) => (
          <Animated.View
            style={[
              styles.createButton,
              animatedStyle,
              {
                backgroundColor: primary,
                opacity: pressed ? 0.88 : 1,
                borderColor: surface,
                borderWidth: focused ? 3 : 0,
                shadowColor: primary,
                shadowOpacity: focused ? 0.4 : 0.3,
              },
            ]}
          >
            <Animated.View style={iconAnimatedStyle}>
              <LucideIcon name="plus" size={30} color={primaryForeground} />
            </Animated.View>
          </Animated.View>
        )}
      </Pressable>
    );
  },
);

CreateTabButton.displayName = "CreateTabButton";

// Error Boundary Component
class TabErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <LucideIcon name="alert-circle" size={40} color="#ef4444" />
          <View style={styles.errorTextContainer}>
            <Animated.Text style={styles.errorTitle}>
              Something went wrong
            </Animated.Text>
            <Animated.Text style={styles.errorSubtitle}>
              Please try again later
            </Animated.Text>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

// Main Tab Layout Component
export default function TabLayout() {
  const theme = useCustomTheme();
  const insets = useSafeAreaInsets();

  const paddingBottom = Math.max(insets.bottom, 12);
  const tabBarHeight = TAB_BAR_CONTENT_HEIGHT + paddingBottom + 8;

  // Memoized screen options
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarActiveTintColor: theme.primary,
      tabBarInactiveTintColor: theme.muted,
      sceneStyle: {
        paddingBottom: tabBarHeight,
      },
      tabBarStyle: {
        backgroundColor: theme.background,
        borderTopColor: theme.border,
        borderTopWidth: StyleSheet.hairlineWidth,
        height: tabBarHeight,
        paddingBottom,
        paddingTop: 8,
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "absolute" as const,
        bottom: 0,
        left: 0,
        right: 0,
      },
      tabBarItemStyle: styles.tabBarItem,
      tabBarIconStyle: styles.tabBarIcon,
      tabBarButton: (props: BottomTabBarButtonProps) => (
        <Pressable
          onPress={props.onPress}
          onLongPress={props.onLongPress}
          accessibilityState={props.accessibilityState}
          accessibilityRole="tab"
          android_ripple={null}
          style={styles.tabButtonBase}
        >
          {props.children}
        </Pressable>
      ),
    }),
    [theme, paddingBottom, tabBarHeight],
  );

  // Render tabs based on configuration
  const renderTabs = useMemo(() => {
    return TAB_CONFIG.map((tab) => {
      const isCreateTab = tab.isSpecial;
      const displayBadge = tab.showBadge
        ? getBadgeDisplay(ALERT_BADGE_COUNT)
        : undefined;

      if (isCreateTab) {
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarLabel: () => null,
              tabBarAccessibilityLabel: tab.title,
              tabBarButton: (props: BottomTabBarButtonProps) => (
                <TabErrorBoundary>
                  <CreateTabButton
                    onPress={props.onPress}
                    accessibilityState={props.accessibilityState}
                    primary={theme.primary}
                    primaryForeground={theme.primaryForeground}
                    surface={theme.background}
                  />
                </TabErrorBoundary>
              ),
            }}
          />
        );
      }

      return (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <TabErrorBoundary>
                <AnimatedTabIcon
                  name={tab.icon}
                  color={color}
                  focused={focused}
                />
              </TabErrorBoundary>
            ),
            ...(displayBadge && {
              tabBarBadge: displayBadge,
              tabBarBadgeStyle: {
                backgroundColor: theme.danger,
                fontSize: 10,
                fontWeight: "700",
                minWidth: 18,
                height: 18,
                borderRadius: 999,
                marginTop: 4,
                ...(displayBadge.length > 2 && {
                  minWidth: 24,
                  paddingHorizontal: 4,
                }),
              },
            }),
          }}
        />
      );
    });
  }, [theme]);

  return <Tabs screenOptions={screenOptions}>{renderTabs}</Tabs>;
}

// Styles
const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  tabBarIcon: {
    width: 28,
    height: 28,
  },
  tabButtonBase: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createPressable: {
    top: -20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    width: CREATE_BUTTON_SIZE,
    height: CREATE_BUTTON_SIZE,
    borderRadius: CREATE_BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 12,
  },
  errorTextContainer: {
    alignItems: "center",
    gap: 4,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  errorSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
});

// Export types for use in other files
export type { TabConfig, TabRouteName };
