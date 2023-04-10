'use client';

import { useState, useEffect, useContext } from 'react';
import AddressBar from './AddressBar';
import DownProfile from './DownProfile';
import ProgressBar from './ProgressBar';
import { TargetUrlsContext } from './Contexts';

export default function HomePage() {
  const initTaskNum = useContext(TargetUrlsContext);
  const [taskNum, setTaskNum] = useState<number>(initTaskNum);

  return (
    <div className="flex-col space-y-4">
      <AddressBar taskNum={taskNum} setTaskNum={setTaskNum} />
      <DownProfile />
      <TargetUrlsContext.Provider value={taskNum}>
        <ProgressBar />
      </TargetUrlsContext.Provider>
    </div>
  );
}
