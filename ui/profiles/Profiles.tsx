'use client';

import { useEffect, useContext, useRef } from 'react';
import { ProfilesContext, ProfilesNavContext } from 'app/GlobalContexts';
import { invoke } from '@tauri-apps/api/tauri';
import { Appearance, options } from '@/lib/options';
import type { OptItems } from '@/lib/options';
import { stateShallowEqual } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import ToggleButton from './ToggleButton';
import InputBox from './InputBox';
import Selector from './Selector';
import Slider from './Slider';

function Sections({ segment }: { segment: OptItems }) {
  const { inViewSectionsDispatch } = useContext(ProfilesNavContext);
  const { ref } = useInView({
    root: document.getElementById('id_profiles'),
    threshold: 0.2,
    onChange: (inView) => {
      inViewSectionsDispatch({ type: 'updateProfilesNav', payload: { section: segment.section, inView } });
    },
  });

  return (
    <div id={segment.section} ref={ref} className='flex flex-col gap-y-1'>
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
  );
}

export default function Profiles() {
  const { profilesState } = useContext(ProfilesContext);
  const initStateRef = useRef(profilesState);
  const stateRef = useRef(profilesState);

  useEffect(() => {
    stateRef.current = profilesState;
  }, [profilesState]);

  useEffect(() => {
    async function invokeUpdateConf() {
      await invoke('update_ytdlp_conf', { confContent: JSON.stringify(stateRef.current) });
    }
    const initState = initStateRef.current;
    return () => {
      if (!stateShallowEqual(initState, stateRef.current)) {
        invokeUpdateConf();
      }
    };
  }, []);

  return (
    <div id='id_profiles' className='flex flex-col space-y-4 pr-4 h-screen overflow-y-auto'>
      {options.map((segment) => (
        <Sections key={segment.section} segment={segment} />
      ))}
    </div>
  );
}
