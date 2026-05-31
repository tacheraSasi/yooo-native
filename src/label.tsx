import * as React from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
import { useYoooColors } from './theme';

export type LabelProps = TextProps & {
  muted?: boolean;
};

export const Label: React.FC<LabelProps> = ({
  muted = false,
  style,
  ...props
}) => {
  const colors = useYoooColors();

  const base: TextStyle = {
    fontSize: 14,
    fontWeight: '600',
    color: muted ? colors.textMuted : colors.text,
  };

  return <Text {...props} style={[base, style]} />;
};
