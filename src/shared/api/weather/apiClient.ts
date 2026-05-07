import { WEATHER_API_KEY } from 'config/api';

const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async <T>(
  path: string,
  { search }: { search: Record<string, string> }
): Promise<T> => {
  const url = new URL(`${BASE_URL}${path}`);

  Object.entries(search).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  url.searchParams.set('key', WEATHER_API_KEY);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`);
  }

  return res.json();
};
