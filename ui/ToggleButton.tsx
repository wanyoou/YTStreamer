export default function ToggleButton() {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">Remember me</span>
        <input type="checkbox" className="toggle" checked />
      </label>
    </div>
  );
}
