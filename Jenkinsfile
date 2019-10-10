pipeline {
    agent {

        docker {
            image 'donhenton/docker-headless-chrome'
            args  '-v /Users/${CERT_LOCATION}/ssl-installs/ssl-certs:/etc/ssl/certs'
        }

    }
    environment {
        NONSENSE=1
    }

    stages {
        stage('npm install') {
            steps {
                    sh 'npm set cafile /etc/ssl/certs/ca-bundle.pem'
                    sh 'npm install'
                }
            }
        stage('run tests') {
            steps {
                    sh 'gulp test-docker'
                }
            }
    }
    post {
        always {
            junit 'target/test_reports/junit/TESTS.xml'
        }
    }
}