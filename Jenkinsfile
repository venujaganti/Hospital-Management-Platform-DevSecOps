pipeline {

    agent any

    environment {

        BACKEND_IMAGE =
            "hospital-backend:${BUILD_NUMBER}"

        FRONTEND_IMAGE =
            "hospital-frontend:${BUILD_NUMBER}"
    }


    stages {


        stage("Checkout") {

            steps {

                checkout scm
            }
        }


        stage("Install Dependencies") {

            parallel {

                stage("Backend") {

                    steps {

                        dir("backend") {

                            sh "npm ci"
                        }
                    }
                }


                stage("Frontend") {

                    steps {

                        dir("frontend") {

                            sh "npm ci"
                        }
                    }
                }

            }
        }


        stage("Test and Build") {

            parallel {

                stage("Backend Test") {

                    steps {

                        dir("backend") {

                            sh "npm test"
                        }
                    }
                }


                stage("Frontend Build") {

                    steps {

                        dir("frontend") {

                            sh "npm run build"
                        }
                    }
                }

            }
        }


        stage("Trivy Filesystem Scan") {

            steps {

                sh """
                trivy fs \
                  --severity HIGH,CRITICAL \
                  --ignore-unfixed \
                  --exit-code 1 \
                  .
                """
            }
        }


        stage("Build Docker Images") {

            steps {

                sh """
                docker build \
                  -t ${BACKEND_IMAGE} \
                  ./backend

                docker build \
                  -t ${FRONTEND_IMAGE} \
                  ./frontend
                """
            }
        }


        stage("Trivy Backend Image") {

            steps {

                sh """
                trivy image \
                  --severity HIGH,CRITICAL \
                  --ignore-unfixed \
                  --exit-code 1 \
                  ${BACKEND_IMAGE}
                """
            }
        }


        stage("Trivy Frontend Image") {

            steps {

                sh """
                trivy image \
                  --severity HIGH,CRITICAL \
                  --ignore-unfixed \
                  --exit-code 1 \
                  ${FRONTEND_IMAGE}
                """
            }
        }


        stage("DevSecOps Quality Gate") {

            steps {

                echo """
                ======================================
                DEVSECOPS QUALITY GATE PASSED
                ======================================
                Tests       : PASSED
                Trivy FS    : PASSED
                Trivy Images: PASSED
                Docker      : PASSED
                ======================================
                """
            }
        }

    }


    post {

        success {

            echo "Pipeline completed successfully."
        }


        failure {

            echo "Pipeline failed. Deployment is blocked."
        }


        always {

            sh """
            docker image prune -f || true
            """
        }

    }

}