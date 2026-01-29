import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = {
    colors: {
      primary: '#FF6B35',
      secondary: '#004E89',
      accent: '#FFD23F',
      background: isDark ? '#121212' : '#FFFFFF',
      surface: isDark ? '#1E1E1E' : '#F5F5F5',
      text: isDark ? '#FFFFFF' : '#1A1A1A',
      textSecondary: isDark ? '#B0B0B0' : '#666666',
      border: isDark ? '#333333' : '#E0E0E0',
      error: '#FF3B30',
      success: '#34C759',
      warning: '#FF9500',
      info: '#007AFF',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      round: 9999,
    },
    typography: {
      h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
      h2: { fontSize: 24, fontWeight: 'bold', lineHeight: 32 },
      h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
      body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
      caption: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
      small: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      },
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
