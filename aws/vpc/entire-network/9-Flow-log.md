# create a VPC Flow Log

- create a new S3 bucket <vpc>

- create DemoVPC flow log
  - name: DemoS3FlowLog
  - Filter: ALL
  - 1 minute
  - Destination: Send to an Amazon S3 bucket
  - S3 bucket ARN: <bucket_vpc_arn>

- create AIM Role
  - check: Custom trust policy
  - custom policy:

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "Statement1",
			"Effect": "Allow",
			"Principal": {
			    "Service": "vpc-flow-logs.amazonaws.com"
			},
			"Action": "sts:AssumeRole"
		}
	]
}
```
  - permission policies: CloudWatchFullAccess
  - role name: FlowLogsRole

- create a CloudWatch Log group
  - name: VPCFlowLogs
  - Retention setting: 1 day

- create DemoVPC flow log again
  - name: DemoCWFlowLog
  - Filter: ALL
  - 1 minute
  - Destination: Send to CloudWatch Logs
  - attach log group: VPCFlowLogs
  - attach role: FlowLogsRole

- create another bucket name <athena>

- create Athena
  - attach <athena> bucket: s3://<athena>/athena
  - google search (https://docs.aws.amazon.com/pt_br/athena/latest/ug/vpc-flow-logs-create-table-statement.html)
  - create a table on the editor query
    - copy vpc uri until region, example:
      s3://demo-vpc-andrey-k-t-flowlog/AWSLogs/253490794521/vpcflowlogs/sa-east-1/
  - run alter table
    - copy vpc uri until date, example:
      s3://demo-vpc-andrey-k-t-flowlog/AWSLogs/253490794521/vpcflowlogs/sa-east-1/2025/02/20/
    - adjust date on query (2025/02/20)
  - run a get query to test
