curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install --bin-dir /usr/bin --install-dir /usr/bin/aws-cli --update 

# configure user acess key
aws configure

# or
export AWS_ACCESS_KEY_ID=<access-key>
export AWS_SECRET_ACCESS_KEY=<secret-key>

# aws credentials/config path
~/.aws/credentials
~/.aws/config

# consult all options
aws <command> --cli-auto-prompt
# example
aws dynamodb create-table --cli-auto-prompt

# gui to create a role
aws iam wizard new-role

# save command output in a file
aws <command> --generate-cli-skeleton > <file.json>

## ----------------------------------
## ------  configure profile --------
## ----------------------------------

# config profile
aws configure --profile <profile>

# import profile
aws configure import --csv file://<file>

# list profiles
aws configure list-profiles

# use profile in command
aws <command> --profile <profile>

# set the profile
export AWS_PROFILE=<profile>