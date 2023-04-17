/*! Invoke `yt-dlp` program, and the Tauri event mechanism is used to
 *  notify the front-end to update the download progress and other information.
 */

use serde::Serialize;
use std::{
    default::Default,
    io::{BufRead, BufReader},
    process::{Command, Stdio},
};
use tauri::Window;

pub struct DownloadEvent {
    pub window: Window,
    pub target_url: String,
}

/* Used to init the video information of the front-end, sended only once */
#[derive(Default, Clone, Serialize)]
struct VideoInfoEvent {
    title: String,              // Video title
    uploader: String,           // Video author
    thumbnail: String,          // Video thumbnail
    url: String,                // Video url, used to identify the video
    extractor: String,          // Video source
    predicted_size_str: String, // Predicted file size at start of download
}

/* Used to update the download progress information of the front-end */
#[derive(Clone, Serialize)]
struct ProgressMsgEvent {
    url: String,                  // Video url, used to identify the video
    status: String,               // Download status
    downloaded_bytes_str: String, // Already downloaded bytes since start of download
    total_bytes_str: String,      // Actual file size downloaded
    percent_str: String,          // Download progress in percent
    speed_str: String,            // Download speed
}

/* Integrate the information of each video segment in order to
 * calculate the progress information of the whole video.
 */
#[derive(Default)]
struct ProgressMsg {
    url: String,           // Video url, used to identify the video
    predicted_size: f64,   // Predicted file size, got from video info
    downloaded_bytes: f64, // Already downloaded bytes, updated only when a fragment is finished
    total_bytes: f64,      // Final file size on disk, different from predicted size
}

fn bytes_to_string(bytes: f64) -> String {
    let units = ["B", "KB", "MB", "GB", "TB", "PB"];
    if bytes < 1_f64 {
        return format!("{:.2}{}", bytes, units[0]);
    }
    let exp = (bytes.ln() / 1024_f64.ln()).floor() as usize;
    format!("{:.2}{}", bytes / 1024_f64.powi(exp as i32), units[exp])
}

fn parse_video_info(progress: &mut ProgressMsg, video_info: &mut VideoInfoEvent, msg: &str) {
    let info: Vec<&str> = msg.splitn(2, "]").collect();
    let key = info[0].strip_prefix("[").unwrap();
    let value = info[1].trim();
    match key {
        "title" => video_info.title = value.to_string(),
        "uploader" => video_info.uploader = value.to_string(),
        "thumbnail" => video_info.thumbnail = value.to_string(),
        "extractor" => video_info.extractor = value.to_string(),
        "size" => {
            let size: f64 = value.parse().unwrap();
            video_info.predicted_size_str = bytes_to_string(size);
            progress.predicted_size = size;
        }
        _ => {}
    }
}

fn parse_progress_msg(progress: &mut ProgressMsg, msg: &str) -> ProgressMsgEvent {
    let info: Vec<&str> = msg.split_whitespace().collect();
    let mut _downloaded_so_far = 0_f64;

    ProgressMsgEvent {
        url: progress.url.clone(),
        status: info[0].to_string(),
        downloaded_bytes_str: {
            let down_bytes: f64 = info[1].parse().unwrap();
            if "finished" == info[0] {
                progress.downloaded_bytes += down_bytes;
                _downloaded_so_far = progress.downloaded_bytes;
            } else {
                _downloaded_so_far = progress.downloaded_bytes + down_bytes;
            }
            bytes_to_string(_downloaded_so_far)
        },
        // just useful when download done, no need to update timely
        total_bytes_str: {
            let bytes: f64 = info[2].parse().unwrap();
            if "finished" == info[0] {
                progress.total_bytes += bytes;
            }
            bytes_to_string(bytes)
        },
        percent_str: format!(
            "{:.1}",
            _downloaded_so_far / progress.predicted_size * 100_f64
        ),
        speed_str: info[3].to_string(),
    }
}

impl DownloadEvent {
    async fn emit_event_msg(&self, event: &(impl Serialize + Clone)) {
        self.window
            .emit("progress_msg", event)
            .expect("emit progress msg failed");
    }

    pub async fn download(&self) {
        let video_params = [
            "--print",
            "[title]%(title)s",
            "--print",
            "[uploader]%(uploader)s",
            "--print",
            "[thumbnail]%(thumbnail)s",
            "--print",
            "[extractor]%(extractor)s",
            "--print",
            "[size]%(filesize_approx)B",
        ];

        let template = "
            [progress]\
            %(progress.status)s \
            %(progress.downloaded_bytes)B \
            %(progress.total_bytes)B \
            %(progress._speed_str)s";
        let progress_params = [
            "--progress",
            "--newline",
            "--progress-template",
            template.trim(),
        ];

        let params = ["--no-simulate", "-P", "D:/"];

        let mut child = Command::new("yt-dlp")
            .args(video_params)
            .args(["--print", "[INFODONE]"])
            .args(progress_params)
            .args(params)
            .args(["--encoding", "utf8"])
            .arg(self.target_url.as_str())
            .stdout(Stdio::piped())
            .spawn()
            .expect("Failed to start yt-dlp process");

        let output = child.stdout.take().expect("Failed to access yt-dlp stdout");
        let mut bufreader = BufReader::new(output);
        let mut buffer = String::new();

        let mut video_info: VideoInfoEvent = Default::default();
        let mut progress: ProgressMsg = Default::default();

        video_info.url = self.target_url.clone();
        progress.url = self.target_url.clone();

        while let Ok(size) = bufreader.read_line(&mut buffer) {
            if size > 0 {
                let buffer = buffer.trim();
                if buffer.starts_with("[progress]") {
                    self.emit_event_msg(&parse_progress_msg(
                        &mut progress,
                        buffer.strip_prefix("[progress]").unwrap(),
                    ))
                    .await;
                } else if buffer.starts_with("[INFODONE]") {
                    self.emit_event_msg(&video_info).await;
                } else {
                    parse_video_info(&mut progress, &mut video_info, buffer);
                }
            } else {
                self.emit_event_msg(&ProgressMsgEvent {
                    url: progress.url.clone(),
                    status: "ALLDONE".to_string(),
                    downloaded_bytes_str: bytes_to_string(progress.downloaded_bytes),
                    total_bytes_str: bytes_to_string(progress.total_bytes),
                    percent_str: format!(
                        "{:.1}",
                        progress.downloaded_bytes / progress.total_bytes * 100_f64
                    ),
                    speed_str: "".to_string(),
                })
                .await;
                break;
            }
            buffer.clear();
        }
    }
}
