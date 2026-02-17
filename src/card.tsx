import React from 'react';
import { View, type ViewStyle } from 'react-native';

/**
 * Variant options for the Card component
 */
export type CardVariant = 'elevated' | 'outlined' | 'filled';

/**
 * Props for the Card component
 */
export interface CardProps {
  /** Content to display inside the card */
  children: React.ReactNode;
  /** Visual style variant of the card */
  variant?: CardVariant;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * Card component for displaying content with different elevation and border styles
 * @example
 * ```tsx
 * <Card variant="elevated">Elevated card content</Card>
 * <Card variant="outlined">Outlined card content</Card>
 * <Card variant="filled">Filled card content</Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  style,
}) => {
  /**
   * Generates the container style based on the variant
   * @returns The computed ViewStyle for the card container
   */
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      padding: 16,
      backgroundColor: '#FFFFFF',
    };

    const variantStyles: Record<CardVariant, ViewStyle> = {
      elevated: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      outlined: {
        borderWidth: 1,
        borderColor: '#E5E5EA',
      },
      filled: {
        backgroundColor: '#F2F2F7',
      },
    };

    return { ...baseStyle, ...variantStyles[variant] };
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
};
