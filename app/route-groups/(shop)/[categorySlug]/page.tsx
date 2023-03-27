import { use } from 'react';
import { fetchCategoryBySlug, PageProps } from '@/lib/getCategories';

export default function Page({ params }: PageProps) {
  const category = use(fetchCategoryBySlug(params.categorySlug));
  if (!category) return null;
  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-zinc-500">
        All {category.name}
      </div>
    </div>
  );
}
