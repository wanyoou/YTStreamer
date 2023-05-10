#!/bin/bash
username="vscode"
init_fnm_env="$(fnm env --use-on-cd)"

# Install Nodejs via fnm
echo "eval $init_fnm_env" >> /home/${username}/.bashrc
eval ${init_fnm_env}
fnm install --latest

# Install pnpm
corepack enable
corepack prepare pnpm@latest --activate