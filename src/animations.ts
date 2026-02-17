import React from 'react';
import { withTiming } from 'react-native-reanimated';
import { easeInOutCubic, easeOutCirc } from './easings';
import { useToastContext } from './context';
import type { ToastPosition } from './types';

/**
 * Duration of toast animations in milliseconds
 */
export const ANIMATION_DURATION = 300;

/**
 * Hook that returns toast layout animations (entering and exiting) based on position
 * @param positionProp - The toast position, if undefined uses context position
 * @returns Object containing entering and exiting animation functions
 */
export const useToastLayoutAnimations = (
  positionProp: ToastPosition | undefined
) => {
  const { position: positionCtx } = useToastContext();
  const position = positionProp || positionCtx;

  return React.useMemo(
    () => ({
      entering: () => {
        'worklet';
        return getToastEntering({ position });
      },
      exiting: () => {
        'worklet';
        return getToastExiting({ position });
      },
    }),
    [position]
  );
};

/**
 * Parameters for toast animation functions
 */
type GetToastAnimationParams = {
  /** The position where the toast will appear */
  position: ToastPosition;
};

/**
 * Generates the entering animation configuration for a toast
 * @param params - Animation parameters including position
 * @returns Object with initial values and animations for entering
 */
export const getToastEntering = ({ position }: GetToastAnimationParams) => {
  'worklet';

  const animations = {
    opacity: withTiming(1, { easing: easeOutCirc }),
    transform: [
      { scale: withTiming(1, { easing: easeOutCirc }) },
      {
        translateY: withTiming(0, {
          easing: easeOutCirc,
        }),
      },
    ],
  };

  const translateY = (() => {
    if (position === 'top-center') {
      return -50;
    }

    if (position === 'bottom-center') {
      return 50;
    }

    return 0;
  })();

  const initialValues = {
    opacity: 0,
    transform: [
      { scale: 0 },
      {
        translateY,
      },
    ],
  };

  return {
    initialValues,
    animations,
  };
};

/**
 * Generates the exiting animation configuration for a toast
 * @param params - Animation parameters including position
 * @returns Object with initial values and animations for exiting
 */
export const getToastExiting = ({ position }: GetToastAnimationParams) => {
  'worklet';

  const translateY = (() => {
    if (position === 'top-center') {
      return -150;
    }

    if (position === 'bottom-center') {
      return 150;
    }

    return 50;
  })();

  const animations = {
    opacity: withTiming(0, { easing: easeInOutCubic }),
    transform: [
      {
        translateY: withTiming(translateY, {
          easing: easeInOutCubic,
        }),
      },
    ],
  };

  const initialValues = {
    opacity: 1,
    transform: [
      {
        translateY: 0,
      },
    ],
  };

  return {
    initialValues,
    animations,
  };
};
