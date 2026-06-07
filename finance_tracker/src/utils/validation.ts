import { ExpenseCategory } from '../types/expense.types';

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password: string) {
  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }

  return '';
}

export function validateLogin(email: string, password: string) {
  if (!isValidEmail(email)) return 'Enter a valid email address.';
  if (!password.trim()) return 'Password is required.';
  return '';
}

export function validateSignup(
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
) {
  if (!fullName.trim()) return 'Full name is required.';
  if (!isValidEmail(email)) return 'Enter a valid email address.';

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  if (password !== confirmPassword) return 'Passwords do not match.';
  return '';
}

export function validateExpense(
  title: string,
  amount: string,
  category: ExpenseCategory,
  date: string,
) {
  if (!title.trim()) return 'Expense title is required.';
  if (!amount.trim() || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
    return 'Enter a valid amount.';
  }
  if (!category) return 'Choose a category.';
  if (!date) return 'Choose a date.';
  return '';
}
