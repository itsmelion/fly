import { twMerge } from 'tailwind-merge';

import { Label } from '../label/label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  info?: string;
  error?: string;
}

export function Input(props: InputProps) {
  return (
    <fieldset className="relative contents">
      <Label htmlFor={props.id}>
        {props.label}
      </Label>

      {props.info && (
        <p className="mt-1 text-sm text-gray-500">
          {props.info}
        </p>
      )}

      <div className="contents">
        <input
          {...props}
          id={props.id}
          className={twMerge("block w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 rounded-md", props.className)}
          />
      </div>

      {props.error && (
        <p className="mt-1 text-sm text-red-600">
          {props.error}
        </p>
      )}
    </fieldset>
  );
}
