- create 2 ec2 instances
  - sg - HTTP, protocol TCP, port 80
  - proceed without a key pair
  - one from region us-east-1, other from ap-south-1

- create Global Accelerator
  - listener, port 80, protocol TCP
  - add 2 endpoint group
    - health check
      - port 80
      - health check protocol: HTTP
      - path: /
      - interval: 10
      - threshold count: 3
      - one from region us-east-1, other from ap-south-1
      - endpoint type: EC2 instance
        - attach instance
        - weight: 128

