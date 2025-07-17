# VPC endpoint to allow access to S3 through the aws internal network
## endpoint gives access to AWS internal service without necessarily having access to internet

- create new role
  - name: DemoRoleEC2-S3RedOnly
  - policy: AmazonS3ReadOnlyAccess

- attach  AmazonS3ReadOnlyAccess to PrivateEC2

#### test PrivateEC2 access to S3 service ####
- ssh connetc to PrivateEC2 via BastionHost
- ```aws s3 ls```
(list buckets)
#### test ####

- create VPC endpoint
  - add service s3 gateway
  - attach VPC DemoVPC
  - attach PrivateRouteTable

#### repeat test PrivateEC2 access to S3 service ####
- (should work)
####
