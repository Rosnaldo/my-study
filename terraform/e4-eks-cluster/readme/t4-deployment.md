
kubectl create deployment <deployment_name> --image=<container_image>

# Scale Down the Deployment
kubectl scale --replicas=20 deployment/<deployment_name>

# Expose Deployment as a Service
kubectl expose deployment <deployment_name>  --type=NodePort --port=80 --target-port=80 --name=<service_name>



## Update deployment

# To get Container Name from current deployment
kubectl get deployment <deployment> -o yaml

kubectl set image deployment/<deployment> <container_name>=<image>:v2
# manually edit the image in a text editor
kubectl edit deployment <deployment>

# Verify Rollout Status 
kubectl rollout status deployment/<deployment>

# Descibe Deployment
kubectl describe deployment <deployment>

# Check the Rollout History of a Deployment
# --revision=<number> // to revision history
kubectl rollout history deployment/<deployment>


# rollout deployment to previous version by default
# --to-revision=<number>
kubectl rollout undo deployment <deployment>

kubectl rollout <pause|resume> deployment <deployment>