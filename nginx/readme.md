
```bash
# reload nginx
nginx -s reload

# test nginx.conf file syntax
nginx -t -c <nginx.conf>

# update config file and reload
nginx -s reload -c <nginx.conf>
```

localhost:8080 -> /my-nginx  
localhost:8080/images -> /my-images  
localhost:8080/elephant.jpg X blocked  

```nginx.conf
http {
    server {
        listen 8080;
        root /my-nginx;

        # serving an entirely different directory than root
        location /images {
            root /my-images/;
        }
        
        # excluding any file having an extension/occurence of the letters jpg at the end
        location ~ .jpg$ {
            return 403;
        }
    }
}
```

simple load balancer. It will always distribute by order (1, 2, 3; 1, 2, 3...).  
`ip_hash` enables sticky session.  
[one-lb.conf](samples/one-lb.conf)

allbackend, allbackend1 and allbackend2 will work as 3 different parallel load balancers.  
[three-parallel-lbs.conf](samples/three-parallel-lbs.conf)

layer 4 proxy. It wont work on browser.  
It can be tested with `telnet localhost`  
[tcp-lbc.conf](samples/tcp-lb.conf)

```bash
brew install letsencrypt

# generate certificate. It genereates the path to public and private key
sudo certbot certonly --standalone
```

`ssl_certificate`: path_public_key  
`ssl_certificate_key`: path_private_key  
[ssl-certificate.conf](ssl-certificate.conf)
