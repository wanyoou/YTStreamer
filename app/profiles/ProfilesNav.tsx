'use client';

import { useContext } from 'react';
import { ProfilesNavContext } from 'app/GlobalContexts';
import { options } from '@/lib/options';
import clsx from 'clsx';

let isActive: string;

export default function ProfilesNav() {
  const { currentInViewSections } = useContext(ProfilesNavContext);

  for (const seg of options) {
    if (currentInViewSections.includes(seg.section)) {
      isActive = seg.section;
      break;
    }
  }

  return (
    <div className='flex flex-col place-content-center space-y-2'>
      {options.map((segment) => (
        <a
          key={segment.section}
          href={`/profiles#${segment.section}`}
          className={clsx('cursor-pointer text-xs', {
            'font-semibold': isActive === segment.section,
            'hover:font-semibold': isActive !== segment.section,
          })}
        >
          {segment.section}
        </a>
      ))}
    </div>
  );
}
