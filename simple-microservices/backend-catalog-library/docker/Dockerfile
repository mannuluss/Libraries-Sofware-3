#FROM openjdk:8-alpine
FROM openjdk:11
ADD target/backend-catalog-library-0.0.1-SNAPSHOT.jar /usr/share/app.jar
CMD ["java", "-jar", "/usr/share/app.jar"]
EXPOSE 8081