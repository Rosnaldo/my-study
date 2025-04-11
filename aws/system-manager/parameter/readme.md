- create parameter
  - name: /my-app/dev/db-url
  - type: String
  - value: dev.database.stephanetheteacher.com:3306

- create parameter
  - name: /my-app/dev/db-password
  - type: SecureString
    - KMS key source: My current account
  - KMS Key ID: alias/tutorial
  - value: password

```
aws ssm get-parameters --names /my-app/dev/db-url /my-app/dev/db-password --with-decryption

aws ssm get-parameters-by-apth --path /my-app/dev/ --recursive
```

- create lambda function
  - name: hello-world-ssm
  - python 3.7
  - create new role with basic Lambda permissions

```
import json
import boto3

ssm = boto3.client('ssm', region_name="eu-west-3")

def lambda_handler(event, context):
  db_url = ssm.get_parameters(Names=["/my-app/dev/db-url"])
  print(db_url)
  db_password = ssm.get_parameters(Names=["my-app/dev/db-password"], WithDecryption=true)
  print(db_password)
  return "worked!"
```

- create IAM role
  - attach to lambda function
  - policy:
    - name: SSMAccessForMyApp
    - service: SSM
    - Actions: GetParameters, GetParametersByPath
    - Resources:
      - Specify ARN for parameter: arn:aws:ssm:*:*:parameter/my-app/*
        - Region: *, check any
        - Account: *, check any
        - Fully qualified parameter name: my-app/*
  - policy
    - name: KMSDecryptTutorialKey
    - service: KMS
    - Actions: Decrypt
    - Resources:
      - Specify ARN for parameter: arn:aws:kms:*:*:key/
        - Region: *, check any
        - Account: *, check any
        - Key id: <kms_id>

