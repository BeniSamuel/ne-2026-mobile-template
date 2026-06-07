import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DashboardCard } from '../components/DashboardCard';
import { EmptyState } from '../components/EmptyState';
import { FinanceCharts } from '../components/FinanceCharts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { TransactionCard } from '../components/TransactionCard';
import { useAuth } from '../store/AuthContext';
import { useExpenses } from '../store/ExpenseContext';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { spacing } from '../theme/spacing';
import { formatCurrency } from '../utils/formatters';

export function HomeScreen() {
  const { user } = useAuth();
  const { expenses, isLoading, error, statistics } = useExpenses();
  const latestExpenses = expenses.slice(0, 3);

  if (isLoading && expenses.length === 0) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.content}>
      <Text style={styles.greeting}>Hello, {user?.fullName.split(' ')[0] || 'Student'}</Text>
      <Text style={commonStyles.title}>Overview</Text>
      <Text style={commonStyles.subtitle}>Your money summary for this month.</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.summaryGrid}>
        <DashboardCard
          title="Total Income"
          value={formatCurrency(statistics.totalIncome)}
          icon="arrow-down-circle-outline"
        />
        <DashboardCard
          title="Expenses"
          value={formatCurrency(statistics.totalExpenses)}
          icon="arrow-up-circle-outline"
          highlighted
        />
      </View>

      <View style={styles.summaryGrid}>
        <DashboardCard
          title="Balance"
          value={formatCurrency(statistics.balance)}
          icon="wallet-outline"
        />
        <DashboardCard
          title="Transactions"
          value={String(statistics.totalTransactions)}
          icon="list-outline"
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest entries</Text>
      </View>

      {latestExpenses.length === 0 ? (
        <EmptyState title="No expenses yet" message="Use the Add tab to record your first expense." />
      ) : (
        latestExpenses.map((expense) => <TransactionCard key={expense.id} expense={expense} />)
      )}

      <FinanceCharts expenses={expenses} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  greeting: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  sectionHeader: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  error: {
    color: colors.danger,
    marginTop: spacing.md,
  },
});
