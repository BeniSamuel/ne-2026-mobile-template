import { expenseCategories } from '../constants/categories';
import { monthlyIncome } from '../constants/mockData';
import { Expense } from '../types/expense.types';

export function calculateStatistics(expenses: Expense[]) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return {
    totalIncome: monthlyIncome,
    totalExpenses,
    balance: monthlyIncome - totalExpenses,
    totalTransactions: expenses.length,
  };
}

export function getCategoryTotals(expenses: Expense[]) {
  return expenseCategories.map((category) => ({
    category,
    total: expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }));
}

export function getMonthlyTotals(expenses: Expense[]) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return monthNames.map((month, index) => {
    const total = expenses
      .filter((expense) => new Date(expense.date).getMonth() === index)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return { month, total };
  });
}
