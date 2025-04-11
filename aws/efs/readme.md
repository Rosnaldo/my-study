-> create security group
  - Inbound rule: Type: NFS, port: 2049, source: instance

-> create File System
  - attribute instance VPC
  -> create mount targets
    - attribute security group

-> go to efs and open (Amazon EC2 instructions (from local VPC))
  - follow the instructions
