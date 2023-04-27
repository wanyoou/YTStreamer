'use client';

import { useReducer, useEffect } from 'react';
import { Appearance, options } from '@/lib/options';
import { OptionsContext } from './Contexts';
import type { ActionType } from './Contexts';
import ToggleButton from './ToggleButton';
import InputBox from './InputBox';
import Selector from './Selector';
import Slider from './Slider';

interface IState {
  [key: string]: string | boolean;
}

function optionsReducer(state: IState, action: ActionType): IState {
  switch (action.type) {
    case 'update':
      if (action.value === action.default) {
        if (action.opt in state) {
          const { [action.opt]: _, ...restState } = state;
          return restState;
        } else {
          return state;
        }
      } else {
        return { ...state, [action.opt]: action.value };
      }
    default:
      return state;
  }
}

export default function Profiles() {
  const [usedOpts, usedOptsDispatch] = useReducer(optionsReducer, {});

  return (
    <div className="flex flex-col space-y-4 pr-4 h-screen overflow-y-auto">
      {options.map((segment) => (
        <div key={segment.section} className="flex flex-col gap-y-1">
          {segment.section}
          <div className="rounded-md bg-base-200">
            <OptionsContext.Provider value={usedOptsDispatch}>
              {segment.opts.map((option) => {
                switch (option.appearance) {
                  case Appearance.InputBox:
                    return <InputBox key={option.opt} info={option} />;
                  case Appearance.Selector:
                    return <Selector key={option.opt} info={option} />;
                  case Appearance.Slider:
                    return <Slider key={option.opt} info={option} />;
                  default:
                    return <ToggleButton key={option.opt} info={option} />;
                }
              })}
            </OptionsContext.Provider>
          </div>
        </div>
      ))}
    </div>
  );
}
