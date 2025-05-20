# Obs: you must use a kubectl version that is within one minor version difference of your AWS EKS cluster control plane.
# For example: 1.20 kubectl client works with Kubernetes 1.19, 1.20 and 1.21 cluters.

# config kubeconfig for kubectl
aws eks --region <region_code> update-kubeconfig --name <cluster_name>

# list worker nodes
kubectl get nodes

# verify services
kubectl get svc


#### try to access public and private ec2 via ssh ####
ssh -i private-key/eks-terraform-key.pem ec2-user@<Public-NodeGroup-EC2Instance-PublicIP>
# should be accessable

ssh -i private-key/eks-terraform-key.pem ec2-user@<Private-NodeGroup-EC2Instance-PublicIP>
# should not be accessable
####


#### access private ec2 via bastion host ssh ####
```bash
# Connect to Bastion EC2 Instance
ssh -i private-key/eks-terraform-key.pem ec2-user@<Bastion-EC2-Instance-Public-IP>

# if key was not not copied
scp -i private-key/eks-terraform-key.pem private-key/eks-terraform-key.pem ec2-user@<Bastion-EC2-Instance-Public-IP>:/tmp/eks-terraform-key.pem

cd /tmp

ssh -i eks-terraform-key.pem ec2-user@<Private-NodeGroup-EC2Instance-PrivateIP>
```
