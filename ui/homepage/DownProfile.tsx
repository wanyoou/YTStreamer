'use client';

import { useState, useEffect } from 'react';
import { open } from '@tauri-apps/api/dialog';

function MoreOptions() {
  const [thread, setThread] = useState('1');

  return (
    <div className="grid grid-cols-6 gap-4">
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
    </div>
  );
}

export default function DownProfile() {
  const [path, setPath] = useState('');
  const [videoDirPath, setVideoDirPath] = useState('');
  const [filename, setFilename] = useState('');
  const [showMore, setShowMore] = useState(false);

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

      <div className="form-control relative col-span-3">
        <label className="input-group input-group-sm flex">
          <span className="label-text text-sm">Filename</span>
          <input
            type="text"
            placeholder="%(title)s.%(ext)s"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="input input-bordered input-sm grow ps-1 pe-16"
          />
        </label>
        <div className="dropdown dropdown-bottom dropdown-end bg-neutral-300 absolute end-0 w-1/6 h-full rounded-r-full flex justify-center items-center cursor-pointer">
          <svg
            tabIndex={0}
            className="fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            stroke="currentColor"
          >
            <path d="M227.14123 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C321.728492 456.087573 279.288914 413.647995 227.14123 413.647995z" />
            <path d="M510.903016 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C605.490278 456.087573 563.051723 413.647995 510.903016 413.647995z" />
            <path d="M794.665825 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C889.253086 456.087573 846.813508 413.647995 794.665825 413.647995z" />
          </svg>
          <div
            tabIndex={0}
            className="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content"
          >
            <div className="card-body">
              <h3 className="card-title">Card title!</h3>
              <p>you can use any element as a dropdown.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative justify-center items-center col-start-1 col-end-7">
        <hr className="my-3 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
        <label className="btn btn-xs btn-outline w-1/5 absolute inset-y-0 inset-x-80 z-10 swap">
          <input type="checkbox" />
          <div className="swap-off flex items-center gap-x-2">
            <span className="label-text">More</span>
            <svg
              className="fill-current w-5 h-5 pt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              stroke="currentColor"
            >
              <path d="M932.331207 355.808682l-82.797751-78.876442c-12.026918-11.495822-30.987758-11.531638-42.379203-0.109494L463.235366 597.451184c-11.383258 11.379165-10.828626 29.934776 1.206478 41.387619l82.772168 78.902024c12.036128 11.495822 31.013341 11.522428 42.379203 0.143263l343.927073-320.662207C944.894338 385.826346 944.366312 367.287107 932.331207 355.808682z" />
              <path d="M174.092014 270.492574l-82.601276 80.756255c-12.001335 11.733229-12.311397 30.467919-0.689708 41.813315l402.142963 378.813628c11.639085 11.388375 30.804586 11.05273 42.804898-0.654916l82.601276-80.738859c12.001335-11.742439 12.311397-30.467919 0.672312-41.839921L216.888725 269.845845C205.249641 258.45747 186.084139 258.758322 174.092014 270.492574z" />
            </svg>
          </div>
          <div className="swap-on flex items-center gap-x-2">
            <span className="label-text">Fold</span>
            <svg
              className="fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              stroke="currentColor"
            >
              <path d="M510.198 212.699l-480.758 480.724 116.156 111.201 369.447-369.489 359.719 384.13 118.599-118.523-483.161-488.043z" />
            </svg>
          </div>
        </label>
      </div>
    </div>
  );
}
