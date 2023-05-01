import { useState, useContext } from 'react';
import { getLabelText } from '@/lib/options';
import type { OptInfo } from '@/lib/options';
import { ProfilesContext } from 'app/GlobalContexts';

export default function Selector({ info }: { info: OptInfo }) {
  const { opt, values, defaultValue } = info;
  const { profilesState, profilesDispatch } = useContext(ProfilesContext);
  const [selectedOpt, setSelectedOpt] = useState<string>((profilesState[opt] ?? defaultValue) as string);

  return (
    <div className='form-control'>
      <label className='label rounded-md py-1 hover:bg-neutral'>
        {getLabelText(info)}
        <select
          value={selectedOpt}
          onChange={(e) => setSelectedOpt(e.target.value)}
          onBlur={() =>
            profilesDispatch({
              type: 'updateProfiles',
              opt: opt,
              value: selectedOpt,
              defaultValue: defaultValue as string,
            })
          }
          className='select select-bordered select-sm rounded-md w-max'
        >
          <option>{defaultValue}</option>
          {(values as string[]).map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
