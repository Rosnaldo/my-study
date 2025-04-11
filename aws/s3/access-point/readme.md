Setup a s3 bucket access point

- create s3 bucket
  - bucket policy:
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "*",
      "Effect": "Allow",
      "Resource": [
        "arn:aws:s3:::<access_point>",
        "arn:aws:s3:::<access_point>/*",
      ],
      "Principal": {
      	"AWS": "*"
      },
      "Condition": {
      	"StringEquals": {
      		"s3:DataAccessPointAccount": <account_id>
      	}
      }
    }
  ]
}
```
  - create a access point

###### test ######
- login with an user with access to s3 service
- try to upload using the bucket access point (allowed)
- try to upload in the bucket directly (not allowed)
