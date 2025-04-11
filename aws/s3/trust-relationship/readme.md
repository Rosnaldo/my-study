A Trust Relationship in AWS IAM allows one AWS service, account, or role to assume another IAM role. This is crucial when giving permissions to an S3 bucket for cross-account access, AWS services (like Lambda, EC2, or Redshift), or specific users.

##  By default, an Amazon S3 object is owned by the AWS account that uploaded it. This is true even when the bucket is owned by another account.

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}

Example: Trust Relationship for Cross-Account Access to an S3 Bucket
If you need to allow another AWS account (e.g., Account B) to access an S3 bucket in Account A, use this:

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT_B_ID:root"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}