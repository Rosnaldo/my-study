## config user credentials:

```bash
# identify the user
aws sts get-caller-identity

# saves the user credentials locally; add switchs user
aws configure --profile john
```

<br />

## grant user temporary permissions:

```bash
# user assumes the role and the permissions is narrowed by session policy
aws sts assume-role --role-arn [role_arn] --role-session-name [session_policy]

export AWS_ACCESS_KEY_ID=[access_key_id]
export AWS_SECRET_ACCESS_KEY=[secret_key]
export AWS_SESSION_TOKEN=[session_token]
```