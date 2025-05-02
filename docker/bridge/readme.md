vagrant init centos/8
vagrant up
vagrant ssh

---------------------------------
create first namespace
---------------------------------

sudo ip netns add netns0 // create a namespace
sudo ip link add veth0 type veth peer name ceth0 // create network interface

ip a
# see newly created interfaces
# ceth0@veth0
# veth0@ceth0

sudo ip link set veth0 up
ip a
# interace veth0 is up

sudo ip link set ceth0 netns netns0
# put interface ceth0 inside veth0

sudo nsenter --set=/var/run/netns/netns0 // enter inside namespace

ip link set lo up
ip link set ceth0 up
ip a // both are up

ip addr add 172.18.0.10/16 dev ceth0
ip r
# see new route

exit // exit namespace

---------------------------------
create second namespace
---------------------------------

repeat all commands above with netns1, veth1 and ceth1
(...)
ip addr add 172.18.0.20/16 dev ceth1

exit // exit namespace

---------------------------------
create bridge namespace
---------------------------------

sudo ip link add br0 type bridge
sudo ip link set br0 up

sudo ip link set veth0 master br0
sudo ip link set veth1 master br0

sudo yum install tcpdump -y

---------------------------------
test connection
---------------------------------

# cli_1
vagrant shh
sudo tcpdump -i br0

# cli_2
vagrant ssh
sudo nsenter --net=/var/run/netns/netns0
ping 172.18.0.20 // should sent traffic
ping 8.8.8.8 // should not work

# layer 2 is settup communication between hosts inside the network

---------------------------------
sudo ip addr add 172.18.0.1/16 dev br0 // set an ip to bridge
sudo nsenter --net=/var/run/netns/netns0
ping 172.18.0.1 // should work
ip route add default via 172.18.0.1
ping 8.8.8.8 // should go to bridge but without internet access yet
exit

sudo bash -c 'echo 1 > /proc/sys/net/ipv4/ip_forward' // activate routing mode

sudo iptable -t nat -A POSTROUTING -s 172.18.0.0/16 -o eth0 -j MASQUERADE
sudo iptables -L -t nat


