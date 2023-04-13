import {
  useState,
  useEffect,
  useContext,
  useImperativeHandle,
  forwardRef,
  useRef,
  createRef,
} from 'react';
import { TargetUrlsContext } from './Contexts';
import Image from 'next/image';
import ytDlp from '../../public/yt-dlp.svg';

type ProgressMsgEvent = {
  url: string;
  thumbnail: string;
  title: string;
  uploader: string;
  extractor: string;
  status: string;
  predicted_size_str: string;
  downloaded_bytes_str: string;
  total_bytes_str: string;
  percent_str: string;
  speed_str: string;
};

interface BarRefs {
  [key: string]: React.RefObject<typeof ProgressBar>;
}

const ProgressBar = forwardRef(({ url }: { url: string }, ref) => {
  const [thumbnail, setThumbnail] = useState<string>(ytDlp);
  const [title, setTitle] = useState<string>(url);
  const [uploader, setUploader] = useState<string>('-');
  const [extractor, setExtractor] = useState<string>('-');
  const [downloaded, setDownloaded] = useState<string>('-');
  const [total, setTotal] = useState<string>('-');
  const [speed, setSpeed] = useState<string>('-');
  const [progress, setProgress] = useState<string>('-');

  useImperativeHandle(
    ref,
    () => {
      return {
        updateStatus(payload: ProgressMsgEvent) {
          setTitle(payload.title);
          setDownloaded(payload.downloaded_bytes_str);
          setSpeed(payload.speed_str);
          setProgress(payload.percent_str);
          if (payload.status !== 'DONE') setTotal(payload.predicted_size_str);
          else setTotal(payload.total_bytes_str);
        },
      };
    },
    [],
  );

  return (
    <div className="grid grid-cols-6 gap-x-4 py-1 rounded-md bg-neutral hover:bg-base-300">
      <div className="relative col-span-1">
        <Image
          src={thumbnail}
          alt="Video thumbnail or yt-dlp banner by default"
          fill={true}
          priority
        />
      </div>
      <div className="col-span-4 space-y-1">
        <div>
          <label className="label p-0">
            <span className="label-text text-sm font-semibold">
              {title.length > 40 ? title.slice(0, 40) + '...' : title}
            </span>
            <span className="badge badge-sm badge-secondary">{extractor}</span>
          </label>
          <label className="label p-0">
            <span className="label-text text-sm">{uploader}</span>
            <span className="label-text text-sm">
              {downloaded} / {total} {speed}
            </span>
          </label>
        </div>
        <div className="relative flex justify-center items-center">
          <progress
            className="progress progress-success w-full bg-base-content rounded-full h-3"
            value={progress}
            max="100"
          />
          <span className="label-text text-xs text-white absolute z-10">
            {progress}
          </span>
        </div>
      </div>
    </div>
  );
});

export default function ProgressBars() {
  const refs = useRef<Array<React.RefObject<typeof ProgressBar>>>([]);
  const progressBarRefs: BarRefs = {};
  const { targetUrls, targetUrlsDispatch } = useContext(TargetUrlsContext);

  async function enrollProgressEvent() {
    let { appWindow } = await import('@tauri-apps/api/window');
    const unlistenHandler = appWindow.listen<ProgressMsgEvent>(
      'progress_msg',
      (event) => {
        if (progressBarRefs[event.payload.url]) {
          progressBarRefs[event.payload.url].current?.updateStatus(
            event.payload,
          );
        }
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
    <div className="bg-scroll bg-base-200 rounded-md p-2 space-y-4">
      {targetUrls.map((url, i) => {
        if (refs.current.length < targetUrls.length) {
          refs.current.push(createRef());
        }
        if (!progressBarRefs[url]) {
          progressBarRefs[url] = refs.current[i];
        }
        return <ProgressBar key={url} ref={refs.current[i]} url={url} />;
      })}
    </div>
  );
}
