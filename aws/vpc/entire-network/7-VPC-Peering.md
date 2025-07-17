# VPC Peering between DemoVPC and DefaultVPC

- rename default VPC (VPC created by default by aws)
  - name: DefaultVPC

- create new EC2
  - attach to DefaultEC2

#### test connection between VPCs ####
- connect to DefaultEC2
- ```curl <BastionHost_public_ip>:80/```
(should do nothing)
#### test ####

- give name DefaultVPC to default VPC
- give name to DefaultRouteTable

- create a Peering Connection
  - name: DemoPeeringConnection
- Peering Connection action accept request

- add route to PublicRouteTable
  - <DefaultVPC_CIDR>, Peering Connection: DemoPeeringConnection

- add route to DefaultRouteTable
  - 10.0.0.0/16, Peering Connection: DemoPeeringConnection

#### repeat test connection between VPCs ####
- (should work)
####