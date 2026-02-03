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

export type SpinnerSize = 'small' | 'medium' | 'large';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  style?: ViewStyle;
}

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
