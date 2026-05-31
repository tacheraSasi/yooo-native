import * as React from 'react';
import { View, type ViewStyle, type StyleProp } from 'react-native';
import { useYoooColors } from './theme';

export type SeparatorProps = {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  style?: StyleProp<ViewStyle>;
};

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  thickness = 1,
  style,
}) => {
  const colors = useYoooColors();
  const base: ViewStyle =
    orientation === 'vertical'
      ? { width: thickness, alignSelf: 'stretch' }
      : { height: thickness, alignSelf: 'stretch' };

  return <View style={[base, { backgroundColor: colors.border }, style]} />;
};
