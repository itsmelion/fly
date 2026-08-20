import { twMerge } from 'tailwind-merge';

export type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type?: 'button' | 'reset' | 'submit'
}

export function Button({
  type,
  title,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type || 'button'} {...props} className={twMerge('inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',className)}>
      {children || title}
    </button>
  );
}
