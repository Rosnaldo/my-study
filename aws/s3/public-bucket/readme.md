- create a bucket
  - allow public access
  - got to awspolicygen website and generate a s3 policy (the bucket is public but the objects are not yet)
  - script example:

```
{
  "Id": "Policy1739464681471",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1739464678123",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": [
        "arn:aws:s3:::my-testing-bucket-23", // access to bucket
        "arn:aws:s3:::my-testing-bucket-23/*"  // access to what is inside the bucket
      ],
      "Principal": "*"
    }
  ]
}
``` add /* after arn