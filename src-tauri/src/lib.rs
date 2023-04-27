mod commands;
mod config;
mod yt_dlp;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::start_download,
            commands::update_ytdlp_conf,
            commands::update_app_conf,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
