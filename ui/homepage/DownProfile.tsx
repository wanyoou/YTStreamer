'use client';

import { useRef } from 'react';
import { open } from '@tauri-apps/api/dialog';

async function handleReadFile() {
  const selected = await open({
    directory: true,
    multiple: false,
    title: 'Select the download path',
  });
  if (selected === null) {
    console.log('user cancelled the selection');
  } else {
    console.log(selected);
  }
}

export default function DownProfile() {
  const downPathRef = useRef<HTMLInputElement>(null);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-2">
        <div className="form-control">
          <label className="input-group input-group-sm">
            <span className="label-text text-sm font-medium">Saved to</span>
            <input
              type="text"
              placeholder="10"
              ref={downPathRef}
              className="input input-bordered input-sm"
            />
            <span className="cursor-pointer" onClick={handleReadFile}>
              <svg
                className="fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                stroke="currentColor"
              >
                <path d="M921.6 450.133333c-6.4-8.533333-14.933333-12.8-25.6-12.8h-10.666667V341.333333c0-40.533333-34.133333-74.666667-74.666666-74.666666H514.133333c-4.266667 0-6.4-2.133333-8.533333-4.266667l-38.4-66.133333c-12.8-21.333333-38.4-36.266667-64-36.266667H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666667v597.333333c0 6.4 2.133333 12.8 6.4 19.2 6.4 8.533333 14.933333 12.8 25.6 12.8h640c12.8 0 25.6-8.533333 29.866667-21.333333l128-362.666667c4.266667-10.666667 2.133333-21.333333-4.266667-29.866667zM170.666667 224h232.533333c4.266667 0 6.4 2.133333 8.533333 4.266667l38.4 66.133333c12.8 21.333333 38.4 36.266667 64 36.266667H810.666667c6.4 0 10.666667 4.266667 10.666666 10.666666v96H256c-12.8 0-25.6 8.533333-29.866667 21.333334l-66.133333 185.6V234.666667c0-6.4 4.266667-10.666667 10.666667-10.666667z m573.866666 576H172.8l104.533333-298.666667h571.733334l-104.533334 298.666667z" />
              </svg>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
