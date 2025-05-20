# EC2 Instance
resource "aws_instance" "myec2vm" {
  ami = data.aws_ami.amzlinux2.id
  instance_type = var.instance_type
  # instance_type = var.instance_type_list[1]  # For List
  # instance_type = var.instance_type_map["prod"]  # For Map
  user_data = file("${path.module}/app1-install.sh")
  key_name = var.instance_keypair
  vpc_security_group_ids = [ aws_security_group.vpc-ssh.id, aws_security_group.vpc-web.id   ]
  
  # count will create 2 instances with the same configuration
  # count = 2
  # tags = {
  #   "Name" = "Count-Demo-${count.index}"
  # }

  # Create EC2 Instance in all Availabilty Zones of a VPC  
  for_each = toset(data.aws_availability_zones.my_azones.names)
  availability_zone = each.key  # You can also use each.value because for list items each.key == each.value
  tags = {
    "Name" = "for_each-Demo-${each.value}"
  }
}
