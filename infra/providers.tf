provider "aws" {
  region = var.region
}

locals {
  name = "${var.project_name}-${var.app_env}"
  tags = {
    Project = var.project_name
    Env     = var.app_env
    Managed = "terraform"
  }
}

