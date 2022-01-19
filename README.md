# Libraries Sofware 3

## Descripción

Este proyecto busca proveer un ambiente de aprendizaje para la utilización de docker como herramienta de despliegue de aplicaciones. El proyecto trata de una libreria virtual y está dividido en 3 fases:

###Fase 1:
Consta de 2 microservicios y 2 frontends 

- backend-library-catalog : Backend Catalogo de libros (Springboot)
- backend-reviews : Backend Reviews de lectores (Node + Express)
- frontend-catalog-library : Frontend Catalogo de libros (React)
- frontend-reviews : Frontend Reviews de lectores (Angular)

En esta fase los microservicios no tienen persistencia, los datos son almacenados en memoria

###Fase 2:
Esta fase es similar a la anterior con la diferencia que los microservicios tiene persistencia
- backend-library-catalog : Backend Catalogo de libros (Springboot + MySQL)
- backend-reviews : Backend Reviews de lectores (Node + Express + MongoDB)
- frontend-catalog-library : Frontend Catalogo de libros (React)
- frontend-reviews : Frontend Reviews de lectores (Angular)

###Fase 3:
En esta fase se agrega a los miroservicios de la fase 2 un microservicio store y su respectivo frontend
- backend-library-catalog : Backend Catalogo de libros (Springboot + MySQL)
- backend-reviews : Backend Reviews de lectores (Node + Express + MongoDB)
- frontend-catalog-library : Frontend Catalogo de libros (React)
- frontend-reviews : Frontend Reviews de lectores (Angular)
- backend-store : Backend de la tienda de libros (Springboot + MySQL)
- frontend-store : Frontend Reviews de lectores (Angular)


## Instrucciones de instalacion

ejecutar el siguiente comando en una terminal
```
npm install 
```
en cada una de las siguientes carpetas:  
>frontend-catalog-library 

>frontend-reviews 

>backend-reviews

y dejar que el proceso termine

# Iniciar servidores
## backend-reviews 
ejecutar el comando
```
npm run start
```
dentro de la carpeta, para iniciar en el puerto 3000 los servicios de las reseñas.

## backend-library-catalog
ejecutar como un proyecto spring boot. (mvn spring-boot:run)

aqui se encuentra los servicios para la pagina de libros.

## backend-store
ejecutar como un proyecto spring boot. (mvn spring-boot:run).

aqui se encuentra los servicios para la tienda de libros.

# Build Frontend
## frontend-catalog-library
dentro de esta carpeta en una terminal ejecutar 
```
npm run build
```
esto compila el proyecto y lo guarda en ./dist

NOTA: dentro de .env se encuentra BUILD_PATH que le dice a react en que directorio guadarlo.

## frontend-reviews
dentro de esta carpeta en una terminal ejecutar
```
npm run build
```
tambien funciona 
```
ng build
```
NOTA: dentro de angular.json 
```
"build": {
          ...
          "options": {
              ...
            "outputPath": "./dist"
              ...
          }
```
outputPath indica el directorio donde se guardara los archivos compilados.

