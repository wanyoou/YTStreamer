import { useState, useContext } from 'react';
import { getLabelText } from '@/lib/options';
import type { OptInfo } from '@/lib/options';
import { ProfilesContext } from 'app/GlobalContexts';

export default function ToggleButton({ info }: { info: OptInfo }) {
  const { opt } = info;
  const { profilesState, profilesDispatch } = useContext(ProfilesContext);
  const [val, setVal] = useState<boolean>((profilesState[opt] as boolean) ?? false);

  return (
    <div className='form-control'>
      <label className='label rounded-md py-1 hover:bg-neutral'>
        {getLabelText(info)}
        <input
          type='checkbox'
          checked={val}
          onChange={() => setVal(!val)}
          onBlur={() =>
            profilesDispatch({
              type: 'updateProfiles',
              opt: opt,
              value: val,
              defaultValue: false,
            })
          }
          className='toggle toggle-success my-1'
        />
      </label>
    </div>
  );
}
