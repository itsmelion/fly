import { twMerge } from 'tailwind-merge';

export type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type?: 'button' | 'reset' | 'submit',
  asDiv?: boolean;
}

export function Button({
  type,
  title,
  className,
  asDiv = false,
  children,
  ...props
}: ButtonProps) {
  const Element = asDiv ? 'div' : 'button'; // allow to render just as div to allow next/link or use with anchor element;

  return (
    <Element type={type || 'button'} {...props} className={twMerge('inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',className)}>
      {children || title}
    </Element>
  );
}
