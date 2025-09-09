terraform {
  backend "s3" {
    bucket         = "my-terraform-state-j7df"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
  }
}
