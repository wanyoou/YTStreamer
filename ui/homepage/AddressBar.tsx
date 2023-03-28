'use client';

import { useRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';

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

const AddressBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleDownload() {
    let { appWindow } = await import('@tauri-apps/api/window');
    await invoke('start_download', {
      window: appWindow,
      targetUrl: inputRef.current?.value,
    });
  }

  return (
    <div className="form-control w-full">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            stroke="currentColor"
          >
            <path d="M633.417143 429.007238a174.567619 174.567619 0 0 1 0 246.857143l-155.306667 155.306667a186.709333 186.709333 0 1 1-264.045714-264.045715l76.483048-76.507428 51.73638 51.736381-76.507428 76.507428a113.566476 113.566476 0 1 0 160.597333 160.597334l155.306667-155.306667a101.424762 101.424762 0 0 0 0-143.408762z m208.603428-225.816381a186.709333 186.709333 0 0 1 0 264.045714L765.561905 543.744l-51.736381-51.712 76.507428-76.507429a113.566476 113.566476 0 1 0-160.597333-160.597333l-155.306667 155.306667a101.424762 101.424762 0 0 0 0 143.408762l-51.736381 51.736381a174.567619 174.567619 0 0 1 0-246.857143l155.306667-155.306667a186.709333 186.709333 0 0 1 264.045714 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Paste url here"
          ref={inputRef}
          className="input input-bordered w-full max-w-xs pl-10 border-gray-300"
        />
      </div>
    </div>
  );
};

export default AddressBar;
