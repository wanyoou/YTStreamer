import { ThemeSwitcher } from '@/ui/settings/General';

export default function Page() {
  return (
    <div className='space-y-4'>
      <label className='label'>
        <span className='label-text text-xl'>Theme mode</span>
        <ThemeSwitcher />
      </label>
    </div>
  );
}
