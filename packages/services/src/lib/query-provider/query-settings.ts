import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

export const queryProviderOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: (attempt) => attempt * 1000,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: true,
    },
  },
};

export function getQueryClient() {
  return new QueryClient(queryProviderOptions);
}
