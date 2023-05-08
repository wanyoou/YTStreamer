# Debian(bullseye)
FROM mcr.microsoft.com/devcontainers/rust:latest

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN export DEBIAN_FRONTEND=noninteractive \
    && groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && apt update && apt upgrade -y \
    && apt install -y --no-install-recommends \
        curl \
        neovim \
        pkg-config \
        sudo \
        unzip \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && apt autoremove -y \
    && apt clean -y \
    && rm -rf /var/lib/apt/lists/*

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME

# Install fnm, nodejs, pnpm
RUN curl -fsSL https://fnm.vercel.app/install | bash \
    && fnm install --latest \
    && corepack enable \
    && corepack prepare pnpm@latest --activate