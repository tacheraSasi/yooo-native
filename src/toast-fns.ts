import { getToastContext } from './toaster';
import { type toast as toastType } from './types';

/**
 * Creates a default toast notification
 * @param title - The title/message to display
 * @param options - Optional configuration for the toast
 * @returns The ID of the created toast
 * @example
 * ```tsx
 * toast('Hello World');
 * toast('Custom toast', { duration: 3000 });
 * ```
 */
export const toast: typeof toastType = (title, options) => {
  return getToastContext().addToast({
    title,
    variant: 'info',
    ...options,
  });
};

/**
 * Creates a success toast notification with green styling
 * @param title - The success message to display
 * @param options - Optional configuration for the toast
 * @returns The ID of the created toast
 */
toast.success = (title, options = {}) => {
  return getToastContext().addToast({
    ...options,
    title,
    variant: 'success',
  });
};

/**
 * Triggers a wiggle animation on a specific toast
 * @param id - The ID of the toast to wiggle
 */
toast.wiggle = (id) => {
  return getToastContext().wiggleToast(id);
};

/**
 * Creates an error toast notification with red styling
 * @param title - The error message to display
 * @param options - Optional configuration for the toast
 * @returns The ID of the created toast
 */
toast.error = (title: string, options = {}) => {
  return getToastContext().addToast({
    ...options,
    title,
    variant: 'error',
  });
};

/**
 * Creates a warning toast notification with orange styling
 * @param title - The warning message to display
 * @param options - Optional configuration for the toast
 * @returns The ID of the created toast
 */
toast.warning = (title: string, options = {}) => {
  return getToastContext().addToast({
    ...options,
    title,
    variant: 'warning',
  });
};

/**
 * Creates an info toast notification with blue styling
 * @param title - The info message to display
 * @param options - Optional configuration for the toast
 * @returns The ID of the created toast
 */
toast.info = (title: string, options = {}) => {
  return getToastContext().addToast({
    title,
    ...options,
    variant: 'info',
  });
};

/**
 * Creates a toast that updates based on promise resolution
 * Shows loading state, then success or error based on promise result
 * @param promise - The promise to track
 * @param options - Configuration including loading, success, and error messages
 * @returns The ID of the created toast
 * @example
 * ```tsx
 * toast.promise(fetchData(), {
 *   loading: 'Loading...',
 *   success: (data) => `Loaded ${data}`,
 *   error: 'Failed to load'
 * });
 * ```
 */
toast.promise = (promise, options) => {
  return getToastContext().addToast({
    ...options,
    title: options.loading,
    variant: 'info',
    promiseOptions: {
      ...options,
      promise,
    },
  });
};

/**
 * Creates a toast with custom JSX content
 * @param jsx - The custom React element to display
 * @param options - Optional configuration for the toast
 * @returns The ID of the created toast
 */
toast.custom = (jsx, options) => {
  return getToastContext().addToast({
    title: '',
    variant: 'info',
    jsx,
    ...options,
  });
};

/**
 * Creates a loading toast notification with a spinner
 * @param title - The loading message to display
 * @param options - Optional configuration for the toast
 * @returns The ID of the created toast
 */
toast.loading = (title, options = {}) => {
  return getToastContext().addToast({
    title,
    variant: 'loading',
    ...options,
  });
};

/**
 * Dismisses a toast or all toasts
 * @param id - Optional ID of the toast to dismiss. If not provided, dismisses all toasts
 * @returns The ID of the dismissed toast or undefined
 */
toast.dismiss = (id) => {
  return getToastContext().dismissToast(id);
};
