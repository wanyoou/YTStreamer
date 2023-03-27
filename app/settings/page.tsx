import ToggleButton from '@/ui/ToggleButton';
import { ThemeSwitcher } from '@/ui/settings/General';

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-zinc-500">Client Context</div>
      <ThemeSwitcher />
      <ToggleButton />
    </div>
  );
}
