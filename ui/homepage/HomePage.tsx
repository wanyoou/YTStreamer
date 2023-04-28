'use client';

import { TargetUrlsContextProvider } from 'app/GlobalContexts';
import AddressBar from './AddressBar';
import DownProfile from './DownProfile';
import ProgressBars from './ProgressBar';

export default function HomePage() {
  return (
    <div className='flex-col space-y-4'>
      <TargetUrlsContextProvider>
        <AddressBar />
        <DownProfile />
        <ProgressBars />
      </TargetUrlsContextProvider>
    </div>
  );
}
