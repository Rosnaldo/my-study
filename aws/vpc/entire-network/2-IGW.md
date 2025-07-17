# create IGW (Internet Gateway) to allow public EC2 to access internet 
## used for public subnets
## allow both inbound and outbound traffic

- create a IGW
  - name tag: DemoIGW
- attach IGW to DemoVPC

- create 2 Route Tables
  - name: PublicRouteTable
    - attach to DemoVPC
  - name: PrivateRouteTable
    - attach to DemoVPC

- associate subnets to Route Tables
  - PublicRouteTable
    - PublicSubnetA
    - PublicSubnetB
  - PrivateRouteTable
    - PrivateSubnetA
    - PrivateSubnetB

- PublicRouteTable action add route
  - destination: 0.0.0.0/0, target: DemoIGW
  
#### repeat test connect to BastionHost terminal ####
(this time it will connect)
#### test ####
