'use client';

import { useRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

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
    <div className="flex-col space-y-4 w-full">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
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
          placeholder="Paste url here..."
          ref={inputRef}
          className="input input-bordered rounded-lg w-full py-2 pl-9 pr-3 shadow-sm border-gray-300 placeholder:italic placeholder:text-slate-400"
        />
      </label>
      <textarea
        placeholder="Paste urls here..."
        className="textarea textarea-bordered textarea-md rounded-lg w-full placeholder:italic placeholder:text-slate-400"
      />
    </div>
  );
};

export default AddressBar;
