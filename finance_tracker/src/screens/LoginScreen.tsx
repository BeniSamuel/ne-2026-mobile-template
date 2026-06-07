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
import { validateLogin } from '../utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('password123');
  const [formError, setFormError] = useState('');

  async function handleLogin() {
    clearError();
    const validationError = validateLogin(email, password);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError('');
    await login({ email, password });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={commonStyles.screen}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.logo}>
          <Text style={styles.logoMark}>M</Text>
        </View>

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Track your daily spending and stay in control.</Text>

        <View style={styles.form}>
          <CustomInput
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            placeholder="student@example.com"
            value={email}
          />
          <CustomInput
            label="Password"
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            value={password}
          />
          {formError || error ? <Text style={styles.error}>{formError || error}</Text> : null}
          <CustomButton title="Login" loading={isLoading} onPress={handleLogin} />
          <CustomButton
            title="Create account"
            variant="secondary"
            onPress={() => navigation.navigate('Signup')}
          />
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
  logo: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    height: 64,
    justifyContent: 'center',
    marginBottom: spacing.xl,
    width: 64,
  },
  logoMark: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: '900',
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
