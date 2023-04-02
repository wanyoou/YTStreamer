'use client';

import { useState, useEffect } from 'react';
import { open } from '@tauri-apps/api/dialog';

export default function DownProfile() {
  const [path, setPath] = useState('');
  const [videoDirPath, setVideoDirPath] = useState('');
  const [thread, setThread] = useState('1');

  async function selectDownPath() {
    const selected = await open({
      directory: true,
      multiple: false,
      recursive: false,
      title: 'Select the download path',
    });
    if (typeof selected === 'string') {
      setPath(selected);
    }
  }

  async function setVideoDir() {
    let { videoDir } = await import('@tauri-apps/api/path');
    setVideoDirPath(await videoDir());
  }

  useEffect(() => {
    setVideoDir();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="form-control col-span-3">
        <label className="input-group input-group-sm flex">
          <span className="label-text text-sm">Saved to</span>
          <input
            type="text"
            placeholder={videoDirPath}
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="input input-bordered input-sm grow"
          />
          <span className="cursor-pointer" onClick={selectDownPath}>
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

      <div className="form-control col-span-1">
        <input
          type="range"
          min="1"
          max="32"
          value={thread}
          onChange={(e) => setThread(e.target.value)}
          className="range range-xs"
        />
      </div>

      <div className="divider col-start-1 col-end-7">
        <button className="btn">test</button>
      </div>

      <div className="collapse col-start-1 col-end-7">
        <input type="checkbox" className="peer" />
        <div className="collapse-title">Click me to show/hide content</div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
}
