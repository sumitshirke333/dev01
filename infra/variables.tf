variable "project_name" {
  type        = string
  default     = "dev01"
  description = "Name prefix for resources"
}

variable "app_env" {
  type    = string
  default = "prod"
}

variable "region" {
  type    = string
  default = "ap-south-1"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  type    = string
  default = "10.0.1.0/24"
}

variable "allow_http_cidr" {
  type    = list(string)
  default = ["0.0.0.0/0"]
}

variable "frontend_repo_name" {
  type    = string
  default = "frontend"
}

variable "backend_repo_name" {
  type    = string
  default = "backend"
}

# Optional container env
variable "backend_env" {
  type        = map(string)
  default     = {}
  description = "Env vars for backend container (Key=Value)"
}

variable "frontend_env" {
  type        = map(string)
  default     = {}
  description = "Env vars for frontend container (Key=Value)"
}

