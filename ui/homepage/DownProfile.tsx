import { useState, useEffect } from 'react';
import { open } from '@tauri-apps/api/dialog';
import { outputTemplate } from '@/lib/outputTemplate';

function MoreOptions() {
  const [thread, setThread] = useState<string>('1');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="grid grid-cols-6 gap-x-2 gap-y-4 col-span-6">
      <div className="form-control col-span-2">
        <label className="label p-0">
          <span className="label-text text-sm">Thread</span>
          <span className="badge badge-sm">{thread}</span>
        </label>
        <label className="items-center flex h-3">
          <input
            type="range"
            min="1"
            max="64"
            value={thread}
            onChange={(e) => setThread(e.target.value)}
            className="range range-xs h-full"
          />
        </label>
      </div>

      <div className="form-control col-span-2">
        <label className="input-group input-group-sm flex">
          <span className="label-text text-sm px-2">Username</span>
          <input
            type="text"
            placeholder="Enter username if needed"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered input-sm grow px-1"
          />
        </label>
      </div>

      <div className="form-control col-span-2">
        <label className="input-group input-group-sm flex">
          <span className="label-text text-sm px-2">Password</span>
          <input
            type="text"
            placeholder="Enter password if needed"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered input-sm grow px-1"
          />
        </label>
      </div>
    </div>
  );
}

let defaultVideoDir: string;

async function setDefaultVideoDir() {
  let { videoDir } = await import('@tauri-apps/api/path');
  defaultVideoDir = await videoDir();
}

export default function DownProfile() {
  const [path, setPath] = useState<string>('');
  const [filename, setFilename] = useState<string>('');
  const [showMore, setShowMore] = useState<boolean>(false);

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

  useEffect(() => {
    setDefaultVideoDir();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-x-2 gap-y-4 bg-base-200 rounded-md p-2">
      <div className="form-control relative col-span-3">
        <label className="input-group input-group-sm flex">
          <span className="label-text text-sm">Path</span>
          <input
            type="text"
            placeholder={defaultVideoDir}
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="input input-bordered input-sm grow ps-1 pe-16"
          />
        </label>
        <div
          onClick={selectDownPath}
          className="bg-base-300 absolute end-0 w-1/6 h-full rounded-r-full flex justify-center items-center cursor-pointer"
        >
          <svg
            className="fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            stroke="currentColor"
          >
            <path d="M921.6 450.133333c-6.4-8.533333-14.933333-12.8-25.6-12.8h-10.666667V341.333333c0-40.533333-34.133333-74.666667-74.666666-74.666666H514.133333c-4.266667 0-6.4-2.133333-8.533333-4.266667l-38.4-66.133333c-12.8-21.333333-38.4-36.266667-64-36.266667H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666667v597.333333c0 6.4 2.133333 12.8 6.4 19.2 6.4 8.533333 14.933333 12.8 25.6 12.8h640c12.8 0 25.6-8.533333 29.866667-21.333333l128-362.666667c4.266667-10.666667 2.133333-21.333333-4.266667-29.866667zM170.666667 224h232.533333c4.266667 0 6.4 2.133333 8.533333 4.266667l38.4 66.133333c12.8 21.333333 38.4 36.266667 64 36.266667H810.666667c6.4 0 10.666667 4.266667 10.666666 10.666666v96H256c-12.8 0-25.6 8.533333-29.866667 21.333334l-66.133333 185.6V234.666667c0-6.4 4.266667-10.666667 10.666667-10.666667z m573.866666 576H172.8l104.533333-298.666667h571.733334l-104.533334 298.666667z" />
          </svg>
        </div>
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
        <div
          tabIndex={0}
          className="dropdown dropdown-bottom dropdown-end bg-base-300 absolute end-0 w-1/6 h-full rounded-r-full flex justify-center items-center cursor-pointer"
        >
          <svg
            className="fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            stroke="currentColor"
          >
            <path d="M768 597.333333a85.333333 85.333333 0 1 1 0-170.666666 85.333333 85.333333 0 0 1 0 170.666666zM256 597.333333a85.333333 85.333333 0 1 1 0-170.666666 85.333333 85.333333 0 0 1 0 170.666666z m256 0a85.333333 85.333333 0 1 1 0-170.666666 85.333333 85.333333 0 0 1 0 170.666666z" />
          </svg>
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-compact bg-base-200 w-fit rounded-box shadow"
          >
            {outputTemplate.map((output) => {
              return (
                <li
                  key={output.name}
                  onClick={() => setFilename(filename + output.value)}
                  className="hover-bordered"
                >
                  <a className="px-2 py-1">{output.name}</a>
                </li>
              );
            })}
            <li key="more" className="hover-bordered">
              <a
                href="https://github.com/yt-dlp/yt-dlp#output-template"
                className="link link-info ps-2 py-1 gap-x-1.5"
              >
                MORE
                <svg
                  className="fill-current w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  stroke="currentColor"
                >
                  <path d="M597.333333 273.664V384a42.666667 42.666667 0 0 1-38.698666 42.496C295.338667 451.157333 170.666667 575.829333 170.666667 810.666667a42.666667 42.666667 0 0 1-85.333334 0c0-268.586667 146.346667-426.496 426.666667-464.725334V170.666667c0-37.973333 45.952-57.045333 72.832-30.165334l341.333333 341.333334a42.666667 42.666667 0 0 1 0 60.330666l-341.333333 341.333334c-26.88 26.88-72.832 7.850667-72.832-30.165334v-170.666666H384a42.666667 42.666667 0 0 1 0-85.333334h170.666667a42.666667 42.666667 0 0 1 42.666666 42.666667v110.336L835.669333 512 597.333333 273.664z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {showMore ? <MoreOptions /> : null}

      <div className="relative flex justify-center items-center col-span-6">
        <hr className="my-3 h-0.5 w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
        <label className="btn btn-xs btn-outline w-1/5 absolute h-full z-10 swap">
          <input type="checkbox" onChange={() => setShowMore(!showMore)} />
          <div className="swap-off flex items-center gap-x-2">
            More
            <svg
              className="fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              stroke="currentColor"
            >
              <path d="M256 298.666667l256 256 256-256 85.333333 85.333333-341.333333 341.333333-341.333333-341.333333z" />
            </svg>
          </div>
          <div className="swap-on flex items-center gap-x-2">
            Fold
            <svg
              className="fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              stroke="currentColor"
            >
              <path d="M170.666667 640l341.333333-341.333333 341.333333 341.333333-85.333333 85.333333-256-256-256 256z" />
            </svg>
          </div>
        </label>
      </div>
    </div>
  );
}
