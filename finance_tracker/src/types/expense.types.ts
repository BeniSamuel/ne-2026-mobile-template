export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Utilities'
  | 'Entertainment'
  | 'Other';

export interface Expense {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
}

export interface CreateExpensePayload {
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
}

export interface ExpenseStatistics {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  totalTransactions: number;
}
