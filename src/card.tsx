import React from 'react';
import { View, type ViewStyle } from 'react-native';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  style,
}) => {
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
