import { useState, useContext } from 'react';
import { getLabelText } from '@/lib/options';
import type { OptInfo } from '@/lib/options';
import { OptionsContext } from './Contexts';

export default function Slider({ info }: { info: OptInfo }) {
  const [minVal, maxVal] = info.values! as [string, string];
  const [val, setVal] = useState<string>(info.default!);
  const optionsDispatch = useContext(OptionsContext);

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
              optionsDispatch({
                type: 'update',
                opt: info.opt,
                value: val,
                default: info.default!,
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
