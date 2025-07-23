<img src="image.png" width="50%">

• two node containers and nginx inside the network (backendnet).  
• the `nginx.conf` file is volume binded.  
• nginx on port 80 redirects to the two node containers.  

```bash
docker build . -t nodeapp

docker run -p 8080:8080 --hostname nodeapp1 --name nodeapp1 -d nodeapp
docker run -p 8081:8080 --hostname nodeapp2 --name nodeapp2 -d nodeapp
docker run --name nginx --hostname ng1 -p 80:8080 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf -d nginx

docker network create backendnet
docker network connect backendnet nodeapp1
docker network connect backendnet nodeapp2
docker network connect backendnet nginx
```

#### test ####
```bash
# should keep switch between the two containers response
curl localhost:80
```