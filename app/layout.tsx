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
      <body className="overflow-y-auto">
        <ThemesInit>
          <div className="grid grid-cols-[minmax(auto,240px),min(800px,100%)] gap-x-4 py-4 pr-4">
            <GlobalNav />
            {children}
          </div>
        </ThemesInit>
      </body>
    </html>
  );
}
