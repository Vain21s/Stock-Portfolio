#use an official Maven image to build the Spring Boot App
FROM maven:3.8.4-openjdk-17 AS build

#set the working directory
WORKDIR /app

#Copy the pom.xml ans install dependencies
COPY pom.xml .
RUN mvn clean install

#Copy th Source code and build the dependenciesclea
COPY src ./src
RUN  mvn clean package -DskipTests

#use an official OPenJdk image to run the application
FROM openjdk:17-jdk-slim

#Set the working directory
WORKDIR /app

#copy the built JAR file from the build stage
COPY --from=build /app/target/portfolio-0.0.1-SNAPSHOT.jar app.jar

#Expose port 8080
EXPOSE 8080

#Specify the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]


