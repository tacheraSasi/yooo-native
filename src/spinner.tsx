import React, { useEffect } from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Loader } from './icons';

/**
 * Size options for the Spinner component
 */
export type SpinnerSize = 'small' | 'medium' | 'large';

/**
 * Props for the Spinner component
 */
export interface SpinnerProps {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Color of the spinner */
  color?: string;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * Spinner component that displays an animated loading indicator
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="large" color="#FF0000" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = '#007AFF',
  style,
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  /**
   * Gets the pixel size value based on the size prop
   * @returns The size in pixels
   */
  const getSizeValue = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 24;
      case 'large':
        return 32;
      default:
        return 24;
    }
  };

  const sizeValue = getSizeValue();

  return (
    <View style={[{ width: sizeValue, height: sizeValue }, style]}>
      <Animated.View style={animatedStyle}>
        <Loader size={sizeValue} color={color} />
      </Animated.View>
    </View>
  );
};
