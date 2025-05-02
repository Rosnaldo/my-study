docker network create --attachable --drive bridge --subnet 10.53.0.0/24 --gateway 10.53.0.1/24 --ip-range 10.53.0.0/28 --internal internal-demo

docker run --network internal-demo -d nginx // pick container id

#### test container internet access
docker exec -it <container_id> sh

apt update // should not update
####

#### connect to another container from the same network
# another cli
docker run --network internal-demo -it alphane sh
nc -v <container_id> 80
####

