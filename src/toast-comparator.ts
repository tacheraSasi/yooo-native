import { isToastAction, type ToastProps } from './types';

/**
 * Compares two toast actions for equality
 * @param a - First toast action to compare
 * @param b - Second toast action to compare
 * @returns True if actions are equal, false otherwise
 */
const areActionsEqual = (a: ToastProps['action'], b: ToastProps['action']) => {
  if (isToastAction(a) && isToastAction(b)) {
    if (a.label !== b.label) return false;
    return true;
  }

  return true;
};

/**
 * Compares two toast objects for equality based on their key properties
 * Used to determine if a toast needs to be re-rendered
 * @param a - First toast to compare
 * @param b - Second toast to compare
 * @returns True if toasts are equal, false otherwise
 */
export const areToastsEqual = (a: ToastProps, b: ToastProps) => {
  return (
    a.id === b.id &&
    a.title === b.title &&
    a.variant === b.variant &&
    a.description === b.description &&
    a.closeButton === b.closeButton &&
    a.invert === b.invert &&
    a.position === b.position &&
    a.dismissible === b.dismissible &&
    areActionsEqual(a.action, b.action) &&
    areActionsEqual(a.cancel, b.cancel)
  );
};
