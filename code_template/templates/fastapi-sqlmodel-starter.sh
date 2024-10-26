#!/bin/bash

# Clone the repository
git clone git@github.com:RutamBhagat/fastapi-sql-model-starter.git
cd fastapi-sql-model-starter

rm -rf .git
cp .env.example .env

# Initialize PDM and install dependencies
pdm install
# docker-compose up -d db
# pdm run alembic upgrade head 
# Open in VS Code
code .