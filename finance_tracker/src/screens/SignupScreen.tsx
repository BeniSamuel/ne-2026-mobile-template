import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { spacing } from '../theme/spacing';
import { AuthStackParamList } from '../types/navigation.types';
import { useAuth } from '../store/AuthContext';
import { validateSignup } from '../utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export function SignupScreen({ navigation }: Props) {
  const { signup, isLoading, error, clearError } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  async function handleSignup() {
    clearError();
    const validationError = validateSignup(fullName, email, password, confirmPassword);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError('');
    await signup({ fullName, email, password });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={commonStyles.screen}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Start recording your income and expenses today.</Text>

        <View style={styles.form}>
          <CustomInput label="Full Name" onChangeText={setFullName} value={fullName} />
          <CustomInput
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            value={email}
          />
          <CustomInput
            label="Password"
            onChangeText={setPassword}
            secureTextEntry
            value={password}
          />
          <CustomInput
            label="Confirm Password"
            onChangeText={setConfirmPassword}
            secureTextEntry
            value={confirmPassword}
          />
          {formError || error ? <Text style={styles.error}>{formError || error}</Text> : null}
          <CustomButton title="Sign up" loading={isLoading} onPress={handleSignup} />
          <CustomButton title="Back to login" variant="secondary" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  form: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    textAlign: 'center',
  },
});
