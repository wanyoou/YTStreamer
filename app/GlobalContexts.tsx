'use client';

import React, { createContext, Dispatch, useReducer } from 'react';

export const TargetUrlsContext = createContext<{
  targetUrls: string[];
  targetUrlsDispatch: Dispatch<{
    type: string;
    payload: string;
  }>;
}>({
  targetUrls: [],
  targetUrlsDispatch: function (): void {
    throw new Error('targetUrlsDispatch: Function not implemented.');
  },
});

function targetUrlsReducer(state: string[], action: { type: string; payload: string | string[] }) {
  switch (action.type) {
    case 'add':
      return [...state, ...(typeof action.payload === 'string' ? [action.payload] : action.payload)];
    case 'remove':
      return state.filter((url) => url !== action.payload);
    default:
      return state;
  }
}

export function TargetUrlsContextProvider({ children }: { children: React.ReactNode }) {
  const [targetUrls, targetUrlsDispatch] = useReducer(targetUrlsReducer, []);

  return <TargetUrlsContext.Provider value={{ targetUrls, targetUrlsDispatch }}>{children}</TargetUrlsContext.Provider>;
}
