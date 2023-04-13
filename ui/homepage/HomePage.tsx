'use client';

import { useState, useReducer } from 'react';
import { TargetUrlsContext } from './Contexts';
import AddressBar from './AddressBar';
import DownProfile from './DownProfile';
import ProgressBars from './ProgressBar';

function targetUrlsReducer(
  state: string[],
  action: { type: string; payload: string | string[] },
) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        ...(typeof action.payload === 'string'
          ? [action.payload]
          : action.payload),
      ];
    case 'remove':
      return state.filter((url) => url !== action.payload);
    default:
      return state;
  }
}

export default function HomePage() {
  const [targetUrls, targetUrlsDispatch] = useReducer(targetUrlsReducer, []);

  return (
    <div className="flex-col space-y-4">
      <TargetUrlsContext.Provider value={{ targetUrls, targetUrlsDispatch }}>
        <AddressBar />
        <DownProfile />
        <ProgressBars />
      </TargetUrlsContext.Provider>
    </div>
  );
}
