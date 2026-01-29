import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * Welcome screen: centered text, Get Started button, Log In link.
 * Background and header/subheader positions are simplified per design notes.
 */
const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>WELCOME TO</Text>
        <Text style={styles.subHeaderTitle}>CHRISTIAN MUSIC FESTIVAL</Text>
        <Text style={styles.mainTitle}>CREATE YOUR RHYTHM</Text>
        <Text style={styles.description}>
          A space to create, connect, and grow — where your faith, voice, and purpose come together.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Signup')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginPrompt}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8D6E63', // Warm brown/tan background
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subHeaderTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    minWidth: 240,
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  loginPrompt: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
