import React, { forwardRef } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import { cn } from "@/lib/utils";

export interface ButtonProps extends TouchableOpacityProps {
  variant?:
    "default" | "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "default" | "lg";
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const Button = forwardRef<typeof TouchableOpacity, ButtonProps>(
  (
    {
      variant = "primary",
      size = "default",
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Variant styles
    const variantStyles = {
      primary: {
        background: "bg-primary",
        text: "text-primary-foreground",
        border: "border-transparent",
        spinner: "#ffffff", // adjust to your primary-foreground
      },
      secondary: {
        background: "bg-secondary",
        text: "text-secondary-foreground",
        border: "border-transparent",
        spinner: "#ffffff",
      },
      outline: {
        background: "bg-transparent",
        text: "text-foreground",
        border: "border-border",
        spinner: "#000000",
      },
      ghost: {
        background: "bg-transparent",
        text: "text-foreground",
        border: "border-transparent",
        spinner: "#000000",
      },
      destructive: {
        background: "bg-destructive",
        text: "text-destructive-foreground",
        border: "border-transparent",
        spinner: "#ffffff",
      },
      default: {
        background: "bg-surface",
        text: "text-foreground",
        border: "border-border",
        spinner: "#000000",
      },
    }[variant];

    // Size styles
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      default: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }[size];

    // Base styles
    const baseStyles = "rounded-md flex-row items-center justify-center border";

    // Disabled state
    const disabledStyles = disabled || loading ? "opacity-50" : "";

    // Combine all classes
    const buttonClasses = cn(
      baseStyles,
      variantStyles.background,
      variantStyles.border,
      sizeStyles,
      disabledStyles,
      className,
    );

    const textClasses = cn(
      variantStyles.text,
      sizeStyles,
      "font-medium",
      loading && "opacity-0", // hide text when loading
    );

    return (
      <TouchableOpacity
        ref={ref as React.Ref<View>}
        className={buttonClasses}
        disabled={disabled || loading}
        activeOpacity={0.7}
        {...props}
      >
        {/* Left icon */}
        {leftIcon && !loading && <View className="mr-2">{leftIcon}</View>}

        {/* Children (text) */}
        {typeof children === "string" ? (
          <Text className={textClasses}>{children}</Text>
        ) : (
          children
        )}

        {/* Right icon */}
        {rightIcon && !loading && <View className="ml-2">{rightIcon}</View>}

        {/* Loading spinner (overlay) */}
        {loading && (
          <ActivityIndicator
            color={variantStyles.spinner}
            className="absolute"
          />
        )}
      </TouchableOpacity>
    );
  },
);

Button.displayName = "Button";

export default Button;
