use crate::config;
use crate::yt_dlp;
use serde_json::{Map, Value};
use tauri::Window;

#[tauri::command]
pub async fn start_download(window: Window, target_url: String) {
    let down = yt_dlp::DownloadEvent { window, target_url };
    down.download().await;
}

#[tauri::command]
pub async fn get_ytdlp_conf() -> Map<String, Value> {
    config::emit_ytdlp_conf().await
}

#[tauri::command]
pub async fn update_ytdlp_conf(conf_content: String) {
    config::upgrade_ytdlp_conf(conf_content).await;
}

#[tauri::command]
pub async fn update_app_conf(conf_content: String) {
    config::upgrade_app_conf(conf_content).await;
}
