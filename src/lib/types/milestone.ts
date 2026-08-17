import { Bank } from './bank';

export enum MilestoneType {
  ANNUAL_FEE_WAIVER = 'annual_fee_waiver',
  LOUNGE_ACCESS = 'lounge_access',
  REWARD_BONUS = 'reward_bonus',
  UPGRADE_ELIGIBILITY = 'upgrade_eligibility',
  VOUCHER = 'voucher',
}

export type PeriodType = 'annual' | 'quarterly' | 'monthly' | 'calendar_year';

export interface MilestoneRule {
  id: string;
  bank: Bank;
  cardVariant: string;
  type: MilestoneType;
  title: string;
  description: string;
  targetAmount: number;
  periodType: PeriodType;
  reward: string;
  isDefault: boolean;
}

export interface MilestoneProgress {
  id: string;
  cardId: string;
  ruleId: string;
  periodStart: string;
  periodEnd: string;
  currentSpend: number;
  targetAmount: number;
  percentComplete: number;
  isAchieved: boolean;
}
