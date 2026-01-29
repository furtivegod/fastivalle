import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-number-input';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import AuthScreenBackground from '../../components/AuthScreenBackground';

// Configure Google Sign In
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // From Google Cloud Console
  iosClientId: 'YOUR_IOS_CLIENT_ID', // From Google Cloud Console
});

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtherMethods, setShowOtherMethods] = useState(false);
  const [email, setEmail] = useState('');
  const phoneInputRef = React.useRef(null);

  useEffect(() => {
    // Check if Google Sign In is available (only for Android)
    if (Platform.OS === 'android') {
      GoogleSignin.hasPlayServices()
        .then((hasPlayService) => {
          console.log('Google Play Services available:', hasPlayService);
        })
        .catch((error) => {
          console.log('Google Play Services error:', error);
        });
    }
  }, []);

  const handlePhoneLogin = () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    // TODO: Implement phone login logic
    const formattedPhone = phoneInputRef.current?.getFormattedNumber() || phone;
    console.log('Phone Login:', { phone: formattedPhone, password });
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('MainTabs');
    }, 1000);
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    // TODO: Implement email login logic
    console.log('Email Login:', { email, password });
    setTimeout(() => {
      setLoading(false);
      setShowOtherMethods(false);
      navigation.navigate('MainTabs');
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('Google Sign In:', userInfo);
      } else if (Platform.OS === 'web') {
        // Web Google Sign In implementation
        console.log('Web Google Sign In');
      }
      setLoading(false);
      setShowOtherMethods(false);
      navigation.navigate('MainTabs');
    } catch (error) {
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled Google Sign In');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign In in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services not available');
      } else {
        Alert.alert('Error', 'Google sign-in failed');
        console.log('Google Sign In Error:', error);
      }
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'ios' && appleAuth.isSupported) {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user
        );

        if (credentialState === appleAuth.State.AUTHORIZED) {
          console.log('Apple Sign In:', appleAuthRequestResponse);
          setLoading(false);
          setShowOtherMethods(false);
          navigation.navigate('MainTabs');
        }
      }
    } catch (e) {
      setLoading(false);
      if (e.code === appleAuth.Error.CANCELED) {
        console.log('User cancelled Apple Sign In');
      } else {
        Alert.alert('Error', 'Apple sign-in failed');
        console.log('Apple Sign In Error:', e);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Lottie background with blur and gradient overlay */}
      <AuthScreenBackground lottieSource={require('../../../assets/lottie/log_in.lottie')} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Log In title */}
        <View style={styles.topHeader}>
          <Text style={[styles.screenTitle, { color: theme.colors.text }]}>
            Log In
          </Text>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={[styles.logo, { color: theme.colors.text }]}>
            Fastivalle™
          </Text>
        </View>

        {/* Welcome Back */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Welcome Back
          </Text>
        </View>

        {/* Phone Number Input */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Phone Number
            </Text>
            <PhoneInput
              ref={phoneInputRef}
              defaultValue={phone}
              defaultCode="US"
              layout="first"
              onChangeText={setPhone}
              onChangeFormattedText={(text) => {
                setPhone(text);
              }}
              containerStyle={[
                styles.phoneInputContainer,
                { backgroundColor: '#FFFFFF', borderColor: theme.colors.border },
              ]}
              textContainerStyle={styles.phoneInputTextContainer}
              textInputStyle={[
                styles.phoneInputText,
                { color: theme.colors.text },
              ]}
              codeTextStyle={{ color: theme.colors.text }}
              flagButtonStyle={styles.flagButton}
              textInputProps={{
                placeholder: '(234) 555 678 901',
                placeholderTextColor: theme.colors.textSecondary,
              }}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Password
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: '#FFFFFF',
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              placeholder="Enter password"
              placeholderTextColor={theme.colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => {
              // TODO: Navigate to forgot password screen
            }}
          >
            <Text style={[styles.forgotPasswordText, { color: '#FF6B35' }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Log In Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: '#000000' },
              loading && styles.buttonDisabled,
            ]}
            onPress={handlePhoneLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={[styles.loginButtonText, { color: '#FFFFFF' }]}>
                Log In
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { borderColor: theme.colors.border }]} />
            <Text style={[styles.dividerText, { color: theme.colors.textSecondary }]}>
              or
            </Text>
            <View style={[styles.dividerLine, { borderColor: theme.colors.border }]} />
          </View>

          {/* Log In With Other Methods Button */}
          <TouchableOpacity
            style={[
              styles.otherMethodsButton,
              { backgroundColor: '#FFFFFF', borderColor: theme.colors.border },
            ]}
            onPress={() => setShowOtherMethods(true)}
            disabled={loading}
          >
            <Text style={[styles.otherMethodsButtonText, { color: theme.colors.text }]}>
              Log In With Other Methods
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, { color: theme.colors.textSecondary }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={[styles.signupLink, { color: '#FF6B35' }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Gradient Background - Using layered approach for cross-platform compatibility */}
      <View style={styles.gradientBackground} pointerEvents="none">
        <View style={[styles.gradientLayer, styles.gradientLayer1]} />
        <View style={[styles.gradientLayer, styles.gradientLayer2]} />
        <View style={[styles.gradientLayer, styles.gradientLayer3]} />
        <View style={[styles.gradientLayer, styles.gradientLayer4]} />
      </View>

      {/* Other Methods Modal */}
      <Modal
        visible={showOtherMethods}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOtherMethods(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowOtherMethods(false)}
        >
          <View
            style={[styles.modalContent, { backgroundColor: theme.colors.background }]}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Other Login Methods
              </Text>
              <TouchableOpacity onPress={() => setShowOtherMethods(false)}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalMethods}>
              {/* Email Login */}
              <View style={styles.modalMethodSection}>
                <Text style={[styles.modalMethodLabel, { color: theme.colors.text }]}>
                  Email
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  placeholder="Enter your email"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!loading}
                />
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                    styles.modalInputMargin,
                  ]}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!loading}
                />
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    { backgroundColor: theme.colors.primary },
                    loading && styles.buttonDisabled,
                  ]}
                  onPress={handleEmailLogin}
                  disabled={loading}
                >
                  <Text style={[styles.modalButtonText, { color: theme.colors.background }]}>
                    {loading ? 'Signing In...' : 'Log In with Email'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Social Login Options */}
              <View style={styles.modalDivider}>
                <View style={[styles.dividerLine, { borderColor: theme.colors.border }]} />
                <Text style={[styles.dividerText, { color: theme.colors.textSecondary }]}>
                  or
                </Text>
                <View style={[styles.dividerLine, { borderColor: theme.colors.border }]} />
              </View>

              {Platform.OS === 'ios' && appleAuth.isSupported && (
                <TouchableOpacity
                  style={[
                    styles.modalSocialButton,
                    styles.appleButton,
                    { backgroundColor: theme.colors.text },
                  ]}
                  onPress={handleAppleSignIn}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={theme.colors.background} />
                  ) : (
                    <>
                      <Ionicons name="logo-apple" size={20} color={theme.colors.background} />
                      <Text style={[styles.modalSocialButtonText, { color: theme.colors.background }]}>
                        Continue with Apple
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.modalSocialButton,
                  styles.googleButton,
                  { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                ]}
                onPress={handleGoogleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={theme.colors.text} />
                ) : (
                  <>
                    <Ionicons name="logo-google" size={20} color={theme.colors.text} />
                    <Text style={[styles.modalSocialButtonText, { color: theme.colors.text }]}>
                      Continue with Google
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    zIndex: 1,
  },
  topHeader: {
    marginBottom: 24,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', // Stylized script-like font
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  phoneInputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    width: '100%',
    height: 50,
  },
  phoneInputTextContainer: {
    borderRadius: 8,
    paddingVertical: 0,
    backgroundColor: '#FFFFFF',
  },
  phoneInputText: {
    fontSize: 16,
    height: 50,
  },
  flagButton: {
    paddingHorizontal: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  otherMethodsButton: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  otherMethodsButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalMethods: {
    gap: 20,
  },
  modalMethodSection: {
    gap: 12,
  },
  modalMethodLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  modalInputMargin: {
    marginTop: 0,
  },
  modalButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  modalSocialButton: {
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
  },
  appleButton: {
    borderWidth: 0,
  },
  googleButton: {
    borderWidth: 1,
  },
  modalSocialButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
