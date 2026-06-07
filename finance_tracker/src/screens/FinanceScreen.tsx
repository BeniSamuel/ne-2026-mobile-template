import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { DashboardCard } from '../components/DashboardCard';
import { EmptyState } from '../components/EmptyState';
import { FinanceCharts } from '../components/FinanceCharts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { TransactionCard } from '../components/TransactionCard';
import { expenseCategories } from '../constants/categories';
import { useExpenses } from '../store/ExpenseContext';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { spacing } from '../theme/spacing';
import { ExpenseCategory } from '../types/expense.types';
import { formatCurrency } from '../utils/formatters';

type FilterCategory = 'All' | ExpenseCategory;

export function FinanceScreen() {
  const { expenses, isLoading, isRefreshing, error, refreshExpenses, statistics } = useExpenses();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch =
        expense.title.toLowerCase().includes(search.toLowerCase()) ||
        expense.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || expense.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, selectedCategory]);

  if (isLoading && expenses.length === 0) {
    return <LoadingSpinner message="Loading transactions..." />;
  }

  return (
    <FlatList
      style={commonStyles.screen}
      contentContainerStyle={commonStyles.content}
      data={filteredExpenses}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refreshExpenses} tintColor={colors.primary} />
      }
      ListHeaderComponent={
        <>
          <Text style={commonStyles.title}>Finance</Text>
          <Text style={commonStyles.subtitle}>Search, filter, and analyze expenses.</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.summary}>
            <DashboardCard
              title="Total Expenses"
              value={formatCurrency(statistics.totalExpenses)}
              icon="cash-outline"
              highlighted
            />
            <DashboardCard
              title="Transactions"
              value={String(statistics.totalTransactions)}
              icon="receipt-outline"
            />
          </View>

          <View style={styles.searchBox}>
            <CustomInput
              label="Search expenses"
              placeholder="Food, transport, title..."
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
            {(['All', ...expenseCategories] as FilterCategory[]).map((category) => {
              const active = selectedCategory === category;

              return (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[styles.filterChip, active && styles.activeChip]}
                >
                  <Text style={[styles.filterText, active && styles.activeText]}>{category}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Text style={styles.sectionTitle}>Transactions</Text>
        </>
      }
      renderItem={({ item }) => <TransactionCard expense={item} />}
      ListEmptyComponent={
        <EmptyState
          title="No matching expenses"
          message="Try another search keyword or category filter."
        />
      }
      ListFooterComponent={<FinanceCharts expenses={expenses} />}
    />
  );
}

const styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  searchBox: {
    marginTop: spacing.md,
  },
  filters: {
    marginVertical: spacing.md,
  },
  filterChip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  activeText: {
    color: colors.surface,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  error: {
    color: colors.danger,
    marginTop: spacing.md,
  },
});
