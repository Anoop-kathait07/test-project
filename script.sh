!#/bin/bash

set -e

cd /home/anoop/dex

# Stop the existing container
docker stop nextapp1 || true

# Remove the existing container
docker rm nextapp1 || true

git pull 
docker build -t nextapp1 .
docker run -d -t -p 3000:3000 -v abc --name nextapp1 nextapp1
echo "[$(date)] Deployment script completed."

