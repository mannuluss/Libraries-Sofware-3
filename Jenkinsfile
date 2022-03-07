pipeline {
  
  agent any
  
  tools {
    maven 'Maven 3.8.3'
    jdk 'JDK11'
  }

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }
  
  stages {
    stage('Login Dockerhub') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage("build backends") {
      steps {
        echo 'Building Catalog Backend'
        dir ('persistent-microservices/backend-catalog/') {
          sh 'pwd'
          sh 'mvn -Dmaven.test.failure.ignore=true install'
          sh 'docker build -t backend-catalog-image .'
          sh 'docker tag backend-catalog-image chaphe/backend-catalog-image:1.0'
          /*
          script {
            def customImage = docker.build("chaphe/backend-catalog-image:1.0")
            
          }
          */
        }      
        echo 'Building Store Backend'
        dir ('persistent-microservices/backend-store/') {
          sh 'pwd'
          sh 'mvn -Dmaven.test.failure.ignore=true install'
        }       
      }
    }

    stage('Push Docker Images') {
      steps {
        sh 'docker push chaphe/backend-catalog-image:1.0'
      }
    }
    
    stage("test") {
      steps {
        echo 'This is the test phase'
        echo 'The test phase has been done rigth!'
      }
    }
    
    stage("deploy") {
      steps {
        echo 'This is the deploy phase'
        echo 'The deploy phase has been done rigth!'
      }
    }
  }
}
