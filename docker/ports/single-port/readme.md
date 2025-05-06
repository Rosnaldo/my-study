docker build -t <container>:v1 .

### Publishing Specific Host Port

```bash
# Run Docker Container with specific host port
docker run --name <name> -p 8090:80 -d <container>:v1

# Access the application in your browser
http://localhost:8090
```

### Publishing Ephemeral Ports

```bash
# Run Docker Container with ephemeral host port
docker run --name <name> -p 80 -d <container>:v1

docker ps
# Example Output:
# IMAGE                       NAMES            STATUS         CONTAINER ID   PORTS
# demo14-docker-singleport:v1   my-ports-demo2   Up 10 seconds   abcdef123456   0.0.0.0:XXXXX->80/tcp

# Access the application using browser
http://localhost:XXXXX
```
