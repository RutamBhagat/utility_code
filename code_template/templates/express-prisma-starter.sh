#!/bin/bash
bunx try-prisma@latest --template typescript/testing-express
cd typescript_testing-express
cp .env.example .env
bun install
bunx prisma migrate dev --name init
code .
