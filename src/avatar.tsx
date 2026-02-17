import React from 'react';
import {
  View,
  Text,
  Image,
  type ViewStyle,
  type TextStyle,
  type ImageSourcePropType,
} from 'react-native';

/**
 * Size options for the Avatar component
 */
export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Props for the Avatar component
 */
export interface AvatarProps {
  /** Image source for the avatar */
  source?: ImageSourcePropType;
  /** Name to display initials from when no image is provided */
  name?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Custom container style */
  style?: ViewStyle;
  /** Custom text style for initials */
  textStyle?: TextStyle;
  /** Background color of the avatar */
  backgroundColor?: string;
  /** Text color for initials */
  textColor?: string;
}

/**
 * Avatar component that displays either an image or user initials
 * @example
 * ```tsx
 * <Avatar source={require('./user.jpg')} size="medium" />
 * <Avatar name="John Doe" size="large" backgroundColor="#FF0000" />
 * ```
 */
export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'medium',
  style,
  textStyle,
  backgroundColor = '#007AFF',
  textColor = '#FFFFFF',
}) => {
  /**
   * Gets the pixel size value based on the size prop
   * @returns The size in pixels
   */
  const getSizeValue = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'medium':
        return 40;
      case 'large':
        return 48;
      case 'xlarge':
        return 64;
      default:
        return 40;
    }
  };

  /**
   * Gets the font size for initials based on the size prop
   * @returns The font size in pixels
   */
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'medium':
        return 16;
      case 'large':
        return 20;
      case 'xlarge':
        return 24;
      default:
        return 16;
    }
  };

  /**
   * Extracts initials from a full name
   * @param fullName - The full name to extract initials from
   * @returns The initials (up to 2 characters)
   */
  const getInitials = (fullName: string): string => {
    const names = fullName
      .trim()
      .split(' ')
      .filter((n) => n.length > 0);
    if (names.length >= 2) {
      const firstInitial = names[0]?.[0];
      const lastInitial = names[names.length - 1]?.[0];
      if (firstInitial && lastInitial) {
        return `${firstInitial}${lastInitial}`.toUpperCase();
      }
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const sizeValue = getSizeValue();

  const containerStyle: ViewStyle = {
    width: sizeValue,
    height: sizeValue,
    borderRadius: sizeValue / 2,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  return (
    <View style={[containerStyle, style]}>
      {source ? (
        <Image
          source={source}
          style={{ width: sizeValue, height: sizeValue }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={[
            {
              color: textColor,
              fontSize: getFontSize(),
              fontWeight: '600',
            },
            textStyle,
          ]}
        >
          {name ? getInitials(name) : '?'}
        </Text>
      )}
    </View>
  );
};
