'use client';

import React, { useRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { appWindow } from '@tauri-apps/api/window';

async function handleReadFile() {
  const selected = await open({
    multiple: true,
    filters: [
      {
        name: '',
        extensions: ['txt'],
      },
    ],
  });
  if (Array.isArray(selected)) {
    console.log('user selected multiple files');
    console.log(selected);
  } else {
    console.log('user cancelled the selection');
  }
}

async function listenEvent() {
  const unlistenProgress = await appWindow.listen(
    'download_progress',
    ({ event, payload }) => console.log(payload),
  );
}

function FormSvg(props: { className: string; viewBox: string; children: any }) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      className={props.className}
      viewBox={props.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.children}
    </svg>
  );
}

function ProgressBar(props: {
  title: string;
  speed: number;
  progress: number;
}) {
  return (
    <div className="dark:text-white">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {props.title}
        </span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {props.speed} MB/s
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-green-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full h-2.5"
          style={{ width: `${props.progress}%` }}
        >
          {props.progress}%
        </div>
      </div>
    </div>
  );
}

const HomePage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleDownload() {
    await invoke('emit_progress', { window: appWindow });
    await invoke('start_download', { targetUrl: inputRef.current?.value });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        <form className="flex items-center rounded-lg w-full">
          <button
            type="button"
            onClick={handleReadFile}
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <FormSvg className="w-6 h-6" viewBox="0 0 1024 1024">
              <path d="M903.542857 256.8c6.857143 6.857143 10.742857 16.114286 10.742857 25.828571V987.428571c0 20.228571-16.342857 36.571429-36.571428 36.571429H146.285714c-20.228571 0-36.571429-16.342857-36.571428-36.571429V36.571429c0-20.228571 16.342857-36.571429 36.571428-36.571429h485.371429c9.714286 0 19.085714 3.885714 25.942857 10.742857l245.942857 246.057143zM829.942857 299.428571L614.857143 84.342857V299.428571h215.085714z" />
            </FormSvg>
            <span className="sr-only">Read urls from file</span>
          </button>

          {/* https://flowbite.com/docs/forms/input-field/#validation */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FormSvg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M896.7 172.6c-75-75-195.5-76.1-269.1-2.5l-90.1 90.2a3.9 3.9 0 0 0 0 5.6l45.2 45.3a4.2 4.2 0 0 0 5.7 0l90.1-90.2a114.3 114.3 0 0 1 82.5-33.4c31.8 0.3 61.9 13.1 84.8 35.9a121.1 121.1 0 0 1 35.8 84.8c0.3 31.3-11.5 60.6-33.4 82.4l-185.9 186a114.3 114.3 0 0 1-82.5 33.4 121 121 0 0 1-84.8-35.9 122.6 122.6 0 0 1-17-21.2 4 4 0 0 0-6.3-0.7l-45.9 45.9a4 4 0 0 0-0.4 5.2 181.8 181.8 0 0 0 18.7 21.7c75 75 195.5 76.1 269.1 2.5l185.9-186c73.7-73.6 72.5-194-2.4-269zM396 758.1a3.9 3.9 0 0 0-5.6 0L345.5 803a114.3 114.3 0 0 1-82.5 33.4c-31.8-0.3-61.9-13.1-84.8-35.9a121.1 121.1 0 0 1-35.8-84.8c-0.3-31.3 11.5-60.6 33.4-82.4l185.9-186a114.3 114.3 0 0 1 82.5-33.4 121 121 0 0 1 84.8 35.9 122.6 122.6 0 0 1 17 21.2 4 4 0 0 0 6.3 0.7l45.9-45.9a4 4 0 0 0 0.4-5.2 181.8 181.8 0 0 0-18.7-21.7c-75-75-195.5-76.1-269.1-2.5l-185.9 186c-73.7 73.6-72.5 194 2.4 269 75 75 195.5 76.1 269.1 2.5l44.9-44.9a4 4 0 0 0 0-5.7z"
                  fill="#1afa29"
                />
              </FormSvg>
            </div>
            <input
              type="text"
              id="url"
              ref={inputRef}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Paste url here..."
            />
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <FormSvg className="w-6 h-6 rotate-90" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </FormSvg>
            <span className="sr-only">Download</span>
          </button>
        </form>
      </div>
      <ProgressBar title="Test" speed={5} progress={45} />
    </div>
  );
};

export default HomePage;
