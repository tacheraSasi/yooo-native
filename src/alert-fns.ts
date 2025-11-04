import type React from 'react';
import { getToastContext } from './toaster';
import { type alert as alertType } from './types';

type ExternalToast = {
  id?: string | number;
  duration?: number;
  position?: 'top-center' | 'bottom-center' | 'center';
  dismissible?: boolean;
  description?: string;
  icon?: React.ReactNode;
  action?: any;
  cancel?: any;
  close?: React.ReactNode;
  closeButton?: boolean;
  onDismiss?: (id: string | number) => void;
  onAutoClose?: (id: string | number) => void;
  onPress?: () => void;
};

export const alert: typeof alertType = (
  title: string,
  options?: ExternalToast
) => {
  return getToastContext().addToast({
    title,
    variant: 'info',
    duration: Infinity, // Don't auto-dismiss alerts
    dismissible: false, // Require explicit dismissal
    position: 'center',
    ...options,
  });
};

alert.success = (title: string, options: ExternalToast = {}) => {
  return getToastContext().addToast({
    ...options,
    title,
    variant: 'success',
    duration: Infinity,
    dismissible: false,
    position: 'center',
  });
};

alert.error = (title: string, options: ExternalToast = {}) => {
  return getToastContext().addToast({
    ...options,
    title,
    variant: 'error',
    duration: Infinity,
    dismissible: false,
    position: 'center',
  });
};

alert.warning = (title: string, options: ExternalToast = {}) => {
  return getToastContext().addToast({
    ...options,
    title,
    variant: 'warning',
    duration: Infinity,
    dismissible: false,
    position: 'center',
  });
};

alert.info = (title: string, options: ExternalToast = {}) => {
  return getToastContext().addToast({
    title,
    ...options,
    variant: 'info',
    duration: Infinity,
    dismissible: false,
    position: 'center',
  });
};

alert.confirm = (
  title: string,
  options: { onConfirm?: () => void; onCancel?: () => void } = {}
) => {
  return getToastContext().addToast({
    title,
    variant: 'info',
    duration: Infinity,
    dismissible: false,
    position: 'center',
    action: options.onConfirm
      ? {
          label: 'Confirm',
          onClick: () => {
            options.onConfirm?.();
            alert.dismiss();
          },
        }
      : undefined,
    cancel: options.onCancel
      ? {
          label: 'Cancel',
          onClick: () => {
            options.onCancel?.();
            alert.dismiss();
          },
        }
      : {
          label: 'Cancel',
          onClick: () => alert.dismiss(),
        },
    ...options,
  });
};

alert.custom = (jsx: React.ReactElement, options?: ExternalToast) => {
  return getToastContext().addToast({
    title: '',
    variant: 'info',
    jsx,
    duration: Infinity,
    dismissible: false,
    position: 'center',
    ...options,
  });
};

alert.dismiss = (id?: string | number) => {
  return getToastContext().dismissToast(id);
};

// Advanced dialog method that matches Alert.alert() API
alert.dialog = (
  title: string,
  message?: string,
  buttons?: Array<{
    text: string;
    style?: 'default' | 'cancel' | 'destructive';
    onPress?: () => void | Promise<void>;
  }>,
  options?: ExternalToast
) => {
  // If no buttons provided, default to "OK"
  if (!buttons || buttons.length === 0) {
    buttons = [{ text: 'OK', style: 'default' }];
  }

  // Find cancel and action buttons
  const cancelButton =
    buttons.find((btn) => btn.style === 'cancel') || buttons[0];
  const actionButtons = buttons.filter((btn) => btn.style !== 'cancel');
  const primaryAction = actionButtons[actionButtons.length - 1]; // Last non-cancel button is primary

  return getToastContext().addToast({
    title,
    description: message,
    variant: primaryAction?.style === 'destructive' ? 'error' : 'info',
    duration: Infinity,
    dismissible: false,
    position: 'center',

    // Primary action (rightmost button, usually the main action)
    action: primaryAction
      ? {
          label: primaryAction.text,
          onClick: async () => {
            try {
              await primaryAction.onPress?.();
            } catch (error) {
              console.error('Error in alert action:', error);
            } finally {
              alert.dismiss();
            }
          },
        }
      : undefined,

    // Cancel button (leftmost, or any button marked as cancel)
    cancel: cancelButton
      ? {
          label: cancelButton.text,
          onClick: async () => {
            try {
              await cancelButton.onPress?.();
            } catch (error) {
              console.error('Error in alert cancel:', error);
            } finally {
              alert.dismiss();
            }
          },
        }
      : undefined,

    // Custom styling based on button styles
    actionButtonStyle:
      primaryAction?.style === 'destructive'
        ? {
            backgroundColor: '#ff4444',
          }
        : undefined,

    actionButtonTextStyle:
      primaryAction?.style === 'destructive'
        ? {
            color: 'white',
            fontWeight: 'bold',
          }
        : undefined,

    ...options,
  });
};
