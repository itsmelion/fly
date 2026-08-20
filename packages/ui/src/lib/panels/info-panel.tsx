export function InfoPanel({ children }: React.HTMLProps<HTMLDivElement>) {
  return (
    <section className="rounded-md border border-gray-300 bg-white p-6 text-gray-950 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50">
      <h2 className="text-lg font-semibold">{children}</h2>
    </section>
  )
}
