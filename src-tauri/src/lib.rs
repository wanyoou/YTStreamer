mod commands;
mod yt_dlp;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::start_download,
            commands::emit_progress
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
