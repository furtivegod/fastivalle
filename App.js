import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
          backgroundColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
        />
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
