#### volume binding folder html
docker run --name nginx --hostname ng1 -p 80:80 -v $(pwd)/html:/usr/share/nginx/html -d nginx

#### create file index.html
```html
<html><body><h1>Hello World!</h1></body></html>
```