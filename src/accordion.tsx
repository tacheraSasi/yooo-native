import * as React from 'react';
import {
  Animated,
  Pressable,
  View,
  Text,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useYoooColors } from './theme';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ─── Types ──────────────────────────────────────────────────────────────

export type AccordionProps = {
  children: React.ReactNode;
  /** Allow multiple items open at once */
  multiple?: boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
};

export type AccordionItemProps = {
  /** Unique identifier */
  value: string;
  children: React.ReactNode;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
};

export type AccordionTriggerProps = {
  children: React.ReactNode;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom text style */
  textStyle?: StyleProp<TextStyle>;
};

export type AccordionContentProps = {
  children: React.ReactNode;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
};

// ─── Context ────────────────────────────────────────────────────────────

type AccordionContextValue = {
  expandedItems: Set<string>;
  toggle: (value: string) => void;
};

type AccordionItemContextValue = {
  value: string;
  isExpanded: boolean;
  disabled: boolean;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);
const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

// ─── Accordion ──────────────────────────────────────────────────────────

export const Accordion: React.FC<AccordionProps> = ({
  children,
  multiple = false,
  style,
}) => {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set()
  );

  const toggle = React.useCallback(
    (value: string) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpandedItems((prev) => {
        const next = new Set(multiple ? prev : []);
        if (prev.has(value)) {
          next.delete(value);
        } else {
          next.add(value);
        }
        return next;
      });
    },
    [multiple]
  );

  const ctx = React.useMemo(
    () => ({ expandedItems, toggle }),
    [expandedItems, toggle]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <View style={style}>{children}</View>
    </AccordionContext.Provider>
  );
};

// ─── AccordionItem ──────────────────────────────────────────────────────

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  disabled = false,
  style,
}) => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used within an Accordion');

  const colors = useYoooColors();
  const isExpanded = ctx.expandedItems.has(value);

  const itemCtx = React.useMemo(
    () => ({ value, isExpanded, disabled }),
    [value, isExpanded, disabled]
  );

  const itemStyle: ViewStyle = {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  };

  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <View style={[itemStyle, style]}>{children}</View>
    </AccordionItemContext.Provider>
  );
};

// ─── AccordionTrigger ───────────────────────────────────────────────────

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  style,
  textStyle,
}) => {
  const accordionCtx = React.useContext(AccordionContext);
  const itemCtx = React.useContext(AccordionItemContext);
  if (!accordionCtx || !itemCtx) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  const colors = useYoooColors();
  const rotateAnim = React.useRef(
    new Animated.Value(itemCtx.isExpanded ? 1 : 0)
  ).current;

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: itemCtx.isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [rotateAnim, itemCtx.isExpanded]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const triggerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    opacity: itemCtx.disabled ? 0.5 : 1,
  };

  const baseTriggerText: TextStyle = {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  };

  return (
    <Pressable
      onPress={() => !itemCtx.disabled && accordionCtx.toggle(itemCtx.value)}
      disabled={itemCtx.disabled}
      accessibilityRole="button"
      accessibilityState={{ expanded: itemCtx.isExpanded }}
      style={[triggerStyle, style]}
    >
      <Text style={[baseTriggerText, textStyle]}>{children}</Text>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.textMuted}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <Path d="m6 9 6 6 6-6" />
        </Svg>
      </Animated.View>
    </Pressable>
  );
};

// ─── AccordionContent ───────────────────────────────────────────────────

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  style,
}) => {
  const itemCtx = React.useContext(AccordionItemContext);
  if (!itemCtx) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }

  if (!itemCtx.isExpanded) return null;

  const contentStyle: ViewStyle = {
    paddingBottom: 14,
  };

  return <View style={[contentStyle, style]}>{children}</View>;
};
