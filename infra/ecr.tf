resource "aws_ecr_repository" "frontend" {
  name                 = "${var.project_name}/${var.frontend_repo_name}"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration { scan_on_push = true }
  tags = local.tags
}

resource "aws_ecr_repository" "backend" {
  name                 = "${var.project_name}/${var.backend_repo_name}"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration { scan_on_push = true }
  tags = local.tags
}

