export default function ToggleButton() {
  return (
    <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
      <input type="checkbox" value="" className="sr-only" />
      <span className="label flex items-center text-sm font-medium dark:text-white">
        Light
      </span>
      <span className="slider mx-4 flex h-8 w-[60px] items-center rounded-full bg-[#CCCCCE] p-1 duration-200 dark:bg-gray-700">
        <span className="dot h-6 w-6 rounded-full bg-white duration-200" />
      </span>
    </label>
  );
}
