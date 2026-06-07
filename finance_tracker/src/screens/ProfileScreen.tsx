import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { DashboardCard } from '../components/DashboardCard';
import { EmptyState } from '../components/EmptyState';
import { useAuth } from '../store/AuthContext';
import { useExpenses } from '../store/ExpenseContext';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { spacing } from '../theme/spacing';
import { formatCurrency } from '../utils/formatters';

export function ProfileScreen() {
  const { user, logout, isLoading } = useAuth();
  const { statistics, expenses, error } = useExpenses();

  if (!user) {
    return <EmptyState title="No profile" message="Login again to view your profile." icon="person-outline" />;
  }

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.content}>
      <Text style={commonStyles.title}>Profile</Text>
      <Text style={commonStyles.subtitle}>Your account and finance summary.</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={[commonStyles.card, styles.userCard]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.fullName.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <DashboardCard
          title="Total Expenses"
          value={formatCurrency(statistics.totalExpenses)}
          icon="cash-outline"
          highlighted
        />
        <DashboardCard
          title="Transactions"
          value={String(expenses.length)}
          icon="receipt-outline"
        />
      </View>

      <View style={[commonStyles.card, styles.actions]}>
        <CustomButton
          title="Edit profile"
          variant="secondary"
          onPress={() => Alert.alert('Edit profile', 'This action is a template placeholder.')}
        />
        <CustomButton title="Logout" variant="danger" loading={isLoading} onPress={logout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  avatarText: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: '900',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  email: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  error: {
    color: colors.danger,
    marginTop: spacing.md,
  },
});
