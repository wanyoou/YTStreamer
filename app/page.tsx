import ProgressBar from '@/ui/homepage/ProgressBar';
import AddressBar from '@/ui/homepage/AddressBar';
import DownProfile from '@/ui/homepage/DownProfile';
import { WindowSize } from '@/ui/Window';
import { Fragment } from 'react';

export default function Page() {
  return (
    <Fragment>
      <WindowSize />
      <div className="flex-col space-y-8 w-full">
        <AddressBar />
        <DownProfile />
        <ProgressBar />
      </div>
    </Fragment>
  );
}
