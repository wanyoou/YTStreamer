import React from 'react';
import ProfilesNav from './ProfilesNav';

export default function ProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[max(104px,10%),1fr]">
      <ProfilesNav />
      {children}
    </div>
  );
}
