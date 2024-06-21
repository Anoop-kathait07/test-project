#!/bin/bash

set -e

cd /home/anoop/dex

# Check if the container is running and stop it if it is
if [ "$(docker ps -q -f name=nextapp1)" ]; then
    echo "Stopping running container nextapp1..."
    docker stop nextapp1
else
    echo "No running container named nextapp1 to stop."
fi

# Set the upstream branch if not already set
git branch --set-upstream-to=origin/main main || true

# Pull the latest changes from the git repository
git pull origin main

# Build the Docker image
docker build -t nextapp1 .

# Start the stopped container if it exists, otherwise run a new container
if [ "$(docker ps -aq -f name=nextapp1)" ]; then
    echo "Removing existing container nextapp1..."
    docker rm  nextapp1
else
    echo "Running new container nextapp1..."
    docker run -d -t -p 3000:3000 -v abc --name nextapp1 nextapp1
fi

echo "[$(date)] Deployment script completed."

