sudo yum install -y nano

rmkdir lambda && mkdir lambda  && cd lambda

upload index.js file to cloudshell

npm  install aws-xray-sdk

chmod a+r *

zip -r function.zip .

- upload function.zip to a new S3 bucket

- upload lambda-xray-s3.yaml to cloudformation
 - fill parameters: S3BucketParam, S3KeyParam, S3ObjectVersionParam
