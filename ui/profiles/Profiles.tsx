'use client';

import { useState, useEffect } from 'react';
import { Appearance, options } from '@/lib/options';
import ToggleButton from '../ToggleButton';

function SimpleInputBox({ labelText }: { labelText: string }) {
  const [val, setVal] = useState<string>('');

  return (
    <div className="form-control">
      <label className="label rounded-md bg-neutral hover:bg-base-300">
        {labelText}
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="input input-bordered input-sm"
        />
      </label>
    </div>
  );
}

function SimpleSelector({
  labelText,
  opts,
}: {
  labelText: string;
  opts: string[];
}) {
  const [selectedOpt, setSelectedOpt] = useState<string>('Default');

  return (
    <div className="form-control">
      <label className="label rounded-md bg-neutral hover:bg-base-300">
        {labelText}
        <select
          value={selectedOpt}
          onChange={(e) => setSelectedOpt(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option selected>Default</option>
          {opts.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

/* values: ["mix", "max", "default"] */
function SimpleSlider({
  labelText,
  values,
}: {
  labelText: string;
  values: string[];
}) {
  const [val, setVal] = useState<string>(values[2]);

  return (
    <div className="form-control">
      <label className="label rounded-md bg-neutral hover:bg-base-300">
        {labelText}
        <label className="label flex flex-col">
          <span dir="rtl" className="badge badge-sm">
            {val}
          </span>
          <input
            type="range"
            min={values[0]}
            max={values[1]}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="range range-xs h-3"
          />
        </label>
      </label>
    </div>
  );
}

export default function Profiles() {
  return (
    <div className="flex flex-col bg-base-200 rounded-md p-2 space-y-2"></div>
  );
}
