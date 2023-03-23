'use client';

export default function ProgressBar(props: {
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
