import * as React from 'react';
import {
  Animated,
  Pressable,
  View,
  Text,
  ScrollView,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
} from 'react-native';
import { useYoooColors } from './theme';

// ─── Types ──────────────────────────────────────────────────────────────

export type TabsProps = {
  /** Currently active tab value */
  value?: string;
  /** Default active tab for uncontrolled usage */
  defaultValue?: string;
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export type TabsListProps = {
  /** Custom style for the tab list container */
  style?: StyleProp<ViewStyle>;
  /** Allow horizontal scrolling for many tabs */
  scrollable?: boolean;
  children: React.ReactNode;
};

export type TabsTriggerProps = {
  /** The value this trigger activates */
  value: string;
  /** Whether this tab is disabled */
  disabled?: boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom text style */
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export type TabsContentProps = {
  /** The tab value this content belongs to */
  value: string;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

// ─── Context ────────────────────────────────────────────────────────────

type TabsContextValue = {
  activeValue: string | undefined;
  onValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

// ─── Tabs ───────────────────────────────────────────────────────────────

export const Tabs: React.FC<TabsProps> = ({
  value,
  defaultValue,
  onValueChange,
  style,
  children,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;

  const handleChange = React.useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  const ctx = React.useMemo(
    () => ({ activeValue, onValueChange: handleChange }),
    [activeValue, handleChange]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <View style={style}>{children}</View>
    </TabsContext.Provider>
  );
};

// ─── TabsList ───────────────────────────────────────────────────────────

export const TabsList: React.FC<TabsListProps> = ({
  style,
  scrollable = false,
  children,
}) => {
  const colors = useYoooColors();

  const listStyle: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 10,
    borderCurve: 'continuous',
    padding: 3,
    gap: 2,
  };

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[listStyle, style]}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[listStyle, style]}>{children}</View>;
};

// ─── TabsTrigger ────────────────────────────────────────────────────────

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  disabled = false,
  style,
  textStyle,
  children,
}) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs');

  const colors = useYoooColors();
  const isActive = ctx.activeValue === value;
  const animatedValue = React.useRef(
    new Animated.Value(isActive ? 1 : 0)
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, isActive]);

  const onPress = React.useCallback(() => {
    if (disabled) return;
    ctx.onValueChange(value);
  }, [disabled, ctx, value]);

  const bgColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colors.surface],
  });

  const triggerStyle: ViewStyle = {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  const triggerTextStyle: TextStyle = {
    fontSize: 14,
    fontWeight: isActive ? '600' : '500',
    color: isActive ? colors.text : colors.textMuted,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled }}
    >
      <Animated.View
        style={[
          triggerStyle,
          { backgroundColor: bgColor },
          isActive && {
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 1 },
            elevation: 1,
          },
          style,
        ]}
      >
        <Text style={[triggerTextStyle, textStyle]}>{children}</Text>
      </Animated.View>
    </Pressable>
  );
};

// ─── TabsContent ────────────────────────────────────────────────────────

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  style,
  children,
}) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error('TabsContent must be used within Tabs');

  if (ctx.activeValue !== value) return null;

  const contentStyle: ViewStyle = {
    paddingTop: 12,
  };

  return <View style={[contentStyle, style]}>{children}</View>;
};
