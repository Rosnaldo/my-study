Docker Compose Develop Watch feature with the rebuild option to improve your development workflow. By configuring the watch option in your docker-compose.yaml file, you can:
- **Sync**: Automatically sync changes to your application code or static files into running containers without rebuilding the image.
- **Rebuild**: Automatically rebuild Docker images when specific configuration files change, ensuring that updates are applied and containers are recreated with the new image.


# Pull Docker Images and Start Containers with --watch option
docker compose up --watch 

# List Docker Containers
docker compose ps

# Access Application
http://localhost:8080

