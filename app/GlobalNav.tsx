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
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <div>{layout.name}</div>
            </div>

            {layout.items.map((item) => {
              const isActive = item.slug === selectedLayoutSegments;

              return (
                <div key={item.slug}>
                  {item.isDisabled ? (
                    <div
                      className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-600"
                      title="Coming Soon"
                    >
                      {item.name}
                    </div>
                  ) : (
                    <Link
                      href={`/${item.slug}`}
                      className={clsx(
                        'block rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-800 hover:text-zinc-100',
                        { 'text-zinc-400': !isActive, 'text-white': isActive },
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
