use crate::yt_dlp::DownloadEvent;
use tauri::Window;

#[tauri::command]
pub fn start_download(window: Window, target_url: String) {
    let down = DownloadEvent { window, target_url };
    down.download();
}
