'use client';

import { useEffect, useContext } from 'react';
import { ProfilesContext } from 'app/GlobalContexts';
import { invoke } from '@tauri-apps/api/tauri';
import { Appearance, options } from '@/lib/options';
import ToggleButton from './ToggleButton';
import InputBox from './InputBox';
import Selector from './Selector';
import Slider from './Slider';

export default function Profiles() {
  const { profilesState } = useContext(ProfilesContext);

  useEffect(() => {
    async function invokeUpdateConf() {
      await invoke('update_ytdlp_conf', { confContent: JSON.stringify(profilesState) });
    }
    return () => {
      invokeUpdateConf();
    };
  }, [profilesState]);

  return (
    <div className='flex flex-col space-y-4 pr-4 h-screen overflow-y-auto'>
      {options.map((segment) => (
        <div key={segment.section} className='flex flex-col gap-y-1'>
          {segment.section}
          <div className='rounded-md bg-base-200'>
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
          </div>
        </div>
      ))}
    </div>
  );
}
