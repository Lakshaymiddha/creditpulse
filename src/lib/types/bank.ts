export enum Bank {
  HDFC = 'hdfc',
  SBI = 'sbi',
  ICICI = 'icici',
  AXIS = 'axis',
  KOTAK = 'kotak',
  RBL = 'rbl',
  INDUSIND = 'indusind',
  AMEX = 'amex',
  YES_BANK = 'yes_bank',
  IDFC_FIRST = 'idfc_first',
}

export const BANK_DISPLAY_NAMES: Record<Bank, string> = {
  [Bank.HDFC]: 'HDFC Bank',
  [Bank.SBI]: 'SBI Card',
  [Bank.ICICI]: 'ICICI Bank',
  [Bank.AXIS]: 'Axis Bank',
  [Bank.KOTAK]: 'Kotak Mahindra',
  [Bank.RBL]: 'RBL Bank',
  [Bank.INDUSIND]: 'IndusInd Bank',
  [Bank.AMEX]: 'American Express',
  [Bank.YES_BANK]: 'Yes Bank',
  [Bank.IDFC_FIRST]: 'IDFC First',
};

export enum CardNetwork {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  RUPAY = 'rupay',
  AMEX = 'amex',
  DINERS = 'diners',
}
