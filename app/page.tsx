import ProgressBar from '@/ui/homepage/ProgressBar';
import AddressBar from '@/ui/homepage/AddressBar';

export default function Page() {
  return (
    <div className="space-y-6">
      <AddressBar />
      <ProgressBar />
    </div>
  );
}
