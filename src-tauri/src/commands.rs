use crate::yt_dlp;

#[tauri::command]
pub fn start_download(target_url: &str) {
    yt_dlp::download(target_url);
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
