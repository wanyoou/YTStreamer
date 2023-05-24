'use client';

import React, { createContext, Dispatch, useEffect, useReducer, useState, useRef, useContext } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { UnlistenFn } from '@tauri-apps/api/event';
import { WebviewWindow } from '@tauri-apps/api/window';
import ytDlp from '../public/yt-dlp.svg';

function defaultDispatch(): void {
  throw new Error('Dispatch function not implemented.');
}

/* GLOBAL */
export const WindowContext = createContext<WebviewWindow | null>(null);

function WindowContextProvider({ children }: { children: React.ReactNode }) {
  const [theWindow, setTheWindow] = useState<WebviewWindow | null>(null);

  useEffect(() => {
    async function initWindow() {
      const { appWindow } = await import('@tauri-apps/api/window');
      setTheWindow(appWindow);
    }
    if (!theWindow) {
      initWindow();
    }
  }, [theWindow]);

  return <WindowContext.Provider value={theWindow}>{children}</WindowContext.Provider>;
}

/* HOMEPAGE */
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

interface ProgressInfo {
  thumbnail: string;
  title: string;
  uploader: string;
  extractor: string;
  downloaded: string;
  total: string;
  speed: string;
  percent: string;
}

interface AllProgressInfo {
  [key: string]: ProgressInfo;
}

interface TargetUrlsDispatchType {
  type: string;
  payload: string | string[];
}

const initProgressInfo: ProgressInfo = {
  thumbnail: ytDlp,
  title: '-',
  uploader: '-',
  extractor: '-',
  downloaded: '-',
  total: '-',
  speed: '-',
  percent: '0.0',
};
const allProgressInfo: AllProgressInfo = {};

function targetUrlsReducer(state: string[], action: TargetUrlsDispatchType): string[] {
  const isSingleUrl: boolean = typeof action.payload === 'string';
  switch (action.type) {
    case 'targetUrlsAdd':
      if (isSingleUrl) {
        const url: string = action.payload as string;
        allProgressInfo[url] = { ...initProgressInfo, title: url };
        return [...state, url];
      } else {
        const urls: string[] = action.payload as string[];
        urls.forEach((url) => {
          allProgressInfo[url] = { ...initProgressInfo, title: url };
        });
        return [...state, ...urls];
      }
    case 'targetUrlsRemove':
      if (isSingleUrl) {
        const url: string = action.payload as string;
        delete allProgressInfo[url];
        return state.filter((each) => each !== url);
      } else {
        const urls: string[] = action.payload as string[];
        urls.forEach((url) => {
          delete allProgressInfo[url];
        });
        return state.filter((url) => !urls.includes(url));
      }
    default:
      return state;
  }
}

export const ProgressContext = createContext<{
  targetUrls: string[];
  allProgressInfo: AllProgressInfo;
  targetUrlsDispatch: Dispatch<TargetUrlsDispatchType>;
}>({
  targetUrls: [],
  allProgressInfo: {},
  targetUrlsDispatch: defaultDispatch,
});

function ProgressContextProvider({ children }: { children: React.ReactNode }) {
  const [targetUrls, targetUrlsDispatch] = useReducer(targetUrlsReducer, []);
  const [unlistenHandler, setUnlistenHandler] = useState<UnlistenFn | undefined>(undefined);
  const unlistenRef = useRef(unlistenHandler);
  const theWindow = useContext(WindowContext);

  useEffect(() => {
    unlistenRef.current = unlistenHandler;
  }, [unlistenHandler]);

  useEffect(() => {
    async function enrollProgressEvent() {
      const unlistenFunc = await theWindow?.listen<VideoInfoEvent | ProgressMsgEvent>('progress_msg', ({ payload }) => {
        const { url } = payload;
        if ((payload as ProgressMsgEvent).status !== undefined) {
          const { status, downloaded_bytes_str, total_bytes_str, percent_str, speed_str } = payload as ProgressMsgEvent;
          allProgressInfo[url] = {
            ...allProgressInfo[url],
            downloaded: downloaded_bytes_str,
            total: status === 'ALLDONE' ? total_bytes_str : allProgressInfo[url].total,
            percent: percent_str,
            speed: speed_str,
          };
        } else {
          const { title, uploader, thumbnail, extractor, predicted_size_str } = payload as VideoInfoEvent;
          allProgressInfo[url] = {
            ...allProgressInfo[url],
            title,
            uploader,
            thumbnail,
            extractor,
            total: predicted_size_str,
          };
        }
      });
      setUnlistenHandler(unlistenFunc);
    }

    if (!unlistenRef.current && theWindow) {
      enrollProgressEvent();
    }

    return () => {
      if (unlistenRef.current) {
        unlistenRef.current();
        unlistenRef.current = undefined;
      }
    };
  }, [theWindow]);

  return (
    <ProgressContext.Provider value={{ targetUrls, allProgressInfo, targetUrlsDispatch }}>
      {children}
    </ProgressContext.Provider>
  );
}

/* HOMEPAGE - AddressBar */
interface AddressBarStateType {
  url: string;
  urls: string[];
  isTextArea: boolean;
}

interface AddressBarDispatchType {
  type: string;
  payload: AddressBarStateType;
}

function addressBarReducer(state: AddressBarStateType, action: AddressBarDispatchType): AddressBarStateType {
  switch (action.type) {
    case 'updateState':
      return action.payload;
    default:
      return state;
  }
}

export const AddressBarContext = createContext<{
  addressBarState: AddressBarStateType;
  addressBarDispatch: Dispatch<AddressBarDispatchType>;
}>({
  addressBarState: { url: '', urls: [], isTextArea: false },
  addressBarDispatch: defaultDispatch,
});

function AddressBarContextProvider({ children }: { children: React.ReactNode }) {
  const [addressBarState, addressBarDispatch] = useReducer(addressBarReducer, {
    url: '',
    urls: [],
    isTextArea: false,
  });

  return (
    <AddressBarContext.Provider value={{ addressBarState, addressBarDispatch }}>{children}</AddressBarContext.Provider>
  );
}

/* HOMEPAGE - DownProfile */
interface DownProfileStateType {
  path: string;
  filename: string;
  username: string;
  password: string;
}

interface DownProfileDispatchType {
  type: string;
  payload: DownProfileStateType;
}

function downProfileReducer(state: DownProfileStateType, action: DownProfileDispatchType): DownProfileStateType {
  switch (action.type) {
    case 'updateState':
      return action.payload;
    default:
      return state;
  }
}

export const DownProfileContext = createContext<{
  downProfileState: DownProfileStateType;
  downProfileDispatch: Dispatch<DownProfileDispatchType>;
}>({
  downProfileState: { path: '', filename: '', username: '', password: '' },
  downProfileDispatch: defaultDispatch,
});

function DownProfileContextProvider({ children }: { children: React.ReactNode }) {
  const [downProfileState, downProfileDispatch] = useReducer(downProfileReducer, {
    path: '',
    filename: '',
    username: '',
    password: '',
  });

  return (
    <DownProfileContext.Provider value={{ downProfileState, downProfileDispatch }}>
      {children}
    </DownProfileContext.Provider>
  );
}

/* PROFILES */
interface ProfilesStateType {
  [key: string]: string | boolean;
}

interface ProfilesDispatchType {
  type: string;
  opt: string;
  value: string | boolean;
  defaultValue: string | boolean;
  initConf?: ProfilesStateType;
}

function profilesReducer(state: ProfilesStateType, action: ProfilesDispatchType): ProfilesStateType {
  switch (action.type) {
    case 'updateProfiles': {
      const { opt, value, defaultValue } = action;
      if (state[opt] === undefined && value === defaultValue) {
        return state;
      }
      return { ...state, [opt]: value };
    }
    case 'initProfiles':
      return action.initConf ?? state;
    default:
      return state;
  }
}

export const ProfilesContext = createContext<{
  profilesState: ProfilesStateType;
  profilesDispatch: Dispatch<ProfilesDispatchType>;
}>({ profilesState: {}, profilesDispatch: defaultDispatch });

function ProfilesContextProvider({ children }: { children: React.ReactNode }) {
  const [profilesState, profilesDispatch] = useReducer(profilesReducer, {});
  const theWindow = useContext(WindowContext);

  useEffect(() => {
    async function invokeGetConf() {
      const confContent = await invoke<ProfilesStateType>('get_ytdlp_conf');
      if (Object.keys(confContent).length > 0) {
        profilesDispatch({
          type: 'initProfiles',
          opt: '',
          value: '',
          defaultValue: '',
          initConf: confContent,
        });
      }
    }

    if (theWindow) {
      invokeGetConf();
    }
  }, [theWindow]);

  return <ProfilesContext.Provider value={{ profilesState, profilesDispatch }}>{children}</ProfilesContext.Provider>;
}

interface inViewSectionsDispatchType {
  type: string;
  payload: { section: string; inView: boolean };
}

function profilesNavReducer(state: string[], action: inViewSectionsDispatchType): string[] {
  switch (action.type) {
    case 'updateProfilesNav': {
      const { section, inView } = action.payload;
      if (inView) {
        if (!state.includes(section)) {
          state.push(section);
        } else {
          state = state.filter((s) => s !== section);
          state.push(section);
        }
      } else {
        state = state.filter((s) => s !== section);
      }

      return state;
    }
    default:
      return state;
  }
}

export const ProfilesNavContext = createContext<{
  currentInViewSections: string[];
  inViewSectionsDispatch: Dispatch<inViewSectionsDispatchType>;
}>({
  currentInViewSections: [],
  inViewSectionsDispatch: defaultDispatch,
});

function ProfilesNavContextProvider({ children }: { children: React.ReactNode }) {
  const [currentInViewSections, inViewSectionsDispatch] = useReducer(profilesNavReducer, []);

  return (
    <ProfilesNavContext.Provider value={{ currentInViewSections, inViewSectionsDispatch }}>
      {children}
    </ProfilesNavContext.Provider>
  );
}

export default function GlobalContextsProvider({ children }: { children: React.ReactNode }) {
  return (
    <WindowContextProvider>
      <DownProfileContextProvider>
        <AddressBarContextProvider>
          <ProfilesNavContextProvider>
            <ProfilesContextProvider>
              <ProgressContextProvider>{children}</ProgressContextProvider>
            </ProfilesContextProvider>
          </ProfilesNavContextProvider>
        </AddressBarContextProvider>
      </DownProfileContextProvider>
    </WindowContextProvider>
  );
}
