import React from 'react';
import ProfilesNav from './ProfilesNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(auto,104px),min(696px,100%)]">
      <ProfilesNav />
      {children}
    </div>
  );
}
