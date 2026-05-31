import * as React from 'react';
import {
  TextInput,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
  View,
} from 'react-native';
import { useYoooColors } from './theme';

export type InputProps = Omit<TextInputProps, 'style'> & {
  containerStyle?: ViewStyle;
  style?: TextStyle;
  error?: boolean;
};

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    { containerStyle, style, error = false, editable = true, ...props },
    ref
  ) => {
    const colors = useYoooColors();
    const [focused, setFocused] = React.useState(false);

    const baseContainer: ViewStyle = {
      borderRadius: 12,
      borderCurve: 'continuous',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: error
        ? colors.destructive
        : focused
          ? colors.primary
          : colors.border,
      paddingHorizontal: 12,
      paddingVertical: 10,
      opacity: editable === false ? 0.6 : 1,
    };

    const baseInput: TextStyle = {
      color: colors.text,
      fontSize: 16,
      padding: 0,
    };

    return (
      <View style={[baseContainer, containerStyle]}>
        <TextInput
          ref={ref}
          editable={editable}
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.primary}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
          style={[baseInput, style]}
        />
      </View>
    );
  }
);

Input.displayName = 'Input';
