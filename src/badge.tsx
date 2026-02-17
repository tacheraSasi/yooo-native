import React from 'react';
import { View, Text, type TextStyle, type ViewStyle } from 'react-native';

/**
 * Variant options for the Badge component
 */
export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Size options for the Badge component
 */
export type BadgeSize = 'small' | 'medium' | 'large';

/**
 * Props for the Badge component
 */
export interface BadgeProps {
  /** Content to display inside the badge */
  children: React.ReactNode;
  /** Visual style variant of the badge */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Custom container style */
  style?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Optional icon to display before the text */
  icon?: React.ReactNode;
}

/**
 * Badge component for displaying status indicators, labels, or counts
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="small">Error</Badge>
 * <Badge variant="info" icon={<InfoIcon />}>New</Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  style,
  textStyle,
  icon,
}) => {
  /**
   * Generates the container style based on size and variant
   * @returns The computed ViewStyle for the badge container
   */
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

  /**
   * Generates the text style based on size and variant
   * @returns The computed TextStyle for the badge text
   */
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
