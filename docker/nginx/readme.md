# Build Docker Image 
docker build -t [IMAGE-NAME]:[IMAGE-TAG] .

# Example:
docker build -t demo8-dockerfile-expose-run:v1 .

# Inspect Labels
docker image inspect demo8-dockerfile-expose-run:v1

# Run Docker Container and Map Ports
docker run --name my-expose-run-demo -p 8080:80 -p 8081:8081 -p 8082:8082 -d demo8-dockerfile-expose-run:v1

# Access Application in Browser
http://localhost:8080
http://localhost:8081
http://localhost:8082

# List Configuration Files from Docker Container
docker exec -it my-expose-run-demo ls /etc/nginx/conf.d

# List HTML Files from Docker Container
docker exec -it my-expose-run-demo ls /usr/share/nginx/html

# Connect to Container Shell
docker exec -it my-expose-run-demo /bin/sh

# Commands to Run inside the Container
curl http://localhost
curl http://localhost:8081
curl http://localhost:8082
