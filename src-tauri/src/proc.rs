use std::{
    io::Read,
    process::{Command, Stdio},
};

pub fn invoke_yt_dlp(target_url: &str) {
    let mut child = Command::new("yt-dlp")
        .args([
            "--print",
            "%(title)s.%(ext)s",
            "--no-simulate",
            "--progress",
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
