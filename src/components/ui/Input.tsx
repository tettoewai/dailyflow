import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: "default" | "outline" | "ghost" | "error";
  size?: "sm" | "default" | "lg";
  containerClassName?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      variant = "default",
      size = "default",
      containerClassName,
      className,
      leftElement,
      rightElement,
      ...props
    },
    ref,
  ) => {
    // Base styles for the container (holds input + elements)
    const containerBase = "flex-row items-center relative rounded-md";

    // Variant styles – now applied to the container
    const variantContainer = {
      default: "bg-surface border border-border",
      outline: "bg-transparent border border-border",
      ghost: "bg-transparent border-0",
      error: "bg-surface border border-red-500",
    }[variant];

    // Size-specific padding and element positioning
    const sizeConfig = {
      sm: {
        inputPaddingY: "py-1.5",
        inputPaddingX: "px-2",
        inputPaddingLeft: "pl-8",
        inputPaddingRight: "pr-8",
        leftElementOffset: "left-2",
        rightElementOffset: "right-2",
      },
      default: {
        inputPaddingY: "py-2",
        inputPaddingX: "px-3",
        inputPaddingLeft: "pl-10",
        inputPaddingRight: "pr-10",
        leftElementOffset: "left-3",
        rightElementOffset: "right-3",
      },
      lg: {
        inputPaddingY: "py-3",
        inputPaddingX: "px-4",
        inputPaddingLeft: "pl-12",
        inputPaddingRight: "pr-12",
        leftElementOffset: "left-4",
        rightElementOffset: "right-4",
      },
    }[size];

    // Compute input padding: base padding + extra if element exists
    const leftPad = leftElement
      ? sizeConfig.inputPaddingLeft
      : sizeConfig.inputPaddingX;
    const rightPad = rightElement
      ? sizeConfig.inputPaddingRight
      : sizeConfig.inputPaddingX;

    // TextInput classes (no background/border – container handles that)
    const inputClasses = cn(
      "flex-1 text-foreground placeholder:text-muted",
      sizeConfig.inputPaddingY,
      leftPad,
      rightPad,
      className,
    );

    // Container classes
    const containerClasses = cn(containerBase, variantContainer, "w-full");

    return (
      <View className={cn("w-full", containerClassName)}>
        {label && (
          <Text className="text-sm font-medium text-foreground mb-1.5">
            {label}
          </Text>
        )}
        <View className={containerClasses}>
          {/* Left element (absolute) */}
          {leftElement && (
            <View
              className={`absolute ${sizeConfig.leftElementOffset} top-0 bottom-0 justify-center`}
            >
              {leftElement}
            </View>
          )}

          <TextInput
            ref={ref}
            className={inputClasses}
            placeholderTextColor="#9CA3AF"
            {...props}
          />

          {/* Right element (absolute) */}
          {rightElement && (
            <View
              className={`absolute ${sizeConfig.rightElementOffset} top-0 bottom-0 justify-center`}
            >
              {rightElement}
            </View>
          )}
        </View>
        {error && <Text className="text-sm text-red-500 mt-1">{error}</Text>}
      </View>
    );
  },
);

Input.displayName = "Input";

export default Input;
