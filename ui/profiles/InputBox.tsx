import { useState, useContext } from 'react';
import { getLabelText } from '@/lib/options';
import type { OptInfo } from '@/lib/options';
import { ProfilesContext } from 'app/GlobalContexts';

export default function InputBox({ info }: { info: OptInfo }) {
  const { opt, defaultValue } = info;
  const defaultVal = defaultValue ?? '';
  const { profilesState, profilesDispatch } = useContext(ProfilesContext);
  const [val, setVal] = useState<string>((profilesState[opt] as string) ?? defaultVal);

  return (
    <div className='form-control'>
      <label className='label rounded-md py-1 hover:bg-neutral'>
        {getLabelText(info)}
        <input
          type='text'
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={() =>
            profilesDispatch({
              type: 'updateProfiles',
              opt: opt,
              value: val,
              defaultValue: defaultVal,
            })
          }
          className='input input-bordered input-sm rounded px-1 w-1/2 max-w-sm'
        />
      </label>
    </div>
  );
}
