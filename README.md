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
dentro de la carpeta, para iniciar en el puerto 3000 la pagina de las reseñas y sus servicios

NOTA: abrir en el navegador http://localhost:3000

## backend-library-catalog
ejecutar como un proyecto spring boot. (mvn spring-boot:run)

aqui se encuentra la pagina de los libros y sus servicios crud.

NOTA: abrir en el navegador http://localhost:8081/index.html

# Build Frontend
## frontend-catalog-library
dentro de esta carpeta en una terminal ejecutar 
```
npm run build
```
esto compila el proyecto y lo guarda en /libraries-spring-boot/src/main/resources/public

NOTA: dentro de .env se encuentra BUILD_PATH que le dice a react que lo guarda en ese directorio

## frontend-reviews
dentro de esta carpeta en una terminal ejecutar
```
npm run build
```

NOTA: dentro de angular.json 
```
"build": {
          ...
          "options": {
              ...
            "outputPath": "../reviews-nodejs/public"
              ...
          }
```
outputPath indica el directorio donde se guardara los archivos compilados.
