import React from 'react';
import {
  Pressable,
  Text,
  type TextStyle,
  type ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { useYoooColors } from './theme';

/**
 * Variant options for the Button component
 */
export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';

/**
 * Size options for the Button component
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Props for the Button component
 */
export interface ButtonProps {
  /** Content to display inside the button */
  children: React.ReactNode;
  /** Callback function when button is pressed */
  onPress?: () => void;
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether to show a loading spinner */
  loading?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Position of the icon relative to text */
  iconPosition?: 'left' | 'right';
}

/**
 * Button component with multiple variants and sizes
 * @example
 * ```tsx
 * <Button onPress={handlePress}>Click me</Button>
 * <Button variant="destructive" size="large">Delete</Button>
 * <Button loading disabled>Loading...</Button>
 * <Button icon={<Icon />} iconPosition="left">With Icon</Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}) => {
  const colors = useYoooColors();

  /**
   * Generates the container style based on variant, size, and disabled state
   * @returns The computed ViewStyle for the button container
   */
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      paddingHorizontal: size === 'small' ? 12 : size === 'medium' ? 16 : 20,
      paddingVertical: size === 'small' ? 6 : size === 'medium' ? 10 : 14,
      gap: 8,
      borderCurve: 'continuous',
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: colors.primary,
      },
      secondary: {
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
      },
      destructive: {
        backgroundColor: colors.destructive,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    const disabledStyle: ViewStyle = disabled
      ? { opacity: 0.5 }
      : { opacity: 1 };

    return { ...baseStyle, ...variantStyles[variant], ...disabledStyle };
  };

  /**
   * Generates the text style based on size and variant
   * @returns The computed TextStyle for the button text
   */
  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: size === 'small' ? 14 : size === 'medium' ? 16 : 18,
      fontWeight: '600',
    };

    const variantTextStyles: Record<ButtonVariant, TextStyle> = {
      primary: {
        color: colors.primaryForeground,
      },
      secondary: {
        color: colors.text,
      },
      destructive: {
        color: colors.destructiveForeground,
      },
      ghost: {
        color: colors.primary,
      },
    };

    return { ...baseStyle, ...variantTextStyles[variant] };
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        getButtonStyle(),
        pressed &&
          !disabled &&
          !loading && [
            { opacity: 0.85 },
            variant === 'ghost'
              ? { backgroundColor: colors.surfaceMuted }
              : undefined,
          ],
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'destructive'
              ? colors.primaryForeground
              : colors.primary
          }
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={[getTextStyle(), textStyle]}>{children}</Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </Pressable>
  );
};
