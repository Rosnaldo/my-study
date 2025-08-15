## Docker communication between networks
<img src="docker/labs/network/1-communication-between-networks/image.png" width="50%">

The containers can only communicate when their are in the same network.  

[see readme.md](docker/labs/network/1-communication-between-networks/readme.md)

<br />

## Nginx redirects to nodes
<img src="nginx/labs/2-nginx-redirect-to-nodes/image.png" width="50%">

• two node containers and nginx inside the network (backendnet).  
• the `nginx.conf` file is volume binded.  
• nginx on port 80 redirects to the two node containers. 

[see readme.md](nginx/labs/2-nginx-redirect-to-nodes/readme.md)
