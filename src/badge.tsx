import React from 'react';
import { View, Text, type TextStyle, type ViewStyle } from 'react-native';
import { useYoooColors } from './theme';

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
  const colors = useYoooColors();

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
      borderCurve: 'continuous',
    };

    const variantStyles: Record<BadgeVariant, ViewStyle> = {
      default: {
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
      },
      success: {
        backgroundColor: colors.success,
      },
      error: {
        backgroundColor: colors.destructive,
      },
      warning: {
        backgroundColor: colors.warning,
      },
      info: {
        backgroundColor: colors.info,
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
        color: colors.text,
      },
      success: {
        color: colors.primaryForeground,
      },
      error: {
        color: colors.destructiveForeground,
      },
      warning: {
        color: colors.destructiveForeground,
      },
      info: {
        color: colors.primaryForeground,
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
