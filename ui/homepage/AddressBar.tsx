'use client';

import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

function ClearBtn({
  clickHandler,
  subClass,
}: {
  clickHandler: () => void;
  subClass: string;
}) {
  return (
    <span
      onClick={clickHandler}
      className={
        'absolute ' + subClass + ' end-2 flex items-center cursor-pointer'
      }
    >
      <svg
        className="fill-current w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        stroke="currentColor"
      >
        <path
          fill="#707070"
          d="M512 56.889344c251.35104 0 455.110656 203.759616 455.110656 455.110656S763.35104 967.110656 512 967.110656 56.889344 763.35104 56.889344 512 260.64896 56.889344 512 56.889344z m180.675584 274.316288c-11.108352-11.108352-29.118464-11.108352-40.226816 0L511.65696 471.998464 370.864128 331.205632c-11.108352-11.108352-29.118464-11.108352-40.226816 0-11.108352 11.108352-11.108352 29.118464 0 40.226816L471.42912 512.22528 330.637312 653.018112c-11.108352 11.108352-11.108352 29.118464 0 40.226816 11.108352 11.108352 29.118464 11.108352 40.226816 0l140.792832-140.792832 140.791808 140.792832c11.108352 11.108352 29.118464 11.108352 40.226816 0 11.108352-11.108352 11.108352-29.118464 0-40.226816L551.882752 512.22528l140.792832-140.792832c11.108352-11.108352 11.108352-29.118464 0-40.226816z"
        />
      </svg>
    </span>
  );
}

const AddressBar = () => {
  const [url, setUrl] = useState('');
  const [isTextArea, setTextArea] = useState(false);

  async function handleDownload() {
    let { appWindow } = await import('@tauri-apps/api/window');
    await invoke('start_download', {
      window: appWindow,
      targetUrl: url,
    });
  }

  return (
    <div className="flex-col space-y-2 w-full">
      <div className="grid grid-cols-4 gap-4 place-items-end">
        <label className="btn btn-sm btn-outline swap swap-flip col-end-5 col-span-1">
          <input type="checkbox" onChange={() => setTextArea(!isTextArea)} />
          <svg
            className="swap-off fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            stroke="currentColor"
          >
            <path d="M896 160H128c-35.2 0-64 28.8-64 64v576c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V224c0-35.2-28.8-64-64-64z m0 608c0 16-12.8 32-32 32H160c-19.2 0-32-12.8-32-32V256c0-16 12.8-32 32-32h704c19.2 0 32 12.8 32 32v512z" />
            <path d="M224 288c-19.2 0-32 12.8-32 32v256c0 16 12.8 32 32 32s32-12.8 32-32V320c0-16-12.8-32-32-32z m608 480c19.2 0 32-12.8 32-32V608L704 768h128z" />
          </svg>
          <span className="swap-off label-text pl-6">Multi-urls mode</span>
          <svg
            className="swap-on fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            stroke="currentColor"
          >
            <path d="M896 224H128c-35.2 0-64 28.8-64 64v448c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V288c0-35.2-28.8-64-64-64z m0 480c0 19.2-12.8 32-32 32H160c-19.2 0-32-12.8-32-32V320c0-19.2 12.8-32 32-32h704c19.2 0 32 12.8 32 32v384z" />
            <path d="M224 352c-19.2 0-32 12.8-32 32v256c0 16 12.8 32 32 32s32-12.8 32-32V384c0-16-12.8-32-32-32z" />
          </svg>
          <span className="swap-on label-text pl-6">Single url mode</span>
        </label>
      </div>

      <div className="form-control">
        <label className={'relative block' + (isTextArea ? ' hidden' : '')}>
          <span className="absolute inset-y-0 start-2.5 flex items-center pointer-events-none">
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
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required={true}
            className="input input-bordered rounded-lg w-full py-1 pl-9 pr-3 font-semibold subpixel-antialiased slashed-zero placeholder:italic placeholder:text-slate-400"
          />
          {url.length > 0 ? (
            <ClearBtn clickHandler={() => setUrl('')} subClass="inset-y-3" />
          ) : null}
        </label>

        <label className={'relative block' + (!isTextArea ? ' hidden' : '')}>
          <textarea
            placeholder="Paste urls here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required={true}
            className="textarea textarea-bordered rounded-lg w-full py-1 px-2 h-48 max-h-80 font-semibold subpixel-antialiased slashed-zero placeholder:italic placeholder:text-slate-400"
          />
          {url.length > 0 ? (
            <ClearBtn clickHandler={() => setUrl('')} subClass="top-2" />
          ) : null}
        </label>
      </div>
    </div>
  );
};

export default AddressBar;
