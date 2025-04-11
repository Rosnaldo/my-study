{ 
  "Version": "2012-10-17", 
  "Statement": [    {
    "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::account-id-with-access:root"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}