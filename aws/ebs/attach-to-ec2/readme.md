- create ebs volume
- attach ebs to ec2 instance

- connect to ec2 terminal
```bash
# inspect a file to guest its type
sudo file -s /dev/xvdf
# create a file system
sudo mkfs -t xfs /dev/xvdf
mkdir /home/ec2-user/ebsdemo
# mount file system
sudo mount /dev/xvdf /home/ec2-user/ebsdemo
# free disk space (-k in kilobytes)
df -k

# list block devices on the system
sudo blkid
# example output
# /dev/xvdf: UUID="7211717f-fab2-401a-81bf-5df13675d01b" BLOCK_SIZE="512" TYPE="xfs"

# automatically remount when reboot the system
nano /etc/fstab
# add line 
UUID="7211717f-fab2-401a-81bf-5df13675d01b" /ebsdemo xfs defaults,nofail

# create a file inside mounted path "demo.txt"
sudo echo "file inside server1" > demo.txt

sudo umount /home/ec2-user/ebsdemo

# attach to server2
# the file demo.txt should be there
```

to move to another AZ first create a snapshot from the EBS then create a new volume.  
to create ebs on other region first copy the snapshot to the destination region.  
