import { Dispatch, MouseEventHandler, SetStateAction, useContext, useState, useEffect, useRef } from 'react';
import { AddressBarContext, TargetUrlsContext } from 'app/GlobalContexts';
import { invoke } from '@tauri-apps/api/tauri';
import { WebviewWindow } from '@tauri-apps/api/window';
import FormatsBtn from '../Formats';

function ClearBtn({
  clickHandler,
  subClass,
}: {
  clickHandler: MouseEventHandler<HTMLSpanElement> | undefined;
  subClass: string;
}) {
  return (
    <span onClick={clickHandler} className={'absolute ' + subClass + ' end-2 flex items-center cursor-pointer'}>
      <svg className='fill-current stroke-current w-5 h-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'>
        <path d='M512 56.889344c251.35104 0 455.110656 203.759616 455.110656 455.110656S763.35104 967.110656 512 967.110656 56.889344 763.35104 56.889344 512 260.64896 56.889344 512 56.889344z m180.675584 274.316288c-11.108352-11.108352-29.118464-11.108352-40.226816 0L511.65696 471.998464 370.864128 331.205632c-11.108352-11.108352-29.118464-11.108352-40.226816 0-11.108352 11.108352-11.108352 29.118464 0 40.226816L471.42912 512.22528 330.637312 653.018112c-11.108352 11.108352-11.108352 29.118464 0 40.226816 11.108352 11.108352 29.118464 11.108352 40.226816 0l140.792832-140.792832 140.791808 140.792832c11.108352 11.108352 29.118464 11.108352 40.226816 0 11.108352-11.108352 11.108352-29.118464 0-40.226816L551.882752 512.22528l140.792832-140.792832c11.108352-11.108352 11.108352-29.118464 0-40.226816z' />
      </svg>
    </span>
  );
}

function SingleUrlBar({ url, setUrl }: { url: string; setUrl: Dispatch<SetStateAction<string>> }) {
  return (
    <label className='relative block'>
      <span className='absolute inset-y-0 start-2.5 flex items-center pointer-events-none'>
        <svg className='fill-current stroke-current w-5 h-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'>
          <path d='M633.417143 429.007238a174.567619 174.567619 0 0 1 0 246.857143l-155.306667 155.306667a186.709333 186.709333 0 1 1-264.045714-264.045715l76.483048-76.507428 51.73638 51.736381-76.507428 76.507428a113.566476 113.566476 0 1 0 160.597333 160.597334l155.306667-155.306667a101.424762 101.424762 0 0 0 0-143.408762z m208.603428-225.816381a186.709333 186.709333 0 0 1 0 264.045714L765.561905 543.744l-51.736381-51.712 76.507428-76.507429a113.566476 113.566476 0 1 0-160.597333-160.597333l-155.306667 155.306667a101.424762 101.424762 0 0 0 0 143.408762l-51.736381 51.736381a174.567619 174.567619 0 0 1 0-246.857143l155.306667-155.306667a186.709333 186.709333 0 0 1 264.045714 0z' />
        </svg>
      </span>
      <input
        type='url'
        placeholder='Paste url here...'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required={true}
        className='input input-bordered rounded-lg w-full py-1 pl-9 pr-3 font-semibold subpixel-antialiased slashed-zero placeholder:italic placeholder:text-slate-400'
      />
      {url.length > 0 ? <ClearBtn clickHandler={() => setUrl('')} subClass='inset-y-3' /> : null}
    </label>
  );
}

function MultiUrlsArea({ urls, setUrls }: { urls: string[]; setUrls: Dispatch<SetStateAction<string[]>> }) {
  return (
    <label className='relative block'>
      <textarea
        placeholder='Paste urls here...'
        value={urls.join('\n')}
        onChange={(e) => setUrls(e.target.value.split('\n'))}
        required={true}
        className='textarea textarea-bordered rounded-lg w-full py-1 px-2 h-48 max-h-80 font-semibold subpixel-antialiased slashed-zero placeholder:italic placeholder:text-slate-400'
      />
      {urls.length > 0 ? <ClearBtn clickHandler={() => setUrls([])} subClass='top-2' /> : null}
    </label>
  );
}

let theWindow: WebviewWindow;

async function initWindow() {
  const { appWindow } = await import('@tauri-apps/api/window');
  theWindow = appWindow;
}

export default function AddressBar() {
  const { targetUrlsDispatch } = useContext(TargetUrlsContext);
  const { addressBarState, addressBarDispatch } = useContext(AddressBarContext);
  const stateRef = useRef(addressBarState);

  const [url, setUrl] = useState<string>(addressBarState.url);
  const [urls, setUrls] = useState<string[]>(addressBarState.urls);
  const [isTextArea, setTextArea] = useState<boolean>(addressBarState.isTextArea);

  async function handleDownload() {
    isTextArea
      ? targetUrlsDispatch({ type: 'targetUrlsAdd', payload: urls })
      : targetUrlsDispatch({ type: 'targetUrlsAdd', payload: url });

    isTextArea ? setUrls([]) : setUrl('');

    await invoke('start_download', {
      window: theWindow,
      targetUrl: isTextArea ? urls : url,
    });
  }

  useEffect(() => {
    stateRef.current = { url, urls, isTextArea };
  }, [url, urls, isTextArea]);

  useEffect(() => {
    if (!theWindow) initWindow();

    return () => {
      if (stateRef.current !== addressBarState) addressBarDispatch({ type: 'updateState', payload: stateRef.current });
    };
  }, [addressBarState, addressBarDispatch]);

  return (
    <div className='flex flex-col bg-base-200 rounded-md p-2 space-y-2'>
      <div className='flex justify-between'>
        <label className='btn btn-sm btn-outline swap swap-flip'>
          <input type='checkbox' onChange={() => setTextArea(!isTextArea)} />
          <div className='swap-off flex items-center gap-x-2'>
            <svg
              className='fill-current stroke-current w-5 h-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1024 1024'
            >
              <path d='M896 160H128c-35.2 0-64 28.8-64 64v576c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V224c0-35.2-28.8-64-64-64z m0 608c0 16-12.8 32-32 32H160c-19.2 0-32-12.8-32-32V256c0-16 12.8-32 32-32h704c19.2 0 32 12.8 32 32v512z' />
              <path d='M224 288c-19.2 0-32 12.8-32 32v256c0 16 12.8 32 32 32s32-12.8 32-32V320c0-16-12.8-32-32-32z m608 480c19.2 0 32-12.8 32-32V608L704 768h128z' />
            </svg>
            Multi-urls mode
          </div>
          <div className='swap-on flex items-center gap-x-2'>
            <svg
              className='fill-current stroke-current w-5 h-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1024 1024'
            >
              <path d='M896 224H128c-35.2 0-64 28.8-64 64v448c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V288c0-35.2-28.8-64-64-64z m0 480c0 19.2-12.8 32-32 32H160c-19.2 0-32-12.8-32-32V320c0-19.2 12.8-32 32-32h704c19.2 0 32 12.8 32 32v384z' />
              <path d='M224 352c-19.2 0-32 12.8-32 32v256c0 16 12.8 32 32 32s32-12.8 32-32V384c0-16-12.8-32-32-32z' />
            </svg>
            Single url mode
          </div>
        </label>

        <div className='flex items-center gap-x-2'>
          <FormatsBtn />

          <button onClick={handleDownload} className='btn btn-sm btn-success gap-x-2'>
            <svg
              className='fill-current stroke-current w-5 h-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1024 1024'
            >
              <path d='M213.333333 810.666667h597.333334a42.666667 42.666667 0 0 1 0 85.333333H213.333333a42.666667 42.666667 0 0 1 0-85.333333z m341.333334-248.533334l138.368-138.325333 60.330666 60.330667L512 725.504l-241.365333-241.365333 60.330666-60.330667L469.333333 562.133333V85.333333h85.333334v476.8z' />
            </svg>
            DOWNLOAD
          </button>
        </div>
      </div>

      <div className='form-control'>
        {isTextArea ? <MultiUrlsArea urls={urls} setUrls={setUrls} /> : <SingleUrlBar url={url} setUrl={setUrl} />}
      </div>
    </div>
  );
}
