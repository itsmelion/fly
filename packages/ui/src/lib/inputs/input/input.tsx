import { twMerge } from 'tailwind-merge';

import { Form } from '../info/info';
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
        <Form.Info className="mt-1 ">
          {props.info}
        </Form.Info>
      )}

      <div className="contents">
        <input
          {...props}
          id={props.id}
          className={twMerge("block w-full border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2 rounded-md", props.className)}
          />
      </div>

      {props.error && (
        <Form.Error role='alert' className="mt-1">
          {props.error}
        </Form.Error>
      )}
    </fieldset>
  );
}
