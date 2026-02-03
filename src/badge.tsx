import React from 'react';
import { View, Text, type TextStyle, type ViewStyle } from 'react-native';

export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  style,
  textStyle,
  icon,
}) => {
  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size === 'small' ? 10 : size === 'medium' ? 12 : 14,
      paddingHorizontal: size === 'small' ? 6 : size === 'medium' ? 8 : 10,
      paddingVertical: size === 'small' ? 2 : size === 'medium' ? 4 : 6,
      gap: 4,
    };

    const variantStyles: Record<BadgeVariant, ViewStyle> = {
      default: {
        backgroundColor: '#E5E5EA',
      },
      success: {
        backgroundColor: '#34C759',
      },
      error: {
        backgroundColor: '#FF3B30',
      },
      warning: {
        backgroundColor: '#FF9500',
      },
      info: {
        backgroundColor: '#007AFF',
      },
    };

    return { ...baseStyle, ...variantStyles[variant] };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: size === 'small' ? 10 : size === 'medium' ? 12 : 14,
      fontWeight: '600',
    };

    const variantTextStyles: Record<BadgeVariant, TextStyle> = {
      default: {
        color: '#000000',
      },
      success: {
        color: '#FFFFFF',
      },
      error: {
        color: '#FFFFFF',
      },
      warning: {
        color: '#FFFFFF',
      },
      info: {
        color: '#FFFFFF',
      },
    };

    return { ...baseStyle, ...variantTextStyles[variant] };
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      {icon && icon}
      <Text style={[getTextStyle(), textStyle]}>{children}</Text>
    </View>
  );
};
