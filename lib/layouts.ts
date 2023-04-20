type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const layouts: Item[] = [
  {
    name: 'Download',
    slug: '',
    description: 'Homepage for downloading videos',
  },
  {
    name: 'Profiles',
    slug: 'profiles',
    description: 'Configurations for yt-dlp',
  },
  {
    name: 'Settings',
    slug: 'settings',
    description: 'YTStreamer application settings',
  },
  {
    name: 'About',
    slug: 'about',
    description: 'Software information such as programs version',
  },
];
