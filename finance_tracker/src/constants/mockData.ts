import { Expense } from '../types/expense.types';
import { User } from '../types/auth.types';

export const sampleUsers: Array<User & { password: string }> = [
  {
    id: 'user-1',
    fullName: 'Aline Mukamana',
    email: 'student@example.com',
    password: 'password123',
  },
];

export const sampleExpenses: Expense[] = [
  { id: 'exp-1', title: 'Lunch at cafe', category: 'Food', amount: 5200, date: '2026-06-01' },
  { id: 'exp-2', title: 'Bus card recharge', category: 'Transport', amount: 3000, date: '2026-06-02' },
  { id: 'exp-3', title: 'Groceries', category: 'Shopping', amount: 18500, date: '2026-06-03' },
  { id: 'exp-4', title: 'Electricity tokens', category: 'Utilities', amount: 12000, date: '2026-06-04' },
  { id: 'exp-5', title: 'Movie night', category: 'Entertainment', amount: 8000, date: '2026-05-24' },
  { id: 'exp-6', title: 'Mobile data', category: 'Utilities', amount: 5000, date: '2026-05-27' },
  { id: 'exp-7', title: 'Breakfast', category: 'Food', amount: 2500, date: '2026-04-18' },
  { id: 'exp-8', title: 'Gift purchase', category: 'Other', amount: 11000, date: '2026-04-20' },
];

export const monthlyIncome = 450000;
