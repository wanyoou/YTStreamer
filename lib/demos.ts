type Item = {
  name: string;
  items: {
    name: string;
    slug: string;
    description?: string;
    isDisabled?: boolean;
  }[];
};

export const demos: Item[] = [
  {
    name: 'Layouts',
    items: [
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
    ],
  },
  {
    name: 'Components',
    items: [
      {
        name: 'Hooks',
        slug: 'hooks',
        description:
          'Preview the hooks available for Client and Server Components',
      },
      {
        name: 'Client Context',
        slug: 'context',
        description:
          'Pass context between Client Components that cross Server/Client Component boundary',
      },
    ],
  },
];
