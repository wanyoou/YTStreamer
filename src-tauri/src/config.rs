use serde_json::{Map, Value};
use std::{
    fs::{self, OpenOptions},
    io::{BufRead, BufReader, BufWriter, Read, Write},
    path::Path,
};
use tauri::Window;

const YT_DLP_CONF: &str = "data/yt-dlp.conf";
const YT_DLP_CONF_NEW: &str = "data/yt-dlp.conf.new";

#[derive(Clone, serde::Serialize)]
struct YtDlpConfEvent {
    yt_dlp_conf_content: String,
}

fn parse_to_json_string(content: String) -> String {
    let opt_value: Vec<&str> = content
        .split("\n")
        .filter(|line| line.starts_with("--"))
        .collect();
    let mut map = Map::new();
    for opt in opt_value {
        let opt: Vec<&str> = opt.splitn(2, " ").collect();
        let key = opt[0].trim_start_matches("--");
        let value = opt[1];
        map.insert(key.to_string(), Value::String(value.to_string()));
    }
    serde_json::to_string(&map).unwrap()
}

pub async fn emit_ytdlp_conf(window: Window) {
    if !Path::new(YT_DLP_CONF).exists() {
        window
            .emit(
                "get_yt_dlp_conf",
                YtDlpConfEvent {
                    yt_dlp_conf_content: String::from("{}"),
                },
            )
            .unwrap();
        return;
    }

    let yt_dlp_conf = OpenOptions::new().read(true).open(YT_DLP_CONF).unwrap();
    let mut content = String::new();
    BufReader::new(yt_dlp_conf)
        .read_to_string(&mut content)
        .unwrap();

    window
        .emit(
            "get_yt_dlp_conf",
            YtDlpConfEvent {
                yt_dlp_conf_content: parse_to_json_string(content),
            },
        )
        .unwrap();
}

fn write_contents(writer: &mut impl Write, mut opt: String, value: Value) {
    if !opt.starts_with("--") {
        opt = format!("--{opt}");
    }
    if value.is_boolean() {
        if value.as_bool().unwrap() {
            writeln!(writer, "{opt}").unwrap();
        }
    } else {
        let new_line = format!("{opt} {}", value.as_str().unwrap().trim_matches('"'));
        writeln!(writer, "{new_line}").unwrap();
    }
}

pub async fn upgrade_ytdlp_conf(conf_content: String) {
    let mut config: Map<String, Value> = serde_json::from_str(conf_content.as_str()).unwrap();

    let conf_dir = Path::new(YT_DLP_CONF).parent().unwrap();
    if !conf_dir.exists() {
        fs::create_dir_all(conf_dir).unwrap();
    }

    let yt_dlp_conf = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(YT_DLP_CONF)
        .unwrap();
    let yt_dlp_conf_new = OpenOptions::new()
        .write(true)
        .create(true)
        .open(YT_DLP_CONF_NEW)
        .unwrap();

    let mut lines = BufReader::new(yt_dlp_conf).lines();
    let mut writer = BufWriter::new(yt_dlp_conf_new);

    while let Some(line) = lines.next() {
        let line = line.unwrap();
        if line.is_empty() {
            writeln!(writer).unwrap();
            continue;
        }

        let line = line.trim();
        if line.starts_with("#") {
            writeln!(writer, "{line}").unwrap();
            continue;
        }

        let variable = match line.split_once(" ") {
            Some((var, _)) => var,
            None => line,
        };

        let new_value = config.remove(variable.trim_start_matches("--"));
        if new_value.is_some() {
            write_contents(&mut writer, variable.to_string(), new_value.unwrap());
        } else {
            writeln!(writer, "{line}").unwrap();
        }
    }

    for (opt, value) in config {
        write_contents(&mut writer, opt, value);
    }

    // close files
    drop(lines);
    drop(writer);
    fs::rename(YT_DLP_CONF_NEW, YT_DLP_CONF).unwrap();
}

pub async fn upgrade_app_conf(conf_content: String) {}
