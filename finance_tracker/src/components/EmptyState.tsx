import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function EmptyState({ title, message, icon = 'receipt-outline' }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} color={colors.primary} size={28} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  iconBox: {
    alignItems: 'center',
    backgroundColor: colors.chip,
    borderRadius: 18,
    height: 58,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 58,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  message: {
    color: colors.muted,
    fontSize: 14,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
