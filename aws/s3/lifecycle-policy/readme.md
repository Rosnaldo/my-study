// Bucket policy generator
https://awspolicygen.s3.amazonaws.com/policygen.html

aws s3api put-bucket-lifecycle-configuration --lifecycle-configuration file://lifecycle.json --bucket <bucket>
