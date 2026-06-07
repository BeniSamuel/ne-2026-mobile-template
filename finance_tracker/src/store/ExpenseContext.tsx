import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { expenseService } from '../services/expense.service';
import { CreateExpensePayload, Expense } from '../types/expense.types';
import { calculateStatistics } from '../utils/statistics';

interface ExpenseContextValue {
  expenses: Expense[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string;
  statistics: ReturnType<typeof calculateStatistics>;
  addExpense: (payload: CreateExpensePayload) => Promise<boolean>;
  refreshExpenses: () => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  async function loadExpenses(showLoader = true) {
    if (showLoader) setIsLoading(true);
    setError('');

    try {
      const data = await expenseService.getExpenses();
      setExpenses(data);
    } catch {
      setError('Could not load expenses. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function refreshExpenses() {
    setIsRefreshing(true);
    await loadExpenses(false);
  }

  async function addExpense(payload: CreateExpensePayload) {
    setIsLoading(true);
    setError('');

    try {
      const newExpense = await expenseService.addExpense(payload);
      setExpenses((currentExpenses) => [newExpense, ...currentExpenses]);
      return true;
    } catch {
      setError('Could not save expense. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const statistics = useMemo(() => calculateStatistics(expenses), [expenses]);

  const value = useMemo(
    () => ({
      expenses,
      isLoading,
      isRefreshing,
      error,
      statistics,
      addExpense,
      refreshExpenses,
    }),
    [expenses, isLoading, isRefreshing, error, statistics],
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error('useExpenses must be used inside ExpenseProvider.');
  }

  return context;
}
