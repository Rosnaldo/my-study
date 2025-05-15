```bash
terraform init
# download modules and create terraform lock

terraform validate
# verrify if the config is valid

terraform plan
# display every infrastructure that is going to be created

terraform plan -destroy
# display every infrastructure that is going to be removed

terraform apply
# apply creation plan

terraform destroy
# destroy all created infrastructure
