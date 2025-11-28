# syntax=docker/dockerfile:1

# Build stage: packages the Spring Boot application using Maven
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copy Maven wrapper and project metadata first to leverage layer caching
COPY mvnw mvnw.cmd pom.xml ./
COPY .mvn .mvn

# Ensure the Maven wrapper is executable and pre-fetch dependencies
RUN chmod +x mvnw \
    && ./mvnw dependency:go-offline

# Copy application sources and build the runnable jar
COPY src src
RUN ./mvnw clean package -DskipTests

# Runtime stage: lightweight JRE image to run the application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the fat jar from the build stage
COPY --from=build /app/target/gamer-0.0.1-SNAPSHOT.jar app.jar

# Render injects PORT; expose the default for local use
EXPOSE 8080
ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
