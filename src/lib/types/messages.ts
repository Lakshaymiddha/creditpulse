export type SyncStatus = 'idle' | 'syncing' | 'error';

export interface SyncState {
  id: string;
  lastSyncAt: string | null;
  lastSyncMessageId?: string;
  status: SyncStatus;
  errorMessage?: string;
}

export type Message =
  | { type: 'TRIGGER_GMAIL_SYNC' }
  | { type: 'TRIGGER_OFFERS_SYNC' }
  | { type: 'SYNC_STATUS'; payload: { gmail: SyncState; offers: SyncState } }
  | { type: 'GMAIL_SYNC_COMPLETE'; payload: { newTransactions: number } }
  | { type: 'OFFERS_SYNC_COMPLETE'; payload: { newOffers: number } };
