import * as React from 'react';
import {
  Animated,
  View,
  Text,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
} from 'react-native';
import { useYoooColors } from './theme';

export type ProgressSize = 'small' | 'medium' | 'large';

export type ProgressProps = {
  /** Progress value between 0 and 100 */
  value?: number;
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Color of the filled portion */
  color?: string;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom style for the track */
  style?: StyleProp<ViewStyle>;
  /** Custom style for the label */
  labelStyle?: StyleProp<TextStyle>;
};

const getHeight = (size: ProgressSize) => {
  switch (size) {
    case 'small':
      return 4;
    case 'large':
      return 12;
    default:
      return 8;
  }
};

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  size = 'medium',
  color,
  showLabel = false,
  style,
  labelStyle,
}) => {
  const colors = useYoooColors();
  const clamped = Math.min(100, Math.max(0, value));
  const animatedWidth = React.useRef(new Animated.Value(clamped)).current;

  React.useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: clamped,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, clamped]);

  const height = getHeight(size);
  const fillColor = color ?? colors.primary;

  const trackStyle: ViewStyle = {
    height,
    borderRadius: height / 2,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  };

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const fillStyle: ViewStyle = {
    height: '100%',
    borderRadius: height / 2,
    borderCurve: 'continuous',
    backgroundColor: fillColor,
  };

  const baseLabelStyle: TextStyle = {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'right',
  };

  return (
    <View>
      <View style={[trackStyle, style]}>
        <Animated.View style={[fillStyle, { width: widthInterpolated }]} />
      </View>
      {showLabel && (
        <Text style={[baseLabelStyle, labelStyle]}>{Math.round(clamped)}%</Text>
      )}
    </View>
  );
};
