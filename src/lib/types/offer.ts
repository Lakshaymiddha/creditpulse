import { Bank } from './bank';
import { TransactionCategory } from './transaction';

export enum OfferSource {
  COMMUNITY = 'community',
  SCRAPED = 'scraped',
}

export type DiscountType = 'percentage' | 'flat' | 'cashback' | 'reward_points';

export interface Offer {
  id: string;
  bank: Bank;
  cardVariants: string[];
  merchant: string;
  merchantCategory: TransactionCategory;
  title: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscount?: number;
  minSpend?: number;
  validFrom: string;
  validUntil: string;
  couponCode?: string;
  termsUrl?: string;
  source: OfferSource;
  lastVerified: string;
}
