'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { layouts } from '@/lib/layouts';
import clsx from 'clsx';
import Link from 'next/link';
import {
  ArrowDownTrayIcon,
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

let selectedIndex = 0;

function NavIcons({ name }: { name: string }) {
  switch (name) {
    case 'Download':
      return <ArrowDownTrayIcon className='w-5 h-5' />;
    case 'Profiles':
      return <AdjustmentsHorizontalIcon className='w-5 h-5' />;
    case 'Settings':
      return <Cog6ToothIcon className='w-5 h-5' />;
    case 'About':
      return <InformationCircleIcon className='w-5 h-5' />;
  }
}

export default function GlobalNav() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className='h-screen'>
      {layouts.map((layout, index) => {
        const isActive = layout.slug === (segment ?? '');
        if (isActive) {
          selectedIndex = index;
        }
        return (
          <Link
            key={layout.name}
            href={`/${layout.slug}`}
            className={clsx('flex flex-col justify-center items-center h-1/4', {
              'bg-base-100': isActive,
              'bg-base-200': !isActive,
              'rounded-br-md': index === selectedIndex - 1,
              'rounded-tr-md': index === selectedIndex + 1,
            })}
          >
            <NavIcons name={layout.name} />
            {layout.name}
          </Link>
        );
      })}
    </div>
  );
}
