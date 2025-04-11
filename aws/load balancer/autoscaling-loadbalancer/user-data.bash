#!/bin/bash
# Enable the epel-release
sudo amazon-linux-extras install epel
# Install and start Apache web server
sudo yum install -y httpd php
# Start the httpd service
service httpd start
# Install CPU stress test tool
sudo yum install -y stress
