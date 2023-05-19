ARG VARIANT="bookworm"
FROM buildpack-deps:${VARIANT}-curl

ARG DEBIAN_FRONTEND=noninteractive

ENV CARGO_HOME=/usr/local/cargo
ENV RUSTUP_HOME=/usr/local/rustup
ENV FNM_PATH=/usr/local/fnm

RUN apt update \
    && apt install -y --no-install-recommends \
        build-essential clang-13 \
        libwebkit2gtk-4.1-dev libssl-dev \
        libgtk-3-dev libayatana-appindicator3-dev \
        librsvg2-dev neovim \
    && apt autoremove -y \
    && apt clean -y \
    && rm -rf /var/lib/apt/lists/*

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && mkdir -p /etc/sudoers.d \
    && echo "$USERNAME ALL=\(root\) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

RUN mkdir -p $CARGO_HOME $RUSTUP_HOME $FNM_PATH \
    && chown -R $USERNAME:$USERNAME $CARGO_HOME $RUSTUP_HOME $FNM_PATH \
    && chmod -R +x $CARGO_HOME $RUSTUP_HOME $FNM_PATH

USER $USERNAME

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- \
    -y --default-toolchain beta --profile complete --no-modify-path

USER root