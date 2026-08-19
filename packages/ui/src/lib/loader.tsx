import { LoaderCircle } from 'lucide-react';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center p-4 gap-2">
      <LoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
      Loading...
    </div>
  );
}
