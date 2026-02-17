import Svg, { type SvgProps, Circle, Path } from 'react-native-svg';

/**
 * Props for icon components
 */
interface IconProps extends SvgProps {
  /** Size of the icon in pixels (default: 24) */
  size?: number;
}

/**
 * Circle check icon - typically used for success states
 */
export const CircleCheck = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Circle cx={12} cy={12} r={10} />
    <Path d="m9 12 2 2 4-4" />
  </Svg>
);

/**
 * Circle X icon - typically used for error states
 */
export const CircleX = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Circle cx={12} cy={12} r={10} />
    <Path d="m15 9-6 6M9 9l6 6" />
  </Svg>
);

/**
 * Info icon - typically used for informational states
 */
export const Info = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Circle cx={12} cy={12} r={10} />
    <Path d="M12 16v-4M12 8h.01" />
  </Svg>
);

/**
 * Triangle alert icon - typically used for warning states
 */
export const TriangleAlert = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01" />
  </Svg>
);

/**
 * X icon - typically used for close buttons
 */
export const X = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);

/**
 * Loader icon - used for loading/spinner states
 */
export const Loader = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </Svg>
);

/**
 * Bell icon - typically used for notifications
 */
export const Bell = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Svg>
);

/**
 * Heart icon - typically used for favorites or likes
 */
export const Heart = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </Svg>
);

/**
 * Star icon - typically used for ratings or favorites
 */
export const Star = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);

/**
 * Check icon - typically used for confirmation or completion
 */
export const Check = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path d="M20 6 9 17l-5-5" />
  </Svg>
);

/**
 * Alert circle icon - typically used for alerts or warnings
 */
export const AlertCircle = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Circle cx={12} cy={12} r={10} />
    <Path d="M12 8v4M12 16h.01" />
  </Svg>
);

/**
 * Chevron right icon - typically used for navigation
 */
export const ChevronRight = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);

/**
 * Chevron down icon - typically used for dropdowns or expandable sections
 */
export const ChevronDown = ({ size, ...props }: IconProps) => (
  <Svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path d="m6 9 6 6 6-6" />
  </Svg>
);
