import type { ReactNode } from 'react';

interface FlightOfferCardProps {
  children: ReactNode;
  index: number;
  measureElement: (node: HTMLElement | null) => void;
  start: number;
}

/** Card used for virtualized listing */
export function FlightOfferCard({
  children,
  index,
  measureElement,
  start,
}: FlightOfferCardProps) {
  return (
    <article
      ref={measureElement}
      data-index={index}
      className="absolute top-0 left-0 grid w-full gap-4 rounded-md border border-gray-300 bg-white p-4 text-gray-950 shadow-sm md:grid-cols-[1fr_auto] dark:border-gray-700 dark:bg-gray-800 dark:text-white/82"
      style={{ transform: `translateY(${start}px)` }}
    >
      {children}
    </article>
  );
}
