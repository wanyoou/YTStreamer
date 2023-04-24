'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import { layouts } from '@/lib/layouts';
import clsx from 'clsx';
import Link from 'next/link';

let selectedIndex: number = 0;

export default function GlobalNav() {
  const [selectedLayoutSegments] = useSelectedLayoutSegments();

  return (
    <div className="h-screen">
      {layouts.map((layout, index) => {
        const isActive = layout.slug === selectedLayoutSegments;
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
