import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  HistoryItem,
  getHistoryItems,
  addHistoryItem,
  removeHistoryItem,
} from 'shared/api/searchHistory';

const HISTORY_SEARCH_QUERY_KEY = ['searchHistory'];

export type SearchHistoryApi = ReturnType<typeof useSearchHistory>;

export const useSearchHistory = () => {
  const client = useQueryClient();
  const {
    isLoading,
    isError,
    data: historyItems,
  } = useQuery({
    queryKey: HISTORY_SEARCH_QUERY_KEY,
    queryFn: getHistoryItems,
  });

  const addToHistory = (item: HistoryItem): void => {
    client.setQueryData(HISTORY_SEARCH_QUERY_KEY, addHistoryItem(item));
  };

  const removeFromHistory = (item: HistoryItem): void => {
    client.setQueryData(HISTORY_SEARCH_QUERY_KEY, removeHistoryItem(item));
  };

  return {
    isLoading,
    isError,
    historyItems,
    addToHistory,
    removeFromHistory,
  };
};
