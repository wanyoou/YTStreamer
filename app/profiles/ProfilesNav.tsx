'use client';

import { useState } from 'react';
import { options } from '@/lib/options';
import clsx from 'clsx';
import Link from 'next/link';

export default function ProfilesNav() {
  const [isActive, setIsActive] = useState<string>(options[0].section);

  return (
    <div className='flex flex-col place-content-center space-y-2'>
      {options.map((segment) => (
        <Link
          key={segment.section}
          href={`/profiles#${segment.section}`}
          scroll={false}
          onClick={() => (isActive === segment.section ? null : setIsActive(segment.section))}
          className={clsx('cursor-pointer text-xs', {
            'font-semibold': isActive === segment.section,
            'hover:font-semibold': isActive !== segment.section,
          })}
        >
          {segment.section}
        </Link>
      ))}
    </div>
  );
}
