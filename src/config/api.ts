if (!process.env.REACT_APP_WEATHER_API_KEY) {
  throw new Error('Missing WEATHER_API_KEY');
}

export const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
