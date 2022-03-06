# jenkins

para crear el contenedor con una imagen jenkins y que esta pueda ejecutar comandos de docker dentro de un pipeline, hay que crearlo de la siguiente manera
```console
docker run -d --group-add 0 --name jenkins-docker-pruebas -p 20000:8080 -p 50000:50000 -v //var/run/docker.sock:/var/run/docker.sock jenkinswithdocker
```
con ```--group-add 0``` le decimos que se ejecute como usuario root.

con ```-v //var/run/docker.sock:/var/run/docker.sock``` le decimos que pueda usar los comandos de docker mediante la instruccion sh en un pipeline de jenkins.

EJM:
```
pipeline{
    ...
    sh 'docker version'
    sh 'docker ps'
    ...
}
```
NOTA: no es necesario instalar ningun complemento adicional a los recomendados por jenkins al comienzo de la instalacion.

fuente: https://juanmanuellopezduran.wordpress.com/2020/09/21/integrando-docker-en-una-imagen-de-jenkins/