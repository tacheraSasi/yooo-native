import * as React from 'react';
import {
  TextInput,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
  View,
} from 'react-native';
import { useYoooColors } from './theme';

export type TextAreaProps = Omit<TextInputProps, 'style' | 'multiline'> & {
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom text style */
  style?: TextStyle;
  /** Show error border */
  error?: boolean;
  /** Number of visible lines (sets minHeight) */
  rows?: number;
};

export const TextArea = React.forwardRef<TextInput, TextAreaProps>(
  (
    {
      containerStyle,
      style,
      error = false,
      editable = true,
      rows = 4,
      ...props
    },
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
      minHeight: rows * 22 + 20,
      opacity: editable === false ? 0.6 : 1,
    };

    const baseInput: TextStyle = {
      color: colors.text,
      fontSize: 16,
      padding: 0,
      textAlignVertical: 'top',
    };

    return (
      <View style={[baseContainer, containerStyle]}>
        <TextInput
          ref={ref}
          editable={editable}
          multiline
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

TextArea.displayName = 'TextArea';
