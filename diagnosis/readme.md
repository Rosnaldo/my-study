A bastion host advantages:
- can be easily monitored and log access (audit trail)
- single choke point
- can be locked down with IP allow lists, mfa, and intrusion detection
- if security is compromised, bastion host can be shut down. 

cloudwatch collections some cpu metrics from ec2 by default, but not memory or disk space.

top -> cpu diagnose
du -> disk space (var/log, /tmp, /etc)
free -mt -> swap memory

- if ec2 is out of disk space -> add space to ebs
- if ec2 is out of memory -> change ec2 instance type

x-ray allow to trace a single user request through multiple services (lambda, api, gateway, ec2, rds, etc)
trace how much it delays in each piece in the chain.

It is important to alter http responses in the range of 400 to 500, because 4xx is client error and 5xx is server error. 

cloudwatch -> SNS -> email, mobile, slack message
prometheus -> alertmanager
nagios -> alerting

sonarqube and aws codeguru can be used complementary to detect code smalls.