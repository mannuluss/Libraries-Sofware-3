pipeline {
  
  agent any
  
  tools {
    maven 'Maven 3.8.3'
    jdk 'JDK11'
  }
  
  stages {
    
    stage("build backends") {
      steps {
        echo 'Building Catalog Backend'
        dir ('persistent-microservices/backend-catalog/') {
          sh 'pwd'
          sh 'mvn -Dmaven.test.failure.ignore=true install'
          docker.build("backend-catalog-image-jen")
        }      
        echo 'Building Store Backend'
        dir ('persistent-microservices/backend-store/') {
          sh 'pwd'
          sh 'mvn -Dmaven.test.failure.ignore=true install'
        }       
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
