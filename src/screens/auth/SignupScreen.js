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

// Configure Google Sign In (wrapped in try-catch to prevent crashes if not properly set up)
try {
  GoogleSignin.configure({
    webClientId: 'YOUR_WEB_CLIENT_ID', // From Google Cloud Console
    iosClientId: 'YOUR_IOS_CLIENT_ID', // From Google Cloud Console
  });
} catch (error) {
  console.log('Google Sign In configuration error:', error);
}

const SignupScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtherMethods, setShowOtherMethods] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const phoneInputRef = React.useRef(null);

  useEffect(() => {
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

  const handlePhoneSignup = () => {
    if (!phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const formattedPhone = phoneInputRef.current?.getFormattedNumber() || phone;
    console.log('Phone Signup:', { phone: formattedPhone, password });
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('MainTabs');
    }, 1000);
  };

  const handleEmailSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    console.log('Email Signup:', { name, email, password });
    setTimeout(() => {
      setLoading(false);
      setShowOtherMethods(false);
      navigation.navigate('MainTabs');
    }, 1000);
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('Google Sign Up:', userInfo);
      } else if (Platform.OS === 'web') {
        console.log('Web Google Sign Up');
      }
      setLoading(false);
      setShowOtherMethods(false);
      navigation.navigate('MainTabs');
    } catch (error) {
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled Google Sign Up');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign Up in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services not available');
      } else {
        Alert.alert('Error', 'Google sign-up failed');
        console.log('Google Sign Up Error:', error);
      }
    }
  };

  const handleAppleSignUp = async () => {
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
          console.log('Apple Sign Up:', appleAuthRequestResponse);
          setLoading(false);
          setShowOtherMethods(false);
          navigation.navigate('MainTabs');
        }
      }
    } catch (e) {
      setLoading(false);
      if (e.code === appleAuth.Error.CANCELED) {
        console.log('User cancelled Apple Sign Up');
      } else {
        Alert.alert('Error', 'Apple sign-up failed');
        console.log('Apple Sign Up Error:', e);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Lottie background with blur and gradient overlay */}
      <AuthScreenBackground lottieSource={require('../../../assets/lottie/ban_sup.lottie')} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Sign Up title */}
        <View style={styles.topHeader}>
          <Text style={[styles.screenTitle, { color: theme.colors.text }]}>
            Sign Up
          </Text>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={[styles.logo, { color: theme.colors.text }]}>
            Fastivalle™
          </Text>
        </View>

        {/* Join the Movement heading */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Join the Movement
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Phone Number Input */}
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

          {/* Create Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Create Password
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

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Confirm Password
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
              placeholder="Enter password again"
              placeholderTextColor={theme.colors.textSecondary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[
              styles.signupButton,
              { backgroundColor: '#000000' },
              loading && styles.buttonDisabled,
            ]}
            onPress={handlePhoneSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={[styles.signupButtonText, { color: '#FFFFFF' }]}>
                Sign Up
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

          {/* Sign Up With Other Methods Button */}
          <TouchableOpacity
            style={[
              styles.otherMethodsButton,
              { backgroundColor: '#FFFFFF', borderColor: theme.colors.border },
            ]}
            onPress={() => setShowOtherMethods(true)}
            disabled={loading}
          >
            <Text style={[styles.otherMethodsButtonText, { color: theme.colors.text }]}>
              Sign Up With Other Methods
            </Text>
          </TouchableOpacity>
        </View>

        {/* Log In Link */}
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: theme.colors.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginLink, { color: '#FF6B35' }]}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
                Other Sign Up Methods
              </Text>
              <TouchableOpacity onPress={() => setShowOtherMethods(false)}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalMethods}>
              {/* Email Signup */}
              <View style={styles.modalMethodSection}>
                <Text style={[styles.modalMethodLabel, { color: theme.colors.text }]}>
                  Full Name
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
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  editable={!loading}
                />
                <Text style={[styles.modalMethodLabel, { color: theme.colors.text }, styles.modalLabelMargin]}>
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
                <Text style={[styles.modalMethodLabel, { color: theme.colors.text }, styles.modalLabelMargin]}>
                  Password
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
                  placeholder="Create a password"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!loading}
                />
                <Text style={[styles.modalMethodLabel, { color: theme.colors.text }, styles.modalLabelMargin]}>
                  Confirm Password
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
                  placeholder="Confirm your password"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
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
                  onPress={handleEmailSignup}
                  disabled={loading}
                >
                  <Text style={[styles.modalButtonText, { color: theme.colors.background }]}>
                    {loading ? 'Creating Account...' : 'Sign Up with Email'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Social Sign Up Options */}
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
                  onPress={handleAppleSignUp}
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
                onPress={handleGoogleSignUp}
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
    backgroundColor: '#F5F5F0', // Light textured background
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
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
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
  signupButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signupButtonText: {
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
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
    maxHeight: '85%',
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
  modalLabelMargin: {
    marginTop: 16,
  },
  modalInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  modalButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
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

export default SignupScreen;
