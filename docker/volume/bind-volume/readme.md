docker run -it -name <name> -w /app --mount type=bind,source=$(pwd)/target,target=/app alpine sh
# source is the path to the local volume
# target is the path to the container volume
# -w workdir

docker exec -it <name> /bin/sh
cd /app
# inside the container volume


docker run -it -w /app -v /tmp/target:/app alpine sh
# another syntaxe for the same thing
# bind can be mounted in any choosen path
