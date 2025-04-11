-> create security group
  - outbound rule: Type: Http, Protocol: Tpc, Port: 80, destination: all

-> launch EC2 template
 - enter user data (file user-data.bash)
 - attribute security group

-> create auto scaling group
 - attribute EC2 template
