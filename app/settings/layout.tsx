import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="rounded-box">{children}</div>
    </div>
  );
}
