const INR_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const INR_FORMATTER_PRECISE = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatINR(amount: number, precise = false): string {
  return precise ? INR_FORMATTER_PRECISE.format(amount) : INR_FORMATTER.format(amount);
}

export function formatCompactINR(amount: number): string {
  if (amount >= 10_000_000) return `${(amount / 10_000_000).toFixed(1)}Cr`;
  if (amount >= 100_000) return `${(amount / 100_000).toFixed(1)}L`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(1)}K`;
  return formatINR(amount);
}
