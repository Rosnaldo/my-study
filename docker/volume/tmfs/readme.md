# Run a Docker container with a tmpfs mount at /app
docker run --name tmpfs-demo --mount type=tmpfs,destination=/app -d nginx:alpine-slim

# Store data in the host system's RAM.
# Data is ephemeral and does not persist after the container stops.
