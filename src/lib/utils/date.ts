import { addDays, differenceInDays, format, setDate, isAfter, isBefore, startOfDay } from 'date-fns';

export function getNextBillingDate(billingCycleDay: number, from: Date = new Date()): Date {
  const today = startOfDay(from);
  const thisMonth = setDate(today, billingCycleDay);

  if (isAfter(thisMonth, today) || thisMonth.getTime() === today.getTime()) {
    return thisMonth;
  }

  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, billingCycleDay);
  return nextMonth;
}

export function getNextDueDate(
  billingCycleDay: number,
  paymentDueDayOffset: number,
  from: Date = new Date(),
): Date {
  const nextBilling = getNextBillingDate(billingCycleDay, from);
  return addDays(nextBilling, paymentDueDayOffset);
}

export function getDaysUntilDue(
  billingCycleDay: number,
  paymentDueDayOffset: number,
  from: Date = new Date(),
): number {
  const dueDate = getNextDueDate(billingCycleDay, paymentDueDayOffset, from);
  return differenceInDays(dueDate, startOfDay(from));
}

export function formatDate(dateStr: string, fmt = 'dd MMM yyyy'): string {
  return format(new Date(dateStr), fmt);
}

export function isExpired(dateStr: string): boolean {
  return isBefore(new Date(dateStr), startOfDay(new Date()));
}
