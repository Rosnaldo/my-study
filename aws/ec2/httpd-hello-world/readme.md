ec2 public ip on browser url to see html "Hello World"

- create a new instance ec2
  - security group inbound (ssh port: 22, allow all entrance)
  - security group inbound (http port: 80, allow all entrance)
  - security group inbound (https port: 443, allow all entrance)
  - run script:

```
#!/bin/bash
sudo su
yum update -y
yum install httpd -y
echo "<html><h1>Hello World</h1></html>" > /var/www/html/index.html
systemctl start httpd
sytemctl enable httpd
```

###### test ######
- access on browser <ec2-public-ip>
