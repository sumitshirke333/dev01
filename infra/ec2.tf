# Latest Amazon Linux 2023 AMI via SSM Parameter
data "aws_ssm_parameter" "al2023" {
  name = "/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-6.1-x86_64"
}

resource "aws_instance" "app" {
  ami                         = data.aws_ssm_parameter.al2023.value
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public_a.id
  vpc_security_group_ids      = [aws_security_group.app.id]
  iam_instance_profile        = aws_iam_instance_profile.ec2_profile.name
  associate_public_ip_address = true

  user_data = templatefile("${path.module}/userdata.tpl", {
    region             = var.region
    ecr_frontend_url   = aws_ecr_repository.frontend.repository_url
    ecr_backend_url    = aws_ecr_repository.backend.repository_url
    backend_env_pairs  = [for k, v in var.backend_env : "${k}=${v}"]
    frontend_env_pairs = [for k, v in var.frontend_env : "${k}=${v}"]
  })

  # ensure IGW route exists first so we get a public path immediately
  depends_on = [aws_route_table_association.public_a]

  tags = merge(local.tags, { Name = "${local.name}-ec2" })
}

