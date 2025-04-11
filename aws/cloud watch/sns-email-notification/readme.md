- launch ec2 instance
- set up cloud watch
  - create new dashboad
  - select per-instance metric
  - select Cpuutilization

- in the sns console create a new topic
  - create a subscription, protocol email

- in cloud watch console click on CPUUtilization metric for one of the instances and choose "Create Alarm"
- Define the threshold conditions for the alarm, such as CPU utilization is less than 10% for a sustained period
- Configure the actions to be taken when the alarm state is triggered, such as sending a notification via SNS

