import { use } from 'react';
import { fetchSubCategory, PageProps } from '@/lib/getCategories';

export default function Page({ params }: PageProps) {
  const category = use(
    fetchSubCategory(params.categorySlug, params.subCategorySlug),
  );
  if (!category) return null;
  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-zinc-500">{category.name}</div>
    </div>
  );
}
