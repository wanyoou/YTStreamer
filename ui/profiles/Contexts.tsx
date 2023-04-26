import { createContext, Dispatch } from 'react';

export interface ActionType {
  type: string;
  opt: string;
  value: string | boolean;
  default: string | boolean;
}

export const OptionsContext = createContext<Dispatch<ActionType>>(() => {});
