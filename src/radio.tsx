import * as React from 'react';
import {
  Animated,
  Pressable,
  View,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { useYoooColors } from './theme';

// ─── RadioGroup Context ─────────────────────────────────────────────────

type RadioGroupContextValue = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled: boolean;
  size: RadioSize;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
);

// ─── Types ──────────────────────────────────────────────────────────────

export type RadioSize = 'small' | 'medium' | 'large';

export type RadioGroupProps = {
  /** Currently selected value */
  value?: string;
  /** Initial value for uncontrolled usage */
  defaultValue?: string;
  /** Callback when selection changes */
  onValueChange?: (value: string) => void;
  /** Whether all radios in the group are disabled */
  disabled?: boolean;
  /** Size of all radios in the group */
  size?: RadioSize;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export type RadioProps = {
  /** The value this radio represents */
  value: string;
  /** Whether this specific radio is disabled */
  disabled?: boolean;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Custom outer circle style */
  circleStyle?: StyleProp<ViewStyle>;
};

// ─── Metrics ────────────────────────────────────────────────────────────

const getMetrics = (size: RadioSize) => {
  switch (size) {
    case 'small':
      return { outer: 18, inner: 8 };
    case 'large':
      return { outer: 28, inner: 14 };
    default:
      return { outer: 22, inner: 10 };
  }
};

// ─── RadioGroup ─────────────────────────────────────────────────────────

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  size = 'medium',
  direction = 'vertical',
  style,
  children,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = React.useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  const ctx = React.useMemo<RadioGroupContextValue>(
    () => ({
      value: currentValue,
      onValueChange: handleChange,
      disabled,
      size,
    }),
    [currentValue, handleChange, disabled, size]
  );

  const containerStyle: ViewStyle = {
    flexDirection: direction === 'horizontal' ? 'row' : 'column',
    gap: direction === 'horizontal' ? 16 : 10,
  };

  return (
    <RadioGroupContext.Provider value={ctx}>
      <View style={[containerStyle, style]}>{children}</View>
    </RadioGroupContext.Provider>
  );
};

// ─── Radio ──────────────────────────────────────────────────────────────

export const Radio: React.FC<RadioProps> = ({
  value,
  disabled: itemDisabled = false,
  style,
  circleStyle,
}) => {
  const ctx = React.useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error('Radio must be used within a RadioGroup');
  }

  const colors = useYoooColors();
  const isSelected = ctx.value === value;
  const isDisabled = ctx.disabled || itemDisabled;
  const metrics = React.useMemo(() => getMetrics(ctx.size), [ctx.size]);

  const animatedValue = React.useRef(
    new Animated.Value(isSelected ? 1 : 0)
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isSelected ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, isSelected]);

  const onPress = React.useCallback(() => {
    if (isDisabled) return;
    ctx.onValueChange(value);
  }, [isDisabled, ctx, value]);

  const outerStyle: ViewStyle = {
    width: metrics.outer,
    height: metrics.outer,
    borderRadius: metrics.outer / 2,
    borderWidth: 1.5,
    borderColor: isSelected ? colors.primary : colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isDisabled ? 0.5 : 1,
  };

  const innerStyle: ViewStyle = {
    width: metrics.inner,
    height: metrics.inner,
    borderRadius: metrics.inner / 2,
    backgroundColor: colors.primary,
  };

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.2, 1],
  });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ disabled: isDisabled, selected: isSelected }}
      disabled={isDisabled}
      style={style}
    >
      <View style={[outerStyle, circleStyle]}>
        <Animated.View
          style={[
            innerStyle,
            { transform: [{ scale }], opacity: animatedValue },
          ]}
        />
      </View>
    </Pressable>
  );
};
