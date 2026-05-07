import { useState, useEffect } from 'react';
import { Autocomplete } from 'shared/ui/Autocomplete';
import { IconName, Icon } from 'shared/ui/Icon';
import { useDebouncedCallback } from 'shared/hooks/useDebouncedCallback';
import { City } from '../../types';
import styles from './styles.module.css';

const SEARCH_DEBOUNCE = 600;

export interface CitySearchProps {
  className?: string;
  selectedCity?: null | City;
  history: City[];
  cities: City[];
  onHistoryItemRemove: (city: City) => void;
  onSearch: (query: string) => void;
  onSelect: (city: City) => void;
}

export const CitySearch = ({
  className,
  selectedCity,
  history,
  cities,
  onHistoryItemRemove,
  onSearch,
  onSelect,
}: CitySearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (selectedCity?.name) {
      setInputValue(selectedCity.name);
    }
  }, [selectedCity?.name]);

  const debouncedSearch = useDebouncedCallback(onSearch, SEARCH_DEBOUNCE);

  const handleSearchChange = (value: string) => {
    setInputValue(value);

    const trimmed = value.trim();

    if (trimmed) {
      return debouncedSearch(trimmed);
    }

    debouncedSearch.cancel();
    onSearch('');
  };

  const handleCitySelect = (city: City) => {
    onSelect(city);
    setIsOpen(false);
  };

  return (
    <Autocomplete<City>
      wrapperClassName={className}
      placeholder="Search city..."
      renderItem={(city) => (
        <div className={styles.searchItem}>
          <Icon name={IconName.Search} size={18} />
          <span className={styles.text}>
            {[city.name, city.region, city.country].filter(Boolean).join(', ')}
          </span>
        </div>
      )}
      isOpen={isOpen}
      items={cities}
      value={inputValue}
      onOpenChange={setIsOpen}
      onSearch={handleSearchChange}
      onSelect={handleCitySelect}
    >
      {history.length > 0 && (
        <>
          {history.map((city) => (
            <div
              key={`${city.name}-${city.country}`}
              className={styles.historyItem}
              onClick={() => handleCitySelect(city)}
            >
              <div className={styles.content}>
                <Icon name={IconName.Recent} size={18} />
                <span className={styles.text}>
                  {city.name},&nbsp;{city.country}
                </span>
              </div>
              <Icon
                name={IconName.Close}
                size={18}
                onClick={(e) => {
                  e.stopPropagation();
                  onHistoryItemRemove(city);
                }}
              />
            </div>
          ))}
          {cities.length > 0 && <div className={styles.divider} />}
        </>
      )}
    </Autocomplete>
  );
};
