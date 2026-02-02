/**
 * API and Auth configuration
 *
 * API: Set API_BASE_URL to your backend (e.g. http://localhost:5000 for dev).
 * - iOS Simulator: http://localhost:5000
 * - Android Emulator: http://10.0.2.2:5000 (set below via Platform)
 * - Physical device: use your machine's IP, e.g. http://192.168.1.100:5000
 */

import { Platform } from 'react-native';

const defaultBaseUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

export const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  defaultBaseUrl;

/**
 * Auth configuration for Google and Apple Sign-In
 *
 * SETUP INSTRUCTIONS:
 *
 * GOOGLE SIGN-IN:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create/select a project
 * 3. Enable "Google Sign-In" API
 * 4. Create OAuth 2.0 credentials:
 *    - Web client (for both iOS and Android): Copy the Client ID as webClientId
 *    - iOS client: Create OAuth client for iOS, add your bundle ID, copy Client ID as iosClientId
 *    - Android client: Create OAuth client for Android, add your package name (com.fastivalle) and SHA-1 fingerprint
 * 5. For iOS: Add the reversed client ID (e.g. com.googleusercontent.apps.XXXXX) to Info.plist URL scheme
 *
 * APPLE SIGN-IN:
 * 1. In Apple Developer portal, enable "Sign in with Apple" for your App ID
 * 2. In Xcode, add "Sign in with Apple" capability to your target
 * 3. Test on a real device (required for Apple Sign-In)
 */

export const GOOGLE_AUTH_CONFIG = {
  // Web Client ID from Google Cloud Console (OAuth 2.0 Web application)
  // Required for both iOS and Android
  webClientId:
    process.env.GOOGLE_WEB_CLIENT_ID ||
    'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',

  // iOS Client ID from Google Cloud Console (OAuth 2.0 iOS application)
  // Only needed for iOS - use the iOS-specific client ID
  iosClientId:
    process.env.GOOGLE_IOS_CLIENT_ID ||
    'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',

  // Optional: Use the reversed client ID for the iOS URL scheme
  // Format: com.googleusercontent.apps.YOUR_CLIENT_NUMBER
  // Add this to Info.plist CFBundleURLTypes
  getReversedClientId: () => {
    const webId = GOOGLE_AUTH_CONFIG.webClientId;
    const match = webId.match(/(\d+)-[\w-]+\.apps\.googleusercontent\.com/);
    if (match) {
      return `com.googleusercontent.apps.${match[1]}`;
    }
    return 'com.googleusercontent.apps.YOUR_REVERSED_CLIENT_ID';
  },
};
