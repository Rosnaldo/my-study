#### Network Usage for web-nginx (Nginx Reverse Proxy)
- Attached to the frontend network.
- It forwards incoming traffic from the host's port 8080 to the app-ums service. Since both web-nginx and app-ums are on the same frontend network, web-nginx can reach app-ums via its container name.
- No access to db-mysql: Since web-nginx is not connected to the backend network, it cannot directly communicate with the database service, ensuring the database remains isolated.

``` bash
docker compose up -d 

# Connect to web-nginx container
docker exec -it ums-nginx /bin/sh

# Debian/Ubuntu-based images: Install iputils
apt-get update
apt-get install -y iputils-ping dnsutils

# use ping or dig or nslookup
# Ping Services
ping web-nginx
ping app-ums
ping db-mysql
# Observation:
# 1. web-nginx and app-ums will work.
# 2. db-mysql will fail as there is NO ACCESS TO backend network.
```


## Conclusion

### 1. **Isolated and Secure Networks**
- **Isolation of Database**: `db-mysql` is attached only to the `backend` network, isolating it from the external-facing `web-nginx` service for improved security.
- **No Host Networking**: Services communicate internally via Docker networks, reducing exposure of services to the outside world.

### 2. **Service Discovery Using DNS**
- Each service in a Docker network can be accessed by its service name. Docker networks provide a built-in DNS service, making it easy to manage and scale multi-container applications.
