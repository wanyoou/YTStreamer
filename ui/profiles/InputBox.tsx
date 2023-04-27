import { useState, useContext } from 'react';
import { getLabelText } from '@/lib/options';
import type { OptInfo } from '@/lib/options';
import { OptionsContext } from './Contexts';

export default function InputBox({ info }: { info: OptInfo }) {
  const [val, setVal] = useState<string>('');
  const optionsDispatch = useContext(OptionsContext);

  return (
    <div className="form-control">
      <label className="label rounded-md py-1 hover:bg-neutral">
        {getLabelText(info)}
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={() =>
            optionsDispatch({
              type: 'update',
              opt: info.opt,
              value: val,
              default: info.default ?? '',
            })
          }
          className="input input-bordered input-sm rounded px-1 w-1/2 max-w-sm"
        />
      </label>
    </div>
  );
}
