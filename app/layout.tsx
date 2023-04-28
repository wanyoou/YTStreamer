import '@/styles/globals.css';
import React from 'react';
import Head from 'next/head';
import GlobalNav from './GlobalNav';
import ThemesInit from './Theme';
import WindowSize from './Window';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <WindowSize />
      <Head>
        <title>YTStreamer</title>
      </Head>
      <body>
        <ThemesInit>
          <div className='grid grid-cols-[max(96px,10%),1fr] gap-x-4'>
            <GlobalNav />
            {children}
          </div>
        </ThemesInit>
      </body>
    </html>
  );
}
