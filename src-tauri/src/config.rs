use serde_json::{Map, Value};
use std::{
    fs::{self, OpenOptions},
    io::{BufRead, BufReader, BufWriter, Read, Write},
    path::Path,
};

const YT_DLP_CONF: &str = "data/yt-dlp.conf";
const YT_DLP_CONF_NEW: &str = "data/yt-dlp.conf.new";

fn remove_quotes(s: &str) -> String {
    if s.starts_with('"') && s.ends_with('"') {
        let inner_length = s.len() - 2;
        if inner_length > 0 {
            return s[1..inner_length + 1].to_string();
        }
    }
    s.to_string()
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
        let new_line = format!("{opt} {}", remove_quotes(value.as_str().unwrap()));
        writeln!(writer, "{new_line}").unwrap();
    }
}

fn string_to_json(content: String) -> Map<String, Value> {
    let opt_value: Vec<&str> = content
        .split("\n")
        .filter(|line| line.starts_with("--"))
        .collect();

    let mut map_content = Map::new();
    for opt in opt_value {
        let opt = opt.trim();
        let (key, value) = match opt.split_once(" ") {
            Some((key, value)) => (
                key.trim_start_matches("--"),
                Value::String(value.to_string()),
            ),
            None => (opt.trim_start_matches("--"), Value::Bool(true)),
        };
        map_content.insert(key.to_string(), value);
    }
    map_content
}

pub async fn emit_ytdlp_conf() -> Map<String, Value> {
    if !Path::new(YT_DLP_CONF).exists() {
        return Map::new();
    }

    let yt_dlp_conf = OpenOptions::new().read(true).open(YT_DLP_CONF).unwrap();
    let mut content = String::new();
    BufReader::new(yt_dlp_conf)
        .read_to_string(&mut content)
        .unwrap();

    string_to_json(content)
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
        let line = line.trim();

        if !line.starts_with("--") {
            if line.is_empty() {
                writeln!(writer).unwrap();
            } else {
                writeln!(writer, "{line}").unwrap();
            }
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
