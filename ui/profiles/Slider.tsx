import { useState, useContext } from 'react';
import { getLabelText } from '@/lib/options';
import type { OptInfo } from '@/lib/options';
import { ProfilesContext } from 'app/GlobalContexts';

export default function Slider({ info }: { info: OptInfo }) {
  const { opt, values, defaultValue } = info;
  const [minVal, maxVal] = values as [string, string];
  const { profilesState, profilesDispatch } = useContext(ProfilesContext);
  const [val, setVal] = useState<string>((profilesState[opt] ?? defaultValue) as string);

  return (
    <div className='form-control'>
      <label className='label rounded-md py-1 hover:bg-neutral'>
        {getLabelText(info)}
        <label className='label px-0 py-1.5 w-2/5 space-x-1'>
          <input
            type='range'
            min={minVal}
            max={maxVal}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onBlur={() =>
              profilesDispatch({
                type: 'updateProfiles',
                opt: opt,
                value: val,
                defaultValue: defaultValue as string,
              })
            }
            className='range range-sm'
          />
          <span className='badge'>{val}</span>
        </label>
      </label>
    </div>
  );
}
