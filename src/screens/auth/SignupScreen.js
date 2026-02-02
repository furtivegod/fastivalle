import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
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
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PhoneInput from 'react-native-phone-number-input';
import { useAuth } from '../../context/AuthContext';
import {
  signInWithApple as appleSignInNative,
  isAppleSignInSupported,
} from '../../services/authService';
import AuthScreenBackground from '../../components/AuthScreenBackground';

const SignupScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { register, signInWithGoogle, signInWithApple } = useAuth();
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtherMethods, setShowOtherMethods] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [emailConfirmPassword, setEmailConfirmPassword] = useState('');
  const phoneInputRef = React.useRef(null);
  const scrollViewRef = React.useRef(null);

  // Scroll to input when focused
  const scrollToInput = (yOffset) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
    }, 100);
  };

  // Dismiss keyboard when tapping outside
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    hasLetterNumberSpecial: false,
  });

  // Validate password on change
  useEffect(() => {
    const hasLength = password.length >= 8 && password.length <= 20;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    setPasswordValidation({
      length: hasLength,
      hasLetterNumberSpecial: hasLetter && hasNumber && hasSpecial,
    });
  }, [password]);

  const handlePhoneSignup = async () => {
    if (!phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!passwordValidation.length || !passwordValidation.hasLetterNumberSpecial) {
      Alert.alert('Error', 'Password does not meet requirements');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const phoneToUse = formattedPhone || phone;
      await register({ phone: phoneToUse, password });
      // Auth state update will trigger AppNavigator to show MainTabs
    } catch (err) {
      Alert.alert('Error', err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setShowOtherMethods(false);
      await signInWithGoogle();
      // Auth state update will trigger AppNavigator to show MainTabs
    } catch (error) {
      Alert.alert('Error', error.message || 'Google sign-up failed');
      console.log('Google Sign Up Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    try {
      setLoading(true);
      setShowOtherMethods(false);
      const appleResponse = await appleSignInNative();
      if (appleResponse) {
        await signInWithApple(appleResponse);
        // Auth state update will trigger AppNavigator to show MainTabs
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Apple sign-up failed');
      console.log('Apple Sign Up Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUpPress = () => {
    setShowEmailForm(true);
  };

  const handleEmailSignupSubmit = async () => {
    if (!email || !emailPassword || !emailConfirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (emailPassword.length < 8 || emailPassword.length > 20) {
      Alert.alert('Error', 'Password must be 8–20 characters');
      return;
    }
    const hasLetter = /[a-zA-Z]/.test(emailPassword);
    const hasNumber = /[0-9]/.test(emailPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(emailPassword);
    if (!hasLetter || !hasNumber || !hasSpecial) {
      Alert.alert('Error', 'Password must include letter, number and special character');
      return;
    }
    if (emailPassword !== emailConfirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register({ email: email.trim(), password: emailPassword, name: name.trim() || undefined });
      setShowEmailForm(false);
      setShowOtherMethods(false);
      // Auth state update will trigger AppNavigator to show MainTabs
    } catch (err) {
      Alert.alert('Error', err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const ValidationItem = ({ isValid, text }) => (
    <View style={styles.validationItem}>
      <View style={[styles.validationIcon, isValid && styles.validationIconValid]}>
        {isValid && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
      </View>
      <Text style={[styles.validationText, isValid && styles.validationTextValid]}>
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        {/* Lottie background with blur and gradient overlay */}
        <AuthScreenBackground lottieSource={require('../../../assets/lottie/log_in.json')} />

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={true}
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={true}
          onScrollBeginDrag={dismissKeyboard}
        >
          {/* Logo */}
          <Pressable onPress={dismissKeyboard}>
            <View style={styles.logoContainer}>
              <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
            </View>
          </Pressable>

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
              onChangeFormattedText={setFormattedPhone}
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
                keyboardType: 'phone-pad',
              }}
            />
          </View>

          {/* Create Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Create Password
            </Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
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
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!loading}
                onFocus={() => scrollToInput(120)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-outline'}
                  size={22}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            
            {/* Password Validation */}
            {password.length > 0 && (
              <View style={styles.validationContainer}>
                <ValidationItem
                  isValid={passwordValidation.length}
                  text="8-20 characters."
                />
                <ValidationItem
                  isValid={passwordValidation.hasLetterNumberSpecial}
                  text="At least one letter, number and special character"
                />
              </View>
            )}
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Confirm Password
            </Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  {
                    backgroundColor: '#FFFFFF',
                    color: theme.colors.text,
                    borderColor: confirmPassword.length > 0 && password !== confirmPassword
                      ? '#E53935'
                      : theme.colors.border,
                    borderWidth: confirmPassword.length > 0 && password !== confirmPassword ? 2 : 1,
                  },
                ]}
                placeholder="Enter password again"
                placeholderTextColor={theme.colors.textSecondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                editable={!loading}
                onFocus={() => scrollToInput(220)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye' : 'eye-outline'}
                  size={22}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            
            {/* Confirm Password Validation Messages */}
            {password.length > 0 && (!passwordValidation.length || !passwordValidation.hasLetterNumberSpecial) && (
              <Text style={styles.errorText}>Please enter a valid password</Text>
            )}
            {confirmPassword.length > 0 && password !== confirmPassword && (
              <Text style={styles.errorText}>Passwords don't match</Text>
            )}
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

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { borderColor: theme.colors.border }]} />
            <Text style={[styles.dividerText, { color: theme.colors.textSecondary }]}>
              or
            </Text>
            <View style={[styles.dividerLine, { borderColor: theme.colors.border }]} />
          </View>
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

      {/* Continue With Modal */}
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
            {/* Modal Handle */}
            <View style={styles.modalHandle} />
            
            {/* Modal Title */}
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              {showEmailForm ? 'Sign up with Email' : 'Continue with'}
            </Text>

            {showEmailForm ? (
              <View style={styles.modalOptions}>
                <TouchableOpacity
                  style={styles.modalBackButton}
                  onPress={() => setShowEmailForm(false)}
                  disabled={loading}
                >
                  <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
                  <Text style={[styles.modalBackText, { color: theme.colors.text }]}>Back</Text>
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  placeholder="Email"
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
                  ]}
                  placeholder="Name (optional)"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
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
                  ]}
                  placeholder="Password (8–20 chars)"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={emailPassword}
                  onChangeText={setEmailPassword}
                  secureTextEntry
                  autoCapitalize="none"
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
                  ]}
                  placeholder="Confirm password"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={emailConfirmPassword}
                  onChangeText={setEmailConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!loading}
                />
                <TouchableOpacity
                  style={[
                    styles.modalSubmitButton,
                    { backgroundColor: '#000000' },
                    loading && styles.buttonDisabled,
                  ]}
                  onPress={handleEmailSignupSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={[styles.modalSubmitText, { color: '#FFFFFF' }]}>
                      Sign Up
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              /* Continue Options */
              <View style={styles.modalOptions}>
                {/* Continue with Email */}
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleEmailSignUpPress}
                  disabled={loading}
                >
                  <Ionicons name="mail-outline" size={20} color={theme.colors.text} />
                  <Text style={[styles.continueButtonText, { color: theme.colors.text }]}>
                    Continue with Email
                  </Text>
                </TouchableOpacity>

                {/* Continue with Google */}
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleGoogleSignUp}
                  disabled={loading}
                >
                  <Ionicons name="logo-google" size={20} color="#DB4437" />
                  <Text style={[styles.continueButtonText, { color: theme.colors.text }]}>
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                {/* Continue with Apple */}
                {isAppleSignInSupported() && (
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleAppleSignUp}
                    disabled={loading}
                  >
                    <Ionicons name="logo-apple" size={20} color={theme.colors.text} />
                    <Text style={[styles.continueButtonText, { color: theme.colors.text }]}>
                      Continue with Apple
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </Pressable>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0',
  },
  flex: {
    flex: 1,
    backgroundColor: '#F5F5F0',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 20,
    paddingBottom: 40,
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
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
    borderRadius: 28,
    borderWidth: 1,
    width: '100%',
    height: 56,
  },
  phoneInputTextContainer: {
    borderRadius: 28,
    paddingVertical: 0,
    backgroundColor: '#FFFFFF',
  },
  phoneInputText: {
    fontSize: 16,
    height: 56,
  },
  flagButton: {
    paddingHorizontal: 16,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordInputWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  validationContainer: {
    marginTop: 12,
    paddingLeft: 4,
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  validationIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  validationIconValid: {
    backgroundColor: '#4CAF50',
  },
  validationText: {
    fontSize: 13,
    color: '#666666',
  },
  validationTextValid: {
    color: '#4CAF50',
  },
  errorText: {
    fontSize: 13,
    color: '#E53935',
    fontWeight: 'bold',
    marginTop: 8,
    paddingLeft: 4,
  },
  signupButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  otherMethodsButton: {
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  otherMethodsButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  modalOptions: {
    gap: 12,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F0',
    gap: 10,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  modalBackText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  modalSubmitButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  modalSubmitText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
