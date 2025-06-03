# kubernetes

[Deployment](#deployment)  
[Service](#service)  
[Replicate](#replicaset)  
[Inside Container](#inside-container)  
[Taint](#taint)  
[NodeSelector](#node-selector)  
[Label Affinity and NodeSelector](#label-affinity-nodeSelector)  
<br />

```bash
# kubectl version
kubernetes version runing inside the node

# list all namespace
kubectl get all

# create a new pod yaml file
kubectl run redis --image=redis --dry-run -o yaml > redis.yaml
# --dry-run // not to run
# -o yaml // display in a yaml file

# apply updates to current created resource
kubectl create -f redis.yaml
kubectl apply -f redis.yaml
```
<br />

## Deployment
```bash
kubectl create deploy httpd-frontend --image=httpd:2.4-alpine --replicas=3
kubectl set deploy [deployment] [image]


# rollout
kubectl rollout status [deployment]
kubectl rollout history [deployment]
```
<br />

## Service
```bash
# display service url
minikube service [service] --url
```
<br />

## Replicaset
```bash
# replace replicaset // it wont automatically replace the existing pods
kubectl replace -f replicaset.yaml

# scale without updating the file
kubectl scale --replicas=6 -f replicaset.yaml

# create a temporary replicaset edit file that will upload the changes
# edit does not automatically replace the current pods
kubectl edit replicaset [replicaset]
```
<br />

## Inside Container
```bash
# container user
kubectl exec [pod] -- whoami
```
<br />

## Taint + Tolerate
"Keep pods away unless they explicitly tolerate me"

[Pod tolerate (see example)](pod-tolerate.yaml)
```bash
kubectl taint node [node] [key]=[value]:[effect]
```
#### Effect
`NoSchedule` → Don't schedule unless tolerated  
`PreferNoSchedule` → Try to avoid, but not enforced  
`NoExecute` → Evicts existing pods unless tolerated  

<br />

## NodeSelector + Label
"I want my pod to go there"

### Label the node
```bash
kubectl label nodes [node] [label]=[value]
```

### NodeSelector (yaml)
[Pod NodeSelector (see example)](pod-nodeSelector.yaml)
<br />
<br />

## Affinity + Label (yaml)
"I want my pod to go there"  

[Pod Affinity (see example)](pod-affinity.yaml)

<details>
  <summary>operator <code>IN, OR, NotIn, Exists </code></summary>
  
  IN: 
  ```yaml
  - matchExpressions:
    - key: disktype
      operator: In
      values:
      - ssd
  ```

  Exists:
  ```yaml
  - matchExpressions:
    - key: color
      operator: Exists
  ```
</details>

<details>
  <summary> type</summary>
  
  type1: `preferredDuringSchedulingIgnoredDuringExecution`  
  type2: `requiredDuringSchedulingIgnoredDuringExecution`  
  type3: `requiredDuringSchedulingRequiredDuringExecution`  

  <img src="affinity-types-table.png" width="500">
</details>

<details>
  <summary>nodeAffinity, podAffinity</summary>
  
  #### nodeAffinity
  "Schedule this pod on nodes with specific labels."  
  &emsp; • Targets: Nodes  
  &emsp; • Uses: Node labels  
  &emsp; • Purpose: Restrict or prefer scheduling on certain nodes  

  #### podAffinity
  "Schedule this pod near (on the same node or zone as) other matching pods."  
  &emsp; • Targets: Pods (on other nodes)  
  &emsp; • Uses: Pod labels, plus topology (e.g. node, zone)  
  &emsp; • Purpose: Co-locate related pods for performance, latency, or shared resources  

</details>


<br />
