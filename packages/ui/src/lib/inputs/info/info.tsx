import { twMerge } from 'tailwind-merge';

type InfoLabels = React.HTMLProps<HTMLParagraphElement>

function Error({ className, ...props }:InfoLabels) {
  return <p role='alert' className={twMerge('text-sm text-red-600', className)} {...props} />
}

function Info({ className, ...props }:InfoLabels) {
  return <p className={twMerge('text-sm text-gray-500', className)} {...props} />
}

export const Form = {
  Error,
  Info,
}
