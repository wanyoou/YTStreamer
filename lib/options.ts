type OptItem = {
  section: string;
  opts: {
    name: string;
    opt: string;
    value?: string | boolean;
    description?: string;
  }[];
};

export const options: OptItem[] = [
  {
    section: 'General',
    opts: [],
  },
];
