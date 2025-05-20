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


## terraform state
terraform state list
#Lista todos os recursos gerenciados
terraform state show <resource>
#Mostra os detalhes de um recurso específico
terraform state rm <resource>
#Remove um recurso do state sem deletar ele na nuvem
terraform state mr
# Move um recurso no state (útil ao renomear recursos)
