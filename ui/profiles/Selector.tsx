import { useState, useContext } from 'react';
import { getLabelText } from '@/lib/options';
import type { OptInfo } from '@/lib/options';
import { OptionsContext } from './Contexts';

export default function Selector({ info }: { info: OptInfo }) {
  const [selectedOpt, setSelectedOpt] = useState<string>(info.default!);
  const optionsDispatch = useContext(OptionsContext);

  return (
    <div className="form-control">
      <label className="label rounded-md py-1 hover:bg-neutral">
        {getLabelText(info)}
        <select
          value={selectedOpt}
          onChange={(e) => setSelectedOpt(e.target.value)}
          onBlur={() =>
            optionsDispatch({
              type: 'update',
              opt: info.opt,
              value: selectedOpt,
              default: info.default!,
            })
          }
          className="select select-bordered select-sm rounded-md w-max"
        >
          <option>{info.default!}</option>
          {info.values!.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
