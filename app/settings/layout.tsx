import { fetchCategories } from '@/lib/getCategories';
import React, { use } from 'react';
import CategoryNav from './CategoryNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  const categories = use(fetchCategories());
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <CategoryNav categories={categories} />
      </div>

      <div>{children}</div>
    </div>
  );
}
