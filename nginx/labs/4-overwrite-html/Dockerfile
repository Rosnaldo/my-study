# Use nginx:alpine-slim as base Docker Image
FROM nginx:alpine-slim

# Copy all Nginx configuration files from nginx-conf directory
COPY nginx-conf/*.conf /etc/nginx/conf.d/

# Copy all HTML files from nginx-html directory
COPY nginx-html/*.html /usr/share/nginx/html/

# Install curl using RUN
RUN apk --no-cache add curl

# Expose the ports 8081, 8082, 8083 (default port 80 already exposed from base nginx image)
EXPOSE 8081 8082 8083
