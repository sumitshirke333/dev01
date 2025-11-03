variable "rg_name" { default = "devops-demo-rg" }
variable "location" { default = "east" }
variable "acr_name" { default = "devopsdemoacr123" } 
variable "name_prefix" { default = "devopsdemo" }
variable "vm_size" { default = "Standard_B1s" } 
variable "admin_user" { default = "azureuser" }
variable "ssh_pub_key_path" { default = "~/.ssh/id_rsa.pub" }
