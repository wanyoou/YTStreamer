type Item = {
  category: string;
  items: {
    format: string;
    value: string;
    description?: string;
  }[];
};

export const formats: Item[] = [
  {
    category: 'Video & Audio',
    items: [
      { format: 'Best', value: 'bestvideo*+bestaudio/best' },
      {
        format: 'Worst',
        value: 'worstvideo*+worstaudio/worst',
      },
    ],
  },
  {
    category: 'Video',
    items: [
      { format: 'Best', value: 'bestvideo' },
      { format: '3GP', value: '3gp' },
      { format: 'FLV', value: 'flv' },
      { format: 'M4A', value: 'm4a' },
      { format: 'MP4', value: 'mp4' },
      { format: 'WebM', value: 'webm' },
      { format: 'WORST', value: 'worstvideo' },
    ],
  },
  {
    category: 'Audio',
    items: [
      { format: 'Best', value: 'bestaudio' },
      { format: 'AAC', value: 'aac' },
      { format: 'MP3', value: 'mp3' },
      { format: 'OGG', value: 'ogg' },
      { format: 'WAV', value: 'wav' },
      { format: 'WORST', value: 'worstaudio' },
    ],
  },
];

export async function getValueByFormat(
  format: string,
): Promise<string | undefined> {
  const item = formats
    .flatMap((category) => category.items)
    .find((item) => item.format === format);

  return item?.value;
}

function AVSvg({ category }: { category: string }) {
  const videoSvg = (
    <svg
      className="fill-current w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      stroke="currentColor"
    >
      <path d="M1002.666667 106.666667v810.666666H21.333333V106.666667h981.333334zM106.666667 832h810.666666V192H106.666667v640z m106.666666-234.666667v-170.666666H64v-85.333334h149.333333V128h85.333334v768h-85.333334V682.666667H64v-85.333334h149.333333z m235.306667 129.792V299.904L797.589333 513.493333 448.64 727.125333z m85.333333-274.944v122.666667l100.181334-61.333333-100.181334-61.333334z" />
    </svg>
  );

  const audioSvg = (
    <svg
      className="fill-current w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      stroke="currentColor"
    >
      <path d="M938.666667 308.736V768h-1.322667A170.666667 170.666667 0 1 1 853.333333 641.493333V356.224l-448 84.48V789.333333h-1.322666A170.666667 170.666667 0 1 1 320 662.826667V150.528l618.666667-116.650667v274.858667zM234.666667 896a85.333333 85.333333 0 1 0 0-170.666667 85.333333 85.333333 0 0 0 0 170.666667z m533.333333-21.333333a85.333333 85.333333 0 1 0 0-170.666667 85.333333 85.333333 0 0 0 0 170.666667zM405.333333 221.269333v132.608l448-84.48V136.789333l-448 84.48z" />
    </svg>
  );

  const avSvg = (
    <svg
      className="fill-current w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      stroke="currentColor"
    >
      <path d="M0 128l0 768 1024 0L1024 128 0 128zM192 832 64 832l0-128 128 0L192 832zM192 576 64 576l0-128 128 0L192 576zM192 320 64 320 64 192l128 0L192 320zM768 832 256 832 256 192l512 0L768 832zM960 832l-128 0 0-128 128 0L960 832zM960 576l-128 0 0-128 128 0L960 576zM960 320l-128 0L832 192l128 0L960 320zM384 320 384 704 640 512z" />
    </svg>
  );

  switch (category) {
    case 'Video':
      return videoSvg;
    case 'Audio':
      return audioSvg;
    default:
      return avSvg;
  }
}

export default function Formats() {
  return (
    <div className="flex-col space-y-2">
      {formats.map((cate) => {
        return (
          <div key={cate.category} className="space-y-2">
            <label className="label text-sm font-semibold p-0">
              {cate.category}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {cate.items.map((item) => {
                return (
                  <button
                    key={item.value}
                    className="btn rounded-md w-14 h-14 flex-col place-content-evenly"
                  >
                    <AVSvg category={cate.category} />
                    {item.format}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
