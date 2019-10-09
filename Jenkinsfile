pipeline {
    agent {

        docker {
            image 'hochzehn/karma-jasmine-phantomjs'
        }
    }

    environment {
        NONSENSE=0
    }

    stages {
        stage('Build') {
            steps {
               sh 'npm set cafile /etc/ssl/certs/ca-bundle.pem'
               sh 'npm install'
            }
        }
        stage('run tests') {
            steps {
                    sh 'gulp test'
                }
        }
    }
}
