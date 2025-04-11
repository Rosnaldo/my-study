docker run -p 5432:5432 \
-v volume-data:/var/lib/postgresql/data \
-e POSTGRES_USER=user \
-e POSTGRES_PASSWORD=password \
-e POSTGRES_DB=database \
postgres

curl --request GET http://localhost:3000
curl --request POST http://localhost:3000

// how to install docker on Amazon linux
https://www.cyberciti.biz/faq/how-to-install-docker-on-amazon-linux-2/


// AWS
// EC2 -> VPC -> Inbound rules -> TCP 3000
// EC2 -> VPC -> Inbound rules -> SSH TCP 22
// EC2 -> VPC -> Outbound rules -> all traffic

// RDS - VPC -> Inbound rules -> all traffic
// RDS - VPC -> Outbound rules -> all traffic
