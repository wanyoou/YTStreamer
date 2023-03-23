use std::{
    io::Read,
    process::{Command, Stdio},
};
use tauri::Window;

#[derive(Debug)]
struct EventMsg {
    title: String,
    percent: String,
    total_bytes: String,
    speed: String,
    downloaded_bytes: String,
}

#[derive(Clone, serde::Serialize)]
struct Payload {
    progress_msg: String,
}

fn parse_progress_msg(msg: &str) -> EventMsg {
    let mut split = msg.split(' ');
    let title = split.next().unwrap().to_string();
    let percent = split.next().unwrap().to_string();
    let total_bytes = split.next().unwrap().to_string();
    let speed = split.next().unwrap().to_string();
    let downloaded_bytes = split.next().unwrap().to_string();

    EventMsg {
        title,
        percent,
        total_bytes,
        speed,
        downloaded_bytes,
    }
}

pub fn download(target_url: &str) {
    let mut child = Command::new("yt-dlp")
        .args([
            "--print",
            "%(title)s",
            "--no-simulate",
            "--newline",
            "--progress",
            "--progress-template",
            "%(progress._default_template)s %(_downloaded_bytes_str)s",
        ])
        .arg(target_url)
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
                    println!("{}", String::from_utf8_lossy(&buffer[..size]));
                }
            }
            Err(e) => {
                println!("error attempting to wait yt-dlp: {e}");
                break;
            }
        }
    }
}
