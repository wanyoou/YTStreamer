'use client';

import AddressBar from './AddressBar';
import DownProfile from './DownProfile';
import ProgressBars from './ProgressBar';

export default function HomePage() {
  return (
    <div className='flex flex-col space-y-4'>
      <AddressBar />
      <DownProfile />
      <ProgressBars />
    </div>
  );
}
