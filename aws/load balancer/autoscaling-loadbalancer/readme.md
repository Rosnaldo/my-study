-> create an network load balancer
  -> create a targe group
    - type: instance, protocol: TCP 80

    Obs: The target type option allows you to specify IP addresses or a Lambda function in addition to Instances. Using an IP address gives you the ability to use a network load balancer with compute instances outside of AWS. You will use Instances within AWS for this lab.

    Obs: Note: Ensure you set the protocol to TCP. Because network load balancers operate at layer 4 and aren't HTTP aware, if you set the protocol as HTTP you will be unable to use the target group with your network load balancer.

  - attribute target group with load balancer
  - enable Cross-zone load balancing

  Obs: You must enable Cross-zone load balancing to achieve the highest level of availability. Without enabling this feature, clients could cache the DNS address of the load balancer node in one availability zone and that node would only distribute requests to instances within the availability zone. Cross-Zone Load Balancing allows every load balancer node to distribute requests across all availability zones, although for the Network Load Balancer there are data transfer charges when this feature is enabled. (There are no data charges for other types of load balancers)

-> create security group
  - inbound rule: SSH all traffic
  - inbound rule: HTTP all trafic
  Obs: You have added this rule so that later you can access instances using SSH.


-> launch instance template
  - attribute security group
  - user data (file user-data.bash)

  Obs: This bash script installs PHP, an Apache webserver (httpd), and a tool for stress testing called Stress.

  Warning: The EC2 instances will never reach 100% CPU Utilization due to the limitations of the burstable credit. They should reach an usage of about 80%.

-> create an auto scaling group
  - attribute launch template
  - attribute load balancer

# command to stress EC2 instance
stress --cpu 2 --io 1 --vm 1 --vm-bytes 128M --timeout 5m