export interface Settings {
  id: string;
  gmailConnected: boolean;
  gmailLastSyncAt: string | null;
  gmailSyncFrequencyMinutes: number;
  offersLastFetchedAt: string | null;
  offersFetchFrequencyHours: number;
  dueDateReminderDaysBefore: number;
  enableNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  offersDbBaseUrl: string;
}

export const DEFAULT_SETTINGS: Settings = {
  id: 'main',
  gmailConnected: false,
  gmailLastSyncAt: null,
  gmailSyncFrequencyMinutes: 30,
  offersLastFetchedAt: null,
  offersFetchFrequencyHours: 24,
  dueDateReminderDaysBefore: 3,
  enableNotifications: true,
  theme: 'system',
  offersDbBaseUrl:
    'https://raw.githubusercontent.com/Lakshaymiddha/creditpulse/main/offers-db',
};
