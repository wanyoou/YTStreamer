'use client';

import { useState, useEffect } from 'react';
import { Appearance, options } from '@/lib/options';
import ToggleButton from '../ToggleButton';

function SimpleInputBox({ labelText }: { labelText: string }) {
  const [val, setVal] = useState<string>('');

  return (
    <div className="form-control">
      <label className="label rounded-md py-1 hover:bg-neutral">
        {labelText}
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="input input-bordered input-sm rounded px-1 w-1/2 max-w-sm"
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
      <label className="label rounded-md py-1 hover:bg-neutral">
        {labelText}
        <select
          value={selectedOpt}
          onChange={(e) => setSelectedOpt(e.target.value)}
          className="select select-bordered select-sm rounded-md w-max"
        >
          <option>Default</option>
          {opts.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

function SimpleSlider({
  labelText,
  values,
}: {
  labelText: string;
  values: string[] /* values: [(min), (max), (default)] */;
}) {
  const [val, setVal] = useState<string>(values[2]);

  return (
    <div className="form-control">
      <label className="label rounded-md py-1 hover:bg-neutral">
        {labelText}
        <label className="label px-0 py-1.5 w-2/5 space-x-1">
          <input
            type="range"
            min={values[0]}
            max={values[1]}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="range range-sm"
          />
          <span className="badge">{val}</span>
        </label>
      </label>
    </div>
  );
}

export default function Profiles() {
  return (
    <div className="flex flex-col space-y-4 pr-4 h-screen overflow-y-auto">
      {options.map((segment) => (
        <div key={segment.section} className="flex flex-col gap-y-1">
          {segment.section}
          <div className="rounded-md bg-base-200">
            {segment.opts.map((option) => {
              const labelText = option.opt
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase());

              switch (option.appearance) {
                case Appearance.InputBox:
                  return (
                    <SimpleInputBox key={option.opt} labelText={labelText} />
                  );
                case Appearance.Selector:
                  return (
                    <SimpleSelector
                      key={option.opt}
                      labelText={labelText}
                      opts={option.value!}
                    />
                  );
                case Appearance.Slider:
                  return (
                    <SimpleSlider
                      key={option.opt}
                      labelText={labelText}
                      values={option.value!}
                    />
                  );
                default:
                  return (
                    <ToggleButton key={option.opt} labelText={labelText} />
                  );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
