# Allow browser connect

- run commands on EC2 terminal BastionHost
  - `sudo su`
  - `yum install httpd -y`
  - `systemctl enable httpd`
  - `systemctl start httpd`
  - `echo "Hello World" > /var/www/html/index.html`

- add inbound rule to PublicSG
  - HTTP, 0.0.0.0/0

#### test BastionHost browser connection ####
- copy past into browser url search <BastionHost_public_ip>
(should show Hello World)
- `curl <BastionHost_private_ip>:80/`
(should show Hello World)
#### test ####
