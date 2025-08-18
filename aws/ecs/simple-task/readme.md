aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin [account_id].dkr.ecr.sa-east-1.amazonaws.com

aws ecr create-repository --repository-name [repo_name]
docker build -t [image_name] .

docker tag [image_name]:latest [account_id].dkr.ecr.sa-east-1.amazonaws.com/[image_name]:latest

docker push [account_id].dkr.ecr.sa-east-1.amazonaws.com/[image_name]:latest

aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document file://trust-policy.json

aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

create ecs task definition
  - task family: nodejs-simple
  - task execution role: ecsTaskExecutionRole
  - container:
    - name: [repo_name]
    - image: [repo_uri]

task:
  - network:
    - vpc
    - subnet: public
    - sg:
      - outbound, https, 443 (ECR image pulls use HTTPS)