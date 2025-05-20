
# get replicas
kubectl get replicaset
kubectl get rs

kubectl describe rs/<replicaset-name>

# Expose ReplicaSet as a Service
kubectl expose rs <ReplicaSet-Name>  --type=NodePort --port=80 --target-port=8080 --name=<Service-Name-To-Be-Created>

# Apply latest file.yml changes to ReplicaSet
kubectl replace -f replicaset-demo.yml
