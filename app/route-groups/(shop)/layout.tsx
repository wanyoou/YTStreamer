import { fetchCategories } from '@/lib/getCategories';
import { Boundary } from '@/ui/Boundary';
import React, { use } from 'react';
import CategoryNav from '../CategoryNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  const categories = use(fetchCategories());
  return (
    <Boundary labels={['shop layout']} color="cyan" animateRerendering={false}>
      <div className="space-y-9">
        <div className="flex items-center justify-between">
          <CategoryNav categories={categories} />
        </div>

        <div>{children}</div>
      </div>
    </Boundary>
  );
}
