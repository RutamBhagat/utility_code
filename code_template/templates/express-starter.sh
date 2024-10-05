#!/bin/bash
git clone "git@github.com:jatindotdev/express-drizzle-postgres-starter.git"
cd express-drizzle-postgres-starter
cp .env.example .env
rm -rf .git pnpm-lock.yaml CONTRIBUTING.md
bun install
code .