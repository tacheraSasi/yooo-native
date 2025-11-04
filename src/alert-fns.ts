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
