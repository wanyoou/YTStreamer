use serde_json::{Map, Value};
use std::{
    fs::{self, OpenOptions},
    io::{BufRead, BufReader, BufWriter, Write},
};

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

    let yt_dlp_conf = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open("data/yt-dlp.conf")
        .unwrap();
    let yt_dlp_new_conf = OpenOptions::new()
        .write(true)
        .create(true)
        .open("data/yt-dlp.new.conf")
        .unwrap();

    let mut lines = BufReader::new(yt_dlp_conf).lines();
    let mut writer = BufWriter::new(yt_dlp_new_conf);

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
    fs::rename("data/yt-dlp.new.conf", "data/yt-dlp.conf").unwrap();
}

pub async fn upgrade_app_conf(conf_content: String) {}
