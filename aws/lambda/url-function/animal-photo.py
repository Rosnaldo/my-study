import json
import base64
import boto3
 
s3 = boto3.client('s3')
 
def lambda_handler(event, context):
    animal = 'cat'
    if 'queryStringParameters' in event:
        animal = event['queryStringParameters']['animal']
 
    response = s3.get_object(
        Bucket=<bucket>,
        Key= animal + '.jpeg',
    )
    image = response['Body'].read()
 
    return {
        'headers': { "Content-Type": "image/jpeg" },
        'statusCode': 200,
        'body': base64.b64encode(image),
        'isBase64Encoded': True
    }
