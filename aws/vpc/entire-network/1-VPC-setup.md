- create a VPC
  - tag name: DemoVPC
  - IPv4 CIDR block: 10.0.0.0/16

- input search bar "Filter by VPC": DemoVPC

- create 4 subnets
  - subnet name: PublicSubnetA
    - AZ: sa-east-1a
    - IPv4 subnet CIDR block: 10.0.0.0/24 (range: 10.0.0.0 - 10.0.225.225)
  - subnet name: PublicSubnetB
    - AZ: sa-east-1b
    - IPv4 subnet CIDR block: 10.0.1.0/24 (range: 10.0.1.0 - 10.0.1.225)
  - subnet name: PrivateSubnetA
    - AZ: sa-east-1a
    - IPv4 subnet CIDR block: 10.0.16.0/20 (range: 10.0.16.0 - 10.0.31.255)
  - subnet name: PrivateSubnetB
    - AZ: sa-east-1b
    - IPv4 subnet CIDR block: 10.0.32.0/20 (range: 10.0.32.0 - 10.0.47.255)  

- subnet actions:
  - PublicSubnetA: check "Enable auto-assign public IPv4 address"
  - PublicSubnetB: check "Enable auto-assign public IPv4 address"

- create a EC2 instance
  - name: BastionHost
  - VPC: DemoVPC
  - subnet: PublicSubnetA
  - Auto-assing public IP: Enable
  - create security group:
    - name: PublicSG
    - Inbound: ssh, protocol TCP, port 22

#### test connect to BastionHost terminal ####
- try to connect to BastionHost EC2
  - connnect on "EC2 Instance Connect" (it will fail)
#### test ####
