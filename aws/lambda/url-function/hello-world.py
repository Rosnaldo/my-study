def lambda_handler(event, context):
    response_body = "<html><body><h1>Hello, World</h1></body></html>"
    
    return {
        "statusCode": 200,
        "body": response_body,
        "headers": {
            'Content-Type': 'text/html',
        }
    }
