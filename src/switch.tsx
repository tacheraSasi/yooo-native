import * as React from 'react';
import {
  Animated,
  Pressable,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { useYoooColors } from './theme';

export type SwitchSize = 'small' | 'medium';

export type SwitchProps = {
  value?: boolean;
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  style?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
};

const getMetrics = (size: SwitchSize) => {
  if (size === 'small') {
    return { trackWidth: 36, trackHeight: 22, thumbSize: 18, padding: 2 };
  }
  return { trackWidth: 44, trackHeight: 28, thumbSize: 24, padding: 2 };
};

export const Switch: React.FC<SwitchProps> = ({
  value,
  defaultValue = false,
  onValueChange,
  disabled = false,
  size = 'medium',
  style,
  trackStyle,
  thumbStyle,
}) => {
  const colors = useYoooColors();
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const isOn = isControlled ? value : internalValue;

  const metrics = React.useMemo(() => getMetrics(size), [size]);
  const translateMax =
    metrics.trackWidth - metrics.thumbSize - metrics.padding * 2;

  const animatedValue = React.useRef(new Animated.Value(isOn ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, isOn]);

  const onPress = React.useCallback(() => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  }, [disabled, isOn, isControlled, onValueChange]);

  const trackBase: ViewStyle = {
    width: metrics.trackWidth,
    height: metrics.trackHeight,
    borderRadius: 999,
    padding: metrics.padding,
    justifyContent: 'center',
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: isOn ? colors.primary : colors.border,
    backgroundColor: isOn ? colors.primary : colors.surfaceMuted,
    opacity: disabled ? 0.5 : 1,
  };

  const thumbBase: ViewStyle = {
    width: metrics.thumbSize,
    height: metrics.thumbSize,
    borderRadius: metrics.thumbSize / 2,
    backgroundColor: isOn ? colors.primaryForeground : colors.surface,
    borderCurve: 'continuous',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, translateMax],
  });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="switch"
      accessibilityState={{ disabled, checked: !!isOn }}
      disabled={disabled}
      style={style}
    >
      <Animated.View style={[trackBase, trackStyle]}>
        <Animated.View
          style={[
            thumbBase,
            thumbStyle,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};
