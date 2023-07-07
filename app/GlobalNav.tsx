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
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PowerIcon,
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
    case 'Collapse':
      return <ChevronDoubleLeftIcon className='w-5 h-5' />;
    case 'Expand':
      return <ChevronDoubleRightIcon className='w-5 h-5' />;
    case 'Exit':
      return <PowerIcon className='w-5 h-5' />;
  }
}

export default function GlobalNav() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className='flex flex-col justify-between h-screen'>
      <div>
        {layouts.map((layout, index) => {
          const isActive = layout.slug === (segment ?? '');
          if (isActive) {
            selectedIndex = index;
          }
          return (
            <Link
              key={layout.name}
              href={`/${layout.slug}`}
              className={clsx('flex flex-col place-items-center py-4', {
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
      <span className='bg-base-200 h-full' />
      <div className='bg-base-200 space-y-4'>
        <span className='flex flex-col place-items-center'>
          <NavIcons name='Collapse' />
          Collapse
        </span>
        <span className='flex flex-col place-items-center'>
          <NavIcons name='Exit' />
          Exit
        </span>
      </div>
    </div>
  );
}
