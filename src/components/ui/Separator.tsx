import { cn } from "@/lib/utils";
import { View, Text } from "react-native";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Separator = ({
  orientation = "horizontal",
  decorative = true,
  className,
  children,
  ...props
}: SeparatorProps) => {
  // If no children, render simple line
  if (!children) {
    return (
      <View
        role={decorative ? "none" : "separator"}
        aria-orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className,
        )}
        {...props}
      />
    );
  }

  // With children (like "Or"), render line + text + line
  return (
    <View
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      className={cn(
        "flex-row items-center",
        orientation === "horizontal" ? "w-full" : "h-full flex-col",
        className,
      )}
      {...props}
    >
      <View className="flex-1 h-[1px] bg-border" />
      <View className="px-3 bg-background">
        {typeof children === "string" ? (
          <Text className="text-sm text-muted-foreground">{children}</Text>
        ) : (
          children
        )}
      </View>
      <View className="flex-1 h-[1px] bg-border" />
    </View>
  );
};

export default Separator;
