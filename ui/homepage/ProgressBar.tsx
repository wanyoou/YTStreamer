import React, { useContext } from 'react';
import { ProgressContext } from 'app/GlobalContexts';
import Image from 'next/image';

function SingleProgressBar({ url }: { url: string }) {
  const { allProgressInfo } = useContext(ProgressContext);
  const { thumbnail, title, uploader, extractor, downloaded, total, speed, percent } = allProgressInfo[url];

  return (
    <div className='grid grid-cols-6 gap-x-4 py-1 rounded-md bg-neutral hover:bg-base-300'>
      <div className='relative col-span-1'>
        <Image src={thumbnail} alt='Video thumbnail or yt-dlp banner by default' fill={true} priority />
      </div>
      <div className='col-span-4 space-y-1'>
        <div>
          <label className='label p-0'>
            <span className='label-text text-sm font-semibold'>
              {title.length > 40 ? title.slice(0, 40) + '...' : title}
            </span>
            <span className='badge badge-sm badge-secondary'>{extractor}</span>
          </label>
          <label className='label p-0'>
            <span className='label-text text-sm'>{uploader}</span>
            <span className='label-text text-sm'>
              {downloaded} / {total} {speed}
            </span>
          </label>
        </div>
        <div className='relative flex justify-center items-center'>
          <progress
            className='progress progress-success bg-base-content h-3'
            value={percent > '0.0' ? percent : undefined}
            max='100'
          />
          <span className='label-text text-xs text-white absolute z-10'>{percent}%</span>
        </div>
      </div>
    </div>
  );
}

export default function ProgressBars() {
  const { targetUrls } = useContext(ProgressContext);

  return (
    <div className='bg-scroll bg-base-200 rounded-md p-2 space-y-4'>
      {targetUrls.map((url) => (
        <SingleProgressBar key={url} url={url} />
      ))}
    </div>
  );
}
