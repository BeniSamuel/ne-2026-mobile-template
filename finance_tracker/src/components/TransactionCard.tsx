import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Expense } from '../types/expense.types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { spacing } from '../theme/spacing';

const categoryIcons: Record<Expense['category'], keyof typeof Ionicons.glyphMap> = {
  Food: 'fast-food-outline',
  Transport: 'bus-outline',
  Shopping: 'bag-outline',
  Utilities: 'flash-outline',
  Entertainment: 'film-outline',
  Other: 'wallet-outline',
};

export function TransactionCard({ expense }: { expense: Expense }) {
  return (
    <View style={[commonStyles.card, styles.card]}>
      <View style={styles.iconBox}>
        <Ionicons name={categoryIcons[expense.category]} size={22} color={colors.primary} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.meta}>
          {expense.category} • {formatDate(expense.date)}
        </Text>
      </View>
      <Text style={styles.amount}>-{formatCurrency(expense.amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
    paddingVertical: 12,
  },
  iconBox: {
    alignItems: 'center',
    backgroundColor: colors.chip,
    borderRadius: 13,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  details: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 3,
  },
  amount: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '800',
  },
});
