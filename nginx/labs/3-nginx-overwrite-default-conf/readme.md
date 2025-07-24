```bash
docker build -t nhttpd .
docker run --name s1 -d nhttpd
docker exec -it s1 bash

# inside container
## copy file nginx.config
vim /etc/nginx/nginx.conf

mkdir /my-nginx

echo "<html><body>Hello World!</body></html>" > /my-nginx/index.html

# copy elephant.png

service restart nginx

# test nginx response
curl localhost:8080
```

#### test on browser ####
```bash
localhost:8080
localhost:8080/elephant.png
```
####