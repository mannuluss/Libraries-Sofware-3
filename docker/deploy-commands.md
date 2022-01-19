# Despliegue de la aplicación


## creacion de la red para catalogo
docker network create library-network

## Despliegue de los Frontends

### despliegue del frontend de catalogo
docker run --name fronted-catalog --network=library-network -d -p 81:80 frontend-catalog-image

### despliegue del frontend de reviews
docker run --name fronted-reviews --network=library-network  -d -p 82:80 frontend-reviews-image

### despliegue del frontend de reviews
docker run --network=library-network --name fronted-store-container -d -p 80:80 frontend-store-image


## Despliegue de los Backends sin persistencia

## despliegue del contenedor backend de reviews
docker run --name backend-reviews --network=library-network -d -p 3000:3000 backend-reviews-image:simple

## despliegue del contenedor backend de catalogo sin persistencia
docker run --name backend-catalog --network=library-network -d -p 8081:8081 backend-catalog-image:simple



## Despliegue de los Backends con persistencia



### despliegue del backend de catalogo con persistencia

docker run --name mysql-library --network=library-network -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:latest

Después de desplegar el contenedor mysql es necesario correr los scripts MYSQL-catalog-library.sql y MYSQL-store.sql para crear y poblar la base de datos. Para esto se recomienda usar un cliente como HeidiSQL 

docker run --name backend-catalog --network=library-network -d -p 8081:8081 backend-catalog-image

### despliegue del backend de reviews con persistencia

docker run --name=mongodb-reviews --network=library-network -d -p 27017:27017 mongo:latest

Después de desplegar el contenedor mysql es necesario correr node Initialmongodb para crear y poblar la base de datos de mongo

docker run --name backend-reviews --network=library-network -d -p 3000:3000 backend-reviews-image