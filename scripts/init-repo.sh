#!/usr/bin/env bash
set -euo pipefail

cp .env.example .env

chmod +x ./bin/cli

corepack pnpm run e2e:login:save