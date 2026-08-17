import { TransactionCategory } from '../types/transaction';

const CATEGORY_KEYWORDS: Record<TransactionCategory, string[]> = {
  [TransactionCategory.FOOD_DINING]: [
    'swiggy', 'zomato', 'dominos', 'mcdonalds', 'starbucks', 'restaurant',
    'cafe', 'pizza', 'burger', 'kfc', 'subway', 'dunkin', 'chaayos',
    'barbeque nation', 'haldiram', 'biryani', 'food',
  ],
  [TransactionCategory.GROCERY]: [
    'bigbasket', 'blinkit', 'zepto', 'dmart', 'more', 'grofers',
    'jiomart', 'reliance fresh', 'nature basket', 'spencer', 'grocery',
    'supermarket', 'instamart',
  ],
  [TransactionCategory.FUEL]: [
    'hp petrol', 'indian oil', 'bharat petroleum', 'shell', 'fuel',
    'petrol', 'diesel', 'iocl', 'bpcl', 'hpcl', 'reliance petroleum',
  ],
  [TransactionCategory.TRAVEL]: [
    'irctc', 'makemytrip', 'goibibo', 'cleartrip', 'yatra', 'airline',
    'airport', 'air india', 'indigo', 'spicejet', 'vistara', 'uber',
    'ola', 'rapido', 'railway', 'hotel', 'oyo', 'booking.com', 'airbnb',
  ],
  [TransactionCategory.SHOPPING]: [
    'amazon', 'flipkart', 'myntra', 'ajio', 'nykaa', 'meesho',
    'tatacliq', 'snapdeal', 'shoppers stop', 'lifestyle', 'westside',
    'h&m', 'zara', 'croma', 'reliance digital', 'vijay sales',
  ],
  [TransactionCategory.ENTERTAINMENT]: [
    'netflix', 'hotstar', 'prime video', 'spotify', 'youtube',
    'bookmyshow', 'pvr', 'inox', 'apple music', 'jiocinema',
    'sonyliv', 'zee5', 'disney',
  ],
  [TransactionCategory.UTILITIES]: [
    'electricity', 'water', 'gas', 'broadband', 'internet', 'jio',
    'airtel', 'vi ', 'vodafone', 'bsnl', 'tata power', 'adani',
    'bescom', 'mseb', 'phone bill', 'recharge',
  ],
  [TransactionCategory.INSURANCE]: [
    'insurance', 'lic', 'hdfc life', 'icici prudential', 'sbi life',
    'max life', 'bajaj allianz', 'star health', 'policy',
  ],
  [TransactionCategory.HEALTH]: [
    'pharmacy', 'hospital', 'clinic', 'medical', 'apollo', 'medplus',
    'netmeds', 'pharmeasy', '1mg', 'practo', 'diagnostic', 'lab',
  ],
  [TransactionCategory.EDUCATION]: [
    'school', 'college', 'university', 'udemy', 'coursera',
    'unacademy', 'byjus', 'education', 'tuition', 'upgrad',
  ],
  [TransactionCategory.EMI]: [
    'emi', 'loan', 'instalment',
  ],
  [TransactionCategory.WALLET_TRANSFER]: [
    'paytm', 'phonepe', 'google pay', 'gpay', 'mobikwik', 'freecharge',
    'cred', 'transfer', 'wallet',
  ],
  [TransactionCategory.GOVERNMENT]: [
    'government', 'tax', 'gst', 'income tax', 'passport', 'challan',
    'e-filing', 'mca', 'stamp duty',
  ],
  [TransactionCategory.OTHER]: [],
};

export function categorizeTransaction(merchant: string): TransactionCategory {
  const normalized = merchant.toLowerCase().trim();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (category === TransactionCategory.OTHER) continue;
    for (const keyword of keywords) {
      if (normalized.includes(keyword)) {
        return category as TransactionCategory;
      }
    }
  }

  return TransactionCategory.OTHER;
}

export function normalizeMerchant(rawMerchant: string): string {
  return rawMerchant
    .replace(/\s+/g, ' ')
    .replace(/[*#]/g, '')
    .trim();
}
