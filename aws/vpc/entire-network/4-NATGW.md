# replace NAT with NATGW (NAT Gateway)

- stop NAT EC2 instance (PrivateRouteTable routes should have a blackhole)

- create NAT GateWay
  - name: DemoNATGW
  - attach PublicSubnetA
  - Allocate Elastic IP

- PrivateRouteTable edit
  - replace NAT route with DemoNATGW route
    - 0.0.0.0/0, NAT Gateway: DemoNATGW

#### repeat test PrivateEc2 has connection to the internet ####
- (should work)
####
