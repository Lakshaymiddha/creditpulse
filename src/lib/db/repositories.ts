import { v4 as uuid } from 'uuid';
import { getDB } from './schema';
import type { Card } from '../types/card';
import type { Transaction } from '../types/transaction';
import type { Offer } from '../types/offer';
import type { MilestoneRule } from '../types/milestone';
import type { Settings } from '../types/settings';
import type { SyncState } from '../types/messages';
import { Bank } from '../types/bank';
import { OfferSource } from '../types/offer';
import { DEFAULT_SETTINGS } from '../types/settings';

// ── Cards ──────────────────────────────────────────────────────────────────

export async function getAllCards(): Promise<Card[]> {
  const db = await getDB();
  return db.getAll('cards');
}

export async function getCardById(id: string): Promise<Card | undefined> {
  const db = await getDB();
  return db.get('cards', id);
}

export async function getCardsByBank(bank: Bank): Promise<Card[]> {
  const db = await getDB();
  return db.getAllFromIndex('cards', 'by-bank', bank);
}

export async function createCard(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card> {
  const db = await getDB();
  const now = new Date().toISOString();
  const newCard: Card = {
    ...card,
    id: uuid(),
    createdAt: now,
    updatedAt: now,
  };
  await db.put('cards', newCard);
  return newCard;
}

export async function updateCard(id: string, updates: Partial<Card>): Promise<Card | undefined> {
  const db = await getDB();
  const existing = await db.get('cards', id);
  if (!existing) return undefined;

  const updated: Card = {
    ...existing,
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  };
  await db.put('cards', updated);
  return updated;
}

export async function deleteCard(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('cards', id);
}

// ── Transactions ───────────────────────────────────────────────────────────

export async function getAllTransactions(): Promise<Transaction[]> {
  const db = await getDB();
  return db.getAll('transactions');
}

export async function getTransactionsByCard(cardId: string): Promise<Transaction[]> {
  const db = await getDB();
  return db.getAllFromIndex('transactions', 'by-card', cardId);
}

export async function getTransactionsByDateRange(
  cardId: string,
  startDate: string,
  endDate: string,
): Promise<Transaction[]> {
  const db = await getDB();
  const range = IDBKeyRange.bound([cardId, startDate], [cardId, endDate]);
  return db.getAllFromIndex('transactions', 'by-card-date', range);
}

export async function getTransactionByEmailId(emailId: string): Promise<Transaction | undefined> {
  const db = await getDB();
  return db.getFromIndex('transactions', 'by-email', emailId);
}

export async function createTransaction(
  txn: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Transaction> {
  const db = await getDB();
  const now = new Date().toISOString();
  const newTxn: Transaction = {
    ...txn,
    id: uuid(),
    createdAt: now,
    updatedAt: now,
  };
  await db.put('transactions', newTxn);
  return newTxn;
}

export async function updateTransaction(
  id: string,
  updates: Partial<Transaction>,
): Promise<Transaction | undefined> {
  const db = await getDB();
  const existing = await db.get('transactions', id);
  if (!existing) return undefined;

  const updated: Transaction = {
    ...existing,
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  };
  await db.put('transactions', updated);
  return updated;
}

export async function deleteTransactionsByCard(cardId: string): Promise<void> {
  const db = await getDB();
  const txns = await db.getAllFromIndex('transactions', 'by-card', cardId);
  const tx = db.transaction('transactions', 'readwrite');
  for (const txn of txns) {
    tx.store.delete(txn.id);
  }
  await tx.done;
}

// ── Offers ─────────────────────────────────────────────────────────────────

export async function getAllOffers(): Promise<Offer[]> {
  const db = await getDB();
  return db.getAll('offers');
}

export async function getOffersByBank(bank: Bank): Promise<Offer[]> {
  const db = await getDB();
  return db.getAllFromIndex('offers', 'by-bank', bank);
}

export async function getOffersBySource(source: OfferSource): Promise<Offer[]> {
  const db = await getDB();
  return db.getAllFromIndex('offers', 'by-source', source);
}

export async function upsertOffers(offers: Offer[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('offers', 'readwrite');
  for (const offer of offers) {
    tx.store.put(offer);
  }
  await tx.done;
}

export async function deleteExpiredOffers(beforeDate: string): Promise<number> {
  const db = await getDB();
  const range = IDBKeyRange.upperBound(beforeDate);
  const expired = await db.getAllFromIndex('offers', 'by-expiry', range);
  const tx = db.transaction('offers', 'readwrite');
  for (const offer of expired) {
    tx.store.delete(offer.id);
  }
  await tx.done;
  return expired.length;
}

export async function clearOffersBySource(source: OfferSource): Promise<void> {
  const db = await getDB();
  const offers = await db.getAllFromIndex('offers', 'by-source', source);
  const tx = db.transaction('offers', 'readwrite');
  for (const offer of offers) {
    tx.store.delete(offer.id);
  }
  await tx.done;
}

// ── Milestone Rules ────────────────────────────────────────────────────────

export async function getAllMilestoneRules(): Promise<MilestoneRule[]> {
  const db = await getDB();
  return db.getAll('milestoneRules');
}

export async function getMilestoneRulesForCard(
  bank: Bank,
  cardVariant: string,
): Promise<MilestoneRule[]> {
  const db = await getDB();
  return db.getAllFromIndex('milestoneRules', 'by-card-variant', [bank, cardVariant]);
}

export async function upsertMilestoneRules(rules: MilestoneRule[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('milestoneRules', 'readwrite');
  for (const rule of rules) {
    tx.store.put(rule);
  }
  await tx.done;
}

// ── Settings ───────────────────────────────────────────────────────────────

export async function getSettings(): Promise<Settings> {
  const db = await getDB();
  const settings = await db.get('settings', 'main');
  if (settings) return settings;

  await db.put('settings', DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

export async function updateSettings(updates: Partial<Settings>): Promise<Settings> {
  const db = await getDB();
  const current = await getSettings();
  const updated: Settings = { ...current, ...updates, id: 'main' };
  await db.put('settings', updated);
  return updated;
}

// ── Sync State ─────────────────────────────────────────────────────────────

export async function getSyncState(key: string): Promise<SyncState> {
  const db = await getDB();
  const state = await db.get('syncState', key);
  if (state) return state;

  const initial: SyncState = {
    id: key,
    lastSyncAt: null,
    status: 'idle',
  };
  await db.put('syncState', initial);
  return initial;
}

export async function updateSyncState(key: string, updates: Partial<SyncState>): Promise<SyncState> {
  const db = await getDB();
  const current = await getSyncState(key);
  const updated: SyncState = { ...current, ...updates, id: key };
  await db.put('syncState', updated);
  return updated;
}
