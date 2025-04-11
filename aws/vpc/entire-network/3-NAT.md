# create a NAT (Network Address Translation) to allow private EC2 to access internet

- create a Key Pair
  - name: DemoKeyPair

- create EC2 instance
  - name: PrivateEC2
  - attach key pair DemoKeyPair
  - attach DemoVPC
  - attach PrivateSubnetA
  - create security group
    - name: PrivateSG
    - Inbound:
      - type: ssh, TCP, port 22
      - source: Custom, PublicSG, description: allow ssh from BastionHost

#### test PrivateEc2 has connection to the internet ####
# use EC2 BastionHost to SSH connect to PrivateEC2
  - connect to BastionHost terminal: EC2 Instance Connect
    - ```nano DemoKeyPair.pem```
      - copy paste downloaded DemoKeyPair.pem
    - ```chmod 0400 DemoKeyPair.pem```
    - ```ssh ec2-user@<PrivateEC2_private_ip> - DemoKeyPair.pem```
    - ping google.com (should not work)
    - curl www.google.com (should not work)
#### test ####

- create new EC2
  - name: NAT
  - search AMI: "vpc-nat"
    - example: amzn-ami-vpc-nat-2018.03.0.20230322.0-x86_64-ebs
  - attach DemoVCP
  - attach PublicSubnetA
  - create security group:
    - name: NAT_SG
    - Inbound:
      - HTTP; Custom, 10.0.0.0/16
      - HTTPS; Custom, 10.0.0.0/16
      - All ICMP - IPv4; Custom, 10.0.0.0/16

- NAT EC2 action: check "Change Source / destination check" stop

- add rule to PrivateRouteTable
  - 0.0.0.0/0, Instance -> NAT

#### repeat test PrivateEc2 has connection to the internet ####
- (should work)
####
