## Step-04: Demo - Expose Pod with a Service
- Expose pod with a service (NodePort Service) to access the application externally (from internet)
- **Ports**
  - **port:** Port on which node port service listens in Kubernetes cluster internally
  - **targetPort:** We define container port here on which our application is running.
  - **NodePort:** Worker Node port on which we can access our application.

kubectl get pods -o wide
# list pods

kubectl describe pod <pod_name>

# List services
kubectl get service
# or
kubectl get svc

# Create  a Pod
kubectl run <desired_pod_name> --image <container_image>

# Expose Pod as a Service (create a service)
kubectl expose pod <pod-name> --type=NodePort --port=80 --name=<service_name>
kubectl expose pod <pod-name> --type=NodePort --port=81 --target-port=80 --name=<service_name>
# to expose service in another port other then the default port 80, define the targert-port

# access on browser
kubectl get node -o wide
# http://<any_worker_node_external_ip>:<svc_nodeport>


# stream pod logs with -f option and access application to see logs
kubectl logs -f <pod_name>

# connect to nginx container in a pod
kubectl exec -it <pod_name> -- /bin/bash
