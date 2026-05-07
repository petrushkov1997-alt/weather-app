// localStorage-backed implementation of the search history API.
// Structured like real network calls so we can swap in the actual API later without changing callers.
import type { HistoryItem } from './types';

export type { HistoryItem };

const STORAGE_KEY = 'searchHistory';
const MAX_ITEMS = 10;

const persistItems = (items: HistoryItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const isHistoryItemDifferent = (left: HistoryItem) => (right: HistoryItem) =>
  left.country !== right.country || left.name !== right.name;

export const getHistoryItems = (): null | HistoryItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const addHistoryItem = (item: HistoryItem): HistoryItem[] => {
  const filtered = getHistoryItems()?.filter(isHistoryItemDifferent(item));
  const updated = [item, ...(filtered ?? [])].slice(0, MAX_ITEMS);

  persistItems(updated);

  return updated;
};

export const removeHistoryItem = (item: HistoryItem): null | HistoryItem[] => {
  const updated = getHistoryItems()?.filter(isHistoryItemDifferent(item));

  if (updated) {
    persistItems(updated);
  }

  return updated ?? null;
};
