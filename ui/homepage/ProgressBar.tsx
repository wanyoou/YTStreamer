import {
  useState,
  useEffect,
  useContext,
  useImperativeHandle,
  forwardRef,
  createRef,
} from 'react';
import { TargetUrlsContext } from './Contexts';
import Image from 'next/image';
import ytDlp from '../../public/yt-dlp.svg';

type VideoInfoEvent = {
  title: string;
  uploader: string;
  thumbnail: string;
  url: string;
  extractor: string;
  predicted_size_str: string;
};

type ProgressMsgEvent = {
  url: string;
  status: string;
  downloaded_bytes_str: string;
  total_bytes_str: string;
  percent_str: string;
  speed_str: string;
};

interface ProgressBarProps {
  url: string;
}

interface ProgressBarMethods {
  updateInfo(payload: VideoInfoEvent): void;
  updateStatus(payload: ProgressMsgEvent): void;
}

interface BarRefs {
  [key: string]: React.RefObject<ProgressBarMethods>;
}

const ProgressBar = forwardRef<ProgressBarMethods, ProgressBarProps>(
  ({ url }: ProgressBarProps, ref) => {
    const [thumbnail, setThumbnail] = useState<string>(ytDlp);
    const [title, setTitle] = useState<string>(url);
    const [uploader, setUploader] = useState<string>('-');
    const [extractor, setExtractor] = useState<string>('-');
    const [downloaded, setDownloaded] = useState<string>('-');
    const [total, setTotal] = useState<string>('-');
    const [speed, setSpeed] = useState<string>('-');
    const [progress, setProgress] = useState<string>('0.0');

    useImperativeHandle(
      ref,
      () => {
        return {
          updateInfo(payload: VideoInfoEvent) {
            setThumbnail(payload.thumbnail);
            setTitle(payload.title);
            setUploader(payload.uploader);
            setExtractor(payload.extractor);
            setTotal(payload.predicted_size_str);
          },
          updateStatus(payload: ProgressMsgEvent) {
            setDownloaded(payload.downloaded_bytes_str);
            setSpeed(payload.speed_str);
            setProgress(payload.percent_str);
            if (payload.status === 'ALLDONE') setTotal(payload.total_bytes_str);
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
              <span className="badge badge-sm badge-secondary">
                {extractor}
              </span>
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
              className="progress progress-success bg-base-content h-3"
              value={progress > '0.0' ? progress : undefined}
              max="100"
            />
            <span className="label-text text-xs text-white absolute z-10">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    );
  },
);

const progressBarRefs: BarRefs = {};

async function enrollProgressEvent() {
  let { appWindow } = await import('@tauri-apps/api/window');
  const unlistenHandler = appWindow.listen<VideoInfoEvent | ProgressMsgEvent>(
    'progress_msg',
    (event) => {
      const curRef = progressBarRefs[event.payload.url];
      if (curRef) {
        if ('status' in event.payload)
          curRef.current?.updateStatus(event.payload);
        else curRef.current?.updateInfo(event.payload);
      }
    },
  );
  return unlistenHandler;
}

function getOrCreateRef(url: string) {
  if (!progressBarRefs.hasOwnProperty(url)) {
    progressBarRefs[url] = createRef<ProgressBarMethods>();
  }
  return progressBarRefs[url];
}

export default function ProgressBars() {
  const { targetUrls, targetUrlsDispatch } = useContext(TargetUrlsContext);

  useEffect(() => {
    const unlistenHandler = enrollProgressEvent();

    return () => {
      unlistenHandler.then((handler) => handler());
    };
  }, []);

  return (
    <div className="bg-scroll bg-base-200 rounded-md p-2 space-y-4">
      {targetUrls.map((url) => {
        return <ProgressBar key={url} ref={getOrCreateRef(url)} url={url} />;
      })}
    </div>
  );
}
