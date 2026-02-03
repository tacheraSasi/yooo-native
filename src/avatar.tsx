import React from 'react';
import {
  View,
  Text,
  Image,
  type ViewStyle,
  type TextStyle,
  type ImageSourcePropType,
} from 'react-native';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'medium',
  style,
  textStyle,
  backgroundColor = '#007AFF',
  textColor = '#FFFFFF',
}) => {
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
