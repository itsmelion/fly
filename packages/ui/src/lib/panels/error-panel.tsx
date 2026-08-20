export function ErrorPanel({ children }: React.HTMLProps<HTMLDivElement>) {
  return (
    <section role="alert" className="rounded-md border border-red-300 bg-white p-6 text-red-700 shadow-lg dark:border-red-700 dark:bg-red-900 dark:text-red-100">
      <p>{children}</p>
    </section>
  )
}
