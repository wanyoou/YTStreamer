'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { options } from '@/lib/options';

export default function ProfilesNav() {
  const [isActive, setIsActive] = useState<string>(options[0].section);

  return (
    <div className="flex flex-col place-content-center space-y-2">
      {options.map((segment) => (
        <span
          key={segment.section}
          onClick={() =>
            isActive === segment.section ? null : setIsActive(segment.section)
          }
          className={clsx('cursor-pointer text-xs', {
            'font-semibold': isActive === segment.section,
            'hover:font-semibold': isActive !== segment.section,
          })}
        >
          {segment.section}
        </span>
      ))}
    </div>
  );
}
