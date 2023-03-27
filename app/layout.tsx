import '@/styles/globals.css';
import React from 'react';
import GlobalNav from './GlobalNav';
import Themes from './Theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <title>YTStreamer</title>
      </head>
      <body className="overflow-y-scroll">
        <Themes>
          <div className="grid grid-cols-[1fr,minmax(auto,240px),min(800px,100%),1fr] gap-x-8 py-8">
            <div className="col-start-2">
              <GlobalNav />
            </div>
            <div className="col-start-3 space-y-6">
              <div className="rounded-xl border border-zinc-800 bg-black p-8">
                {children}
              </div>
            </div>
          </div>
        </Themes>
      </body>
    </html>
  );
}
