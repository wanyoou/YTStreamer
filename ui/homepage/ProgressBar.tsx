'use client';

import { useState, useEffect } from 'react';

type ProgressMsgEvent = {
  title: string;
  status: string;
  predicted_size_str: string;
  downloaded_bytes_str: string;
  total_bytes_str: string;
  percent_str: string;
  speed_str: string;
};

export default function ProgressBar() {
  const [title, setTitle] = useState('');
  const [downloaded, setDownloaded] = useState('');
  const [total, setTotal] = useState('');
  const [speed, setSpeed] = useState('');
  const [progress, setProgress] = useState('0');

  async function updateStatus(payload: ProgressMsgEvent) {
    setTitle(payload.title);
    setDownloaded(payload.downloaded_bytes_str);
    setSpeed(payload.speed_str);
    setProgress(payload.percent_str);
    if (payload.status !== 'DONE') setTotal(payload.predicted_size_str);
    else setTotal(payload.total_bytes_str);
  }

  async function enrollProgressEvent() {
    let { appWindow } = await import('@tauri-apps/api/window');
    const unlistenHandler = appWindow.listen<ProgressMsgEvent>(
      'progress_msg',
      async (event) => {
        await updateStatus(event.payload);
      },
    );
    return unlistenHandler;
  }

  useEffect(() => {
    const unlistenHandler = enrollProgressEvent();

    return () => {
      unlistenHandler.then((handler) => handler());
    };
  }, []);

  return (
    <div className="w-full">
      <label className="label">
        <span className="label-text text-sm">
          {title.length > 20 ? title.slice(0, 20) + '......' : title}
        </span>
        <span className="label-text text-sm">
          {(downloaded
            ? downloaded !== total
              ? downloaded + ' / '
              : null
            : downloaded) +
            total +
            (speed ? '  ' + speed : speed)}
        </span>
      </label>
      <div className="grid place-items-center">
        <progress
          className="progress progress-success w-full bg-zinc-200 rounded-full h-3 col-start-1 row-start-1"
          value={progress}
          max="100"
        />
        <span className="label-text text-xs font-medium text-white col-start-1 row-start-1 z-20">
          {progress > '0' ? progress : null}
        </span>
      </div>
    </div>
  );
}
