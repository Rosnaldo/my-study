docker run -it -w /app -v "$(pwd)/app.js":/app/app.js node:17-alpine3.14 sh

docker build -e PORT=3000 --build-arg VERSION=1.1.0 -t <container>:<version> .


#### test port
docker run -e PORT=3000 <container>
curl <container_ip>:3000

# docker allocate random port
docker run -e PORT=3000 -P <container>
docker ps
# PORTS
# 0.0.0.0:<new_port>->3000/tcp

curl -I 0.0.0.0:<new_port>
####


# enter bash
docker build -e PORT=3000 -it <container>:<version> sh
# just run container
docker build -e PORT=3000 -d <container>:<version>
