import { useQuery } from '@tanstack/react-query';
import { searchCities } from 'shared/api/weather';

interface useCitySearchParams {
  query: string;
}

const CITY_SEARCH_STALE_TIME = 60_000;

export const useCitySearch = ({ query }: useCitySearchParams) => {
  const {
    isLoading,
    isError,
    data: cities,
  } = useQuery({
    staleTime: CITY_SEARCH_STALE_TIME, // Keep the cache for a limited time.
    enabled: !!query,
    queryKey: ['citySearch', query],
    queryFn: () => searchCities({ query }),
  });

  return { isLoading, isError, cities };
};
