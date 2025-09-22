-> create security group
  - Inbound rule: Type: NFS, port: 2049, source: instance

-> create File System

```bash
mkdir efsdemo
sudo mount.efs [filesystem_id] /home/ec2-user/efsdemo
```
