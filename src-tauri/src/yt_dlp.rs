use std::{
    io::Read,
    process::{Command, Stdio},
};
use tauri::Window;

pub struct DownloadEvent {
    pub window: Window,
    pub target_url: String,
}

#[derive(Clone, serde::Serialize)]
struct VideoTitleEvent {
    title: String,
}

#[derive(Clone, serde::Serialize)]
struct ProgressMsgEvent {
    downloaded_bytes: String,
    percent: String,
    total_bytes: String,
    speed: String,
}

impl VideoTitleEvent {
    fn new(msg: &str) -> Self {
        let title = msg
            .strip_prefix("[title]")
            .expect("is not title")
            .to_string();
        Self { title }
    }
}

impl ProgressMsgEvent {
    fn new(msg: &str) -> Self {
        let url: Vec<&str> = msg.split_whitespace().collect();

        Self {
            downloaded_bytes: url[0].to_string(),
            percent: url[1].to_string(),
            total_bytes: url[3].to_string(),
            speed: {
                if let "Unknown" = url[5] {
                    format!("{} {}", url[5], url[6])
                } else {
                    url[5].to_string()
                }
            },
        }
    }
}

impl DownloadEvent {
    fn emit_event_msg(&self, msg: &str) {
        if !msg.starts_with("[title]") {
            let event = ProgressMsgEvent::new(msg.trim());
            self.window
                .emit("progress_msg", event)
                .expect("emit video title event failed");
        } else {
            let event = VideoTitleEvent::new(msg.trim());
            self.window
                .emit("progress_msg", event)
                .expect("emit progress msg event failed");
        };
    }

    pub fn download(&self) {
        let params = [
            "--print",
            "[title]%(title)s",
            "--no-simulate",
            "--newline",
            "--progress",
            "--progress-template",
            "%(progress._downloaded_bytes_str)s %(progress._default_template)s",
        ];
        let mut child = Command::new("yt-dlp")
            .args(params)
            .args(["-P", "D:/"])
            .arg(&self.target_url)
            .stdout(Stdio::piped())
            .spawn()
            .expect("Failed to start yt-dlp process");

        let mut output = child.stdout.take().expect("Failed to access yt-dlp stdout");
        let mut buffer = [0; 128];

        loop {
            match child.try_wait() {
                Ok(Some(status)) => {
                    println!("yt-dlp exited with: {status}");
                    break;
                }
                Ok(None) => {
                    let size = output.read(&mut buffer).unwrap();
                    if size != 0 {
                        self.emit_event_msg(&String::from_utf8_lossy(&buffer[..size]));
                    }
                }
                Err(e) => {
                    eprintln!("error attempting to wait yt-dlp: {e}");
                    break;
                }
            }
        }
    }
}
