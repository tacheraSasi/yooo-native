/**
 * @packageDocumentation
 * yooo-native - An opinionated toast and alert component for React Native
 *
 * This library provides toast notifications and alert dialogs with:
 * - Multiple variants (success, error, warning, info, loading)
 * - Promise-based toasts
 * - Swipe-to-dismiss gestures
 * - Customizable styling and theming
 * - Additional UI components (Button, Badge, Avatar, Card, Spinner)
 *
 * @example
 * ```tsx
 * import { Toaster, toast, alert } from 'yooo-native';
 *
 * // Add Toaster to your app root
 * <Toaster position="top-center" />
 *
 * // Show toasts
 * toast.success('Success!');
 * toast.error('Error occurred');
 *
 * // Show alerts
 * alert.confirm('Delete?', {
 *   onConfirm: () => deleteItem()
 * });
 * ```
 */

export { Toaster } from './toaster';
export { toast } from './toast-fns';
export { alert } from './alert-fns';

// Components
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from './button';
export { Spinner, type SpinnerProps, type SpinnerSize } from './spinner';
export {
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
} from './badge';
export { Avatar, type AvatarProps, type AvatarSize } from './avatar';
export { Card, type CardProps, type CardVariant } from './card';

// Icons
export {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
  X,
  Loader,
  Bell,
  Heart,
  Star,
  Check,
  AlertCircle,
  ChevronRight,
  ChevronDown,
} from './icons';
