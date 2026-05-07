export interface GetWeatherResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    wind_kph: number;
  };
}

export interface SearchCitiesResponse {
  id: number;
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}

export interface GetForecastResponse {
  forecast: {
    forecastday: {
      day: {
        mintemp_c: number;
        maxtemp_c: number;
      };
    }[];
  };
}
