#!/bin/bash

username=$(whoami)

# Install fnm
curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir ${FNM_PATH} --skip-shell
echo -e '\neval "$(fnm env --use-on-cd --fnm-dir ${FNM_PATH} --log-level error)"' >> /home/${username}/.bashrc

# Install Nodejs via fnm
eval "$(fnm env --use-on-cd --fnm-dir ${FNM_PATH} --log-level error)" || exit 1
fnm install --latest || exit 1

# Install pnpm
corepack enable
corepack prepare pnpm@latest --activate