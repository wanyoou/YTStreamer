import { useState, useContext } from 'react';
import { getLabelText } from '@/lib/options';
import type { OptInfo } from '@/lib/options';
import { OptionsContext } from './Contexts';

export default function ToggleButton({ info }: { info: OptInfo }) {
  const [val, setVal] = useState<boolean>(false);
  const optionsDispatch = useContext(OptionsContext);

  return (
    <div className="form-control">
      <label className="label rounded-md py-1 hover:bg-neutral">
        {getLabelText(info)}
        <input
          type="checkbox"
          checked={val}
          onChange={() => setVal(!val)}
          onBlur={() =>
            optionsDispatch({
              type: 'update',
              opt: info.opt,
              value: val,
              default: false,
            })
          }
          className="toggle toggle-success my-1"
        />
      </label>
    </div>
  );
}
