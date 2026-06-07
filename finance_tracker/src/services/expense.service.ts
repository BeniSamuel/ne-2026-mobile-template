import { sampleExpenses } from '../constants/mockData';
import { CreateExpensePayload, Expense } from '../types/expense.types';

let expenses = [...sampleExpenses];

function wait() {
  return new Promise((resolve) => setTimeout(resolve, 650));
}

export const expenseService = {
  async getExpenses() {
    await wait();
    return [...expenses].sort(
      (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
    );
  },

  async addExpense(payload: CreateExpensePayload) {
    await wait();

    const expense: Expense = {
      id: `exp-${Date.now()}`,
      ...payload,
    };

    expenses = [expense, ...expenses];
    return expense;
  },
};
