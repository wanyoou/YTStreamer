export default function ToggleButton() {
  return (
    <div className="form-control">
      <label className="label rounded-md bg-neutral hover:bg-base-300">
        Remember me
        <input type="checkbox" className="toggle toggle-success" />
      </label>
    </div>
  );
}
