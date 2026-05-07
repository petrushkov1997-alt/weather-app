import { useQuery } from '@tanstack/react-query';
import { getWeather, getForecast } from 'shared/api/weather';
import { City } from '../types';

const REFETCH_WEATHER_INTERVAL = 60_000;

interface UseCityWeatherParams {
  city?: null | City;
}

export const useCityWeather = ({ city }: UseCityWeatherParams) => {
  const { isLoading, isError, data } = useQuery({
    enabled: !!city,

    refetchInterval: REFETCH_WEATHER_INTERVAL,

    queryKey: ['cityWeather', city?.lat, city?.lon],

    queryFn: async () => {
      if (!city) return undefined;

      const [weather, forecast] = await Promise.all([getWeather(city), getForecast(city)]);

      return {
        weather,
        forecast,
      };
    },
  });

  return {
    isLoading,
    isError,

    weather: data?.weather,
    forecast: data?.forecast,
  };
};
