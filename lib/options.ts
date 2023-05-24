export type OptInfo = {
  name?: string;
  opt: string;
  appearance?: Appearance; // no appearance means ToggleButton
  values?: string[];
  defaultValue?: string; // default value, not used for ToggleButton which defaults to false
  multiple?: boolean;
  description?: string;
};

export type OptItems = {
  section: string;
  opts: OptInfo[];
};

export enum Appearance {
  InputBox = 'INPUTBOX',
  Selector = 'SELECTOR',
  Slider = 'SLIDER',
}

export const options: OptItems[] = [
  {
    section: 'General',
    opts: [
      {
        opt: 'no-abort-on-error',
        description:
          'Continue with next video on download errors; e.g. to skip unavailable videos in a playlist (default)',
      },
      {
        opt: 'ignore-config',
        description: "Don't load any more configuration files except those given by --config-locations",
      },
      {
        opt: 'config-locations',
        appearance: Appearance.InputBox,
        multiple: true,
        description:
          'Location of the main configuration file; either the path to the config or its containing directory',
      },
      {
        opt: 'live-from-start',
        description: 'Download livestreams from the start. Currently only supported for YouTube (Experimental)',
      },
      { opt: 'mark-watched', description: 'Mark videos watched' },
    ],
  },
  {
    section: 'Network',
    opts: [
      {
        opt: 'proxy',
        appearance: Appearance.InputBox,
        description:
          'Use the specified HTTP/HTTPS/SOCKS proxy. To enable SOCKS proxy, specify a proper scheme, e.g. socks5://user:pass@127.0.0.1:1080/. Pass in an empty string ("") for direct connection',
      },
      {
        opt: 'socket-timeout',
        appearance: Appearance.InputBox,
        description: 'Time to wait before giving up, in seconds',
      },
      {
        opt: 'source-address',
        appearance: Appearance.InputBox,
        description: 'Client-side IP address to bind to',
      },
      { opt: 'force-ipv4', description: 'Make all connections via IPv4' },
      { opt: 'force-ipv6', description: 'Make all connections via IPv6' },
      {
        opt: 'enable-file-urls',
        description: 'Enable file:// URLs. This is disabled by default for security reasons.',
      },
    ],
  },
  {
    section: 'Geo-restriction',
    opts: [
      {
        opt: 'geo-verification-proxy',
        appearance: Appearance.InputBox,
        description:
          'Use this proxy to verify the IP address for some geo-restricted sites. The default proxy specified by --proxy (or none, if the option is not present) is used for the actual downloading',
      },
      {
        opt: 'no-geo-bypass',
        description: 'Do not bypass geographic restriction via faking X-Forwarded-For HTTP header',
      },
      {
        opt: 'geo-bypass-country',
        appearance: Appearance.Selector,
        values: [],
        defaultValue: 'Default',
        description: 'Force bypass geographic restriction with explicitly provided two-letter ISO 3166-2 country code',
      },
      {
        opt: 'geo-bypass-ip-block',
        appearance: Appearance.InputBox,
        description: 'Force bypass geographic restriction with explicitly provided IP block in CIDR notation',
      },
    ],
  },
  {
    section: 'Video Selection',
    opts: [
      {
        opt: 'min-filesize',
        appearance: Appearance.InputBox,
        description: 'Abort download if filesize is smaller than SIZE, e.g. 50k or 44.6M',
      },
      {
        opt: 'max-filesize',
        appearance: Appearance.InputBox,
        description: 'Abort download if filesize is larger than SIZE, e.g. 50k or 44.6M',
      },
      {
        opt: 'no-playlist',
        description: 'Download only the video, if the URL refers to a video and a playlist',
      },
      {
        opt: 'yes-playlist',
        description: 'Download the playlist, if the URL refers to a video and a playlist',
      },
      {
        opt: 'age-limit',
        appearance: Appearance.Slider,
        values: ['1', '18'], // min, max
        defaultValue: '18',
        description: 'Download only videos suitable for the given age',
      },
      {
        opt: 'download-archive',
        appearance: Appearance.InputBox,
        description:
          'Download only videos not listed in the archive file. Record the IDs of all downloaded videos in it',
      },
      {
        opt: 'max-downloads',
        appearance: Appearance.InputBox,
        description: 'Abort after downloading NUMBER files',
      },
      {
        opt: 'break-on-existing',
        description: 'Stop the download process when encountering a file that is in the archive',
      },
      {
        opt: 'skip-playlist-after-errors',
        appearance: Appearance.InputBox,
        description: 'Number of allowed failures until the rest of the playlist is skipped',
      },
    ],
  },
  {
    section: 'Authentication',
    opts: [
      { opt: 'netrc', description: 'Use .netrc authentication data' },
      {
        opt: 'netrc-location',
        appearance: Appearance.InputBox,
        description:
          'Location of .netrc authentication data; either the path or its containing directory. Defaults to ~/.netrc',
      },
      {
        opt: 'client-certificate',
        appearance: Appearance.InputBox,
        description: 'Path to client certificate file in PEM format. May include the private key',
      },
      {
        opt: 'client-certificate-key',
        appearance: Appearance.InputBox,
        description: 'Path to private key file for client certificate',
      },
      {
        opt: 'client-certificate-password',
        appearance: Appearance.InputBox,
        description:
          'Password for client certificate private key, if encrypted. If not provided, and the key is encrypted, yt-dlp will ask interactively',
      },
    ],
  },
  {
    section: 'Video Format',
    opts: [
      {
        opt: 'format',
        appearance: Appearance.Selector,
        values: [],
        defaultValue: 'Default',
        description:
          'Video format code, see [FORMAT SELECTION](https://github.com/yt-dlp/yt-dlp#format-selection) for more details',
      },
      {
        opt: 'format-sort',
        appearance: Appearance.InputBox,
        description:
          'Sort the formats by the fields given, see [Sorting Formats](https://github.com/yt-dlp/yt-dlp#sorting-formats) for more details',
      },
      {
        opt: 'format-sort-force',
        description:
          'Force user specified sort order to have precedence over all fields, see [Sorting Formats](https://github.com/yt-dlp/yt-dlp#sorting-formats) for more details',
      },
      {
        opt: 'video-multistreams',
        description: 'Allow multiple video streams to be merged into a single file',
      },
      {
        opt: 'audio-multistreams',
        description: 'Allow multiple audio streams to be merged into a single file',
      },
      {
        opt: 'prefer-free-formats',
        description: 'Prefer video formats with free containers over non-free ones of same quality.',
      },
      {
        opt: 'check-formats',
        description: 'Make sure formats are selected only from those that are actually downloadable',
      },
      {
        opt: 'merge-output-format',
        appearance: Appearance.InputBox,
        description:
          'Containers that may be used when merging formats, separated by "/", e.g. "mp4/mkv". Ignored if no merge is required.',
      },
    ],
  },
  {
    section: 'Subtitle',
    opts: [
      { opt: 'write-subs', description: 'Write subtitle file' },
      {
        opt: 'write-auto-subs',
        description: 'Write automatically generated subtitle file',
      },
      {
        opt: 'sub-format',
        appearance: Appearance.InputBox,
        description: 'Subtitle format; accepts formats preference, e.g. "srt" or "ass/srt/best"',
      },
      {
        opt: 'sub-langs',
        appearance: Appearance.InputBox,
        description:
          'Languages of the subtitles to download (can be regex) or "all" separated by commas, e.g. "en.*,ja". You can prefix the language code with a "-" to exclude it from the requested languages, e.g. all,-live_chat.',
      },
    ],
  },
  {
    section: 'Download',
    opts: [
      {
        opt: 'concurrent-fragments',
        appearance: Appearance.Slider,
        values: ['1', '64'], // min, max
        defaultValue: '1',
        description:
          'Number of fragments of a dash/hlsnative video that should be downloaded concurrently (default is 1)',
      },
      {
        opt: 'limit-rate',
        appearance: Appearance.InputBox,
        description: 'Maximum download rate in bytes per second, e.g. 50K or 4.2M',
      },
      {
        opt: 'throttled-rate',
        appearance: Appearance.InputBox,
        description:
          'Minimum download rate in bytes per second below which throttling is assumed and the video data is re-extracted, e.g. 100K',
      },
      {
        opt: 'retries',
        appearance: Appearance.InputBox,
        description: 'Number of retries (default is 10), or "infinite"',
      },
      {
        opt: 'file-access-retries',
        appearance: Appearance.InputBox,
        description: 'Number of times to retry on file access error (default is 3), or "infinite"',
      },
      {
        opt: 'fragment-retries',
        appearance: Appearance.InputBox,
        description: 'Number of retries for a fragment (default is 10), or "infinite" (DASH, hlsnative and ISM)',
      },
      {
        opt: 'retry-sleep',
        appearance: Appearance.InputBox,
        multiple: true,
        description:
          'Time to sleep between retries in seconds (optionally) prefixed by the type of retry (http (default), fragment, file_access, extractor) to apply the sleep to. EXPR can be a number, linear=START[:END[:STEP=1]] or exp=START[:END[:BASE=2]]. This option can be used multiple times to set the sleep for the different retry types, e.g. linear=1::2;fragment:exp=1:20',
      },
      {
        opt: 'abort-on-unavailable-fragments',
        description: 'Abort download if a fragment is unavailable',
      },
      {
        opt: 'keep-fragments',
        description: 'Keep downloaded fragments on disk after downloading is finished',
      },
      {
        opt: 'buffer-size',
        appearance: Appearance.InputBox,
        description: 'Size of download buffer, e.g. 1024 or 16K (default is 1024)',
      },
      {
        opt: 'no-resize-buffer',
        description: 'Do not automatically adjust the buffer size',
      },
      {
        opt: 'http-chunk-size',
        appearance: Appearance.InputBox,
        description:
          'Size of a chunk for chunk-based HTTP downloading, e.g. 10485760 or 10M (default is disabled). May be useful for bypassing bandwidth throttling imposed by a webserver (experimental)',
      },
      {
        opt: 'playlist-random',
        description: 'Download playlist videos in random order',
      },
      {
        opt: 'lazy-playlist',
        description:
          'Process entries in the playlist as they are received. This disables n_entries, --playlist-random and --playlist-reverse',
      },
      {
        opt: 'hls-use-mpegts',
        description:
          'Use the mpegts container for HLS videos; allowing some players to play the video while downloading, and reducing the chance of file corruption if download is interrupted. This is enabled by default for live streams',
      },
      {
        opt: 'no-hls-use-mpegts',
        description:
          'Do not use the mpegts container for HLS videos. This is default when not downloading live streams',
      },
      {
        opt: 'download-sections',
        appearance: Appearance.InputBox,
        multiple: true,
        description:
          'Download only chapters whose title matches the given regular expression. Time ranges prefixed by a "*" can also be used in place of chapters to download the specified range. Needs ffmpeg. This option can be used multiple times to download multiple sections, e.g. "*10:15-inf";"intro"',
      },
      {
        opt: 'downloader',
        appearance: Appearance.InputBox,
        multiple: true,
        description:
          'Name or path of the external downloader to use (optionally) prefixed by the protocols (http, ftp, m3u8, dash, rstp, rtmp, mms) to use it for. You can use this option multiple times to set different downloaders for different protocols. E.g. aria2c;"dash,m3u8:native" will use aria2c for http/ftp downloads, and the native downloader for dash/m3u8 downloads',
      },
      {
        opt: 'downloader-args',
        appearance: Appearance.InputBox,
        multiple: true,
        description:
          'Give these arguments to the external downloader. Specify the downloader name and the arguments separated by a colon ":". For ffmpeg, arguments can be passed to different positions using the same syntax as --postprocessor-args. You can use this option multiple times to give different arguments to different downloaders',
      },
    ],
  },
  {
    section: 'Workarounds',
    opts: [
      {
        opt: 'legacy-server-connect',
        description: 'Explicitly allow HTTPS connection to servers that do not support RFC 5746 secure renegotiation',
      },
      {
        opt: 'no-check-certificates',
        description: 'Suppress HTTPS certificate validation',
      },
      {
        opt: 'prefer-insecure',
        description:
          'Use an unencrypted connection to retrieve information about the video (Currently supported only for YouTube)',
      },
      {
        opt: 'add-headers',
        appearance: Appearance.InputBox,
        multiple: true,
        description:
          'Specify a custom HTTP header and its value, separated by a colon ":". You can use this option multiple times',
      },
      {
        opt: 'bidi-workaround',
        description:
          'Work around terminals that lack bidirectional text support. Requires bidiv or fribidi executable in PATH',
      },
      {
        opt: 'sleep-requests',
        appearance: Appearance.InputBox,
        description: 'Number of seconds to sleep between requests during data extraction',
      },
      {
        opt: 'sleep-interval',
        appearance: Appearance.InputBox,
        description:
          'Number of seconds to sleep before each download. This is the minimum time to sleep when used along with --max-sleep-interval',
      },
      {
        opt: 'max-sleep-interval',
        appearance: Appearance.InputBox,
        description: 'Maximum number of seconds to sleep. Can only be used along with --sleep-interval',
      },
      {
        opt: 'sleep-subtitles',
        appearance: Appearance.InputBox,
        description: 'Number of seconds to sleep before each subtitle download',
      },
    ],
  },
  {
    section: 'Filesystem',
    opts: [
      {
        opt: 'paths',
        appearance: Appearance.InputBox,
        description:
          'The paths where the files should be downloaded. Specify the type of file and the path separated by a colon ":". All the same TYPES as --output are supported. Additionally, you can also provide "home" (default) and "temp" paths. This option is ignored if --output is an absolute path',
      },
      {
        opt: 'output',
        appearance: Appearance.InputBox,
        description:
          'Output filename template; see [OUTPUT TEMPLATE](https://github.com/yt-dlp/yt-dlp#output-template) for details',
      },
      {
        opt: 'output-na-placeholder',
        appearance: Appearance.InputBox,
        description: 'Placeholder for unavailable fields in "OUTPUT TEMPLATE" (default: "NA")',
      },
      {
        opt: 'restrict-filenames',
        description: 'Restrict filenames to only ASCII characters, and avoid "&" and spaces in filenames',
      },
      {
        opt: 'windows-filenames',
        description: 'Force filenames to be Windows-compatible',
      },
      {
        opt: 'trim-filenames',
        appearance: Appearance.InputBox,
        description: 'Limit the filename length (excluding extension) to the specified number of characters',
      },
      { opt: 'no-overwrites', description: 'Do not overwrite any files' },
      {
        opt: 'force-overwrites',
        description: 'Overwrite all video and metadata files. This option includes --no-continue',
      },
      {
        opt: 'no-continue',
        description:
          'Do not resume partially downloaded fragments. If the file is not fragmented, restart download of the entire file',
      },
      {
        opt: 'no-part',
        description: 'Do not use .part files - write directly into output file',
      },
      {
        opt: 'no-mtime',
        description: 'Do not use the Last-modified header to set the file modification time',
      },
      {
        opt: 'write-description',
        description: 'Write video description to a .description file',
      },
      {
        opt: 'write-info-json',
        description: 'Write video metadata to a .info.json file (this may contain personal information)',
      },
      {
        opt: 'no-write-playlist-metafiles',
        description: 'Do not write playlist metadata when using --write-info-json, --write-description etc.',
      },
      {
        opt: 'no-clean-info-json',
        description: 'Write all fields to the infojson',
      },
      {
        opt: 'write-comments',
        description:
          'Retrieve video comments to be placed in the infojson. The comments are fetched even without this option if the extraction is known to be quick',
      },
      {
        opt: 'no-write-comments',
        description: 'Do not retrieve video comments unless the extraction is known to be quick',
      },
      {
        opt: 'cookies',
        appearance: Appearance.InputBox,
        description: 'Netscape formatted file to read cookies from and dump cookie jar in',
      },
      {
        opt: 'cookies-from-browser',
        appearance: Appearance.InputBox,
        description:
          'The name of the browser to load cookies from. See [--cookies-from-browser](https://github.com/yt-dlp/yt-dlp#usage-and-options:~:text=to%20file%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20(default)-,%2D%2Dcookies%2Dfrom%2Dbrowser,-BROWSER%5B%2BKEYRING%5D%5B%3APROFILE) for details',
      },
      {
        opt: 'cache-dir',
        appearance: Appearance.InputBox,
        description:
          'Location in the filesystem where yt-dlp can store some downloaded information (such as client ids and signatures) permanently. By default ${XDG_CACHE_HOME}/yt-dlp',
      },
      { opt: 'no-cache-dir', description: 'Disable filesystem caching' },
    ],
  },
  {
    section: 'Thumbnail',
    opts: [
      { opt: 'write-thumbnail', description: 'Write thumbnail image to disk' },
      {
        opt: 'write-all-thumbnails',
        description: 'Write all thumbnail image formats to disk',
      },
    ],
  },
  {
    section: 'Internet Shortcut',
    opts: [
      {
        opt: 'write-link',
        description:
          'Write an internet shortcut file, depending on the current platform (.url, .webloc or .desktop). The URL may be cached by the OS',
      },
      {
        opt: 'write-url-link',
        description: 'Write a .url Windows internet shortcut. The OS caches the URL based on the file path',
      },
      {
        opt: 'write-webloc-link',
        description: 'Write a .webloc macOS internet shortcut',
      },
      {
        opt: 'write-desktop-link',
        description: 'Write a .desktop Linux internet shortcut',
      },
    ],
  },
  {
    section: 'Post-Processing',
    opts: [
      {
        opt: 'extract-audio',
        description: 'Convert video files to audio-only files (requires ffmpeg and ffprobe)',
      },
      {
        opt: 'audio-format',
        appearance: Appearance.Selector,
        values: [],
        defaultValue: 'Default',
        description: 'Format to convert the audio to when --extract-audio is used.',
      },
      {
        opt: 'audio-quality',
        appearance: Appearance.InputBox,
        description:
          'Specify ffmpeg audio quality to use when converting the audio with --extract-audio. Insert a value between 0 (best) and 10 (worst) for VBR or a specific bitrate like 128K (default 5)',
      },
      {
        opt: 'remux-video',
        appearance: Appearance.InputBox,
        description:
          'Remux the video into another container if necessary. If target container does not support the video/audio codec, remuxing will fail. You can specify multiple rules; e.g. "aac>m4a/mov>mp4/mkv" will remux aac to m4a, mov to mp4 and anything else to mkv. See [--remux-video](https://github.com/yt-dlp/yt-dlp#usage-and-options:~:text=128K%20(default%205)-,%2D%2Dremux%2Dvideo,-FORMAT%20%20%20%20%20%20%20%20%20%20%20%20Remux%20the) for details',
      },
      {
        opt: 'recode-video',
        appearance: Appearance.InputBox,
        description:
          'Re-encode the video into another format if necessary. The syntax and supported formats are the same as --remux-video',
      },
      {
        opt: 'postprocessor-args',
        appearance: Appearance.InputBox,
        description:
          'Give these arguments to the postprocessors. See [--postprocessor-args](https://github.com/yt-dlp/yt-dlp#usage-and-options:~:text=as%20%2D%2Dremux%2Dvideo-,%2D%2Dpostprocessor%2Dargs,-NAME%3AARGS%20%20Give) for details',
      },
      {
        opt: 'keep-video',
        description: 'Keep the intermediate video file on disk after post-processing',
      },
      {
        opt: 'no-post-overwrites',
        description: 'Do not overwrite post-processed files',
      },
      {
        opt: 'embed-subs',
        description: 'Embed subtitles in the video (only for mp4, webm and mkv videos)',
      },
      {
        opt: 'embed-thumbnail',
        description: 'Embed thumbnail in the video as cover art',
      },
      {
        opt: 'embed-metadata',
        description:
          'Embed metadata to the video file. Also embeds chapters/infojson if present unless --no-embed-chapters/--no-embed-info-json are used',
      },
      {
        opt: 'embed-chapters',
        description: 'Add chapter markers to the video file',
      },
      {
        opt: 'embed-info-json',
        description: 'Embed the infojson as an attachment to mkv/mka video files',
      },
      {
        opt: 'replace-in-metadata',
        appearance: Appearance.InputBox,
        multiple: true,
        description: 'Replace text in a metadata field using the given regex. This option can be used multiple times.',
      },
      {
        opt: 'xattrs',
        appearance: Appearance.InputBox,
        description: "Write metadata to the video file's xattrs (using dublin core and xdg standards)",
      },
      {
        opt: 'concat-playlist',
        appearance: Appearance.Selector,
        values: ['never', 'always', 'multi_video'],
        defaultValue: 'Default',
        description:
          'Concatenate videos in a playlist. One of "never", "always", or "multi_video" (default; only when the videos form a single show). All the video files must have same codecs and number of streams to be concatable.',
      },
      {
        opt: 'fixup',
        appearance: Appearance.Selector,
        values: ['never', 'warn', 'detect_or_warn', 'force'],
        defaultValue: 'Default',
        description:
          'Automatically correct known faults of the file. One of never (do nothing), warn (only emit a warning), detect_or_warn (the default; fix file if we can, warn otherwise), force (try fixing even if file already exists)',
      },
      {
        opt: 'ffmpeg-location',
        appearance: Appearance.InputBox,
        description: 'Location of the ffmpeg binary; either the path to the binary or its containing directory',
      },
      {
        opt: 'exec',
        appearance: Appearance.InputBox,
        description:
          'Execute a command, optionally prefixed with when to execute it, separated by a ":". See [--exec](https://github.com/yt-dlp/yt-dlp#usage-and-options:~:text=its%20containing%20directory-,%2D%2Dexec,-%5BWHEN%3A%5DCMD%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Execute) for details',
      },
      {
        opt: 'convert-subs',
        appearance: Appearance.Selector,
        values: ['ass', 'lrc', 'srt', 'vtt'],
        defaultValue: 'Default',
        description: 'Convert the subtitles to another format (currently supported: ass, lrc, srt, vtt)',
      },
      {
        opt: 'convert-thumbnails',
        appearance: Appearance.InputBox,
        description:
          'Convert the thumbnails to another format (currently supported: jpg, png, webp). You can specify multiple rules using similar syntax as --remux-video',
      },
      {
        opt: 'split-chapters',
        appearance: Appearance.InputBox,
        description:
          'Split video into multiple files based on internal chapters. The "chapter:" prefix can be used with "--paths" and "--output" to set the output filename for the split files. See [OUTPUT TEMPLATE](https://github.com/yt-dlp/yt-dlp#output-template) for details',
      },
      {
        opt: 'remove-chapters',
        appearance: Appearance.InputBox,
        multiple: true,
        description:
          'Remove chapters whose title matches the given regular expression. The syntax is the same as --download-sections. This option can be used multiple times',
      },
      {
        opt: 'force-keyframes-at-cuts',
        description:
          'Force keyframes at cuts when downloading/splitting/removing sections. This is slow due to needing a re-encode, but the resulting video may have fewer artifacts around the cuts',
      },
      {
        opt: 'use-postprocessor',
        appearance: Appearance.InputBox,
        multiple: true,
        description:
          'See [--use-postprocessor](https://github.com/yt-dlp/yt-dlp#usage-and-options:~:text=cutting/splitting%20(default)-,%2D%2Duse%2Dpostprocessor,-NAME%5B%3AARGS%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20The) for details',
      },
    ],
  },
  {
    section: 'SponsorBlock',
    opts: [
      {
        opt: 'sponsorblock-mark',
        appearance: Appearance.InputBox,
        description: 'See [SponsorBlock Options](https://github.com/yt-dlp/yt-dlp#sponsorblock-options) for details',
      },
      {
        opt: 'sponsorblock-remove',
        appearance: Appearance.InputBox,
        description: 'See [SponsorBlock Options](https://github.com/yt-dlp/yt-dlp#sponsorblock-options) for details',
      },
      {
        opt: 'sponsorblock-chapter-title',
        appearance: Appearance.InputBox,
        description: 'See [SponsorBlock Options](https://github.com/yt-dlp/yt-dlp#sponsorblock-options) for details',
      },
      {
        opt: 'no-sponsorblock',
        description: 'Disable both --sponsorblock-mark and --sponsorblock-remove',
      },
      {
        opt: 'sponsorblock-api',
        appearance: Appearance.InputBox,
        description: 'SponsorBlock API location, defaults to https://sponsor.ajay.app',
      },
    ],
  },
  {
    section: 'Extractor',
    opts: [
      {
        opt: 'extractor-retries',
        appearance: Appearance.InputBox,
        description: 'Number of retries for known extractor errors (default is 3), or "infinite"',
      },
      {
        opt: 'ignore-dynamic-mpd',
        description: 'Do not process dynamic DASH manifests',
      },
      {
        opt: 'hls-split-discontinuity',
        description: 'Split HLS playlists to different formats at discontinuities such as ad breaks',
      },
      {
        opt: 'extractor-args',
        appearance: Appearance.InputBox,
        multiple: true,
        description:
          'Pass ARGS arguments to the IE_KEY extractor. See [EXTRACTOR ARGUMENTS](https://github.com/yt-dlp/yt-dlp#extractor-arguments) for details. You can use this option multiple times to give arguments for different extractors',
      },
    ],
  },
];

export function getLabelText(option: OptInfo): string {
  if (option.name) {
    return option.name;
  } else {
    return option.opt.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
