type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const layouts: Item[] = [
  {
    name: 'Home',
    slug: '',
    description: 'Homepage',
  },
  {
    name: 'Nested Layouts',
    slug: 'layouts',
    description: 'Create UI that is shared across routes',
  },
  {
    name: 'Grouped Layouts',
    slug: 'route-groups',
    description: 'Organize routes without affecting URL paths',
  },
  {
    name: 'Hooks',
    slug: 'hooks',
    description: 'Preview the hooks available for Client and Server Components',
  },
  {
    name: 'Settings',
    slug: 'settings',
    description: 'YTStreamer application settings',
  },
];
