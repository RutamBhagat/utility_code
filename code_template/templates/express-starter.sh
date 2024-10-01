#!/bin/bash
git clone "git@github.com:jatindotdev/express-drizzle-postgres-starter.git"
cd express-drizzle-postgres-starter
rm -rf .git
bun install
code .