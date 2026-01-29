import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import LottieView from 'lottie-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Splash screen: animated orange 'F' (Lottie) on a textured green gradient.
 * Display duration is controlled by AppNavigator (max 2 seconds).
 */
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Green gradient background: lime at top → forest green at bottom */}
      <View style={styles.gradientBackground}>
        <View style={[styles.gradientLayer, styles.gradientTop]} />
        <View style={[styles.gradientLayer, styles.gradientMid]} />
        <View style={[styles.gradientLayer, styles.gradientBottom]} />
      </View>

      {/* Subtle texture/grain overlay for depth */}
      <View style={styles.textureOverlay} pointerEvents="none" />

      {/* Animated orange 'F' - Lottie (splash animation, max 2s total in AppNavigator) */}
      <View style={styles.lottieWrapper}>
        <LottieView
          source={require('../../assets/lottie/spl_scr_or.lottie')}
          autoPlay
          loop={false}
          style={styles.lottie}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E7D32', // Fallback forest green
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  gradientLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  gradientTop: {
    top: 0,
    height: '40%',
    backgroundColor: '#C8E6C9', // Light lime green
  },
  gradientMid: {
    top: '40%',
    height: '30%',
    backgroundColor: '#81C784', // Mid green
  },
  gradientBottom: {
    top: '70%',
    height: '30%',
    backgroundColor: '#2E7D32', // Forest green
  },
  textureOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    opacity: 0.5,
  },
  lottieWrapper: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_HEIGHT * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
