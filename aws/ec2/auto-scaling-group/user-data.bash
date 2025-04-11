#!/bin/bash
#Update packages
yum update -y
#Install Git and Apache
yum install -y git httpd
#Configure Apache to run by default on startup
chkconfig --levels 235 httpd on
#Cleaning the Welcome page config file (Disable Apache default welcome page on root)
echo "# Nothing in here" > /etc/httpd/conf.d/welcome.conf
#Clone the lab-util repo on the machine
git clone https://github.com/cloudacademy/lab-utils.git
#Enter in the lab-utils folder
cd lab-utils/
#Get the Instance ID from metadata
INSTANCEID=$(curl http://169.254.169.254/2016-06-30/meta-data/instance-id)
#Get public DNS from metadata
PUBLICIP=$(curl http://169.254.169.254/2016-06-30/meta-data/public-ipv4)
#Replace the Instance ID in the Html file
sed -i "s/instanceID/$INSTANCEID/g" html/legacy.html
#Replace the public DNS in the Html file
sed -i "s/publicIP/$PUBLICIP/g" html/legacy.html
#Copy the html file to the public html folder at the root level
cp -f html/legacy.html /var/www/html/index.html
#Restart apache
service httpd restart


# Using the Yum package manager, the script updates currently installed packages and then installs Git, and the Apache webserver
# Clones a CloudAcademy git repository containing a sample legacy web application and changes to its directory
# Retrieves the instance id and public IP using the EC2 metadata service, you read more about instance metadata here
# Updates the sample web application's configuration with the metadata
# Updates the Apache webserver configuration and restarts the Apache httpd service

# link to instace metadata: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html