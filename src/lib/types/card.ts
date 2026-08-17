import { Bank, CardNetwork } from './bank';

export interface Card {
  id: string;
  bank: Bank;
  cardName: string;
  cardVariant: string;
  last4Digits: string;
  network: CardNetwork;
  billingCycleDay: number;
  paymentDueDayOffset: number;
  annualFee: number;
  joiningDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
