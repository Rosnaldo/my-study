synchrnous
aws lambda invoke --function-name <function> --cli-binary-format raw-in-base64-out --payload '{"key": "value"}' response.json

aws lambda invoke --function-name <function> --invocation-type RequestResponse --cli-binary-format raw-in-base64-out --payload '{"key": "value"}' response.json


asynchronous
aws lambda invoke --function-name <function> --invocation-type Event --cli-binary-format raw-in-base64-out --payload '{"key": "value"}' response.json

aws lambda create-event-source-mapping --function-name <function> --batch-size 500 --maximum-batching-window-in-seconds 5 --starting-position LATEST --event-source-arn <arn-dynamodb>
