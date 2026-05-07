import { HistoryItem } from 'shared/api/searchHistory';

export interface City {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}

export interface SearchHistory {
  historyItems?: null | HistoryItem[];
  removeFromHistory: (item: HistoryItem) => void;
}
