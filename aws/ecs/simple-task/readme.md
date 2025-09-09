aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin [account_id].dkr.ecr.sa-east-1.amazonaws.com

docker build -t my-node .
aws ecr create-repository --repository-name my-node
sudo docker tag my-node:latest [account_id].dkr.ecr.sa-east-1.amazonaws.com/my-node:latest

sudo docker push [account_id].dkr.ecr.sa-east-1.amazonaws.com/my-node:latest

aws iam create-role \
  --role-name EcsTaskExecutionRole \
  --assume-role-policy-document file://trust-policy.json

aws iam attach-role-policy \
  --role-name EcsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

create ecs task definition
  - task family: nodejs-simple
  - task execution role: EcsTaskExecutionRole
  - container:
    - name: [repo_name]
    - image: [repo_uri]

task:
  - network:
    - vpc
    - subnet: public
    - sg:
      - outbound, https, 443 (ECR image pulls use HTTPS)
    - enable assing public ip