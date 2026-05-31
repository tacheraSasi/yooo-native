import * as React from 'react';
import { useColorScheme, type ColorSchemeName } from 'react-native';
import type { ToastTheme } from './types';

export type YoooColorScheme = 'light' | 'dark';

export type YoooColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  warning: string;
  info: string;
};

const lightColors: YoooColors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceMuted: '#F2F2F7',
  text: '#232020',
  textMuted: '#4F4A4A',
  border: '#E6E3E3',
  primary: '#007AFF',
  primaryForeground: '#FFFFFF',
  destructive: '#FF3B30',
  destructiveForeground: '#FFFFFF',
  success: '#34C759',
  warning: '#FF9500',
  info: '#007AFF',
};

const darkColors: YoooColors = {
  background: '#0D0B0B',
  surface: '#181313',
  surfaceMuted: '#232020',
  text: '#FFFFFF',
  textMuted: '#C0BEBE',
  border: '#302B2B',
  primary: '#5AA7FF',
  primaryForeground: '#0D0B0B',
  destructive: '#FF6B63',
  destructiveForeground: '#0D0B0B',
  success: '#59F3A6',
  warning: '#FFD089',
  info: '#B3CDFF',
};

type YoooThemeContextValue = {
  theme: ToastTheme;
  scheme: YoooColorScheme;
  colors: YoooColors;
};

const YoooThemeContext = React.createContext<YoooThemeContextValue | null>(
  null
);

const resolveScheme = (
  theme: ToastTheme,
  systemScheme: ColorSchemeName
): YoooColorScheme => {
  if (theme === 'dark' || theme === 'light') return theme;
  return systemScheme === 'dark' ? 'dark' : 'light';
};

export type YoooProviderProps = {
  /**
   * Theme preference for all yooo-native components.
   * Defaults to `system`.
   */
  theme?: ToastTheme;
  children: React.ReactNode;
};

/**
 * Provides theme + color tokens to yooo-native UI components.
 * If `theme` is not specified, system theme is used.
 */
export const YoooProvider: React.FC<YoooProviderProps> = ({
  theme = 'system',
  children,
}) => {
  const systemScheme = useColorScheme();
  const scheme = resolveScheme(theme, systemScheme);
  const colors = React.useMemo(
    () => (scheme === 'dark' ? darkColors : lightColors),
    [scheme]
  );

  const value = React.useMemo<YoooThemeContextValue>(
    () => ({ theme, scheme, colors }),
    [theme, scheme, colors]
  );

  return (
    <YoooThemeContext.Provider value={value}>
      {children}
    </YoooThemeContext.Provider>
  );
};

/**
 * Returns the current theme + resolved color scheme.
 * Works with or without `YoooProvider` (falls back to system).
 */
export const useYoooTheme = (): YoooThemeContextValue & { isDark: boolean } => {
  const ctx = React.useContext(YoooThemeContext);
  const systemScheme = useColorScheme();

  const theme = ctx?.theme ?? 'system';
  const scheme = ctx?.scheme ?? resolveScheme(theme, systemScheme);
  const colors = ctx?.colors ?? (scheme === 'dark' ? darkColors : lightColors);

  return { theme, scheme, colors, isDark: scheme === 'dark' };
};

export const useYoooColors = (): YoooColors => {
  return useYoooTheme().colors;
};
