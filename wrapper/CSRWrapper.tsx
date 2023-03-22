import dynamic from 'next/dynamic';
import React from 'react';

const CSRWrapper = (Component: React.FunctionComponent) =>
  dynamic(() => Promise.resolve(Component), { ssr: false });

const NotSSR = (props: { children: React.ReactNode }) => (
  <React.Fragment>{props.children}</React.Fragment>
);

const CSRWrapperr = dynamic(() => Promise.resolve(NotSSR), {
  ssr: false,
});

export default CSRWrapper;
