'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { layouts } from '@/lib/layouts';
import clsx from 'clsx';
import Link from 'next/link';

let selectedIndex = 0;

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
            className={clsx('flex justify-center items-center h-1/4', {
              'bg-base-100': isActive,
              'bg-base-200': !isActive,
              'rounded-br-md': index === selectedIndex - 1,
              'rounded-tr-md': index === selectedIndex + 1,
            })}
          >
            {layout.name}
          </Link>
        );
      })}
    </div>
  );
}
