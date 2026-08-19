import dynamic from 'next/dynamic';

import { Loader } from '../..';
export type { CalendarProps } from './calendar';


export const Calendar = dynamic(() => import('./calendar')
  .then((module) => module.Calendar)
  .catch(() => ({ default: () => <div>Calendar failed to load</div> })), {
    loading: Loader,
  });
