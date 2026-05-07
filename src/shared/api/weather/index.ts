import { fetchWeather } from './apiClient';
import type { GetWeatherResponse, GetForecastResponse, SearchCitiesResponse } from './types';

export type { GetWeatherResponse, GetForecastResponse, SearchCitiesResponse };

interface GetWeatherParams {
  lat: number;
  lon: number;
}

interface SearchCitiesParams {
  query: string;
}

export const getWeather = ({ lat, lon }: GetWeatherParams): Promise<GetWeatherResponse> =>
  fetchWeather('/current.json', { search: { q: `${lat},${lon}` } });

export const searchCities = ({ query }: SearchCitiesParams): Promise<SearchCitiesResponse[]> =>
  fetchWeather('/search.json', { search: { q: query } });

export const getForecast = ({ lat, lon }: GetWeatherParams): Promise<GetForecastResponse> =>
  fetchWeather('/forecast.json', {
    search: {
      q: `${lat},${lon}`,
      days: '1',
    },
  });
