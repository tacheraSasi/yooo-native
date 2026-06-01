import * as React from 'react';
import {
  Animated,
  Pressable,
  View,
  Text,
  Modal,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
} from 'react-native';
import { useYoooColors, type YoooColors } from './theme';

// ─── Types ──────────────────────────────────────────────────────────────

export type DialogProps = {
  /** Whether the dialog is visible */
  open: boolean;
  /** Callback when dialog should close */
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export type DialogContentProps = {
  /** Custom style for the dialog card */
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export type DialogHeaderProps = {
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export type DialogTitleProps = {
  /** Custom style */
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export type DialogDescriptionProps = {
  /** Custom style */
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export type DialogFooterProps = {
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

// ─── Context ────────────────────────────────────────────────────────────

type DialogContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  colors: YoooColors;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error('Dialog subcomponents must be used within Dialog');
  return ctx;
};

// ─── Dialog ─────────────────────────────────────────────────────────────

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  const colors = useYoooColors();

  const ctx = React.useMemo(
    () => ({ open, onOpenChange, colors }),
    [open, onOpenChange, colors]
  );

  return (
    <DialogContext.Provider value={ctx}>{children}</DialogContext.Provider>
  );
};

// ─── DialogContent ──────────────────────────────────────────────────────

export const DialogContent: React.FC<DialogContentProps> = ({
  style,
  children,
}) => {
  const { open, onOpenChange, colors } = useDialogContext();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [open, fadeAnim, scaleAnim]);

  const handleDismiss = React.useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => onOpenChange(false));
  }, [fadeAnim, scaleAnim, onOpenChange]);

  const overlayStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  };

  const cardStyle: ViewStyle = {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={handleDismiss}
      statusBarTranslucent
    >
      <Animated.View style={[overlayStyle, { opacity: fadeAnim }]}>
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={handleDismiss}
        />
        <Animated.View
          style={[cardStyle, { transform: [{ scale: scaleAnim }] }, style]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

// ─── DialogHeader ───────────────────────────────────────────────────────

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  style,
  children,
}) => {
  const headerStyle: ViewStyle = {
    marginBottom: 12,
  };

  return <View style={[headerStyle, style]}>{children}</View>;
};

// ─── DialogTitle ────────────────────────────────────────────────────────

export const DialogTitle: React.FC<DialogTitleProps> = ({
  style,
  children,
}) => {
  const { colors } = useDialogContext();

  const titleStyle: TextStyle = {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  };

  return (
    <Text accessibilityRole="header" style={[titleStyle, style]}>
      {children}
    </Text>
  );
};

// ─── DialogDescription ─────────────────────────────────────────────────

export const DialogDescription: React.FC<DialogDescriptionProps> = ({
  style,
  children,
}) => {
  const { colors } = useDialogContext();

  const descStyle: TextStyle = {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 20,
  };

  return <Text style={[descStyle, style]}>{children}</Text>;
};

// ─── DialogFooter ───────────────────────────────────────────────────────

export const DialogFooter: React.FC<DialogFooterProps> = ({
  style,
  children,
}) => {
  const footerStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 20,
  };

  return <View style={[footerStyle, style]}>{children}</View>;
};
