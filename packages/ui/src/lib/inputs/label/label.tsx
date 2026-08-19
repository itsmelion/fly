import { twMerge } from 'tailwind-merge';

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { className, ...rest } = props;
  return (
    <label className={twMerge('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2', className)} {...rest} />
  )
}
