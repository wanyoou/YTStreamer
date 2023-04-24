export default function ToggleButton({ labelText }: { labelText: string }) {
  return (
    <div className="form-control">
      <label className="label rounded-md py-1 hover:bg-neutral">
        {labelText}
        <input type="checkbox" className="toggle toggle-success my-1" />
      </label>
    </div>
  );
}
