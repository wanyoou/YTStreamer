import HomePage from '@/ui/homepage/HomePage';
import { WindowSize } from '@/ui/Window';
import { Fragment } from 'react';

export default function Page() {
  return (
    <Fragment>
      <WindowSize />
      <HomePage />
    </Fragment>
  );
}
