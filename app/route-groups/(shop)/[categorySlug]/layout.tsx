import { use } from 'react';
import { fetchCategoryBySlug, PageProps } from '@/lib/getCategories';

export default function Layout({ children, params }: PageProps) {
  const category = use(fetchCategoryBySlug(params.categorySlug));
  if (!category) return null;

  return (
    <div className="space-y-9">
      <div>{children}</div>
    </div>
  );
}
