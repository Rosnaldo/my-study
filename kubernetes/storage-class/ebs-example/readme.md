Create the ebs volume.  
`aws ec2 create-volume --size 10 --region us-east-1 --availability-zone us-east-1a --volume-type gp2`

then create the rest of the resources.  
```bash
k apply -f pod.yaml
k apply -f pv.yaml
k apply -f pvc.yaml
k apply -f storage-class.yaml
```
