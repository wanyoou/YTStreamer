import React from 'react';
import { appWindow } from '@tauri-apps/api/window';
import AddressBar from '@/ui/AddressBar';
import CSRWrapper from 'wrapper/CSRWrapper';
// (async () => {
//   const unlistenProgress = await appWindow.listen(
//     'download_progress',
//     ({ event, payload }) => console.log(payload),
//   );
// })();

export default function Page() {
  return (
    <div className="space-y-6">
      <AddressBar />
      <div className="dark:text-white">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-blue-700 dark:text-white">
            Title
          </span>
          <span className="text-sm font-medium text-blue-700 dark:text-white">
            5MB/s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-green-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full h-2.5"
            style={{ width: '45%' }}
          >
            45%
          </div>
        </div>
      </div>
    </div>
  );
}
