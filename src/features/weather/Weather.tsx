import { useState } from 'react';
import { Header } from './components/Header';
import { WeatherLayout } from './components/WeatherLayout';
import { useSearchHistory, SearchHistory } from 'features/searchHistory';
import { City, CityWeather } from 'features/cityWeather';

// Higher-order feature-container that aggregates CityWeather and SearchHistory.
export const Weather = () => {
  const searchHistory = useSearchHistory();
  const [selectedCity, setSelectedCity] = useState<null | City>(null);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    searchHistory.addToHistory(city);
  };

  return (
    <WeatherLayout
      header={<Header />}
      main={
        <CityWeather
          searchHistory={searchHistory}
          selectedCity={selectedCity}
          onCitySelect={handleCitySelect}
        />
      }
      sidebar={<SearchHistory searchHistory={searchHistory} onHistoryItemClick={setSelectedCity} />}
    />
  );
};
