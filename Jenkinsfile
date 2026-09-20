pipeline {
    agent any

    environment {
        IMAGE = "amoha385/node-blue-green:latest"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE% .'
            }
        }

        stage('Login and Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    bat 'docker logout'
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                    bat 'docker push %IMAGE%'
                }
            }
        }

        stage('Deploy Green') {
            steps {
                bat '''
                    docker rm -f node-green 2>NUL || exit 0
                    docker pull %IMAGE%
                    docker run -d --name node-green -p 3006:3000 -e VERSION=GREEN %IMAGE%
                '''
            }
        }

        stage('Health Check Green') {
            steps {
                bat '''
                    timeout /t 5 /nobreak
                    curl http://localhost:3006/health
                '''
            }
        }
    }
}