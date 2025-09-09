#### local provisioner

```tf
resource "null_resource" "example" {
  provisioner "local-exec" {
    command = "echo Hello, Terraform!"
  }
}

```
- `self.id` refers to the current resource ID.  
- This runs locally on your machine after the resource is created.  
- **Obs: should be used as last resource**   
