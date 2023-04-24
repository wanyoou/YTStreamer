import '@/styles/globals.css';
import React from 'react';
import GlobalNav from './GlobalNav';
import ThemesInit from './Theme';
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <Head>
        <title>YTStreamer</title>
      </Head>
      <body>
        <ThemesInit>
          <div className="grid grid-cols-[max(96px,10%),1fr] gap-x-4">
            <GlobalNav />
            {children}
          </div>
        </ThemesInit>
      </body>
    </html>
  );
}
