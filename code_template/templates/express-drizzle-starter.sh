#!/bin/bash
git clone "git@github.com:jatindotdev/express-drizzle-postgres-starter.git"
cd express-drizzle-postgres-starter
cp .env.example .env
rm -rf .git CONTRIBUTING.md pnpm-lock.json LICENSE README.md
bun install
echo "# temporary project" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
code .