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
          <div className="grid grid-cols-[1fr,minmax(auto,240px),min(800px,100%),1fr] gap-x-8 py-8">
            <div className="col-start-2">
              <GlobalNav />
            </div>
            <div className="col-start-3 space-y-6">
              <div className="rounded-box">{children}</div>
            </div>
          </div>
        </ThemesInit>
      </body>
    </html>
  );
}
