'use client';

import React, { createContext, Dispatch, useReducer } from 'react';

function defaultDispatch(): void {
  throw new Error('Dispatch function not implemented.');
}

/* HOMEPAGE */
interface TargetUrlsDispatchType {
  type: string;
  payload: string | string[];
}

function targetUrlsReducer(state: string[], action: TargetUrlsDispatchType): string[] {
  switch (action.type) {
    case 'targetUrlsAdd':
      return [...state, ...(typeof action.payload === 'string' ? [action.payload] : action.payload)];
    case 'targetUrlsRemove':
      return state.filter((url) => url !== action.payload);
    default:
      return state;
  }
}

export const TargetUrlsContext = createContext<{
  targetUrls: string[];
  targetUrlsDispatch: Dispatch<TargetUrlsDispatchType>;
}>({
  targetUrls: [],
  targetUrlsDispatch: defaultDispatch,
});

function TargetUrlsContextProvider({ children }: { children: React.ReactNode }) {
  const [targetUrls, targetUrlsDispatch] = useReducer(targetUrlsReducer, []);

  return <TargetUrlsContext.Provider value={{ targetUrls, targetUrlsDispatch }}>{children}</TargetUrlsContext.Provider>;
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

/* PROFILES */
interface ProfilesStateType {
  [key: string]: string | boolean;
}

interface ProfilesDispatchType {
  type: string;
  opt: string;
  value: string | boolean;
  defaultValue: string | boolean;
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
    default:
      return state;
  }
}

export const ProfilesContext = createContext<{
  profilesState: ProfilesStateType;
  profilesDispatch: Dispatch<ProfilesDispatchType>;
}>({ profilesState: {}, profilesDispatch: defaultDispatch });

function ProfilesContextProvider({ children }: { children: React.ReactNode }) {
  const initConfProfiles: ProfilesStateType = {};
  const [profilesState, profilesDispatch] = useReducer(profilesReducer, initConfProfiles);

  return <ProfilesContext.Provider value={{ profilesState, profilesDispatch }}>{children}</ProfilesContext.Provider>;
}

export default function GlobalContextsProvider({ children }: { children: React.ReactNode }) {
  return (
    <TargetUrlsContextProvider>
      <AddressBarContextProvider>
        <ProfilesContextProvider>{children}</ProfilesContextProvider>
      </AddressBarContextProvider>
    </TargetUrlsContextProvider>
  );
}
