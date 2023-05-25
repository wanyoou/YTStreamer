'use client';
import GeneralSettings from './General';

export default function Settings() {
  return (
    <div className='flex flex-col space-y-4 pr-4 py-2 h-screen overflow-y-auto'>
      <GeneralSettings />
    </div>
  );
}
