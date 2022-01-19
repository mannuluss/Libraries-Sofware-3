# Libraries Sofware 3

## Descripción

Este proyecto contiene 4 servicios
- backend-library-catalog : Backend Catalogo de libros (Springboot)
- backend-reviews : Backend Reviews de lectores (Node + Express)
- frontend-catalog-library : Frontend Catalogo de libros (React)
- frontend-reviews : Frontend Reviews de lectores (Angular)

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


# Despliegue de la aplicación



## creacion de la red para catalogo
`docker network create library-network`

## despliegue del contenedor backend de catalogo sin persistencia
`docker run --name backend-catalog --network=library-network -d -p 8081:8081 backend-catalog-image:simple`

## despliegue del contenedor frontend de catalogo
`docker run --name fronted-catalog --network=library-network -d -p 81:80 frontend-catalog-image`

## despliegue del contenedor backend de reviews
`docker run --name backend-reviews --network=library-network -d -p 3000:3000 backend-reviews-image:simple`

## despliegue del contenedor frontend de reviews
`docker run --name fronted-reviews --network=library-network  -d -p 82:80 frontend-reviews-image`
