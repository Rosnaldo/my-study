docker volume create nginx-html
# /var/lib/docker/volumes/nginx-html/_data

docker run -d --mount type=volume,source=nginx-html,target=/usr/share/nginx/html nginx

# or, both commands do the same thing (one with --mount other with -v)

docker run -d -v nginx-html:/usr/share/nginx/html nginx
# because nginx-html does not have "/" docker knows it is a volume ref

docker exec -it <container> sh
cd /usr/share/nginx/html
