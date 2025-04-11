aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId]' --output table

aws ec2 describe-instances --query 'Reservations[*].Instances[*].{Id:InstanceId,AZ:Placement.AvailabilityZone}' --output table

aws ec2 describe-instances --filter "Name=availability-zone,Values=us-west-2a" --query 'Reservations[*].Instances[*].[InstanceId]'

