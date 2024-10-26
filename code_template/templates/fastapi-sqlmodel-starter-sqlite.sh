#!/bin/bash

# Clone the repository and only the sqlite branch
git clone --branch sqlite git@github.com:RutamBhagat/fastapi-sql-model-starter.git
cd fastapi-sql-model-starter

rm -rf .git
cp .env.example .env

# Initialize PDM and install dependencies
pdm install

# Open in VS Code
code .
