export enum TransactionCategory {
  FOOD_DINING = 'food_dining',
  GROCERY = 'grocery',
  FUEL = 'fuel',
  TRAVEL = 'travel',
  SHOPPING = 'shopping',
  ENTERTAINMENT = 'entertainment',
  UTILITIES = 'utilities',
  INSURANCE = 'insurance',
  HEALTH = 'health',
  EDUCATION = 'education',
  EMI = 'emi',
  WALLET_TRANSFER = 'wallet_transfer',
  GOVERNMENT = 'government',
  OTHER = 'other',
}

export const CATEGORY_DISPLAY_NAMES: Record<TransactionCategory, string> = {
  [TransactionCategory.FOOD_DINING]: 'Food & Dining',
  [TransactionCategory.GROCERY]: 'Grocery',
  [TransactionCategory.FUEL]: 'Fuel',
  [TransactionCategory.TRAVEL]: 'Travel',
  [TransactionCategory.SHOPPING]: 'Shopping',
  [TransactionCategory.ENTERTAINMENT]: 'Entertainment',
  [TransactionCategory.UTILITIES]: 'Utilities',
  [TransactionCategory.INSURANCE]: 'Insurance',
  [TransactionCategory.HEALTH]: 'Health',
  [TransactionCategory.EDUCATION]: 'Education',
  [TransactionCategory.EMI]: 'EMI',
  [TransactionCategory.WALLET_TRANSFER]: 'Wallet/Transfer',
  [TransactionCategory.GOVERNMENT]: 'Government',
  [TransactionCategory.OTHER]: 'Other',
};

export interface Transaction {
  id: string;
  cardId: string;
  amount: number;
  currency: string;
  merchant: string;
  merchantNormalized: string;
  category: TransactionCategory;
  transactionDate: string;
  emailId: string;
  emailSubject: string;
  isInternational: boolean;
  isRefund: boolean;
  rawEmailSnippet: string;
  createdAt: string;
  updatedAt: string;
}
