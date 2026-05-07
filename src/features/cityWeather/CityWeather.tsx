import { useState } from 'react';
import { CitySearch } from './components/CitySearch';
import { useCityWeather } from './hooks/useCityWeather';
import { WeatherCard } from './components/WeatherCard';
import { City, SearchHistory } from './types';
import styles from './styles.module.css';
import { useCitySearch } from './hooks/useCitySearch';

interface CityWeatherProps {
  searchHistory: SearchHistory;
  selectedCity?: null | City;
  onCitySelect: (city: City) => void;
}

export const CityWeather = ({ searchHistory, selectedCity, onCitySelect }: CityWeatherProps) => {
  const [cityQuery, setCityQuery] = useState('');
  const { cities } = useCitySearch({ query: cityQuery });
  const { isLoading, weather, forecast } = useCityWeather({ city: selectedCity });

  return (
    <div className={styles.container}>
      <CitySearch
        className={styles.citySearch}
        selectedCity={selectedCity}
        history={searchHistory.historyItems ?? []}
        cities={cities ?? []}
        onHistoryItemRemove={searchHistory.removeFromHistory}
        onSearch={setCityQuery}
        onSelect={onCitySelect}
      />
      {isLoading && <p>Loading...</p>}
      {weather && selectedCity && (
        <WeatherCard
          city={selectedCity}
          temp={weather.current.temp_c}
          condition={weather.current.condition.text}
          wind={weather.current.wind_kph}
          tempMin={forecast?.forecast.forecastday[0].day.mintemp_c}
          tempMax={forecast?.forecast.forecastday[0].day.maxtemp_c}
        />
      )}
    </div>
  );
};
