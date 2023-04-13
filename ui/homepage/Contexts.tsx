import { createContext, Dispatch } from 'react';

export const TargetUrlsContext = createContext<{
  targetUrls: string[];
  targetUrlsDispatch: Dispatch<{
    type: string;
    payload: string;
  }>;
}>({
  targetUrls: [],
  targetUrlsDispatch: () => {},
});
