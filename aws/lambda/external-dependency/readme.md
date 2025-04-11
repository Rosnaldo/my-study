sudo yum install -y nano

rmkdir lambda && mkdir lambda  && cd lambda

upload index.js file to cloudshell

npm  install aws-xray-sdk

chmod a+r *

zip -r function.zip .

create IAM role
  - name DemoLambdaWithDependecies
  - attach policy: AWSLambdaBasicExecutionRole, AmazonS3ReadOnlyAccess

aws lambda create-function --zip-file fileb://function.zip --function-name lambda-xray-with-dependencies --runtime nodejs20.x --handler index.handler --role <arn>

