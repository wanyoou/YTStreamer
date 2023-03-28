'use client';

import { layouts } from '@/lib/layouts';
import clsx from 'clsx';
import { useSelectedLayoutSegments } from 'next/navigation';
import Link from 'next/link';

export default function GlobalNav() {
  const [selectedLayoutSegments] = useSelectedLayoutSegments();

  return (
    <div className="space-y-5">
      {layouts.map((layout) => {
        return (
          <div key={layout.name}>
            {(() => {
              const isActive = layout.slug === selectedLayoutSegments;

              return (
                <div key={layout.slug}>
                  {
                    <Link
                      href={`/${layout.slug}`}
                      className={clsx(
                        'block rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-800 hover:text-zinc-100',
                        { 'text-zinc-400': !isActive, 'text-white': isActive },
                      )}
                    >
                      {layout.name}
                    </Link>
                  }
                </div>
              );
            })()}
          </div>
        );
      })}
    </div>
  );
}
