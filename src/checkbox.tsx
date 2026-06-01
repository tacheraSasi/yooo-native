import * as React from 'react';
import {
  Animated,
  Pressable,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useYoooColors } from './theme';

export type CheckboxSize = 'small' | 'medium' | 'large';

export type CheckboxProps = {
  /** Controlled checked state */
  value?: boolean;
  /** Initial value for uncontrolled usage */
  defaultValue?: boolean;
  /** Callback when checked state changes */
  onValueChange?: (checked: boolean) => void;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Size of the checkbox */
  size?: CheckboxSize;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Custom box style */
  boxStyle?: StyleProp<ViewStyle>;
};

const getMetrics = (size: CheckboxSize) => {
  switch (size) {
    case 'small':
      return { box: 18, icon: 12, radius: 4, strokeWidth: 2.5 };
    case 'large':
      return { box: 28, icon: 18, radius: 8, strokeWidth: 2 };
    default:
      return { box: 22, icon: 14, radius: 6, strokeWidth: 2.5 };
  }
};

export const Checkbox: React.FC<CheckboxProps> = ({
  value,
  defaultValue = false,
  onValueChange,
  disabled = false,
  size = 'medium',
  style,
  boxStyle,
}) => {
  const colors = useYoooColors();
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const isChecked = isControlled ? value : internalValue;

  const metrics = React.useMemo(() => getMetrics(size), [size]);
  const animatedValue = React.useRef(
    new Animated.Value(isChecked ? 1 : 0)
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isChecked ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, isChecked]);

  const onPress = React.useCallback(() => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  }, [disabled, isChecked, isControlled, onValueChange]);

  const boxBase: ViewStyle = {
    width: metrics.box,
    height: metrics.box,
    borderRadius: metrics.radius,
    borderCurve: 'continuous',
    borderWidth: 1.5,
    borderColor: isChecked ? colors.primary : colors.border,
    backgroundColor: isChecked ? colors.primary : 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.2, 1],
  });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ disabled, checked: !!isChecked }}
      disabled={disabled}
      style={style}
    >
      <Animated.View style={[boxBase, boxStyle]}>
        <Animated.View
          style={{ transform: [{ scale }], opacity: animatedValue }}
        >
          <Svg
            width={metrics.icon}
            height={metrics.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primaryForeground}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={metrics.strokeWidth}
          >
            <Path d="M20 6 9 17l-5-5" />
          </Svg>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};
