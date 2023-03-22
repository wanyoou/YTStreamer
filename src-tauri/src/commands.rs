use crate::proc;
use tauri::Window;

#[derive(Clone, serde::Serialize)]
struct Payload {
    progress_msg: String,
}

#[tauri::command]
pub fn start_download(target_url: &str) {
    proc::invoke_yt_dlp(target_url);
}

#[tauri::command]
pub fn emit_progress(window: Window) {
    window
        .emit(
            "download_progress",
            Payload {
                progress_msg: "Tauri is awesome!".into(),
            },
        )
        .unwrap();
}
