#!/bin/bash

set -e

# Navigate to the project directory
cd /home/anoop/dex

# Configure Git to treat this directory as safe
git config --global --add safe.directory /home/anoop/dex

# Stop the existing container if it is running
if [ "$(docker ps -q -f name=nextapp1)" ]; then
    echo "Stopping running container nextapp1..."
    docker stop nextapp1
fi

# Pull the latest code from the Git repository
git pull origin main

# Build the Docker image
docker build -t nextapp1 .

# Run a new container with the same name
docker run -d -t -p 3000:3000 -v abc --name nextapp1 nextapp1

echo "[$(date)] Deployment script completed."


