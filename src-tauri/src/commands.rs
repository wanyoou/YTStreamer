use crate::config;
use crate::yt_dlp::DownloadEvent;
use tauri::Window;

#[tauri::command]
pub async fn start_download(window: Window, target_url: String) {
    let down = DownloadEvent { window, target_url };
    down.download().await;
}

#[tauri::command]
pub async fn get_ytdlp_conf(window: Window) {
    config::emit_ytdlp_conf(window).await;
}

#[tauri::command]
pub async fn update_ytdlp_conf(conf_content: String) {
    config::upgrade_ytdlp_conf(conf_content).await;
}

#[tauri::command]
pub async fn update_app_conf(conf_content: String) {
    config::upgrade_app_conf(conf_content).await;
}
