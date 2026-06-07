import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { expenseCategories } from '../constants/categories';
import { useExpenses } from '../store/ExpenseContext';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { spacing } from '../theme/spacing';
import { ExpenseCategory } from '../types/expense.types';
import { formatDate, toInputDate } from '../utils/formatters';
import { validateExpense } from '../utils/validation';

export function AddExpenseScreen() {
  const { addExpense, isLoading, error } = useExpenses();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleAddExpense() {
    const selectedDate = toInputDate(date);
    const validationError = validateExpense(title, amount, category, selectedDate);

    if (validationError) {
      setFormError(validationError);
      setSuccessMessage('');
      return;
    }

    setFormError('');
    const saved = await addExpense({
      title,
      amount: Number(amount),
      category,
      date: selectedDate,
    });

    if (saved) {
      setTitle('');
      setAmount('');
      setCategory('Food');
      setDate(new Date());
      setSuccessMessage('Expense added successfully.');
    }
  }

  function handleDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (Platform.OS !== 'ios') {
      setShowPicker(false);
    }

    if (event.type !== 'dismissed' && selectedDate) {
      setDate(selectedDate);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={commonStyles.screen}
    >
      <ScrollView contentContainerStyle={commonStyles.content} keyboardShouldPersistTaps="handled">
        <Text style={commonStyles.title}>Add expense</Text>
        <Text style={commonStyles.subtitle}>Record a new transaction in a few steps.</Text>

        <View style={[commonStyles.card, styles.form]}>
          <CustomInput
            label="Title"
            placeholder="Example: Lunch"
            value={title}
            onChangeText={setTitle}
          />
          <CustomInput
            keyboardType="numeric"
            label="Amount"
            placeholder="Example: 5000"
            value={amount}
            onChangeText={setAmount}
          />

          <View>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryGrid}>
              {expenseCategories.map((item) => {
                const active = item === category;

                return (
                  <Pressable
                    key={item}
                    onPress={() => setCategory(item)}
                    style={[styles.categoryChip, active && styles.activeChip]}
                  >
                    <Text style={[styles.categoryText, active && styles.activeText]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View>
            <Text style={styles.label}>Date</Text>
            <Pressable style={styles.dateInput} onPress={() => setShowPicker(true)}>
              <Text style={styles.dateText}>{formatDate(toInputDate(date))}</Text>
            </Pressable>
            {showPicker ? (
              <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
            ) : null}
          </View>

          {formError || error ? <Text style={styles.error}>{formError || error}</Text> : null}
          {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
          <CustomButton title="Add expense" loading={isLoading} onPress={handleAddExpense} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryChip: {
    backgroundColor: colors.chip,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  activeText: {
    color: colors.surface,
  },
  dateInput: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: spacing.md,
  },
  dateText: {
    color: colors.text,
    fontSize: 15,
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    textAlign: 'center',
  },
  success: {
    color: colors.success,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
