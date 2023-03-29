import ProgressBar from '@/ui/homepage/ProgressBar';
import AddressBar from '@/ui/homepage/AddressBar';
import DownProfile from '@/ui/homepage/DownProfile';

export default function Page() {
  return (
    <div className="flex-col space-y-6 w-full">
      <AddressBar />
      <DownProfile />
      <ProgressBar />
    </div>
  );
}
