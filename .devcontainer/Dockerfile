ARG VARIANT="bullseye"
FROM buildpack-deps:${VARIANT}-curl

ARG DEBIAN_FRONTEND=noninteractive
ARG FNMPATH=/usr/local/fnm
ENV CARGO_HOME=/usr/local/cargo
ENV RUSTUP_HOME=/usr/local/rustup

RUN apt update \
    && apt install -y --no-install-recommends \
        unzip build-essential clang-13 \
        libwebkit2gtk-4.0-dev libssl-dev \
        libgtk-3-dev libayatana-appindicator3-dev \
        librsvg2-dev \
    && apt autoremove -y \
    && apt clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- \
    -y --default-toolchain beta --profile complete --no-modify-path

SHELL ["/bin/bash", "-c"]
# Install fnm
RUN curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir $FNMPATH --skip-shell

ENTRYPOINT ["/bin/bash"]
# CMD ["sleep", "infinity"]