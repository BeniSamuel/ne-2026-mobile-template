import { Dimensions, StyleSheet, Text } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { expenseCategories } from '../constants/categories';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Expense } from '../types/expense.types';
import { getCategoryTotals, getMonthlyTotals } from '../utils/statistics';
import { ChartCard } from './ChartCard';
import { EmptyState } from './EmptyState';

const chartWidth = Dimensions.get('window').width - 64;
const pieColors = ['#2457FF', '#1BA672', '#F5A623', '#E04848', '#7B61FF', '#41B8D5'];

const chartConfig = {
  backgroundGradientFrom: colors.surface,
  backgroundGradientTo: colors.surface,
  color: (opacity = 1) => `rgba(36, 87, 255, ${opacity})`,
  decimalPlaces: 0,
  labelColor: () => colors.muted,
  propsForBackgroundLines: {
    stroke: colors.border,
  },
};

export function FinanceCharts({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return <EmptyState title="No chart data" message="Add an expense to see your charts." />;
  }

  const monthlyTotals = getMonthlyTotals(expenses);
  const categoryTotals = getCategoryTotals(expenses).filter((item) => item.total > 0);

  const barData = {
    labels: monthlyTotals.map((item) => item.month),
    datasets: [{ data: monthlyTotals.map((item) => item.total) }],
  };

  const pieData = categoryTotals.map((item, index) => ({
    name: item.category,
    amount: item.total,
    color: pieColors[index % pieColors.length],
    legendFontColor: colors.muted,
    legendFontSize: 12,
  }));

  return (
    <>
      <ChartCard title="Monthly expenses">
        <BarChart
          data={barData}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
          style={styles.chart}
        />
        <Text style={styles.hint}>Amounts are shown in RWF.</Text>
      </ChartCard>

      <ChartCard title="Expense categories">
        <PieChart
          data={pieData}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="8"
          absolute
        />
      </ChartCard>
    </>
  );
}

const styles = StyleSheet.create({
  chart: {
    borderRadius: 12,
    marginLeft: -spacing.sm,
  },
  hint: {
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
