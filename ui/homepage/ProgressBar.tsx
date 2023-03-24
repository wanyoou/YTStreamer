'use client';

import { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState('0');
  const [speed, setSpeed] = useState('0');
  const [title, setTitle] = useState('Downloading...');

  async function enrollProgressEvent() {
    let { appWindow } = await import('@tauri-apps/api/window');
    const unlistenHandler = appWindow.listen<{
      title: string;
      downloaded_bytes: string;
      percent: string;
      total_bytes: string;
      speed: string;
    }>('progress_msg', (event) => {
      const payload = event.payload;
      console.log(payload);
      // const keyNum = Object.keys(payload).length;
      // if (keyNum > 1) {
      //   setProgress(payload.percent);
      //   setSpeed(payload.speed);
      // } else {
      //   setTitle(payload.title);
      // }
    });
    return unlistenHandler;
  }

  useEffect(() => {
    const unlistenHandler = enrollProgressEvent();

    return () => {
      unlistenHandler.then((handler) => handler());
    };
  }, []);

  return (
    <div className="dark:text-white">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {title}
        </span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {speed}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-green-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full h-2.5"
          style={{ width: `${progress}` }}
        >
          {progress}
        </div>
      </div>
    </div>
  );
}
