-> create VPC
  - CIDR block: 10.0.0.0/16. You should specify a CIDR block from the private (non-publicly routable)

-> create subnet
  - attrbiute VPC
  - CIDR block: 10.0.0.0/24. You should specify a CIDR block in the selected VPC.

-> create internet gateway
  - attribute VPC

-> create route table
  - select VPC and create a route table
  - add route
    - Destination: Enter 0.0.0.0/0 as the CIDR block
    - Target: Click Internet Gateway and then select your previously-created internet gateway

-> create an instance EC2
  - attribute VPC
  - attribute subnet
  - enable (Auto-assign public IP)
  - inbound security group
    - Type: ssh, protocol: TCP, port: 22
    - Source Type: anywhere, source: 0.0.0.0/0
  - outbound security group
    - Type: anywhere, protocol: all, port range: all
    - Source Type: anywhere, source: 0.0.0.0/0

-> create Elastic IPs
  - create
  - associate to instance EC2

# run
ping <Elastic_IP_Address>
