import { openDB, IDBPDatabase, DBSchema } from 'idb';
import type { Card } from '../types/card';
import type { Transaction } from '../types/transaction';
import type { Offer } from '../types/offer';
import type { MilestoneRule } from '../types/milestone';
import type { Settings } from '../types/settings';
import type { SyncState } from '../types/messages';
import { Bank } from '../types/bank';
import { TransactionCategory } from '../types/transaction';
import { OfferSource } from '../types/offer';

export interface CardWiseDB extends DBSchema {
  cards: {
    key: string;
    value: Card;
    indexes: {
      'by-bank': Bank;
      'by-last4': string;
    };
  };
  transactions: {
    key: string;
    value: Transaction;
    indexes: {
      'by-card': string;
      'by-date': string;
      'by-email': string;
      'by-category': TransactionCategory;
      'by-card-date': [string, string];
    };
  };
  offers: {
    key: string;
    value: Offer;
    indexes: {
      'by-bank': Bank;
      'by-merchant': string;
      'by-expiry': string;
      'by-source': OfferSource;
    };
  };
  milestoneRules: {
    key: string;
    value: MilestoneRule;
    indexes: {
      'by-card-variant': [Bank, string];
    };
  };
  settings: {
    key: string;
    value: Settings;
  };
  syncState: {
    key: string;
    value: SyncState;
  };
}

const DB_NAME = 'creditpulse';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<CardWiseDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<CardWiseDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<CardWiseDB>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        const cardsStore = db.createObjectStore('cards', { keyPath: 'id' });
        cardsStore.createIndex('by-bank', 'bank');
        cardsStore.createIndex('by-last4', 'last4Digits');

        const txnStore = db.createObjectStore('transactions', { keyPath: 'id' });
        txnStore.createIndex('by-card', 'cardId');
        txnStore.createIndex('by-date', 'transactionDate');
        txnStore.createIndex('by-email', 'emailId', { unique: true });
        txnStore.createIndex('by-category', 'category');
        txnStore.createIndex('by-card-date', ['cardId', 'transactionDate']);

        const offersStore = db.createObjectStore('offers', { keyPath: 'id' });
        offersStore.createIndex('by-bank', 'bank');
        offersStore.createIndex('by-merchant', 'merchant');
        offersStore.createIndex('by-expiry', 'validUntil');
        offersStore.createIndex('by-source', 'source');

        const milestonesStore = db.createObjectStore('milestoneRules', { keyPath: 'id' });
        milestonesStore.createIndex('by-card-variant', ['bank', 'cardVariant']);

        db.createObjectStore('settings', { keyPath: 'id' });
        db.createObjectStore('syncState', { keyPath: 'id' });
      }
    },
  });

  return dbInstance;
}
