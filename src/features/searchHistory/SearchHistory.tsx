import { HistoryItem } from 'shared/api/searchHistory';
import { SearchHistoryApi } from './useSearchHistory';
import styles from './styles.module.css';

interface SearchHistoryProps {
  searchHistory: SearchHistoryApi;
  onHistoryItemClick: (item: HistoryItem) => void;
}

export const SearchHistory = ({
  searchHistory: { historyItems, removeFromHistory },
  onHistoryItemClick,
}: SearchHistoryProps) => {
  if (!historyItems?.length) {
    return <p>No recent searches</p>;
  }

  return (
    <ul className={styles.historyList}>
      {historyItems.map((item) => (
        <li key={`${item.name}-${item.country}`} className={styles.historyItem}>
          <span className={styles.cityName} onClick={() => onHistoryItemClick(item)}>
            {item.name}, {item.country}
          </span>

          <button className={styles.removeBtn} onClick={() => removeFromHistory(item)}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
};
