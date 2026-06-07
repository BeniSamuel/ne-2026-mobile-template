import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
}

export function CustomButton({
  title,
  onPress,
  loading = false,
  variant = 'primary',
  style,
}: CustomButtonProps) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[
        styles.button,
        isPrimary && styles.primary,
        !isPrimary && styles.secondary,
        isDanger && styles.danger,
        loading && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary || isDanger ? colors.surface : colors.primary} />
      ) : (
        <Text style={[styles.title, !isPrimary && !isDanger && styles.secondaryTitle]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 18,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.chip,
    borderColor: colors.border,
    borderWidth: 1,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  disabled: {
    opacity: 0.7,
  },
  title: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryTitle: {
    color: colors.primary,
  },
});
