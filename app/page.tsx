import ProgressBar from '@/ui/homepage/ProgressBar';
import AddressBar from '@/ui/homepage/AddressBar';
import DownProfile from '@/ui/homepage/DownProfile';
import { WindowSize } from '@/ui/Window';

export default function Page() {
  return (
    <div className="flex-col space-y-6 w-full">
      <WindowSize />
      <AddressBar />
      <DownProfile />
      <ProgressBar />
    </div>
  );
}
