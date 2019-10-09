pipeline {
    agent {
        label '!windows'
    }

    environment {
        DISABLE_AUTH = 'true'
        DB_ENGINE    = 'sqlite'
        GIT_SSL_NO_VERIFY=1
    }

    stages {
        stage('Build') {
            steps {
                echo "Database engine is ${DB_ENGINE}"
                echo "DISABLE_AUTH is ${DISABLE_AUTH}"
                echo "SSL VERIFY is ${GIT_SSL_NO_VERIFY}"
                sh 'printenv'
            }
        }
    }
}