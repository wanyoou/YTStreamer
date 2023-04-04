type Item = {
  name: string;
  value: string;
  description?: string;
};

export const outputTemplate: Item[] = [
  {
    name: 'identifier',
    value: '%(id)s',
    description: '[id] (string): Video identifier',
  },
  {
    name: 'title',
    value: '%(title)s',
    description: '[title] (string): Video title',
  },
  {
    name: 'fulltitle',
    value: '%(fulltitle)s',
    description:
      '[fulltitle] (string): Video title ignoring live timestamp and generic title',
  },
  {
    name: 'extension',
    value: '%(ext)s',
    description: '[ext] (string): Video filename extension',
  },
  {
    name: 'description',
    value: '%(description)s',
    description: '[description] (string): The description of the video',
  },
  {
    name: 'uploader',
    value: '%(uploader)s',
    description: '[uploader] (string): Full name of the video uploader',
  },
  {
    name: 'timestamp',
    value: '%(timestamp)d',
    description:
      '[timestamp] (numeric): UNIX timestamp of the moment the video became available',
  },
  {
    name: 'duration',
    value: '%(duration_string)s',
    description: '[duration_string] (string): Length of the video (HH:mm:ss)',
  },
];
