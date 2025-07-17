# replace NAT with NATGW (NAT Gateway)
## OBS: do not attach a private subnet with NAT Gateway  

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


## Comments:

### NAT Instance VS NAT Gateway 
| Option       | Cost                       | Auto-scaling | Use Case                                  |
| ------------ | -------------------------- | ------------ | ----------------------------------------- |
| NAT Gateway  | 💰 Charged hourly + per GB | ✅ Yes        | Scalable, managed NAT for private subnets |
| NAT Instance | 💸 EC2 pricing             | ❌ No         | Lower-cost alternative, but manual setup  |
| Public IP    | Free (w/o EIP)             | ✅ Yes        | Only when instance can be exposed         |


### Bastion Host VS NAT Gateway 
| Component        | Purpose                                                     | Direction | Publicly Accessible                         |
| ---------------- | ----------------------------------------------------------- | --------- | ------------------------------------------- |
| **NAT Gateway**  | Allow **private instances to access** the internet          | Outbound  | ✅ Yes (but no incoming connections allowed) |
| **Bastion Host** | Allow **you (admin/dev) to connect into** private instances | Inbound   | ✅ Yes (via SSH or RDP)                      |
