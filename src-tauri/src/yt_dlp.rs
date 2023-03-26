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

#[derive(Default, Clone, serde::Serialize)]
struct ProgressMsgEvent {
    title: String,                // Video title
    status: String,               // Download status
    predicted_size_str: String,   // Predicted file size at start of download
    downloaded_bytes_str: String, // Already downloaded bytes since start of download
    total_bytes_str: String,      // Actual file size downloaded
    percent_str: String,          // Download progress in percent
    speed_str: String,            // Download speed
}

#[derive(Default)]
struct ProgressMsg {
    title: String,         // Video title
    predicted_size: f64,   // Predicted file size, got at start of download
    downloaded_bytes: f64, // Already downloaded bytes, updated only when a fragment is finished
    total_bytes: f64,      // Final file size on disk, different from predicted size
}

impl ProgressMsg {
    fn new() -> Self {
        Self {
            predicted_size: 0_f64,
            downloaded_bytes: 0_f64,
            total_bytes: 0_f64,
            ..Default::default()
        }
    }
}

fn bytes_to_string(bytes: f64) -> String {
    let units = ["B", "KB", "MB", "GB", "TB", "PB"];
    if bytes < 1_f64 {
        return format!("{:.2}{}", bytes, units[0]);
    }
    let exp = (bytes.ln() / 1024_f64.ln()).floor() as usize;
    format!("{:.2}{}", bytes / 1024_f64.powi(exp as i32), units[exp])
}

fn parse_progress_msg(progress: &mut ProgressMsg, msg: &str) -> ProgressMsgEvent {
    if msg.starts_with("[title]") {
        progress.title = msg.strip_prefix("[title]").unwrap().to_string();
        return ProgressMsgEvent {
            title: progress.title.clone(),
            ..Default::default()
        };
    } else if msg.starts_with("[size]") {
        progress.predicted_size = msg.strip_prefix("[size]").unwrap().parse().unwrap();
        return ProgressMsgEvent {
            title: progress.title.clone(),
            predicted_size_str: bytes_to_string(progress.predicted_size),
            ..Default::default()
        };
    } else if msg.starts_with("[DONE]") {
        return ProgressMsgEvent {
            title: progress.title.clone(),
            status: "DONE".to_string(),
            predicted_size_str: bytes_to_string(progress.predicted_size),
            downloaded_bytes_str: bytes_to_string(progress.downloaded_bytes),
            total_bytes_str: bytes_to_string(progress.total_bytes),
            percent_str: format!(
                "{:.1}%",
                progress.downloaded_bytes / progress.total_bytes * 100_f64
            ),
            ..Default::default()
        };
    }

    let info: Vec<&str> = msg.split_whitespace().collect();
    let mut _downloaded_so_far = 0_f64;

    ProgressMsgEvent {
        title: progress.title.clone(),
        status: info[0].to_string(),
        predicted_size_str: bytes_to_string(progress.predicted_size),
        downloaded_bytes_str: {
            if "finished" == info[0] {
                progress.downloaded_bytes += info[1].parse::<f64>().unwrap();
                _downloaded_so_far = progress.downloaded_bytes;
            } else {
                _downloaded_so_far = progress.downloaded_bytes + info[1].parse::<f64>().unwrap();
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
            "{:.1}%",
            _downloaded_so_far / progress.predicted_size * 100_f64
        ),
        speed_str: info[3].to_string(),
    }
}

impl DownloadEvent {
    async fn emit_event_msg(&self, event: ProgressMsgEvent) {
        self.window
            .emit("progress_msg", event)
            .expect("emit progress msg failed");
    }

    pub async fn download(&self) {
        let video_params = [
            "--print",
            "[title]%(title)s",
            "--print",
            "[size]%(filesize_approx)B",
        ];

        let template = "
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
            .args(progress_params)
            .args(params)
            .args(["--encoding", "utf8"])
            .arg(&self.target_url)
            .stdout(Stdio::piped())
            .spawn()
            .expect("Failed to start yt-dlp process");

        let output = child.stdout.take().expect("Failed to access yt-dlp stdout");
        let mut bufreader = BufReader::new(output);
        let mut buffer = String::new();

        let mut progress = ProgressMsg::new();

        while let Ok(size) = bufreader.read_line(&mut buffer) {
            if size > 0 {
                self.emit_event_msg(parse_progress_msg(&mut progress, buffer.trim()))
                    .await;
                buffer.clear();
            } else {
                self.emit_event_msg(parse_progress_msg(&mut progress, "[DONE]"))
                    .await;
                break;
            }
        }
    }
}
