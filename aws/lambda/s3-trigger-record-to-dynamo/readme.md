s3 bucket is triggered to write on dynamodb through lambda function everytime there is an image upload on s3 bucket.

- create a s3 bucket "s3bucket-name"
  - enable public access

- create role "LambdaRole"
  - for lambda function
  - with policy AmazonDynamoDBFullAccess

- create lambda
  - python last version
  - attach created role "LambdaRole"
  - attach python code:

```
import boto3
from uuid import uuid4
def lambda_handler(event, context):
    s3 = boto3.client("s3")
    dynamodb = boto3.resource('dynamodb')
    for record in event['Records']:
        bucket_name = record['s3']['bucket']['name']
        object_key = record['s3']['object']['key']
        size = record['s3']['object'].get('size', -1)
        event_name = record ['eventName']
        event_time = record['eventTime']
        dynamoTable = dynamodb.Table('Student')
        dynamoTable.put_item(
            Item={'eid': str(uuid4()), 'Bucket': bucket_name, 'Object': object_key,'Size': size, 'Event': event_name, 'EventTime': event_time})
```
  - deploy
  - attach trigger
    - service s3 bucket "s3bucket-name"
    - event trigger:
      PUT, POST, COPY, Multiplart upload completed

- create dynamodb table "Student"
  - Partition key "eid"

###### test ######
- upload an image on bucket
- check dynamo tb for new item