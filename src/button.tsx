import React from 'react';
import {
  Pressable,
  Text,
  type TextStyle,
  type ViewStyle,
  ActivityIndicator,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

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
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingHorizontal: size === 'small' ? 12 : size === 'medium' ? 16 : 20,
      paddingVertical: size === 'small' ? 6 : size === 'medium' ? 10 : 14,
      gap: 8,
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: '#007AFF',
      },
      secondary: {
        backgroundColor: '#E5E5EA',
      },
      destructive: {
        backgroundColor: '#FF3B30',
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

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: size === 'small' ? 14 : size === 'medium' ? 16 : 18,
      fontWeight: '600',
    };

    const variantTextStyles: Record<ButtonVariant, TextStyle> = {
      primary: {
        color: '#FFFFFF',
      },
      secondary: {
        color: '#000000',
      },
      destructive: {
        color: '#FFFFFF',
      },
      ghost: {
        color: '#007AFF',
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
        pressed && !disabled && !loading && { opacity: 0.7 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'destructive'
              ? '#FFFFFF'
              : '#007AFF'
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
