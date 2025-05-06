### Publishing All Ports with `-P` Flag
- The `-P` flag publishes all exposed ports to random host ports.
- Replace `XXXXX`, `YYYYY`, and `ZZZZZ` with the actual port numbers displayed in `docker ps`.


```bash
docker build -t <container>:v1 .

docker run --name <name> -P -d <container>:v1

# List Docker Containers
docker ps
# Access applications using browser
http://localhost:XXXXX   # App3 on port 80
http://localhost:YYYYY   # App1 on port 8080
http://localhost:ZZZZZ   # App2 on port 8081
```