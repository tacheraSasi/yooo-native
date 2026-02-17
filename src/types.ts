import type React from 'react';
import type { TextStyle, ViewProps, ViewStyle } from 'react-native';

/**
 * Common style props for toast components
 */
type StyleProps = {
  /** Whether to use minimal/no styling */
  unstyled?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Detailed custom styles for sub-components */
  styles?: {
    toastContainer?: ViewStyle;
    toast?: ViewStyle;
    toastContent?: ViewStyle;
    title?: TextStyle;
    description?: TextStyle;
    buttons?: ViewStyle;
    closeButton?: ViewStyle;
    closeButtonIcon?: ViewStyle;
  };
};

/**
 * Options for promise-based toasts
 */
type PromiseOptions = {
  /** The promise to track */
  promise: Promise<unknown>;
  /** Function to generate success message from result */
  success: (result: any) => string; // TODO: type this with generics
  /** Error message (string or function) */
  error: ((error: unknown) => string) | string;
  /** Loading message */
  loading: string;
};

/**
 * Position where toasts can appear on screen
 */
export type ToastPosition = 'top-center' | 'bottom-center' | 'center';

/**
 * Theme options for toasts
 */
export type ToastTheme = 'light' | 'dark' | 'system';

/**
 * Direction for swipe-to-dismiss gestures
 */
export type ToastSwipeDirection = 'left' | 'up';

/**
 * Visual variant of a toast
 */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';

/**
 * When to automatically trigger wiggle animation
 */
export type AutoWiggle = 'never' | 'toast-change' | 'always';

/**
 * Action button configuration for toasts
 */
export type ToastAction = {
  /** Button label text */
  label: string;
  /** Callback when button is clicked */
  onClick: () => void;
};

/**
 * Props for the Toast component
 */
export type ToastProps = StyleProps & {
  id: string | number;
  title: string;
  variant: ToastVariant;
  jsx?: React.ReactNode;
  description?: string;
  invert?: boolean;
  important?: boolean;
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  icon?: React.ReactNode;
  action?: ToastAction | React.ReactNode;
  cancel?: ToastAction | React.ReactNode;
  close?: React.ReactNode;
  closeButton?: boolean;
  richColors?: boolean;
  onDismiss?: (id: string | number) => void;
  onAutoClose?: (id: string | number) => void;
  promiseOptions?: PromiseOptions;
  actionButtonStyle?: ViewStyle;
  actionButtonTextStyle?: TextStyle;
  cancelButtonStyle?: ViewStyle;
  cancelButtonTextStyle?: TextStyle;
  onPress?: () => void;
};

/**
 * Ref handle for Toast component
 */
export type ToastRef = {
  /** Trigger wiggle animation */
  wiggle: () => void;
};

/**
 * Type guard to check if an action is a ToastAction
 * @param action - The action to check
 * @returns True if action is a ToastAction
 */
export function isToastAction(
  action: ToastAction | React.ReactNode
): action is ToastAction {
  return (action as ToastAction)?.onClick !== undefined;
}

/**
 * External toast options (subset of ToastProps for external API)
 */
type ExternalToast = Omit<
  ToastProps,
  'id' | 'type' | 'title' | 'jsx' | 'promise' | 'variant'
> & {
  id?: string | number;
};

/**
 * Props for the Toaster component
 */
export type ToasterProps = Omit<StyleProps, 'style'> & {
  duration?: number;
  theme?: ToastTheme;
  // richColors?: boolean; (false)
  // expand?: boolean; // hover not supported on mobile
  visibleToasts?: number;
  position?: ToastPosition;
  closeButton?: boolean;
  offset?: number;
  autoWiggleOnUpdate?: AutoWiggle;
  style?: ViewStyle;
  // dir?: 'ltr' | 'rtl'; (ltr)
  // hotkey?: string; // hotkeys not supported on mobile
  invert?: boolean;
  toastOptions?: {
    actionButtonStyle?: ViewStyle;
    actionButtonTextStyle?: TextStyle;
    cancelButtonStyle?: ViewStyle;
    cancelButtonTextStyle?: TextStyle;
    titleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    style?: ViewStyle;
    unstyled?: boolean;
    toastContainerStyle?: ViewStyle;
    toastContentStyle?: ViewStyle;
    buttonsStyle?: ViewStyle;
    closeButtonStyle?: ViewStyle;
    closeButtonIconStyle?: ViewStyle;
  };
  gap?: number;
  loadingIcon?: React.ReactNode;
  richColors?: boolean;
  // pauseWhenPageIsHidden?: boolean; (false)
  icons?: {
    success?: React.ReactNode;
    error?: React.ReactNode;
    warning?: React.ReactNode;
    info?: React.ReactNode;
    loading?: React.ReactNode;
  };
  swipeToDismissDirection?: ToastSwipeDirection;
  pauseWhenPageIsHidden?: boolean;
  ToasterOverlayWrapper?: React.ComponentType<{ children: React.ReactNode }>;
  ToastWrapper?: React.ComponentType<
    ViewProps & {
      children: React.ReactNode;
      toastId: string | number;
    }
  >;
};

/**
 * Handler function type for adding toasts
 */
export type AddToastContextHandler = (
  data: Omit<ToastProps, 'id'> & { id?: string | number }
) => string | number;

/**
 * Type for the toast context
 */
export type ToasterContextType = Required<
  Pick<
    ToasterProps,
    | 'duration'
    | 'swipeToDismissDirection'
    | 'closeButton'
    | 'position'
    | 'invert'
    | 'icons'
    | 'offset'
    | 'pauseWhenPageIsHidden'
    | 'gap'
    | 'theme'
    | 'toastOptions'
    | 'autoWiggleOnUpdate'
    | 'richColors'
  >
> & {
  addToast: AddToastContextHandler;
};

export declare const toast: ((
  message: string,
  data?: ExternalToast
) => string | number) & {
  success: (message: string, data?: ExternalToast) => string | number;
  info: (message: string, data?: ExternalToast) => string | number;
  error: (message: string, data?: ExternalToast) => string | number;
  warning: (message: string, data?: ExternalToast) => string | number;
  custom: (jsx: React.ReactElement, data?: ExternalToast) => string | number;
  promise: <T>(
    promise: Promise<T>,
    options: Omit<PromiseOptions, 'promise'>
  ) => string | number;
  loading: (message: string, data?: ExternalToast) => string | number;
  dismiss: (id?: string | number) => string | number | undefined;
  wiggle: (id: string | number) => void;
};

type AlertConfirmOptions = ExternalToast & {
  onConfirm?: () => void;
  onCancel?: () => void;
};

type AlertButton = {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void | Promise<void>;
};

export declare const alert: ((
  message: string,
  data?: ExternalToast
) => string | number) & {
  success: (message: string, data?: ExternalToast) => string | number;
  info: (message: string, data?: ExternalToast) => string | number;
  error: (message: string, data?: ExternalToast) => string | number;
  warning: (message: string, data?: ExternalToast) => string | number;
  confirm: (message: string, options?: AlertConfirmOptions) => string | number;
  dialog: (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: ExternalToast
  ) => string | number;
  custom: (jsx: React.ReactElement, data?: ExternalToast) => string | number;
  dismiss: (id?: string | number) => string | number | undefined;
};
