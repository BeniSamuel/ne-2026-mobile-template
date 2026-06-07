export function formatCurrency(amount: number) {
  return `${amount.toLocaleString('en-US')} RWF`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function toInputDate(date: Date) {
  return date.toISOString().split('T')[0];
}
