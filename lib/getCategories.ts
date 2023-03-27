export type PageProps = {
  params?: any;
  children?: React.ReactNode;
};
export type Category = {
  name: string;
  slug: string;
};

export const getCategories = (): Category[] => [
  {
    name: 'Electronics',
    slug: 'electronics',
  },
  {
    name: 'Clothing',
    slug: 'clothing',
  },
  {
    name: 'Books',
    slug: 'books',
  },
];

export async function fetchCategoryBySlug(slug: string | undefined) {
  // Assuming it always return expected categories
  return getCategories().find((category) => category.slug === slug);
}

export async function fetchCategories(): Promise<Category[]> {
  return getCategories();
}
