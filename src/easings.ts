import { Easing } from 'react-native-reanimated';

/**
 * Cubic ease-in-out easing function for smooth animations
 * Bezier curve: (0.645, 0.045, 0.355, 1)
 */
export const easeInOutCubic = Easing.bezier(0.645, 0.045, 0.355, 1);

/**
 * Circular ease-out easing function for smooth deceleration
 * Bezier curve: (0.075, 0.82, 0.165, 1)
 */
export const easeOutCirc = Easing.bezier(0.075, 0.82, 0.165, 1);

/**
 * Circular ease-in-out easing function (as a function)
 * Bezier curve: (0.785, 0.135, 0.15, 0.86)
 */
export const easeInOutCircFn = Easing.bezierFn(0.785, 0.135, 0.15, 0.86);
