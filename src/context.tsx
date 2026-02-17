import * as React from 'react';
import { type ToasterContextType } from './types';

/**
 * React context for toast notifications
 * Provides access to toast functionality throughout the component tree
 */
export const ToastContext = React.createContext<ToasterContextType | null>(
  null
);

/**
 * Hook to access the toast context
 * Must be used within a ToastProvider/Toaster component
 * @throws Error if used outside of a ToastProvider
 * @returns The toast context containing toast methods and configuration
 */
export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
