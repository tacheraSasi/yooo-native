import * as React from 'react';
import { Animated, View, type ViewStyle, type StyleProp } from 'react-native';
import { useYoooColors } from './theme';

export type SkeletonVariant = 'rectangular' | 'circular' | 'text';

export type SkeletonProps = {
  /** Width of the skeleton */
  width?: number | string;
  /** Height of the skeleton */
  height?: number;
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Border radius (overrides variant default) */
  borderRadius?: number;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  variant = 'rectangular',
  borderRadius: customRadius,
  style,
}) => {
  const colors = useYoooColors();
  const animatedValue = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const getRadius = () => {
    if (customRadius !== undefined) return customRadius;
    switch (variant) {
      case 'circular':
        return typeof height === 'number' ? height / 2 : 999;
      case 'text':
        return 4;
      default:
        return 8;
    }
  };

  const baseStyle: ViewStyle = {
    width: variant === 'circular' ? height : (width as any),
    height,
    borderRadius: getRadius(),
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  };

  return (
    <View style={[baseStyle, style]}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: colors.border,
          opacity: animatedValue,
        }}
      />
    </View>
  );
};
