Overview

This repository demonstrates Docker project automation using Jenkins for a Node.js application. It includes a Dockerfile for containerizing the Node.js application and a Jenkinsfile for automation through Jenkins CI/CD pipeline.

Project Structure
    • Dockerfile: Contains instructions for building the Docker image and running the Node.js application inside a container.
    • Jenkinsfile: Defines the Jenkins CI/CD pipeline for automating Docker image builds and deployments.
    • package.json and package-lock.json: Dependency configuration files for the Node.js application.
    • src/: Directory containing the source code of the Node.js application.
    • public/: Directory containing static assets used by the Node.js application.
    • README.md: Project documentation (you are currently reading this).

Dockerfile Explanation
   
    1. Base Image: Uses the official Node.js image version 18 as the base image.
    2. Working Directory: Sets the working directory inside the Docker container to /app.
    3. Dependencies Installation: Copies package.json and package-lock.json to the working directory and installs dependencies using npm install.
    4. Application Code: Copies the rest of the application code from the host machine to the working directory inside the container.
    5. Build: Builds the Node.js application using npm run build.
    6. Exposed Port: Exposes port 4000 to allow access to the running application.
    7. Command: Defines the command to start the Node.js application using npm start.
Jenkinsfile Explanation

The Jenkinsfile defines the stages of the CI/CD pipeline for automating Docker image builds and deployments using Jenkins. It includes the following stages:

    1. Checkout SCM: Checks out the source code from the Git repository.
    2. Build Docker Image: Builds the Docker image using the Dockerfile.
    3. Push Docker Image: Pushes the built Docker image to a Docker registry (e.g., Docker Hub).
    4. Deploy Docker Container: Deploys the Docker container by running it on a Docker host.
Building the Docker Image Manually

To build the Docker image for this Node.js application manually, run the following command in the terminal:

docker build -t node-app .

Replace node-app with the desired image name/tag.

Running the Docker Container Manually

After building the Docker image, you can run the Node.js application within a Docker container using the following command:

docker run -d -p 4000:4000 node-app

Replace node-app with the image name/tag you used during the build process.

Jenkins Automation

The Jenkins CI/CD pipeline automates the Docker image builds and deployments. Jenkins is configured to trigger the pipeline whenever changes are pushed to the Git repository, ensuring continuous integration and delivery of the Node.js application.
