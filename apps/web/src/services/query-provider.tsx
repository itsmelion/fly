'use client';

import { queryProviderOptions } from './query-settings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState, lazy, Suspense } from 'react';

/**
 * QueryProvider
 *
 * Next.js Client Component that initializes and provides a single `QueryClient`
 * instance to the entire React subtree via `QueryClientProvider`.
 *
 * ## Why `useState`?
 * `QueryClient` should be created only once per provider mount.
 * Using `useState(() => new QueryClient(...))` guarantees:
 * - a stable instance across re-renders
 * - no unintended re-initialization
 *
 * ## Default options
 * - `queries.retry`: 3 (automatically retries failed queries)
 * - `queries.retryDelay`: linear backoff (attempt * 1000 ms)
 * - `queries.staleTime`: 5 minutes (cache is considered "fresh" for 5 minutes)
 * - `queries.refetchOnWindowFocus`: false (prevents refetch when the window regains focus)
 * - `mutations.retry`: false (no automatic retry for mutations)
 *
 * ## Devtools (optional)
 * If you want to use React Query Devtools in development, you can:
 * - dynamically import `ReactQueryDevtools` (lazy import)
 * - render it only when `NODE_ENV === 'development'`
 *
 * Note: since this is a Client Component, using `Suspense` and `lazy` is compatible,
 * but should be handled carefully to avoid negatively impacting the bundle/UX.
 */
export default function QueryProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient(queryProviderOptions));

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {process.env.NODE_ENV === 'development' && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}

const ReactQueryDevtools =
  process.env.NODE_ENV === 'development'
    ? lazy(() =>
        import('@tanstack/react-query-devtools').then((m) => ({
          default: m.ReactQueryDevtools,
        }))
      )
    : () => null;
