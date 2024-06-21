pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GIT_REPO = 'https://github.com/Anoop-kathait07/test-project.git'
    
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git url: GIT_REPO, branch: 'main', credentialsId: 'git-pass'
            }
        }

        stage('Run Script') {
            steps {
                script {
                    // Ensure the script is executable
                    sh 'chmod +x script.sh'
                    // Run the script
                    sh './script.sh'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            mail to: 'kathaitanoop108@gmail.com',
                 subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                 body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}

