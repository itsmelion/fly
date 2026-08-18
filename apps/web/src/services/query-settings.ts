import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

export const queryProviderOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attempt) => attempt * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
};

export function getQueryClient() {
  return new QueryClient(queryProviderOptions);
}
