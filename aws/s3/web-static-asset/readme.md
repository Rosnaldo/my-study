# create bucket
aws s3 mb s3://<bucket-name>
aws s3 ls // list all buckets
# cp index.html to bucket
aws s3 cp index.html s3://<bucket-name>
# cp recursively all the files
aws s3 cp . s3://<bucket-name>--recursive
aws s3 ls s3://<bucket-name>// list all the s3 files

# Set the ownership controls to object writer
aws s3api put-bucket-ownership-controls --bucket <bucket-name> --ownership-controls="Rules=[{ObjectOwnership=ObjectWriter}]"

# Set the public access block configurations
aws s3api put-public-access-block --bucket <bucket-name> --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Upload the files again, overwriting the current copies, and set the access control list (ACL) to be public-read:
aws s3 cp . s3://<bucket-name> --recursive --acl public-read

# Enable web-site-static
aws s3api put-bucket-website --bucket <bucket-name> --website-configuration file://website.json

# Config policy
aws s3api put-bucket-policy --bucket <bucket-name> --policy file://policy.json
