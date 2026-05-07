import { ReactNode } from 'react';
import { QueryCache, MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { reportUnknownError } from 'logging';

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: reportUnknownError }),
  mutationCache: new MutationCache({ onError: reportUnknownError }),
});

export const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
