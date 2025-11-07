resource "aws_security_group" "app" {
  name        = "${local.name}-sg"
  description = "Allow HTTP/HTTPS; no SSH (use SSM)"
  vpc_id      = aws_vpc.main.id

  # HTTP
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.allow_http_cidr
  }

  # HTTPS (for later if you add ALB/ACM)
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = var.allow_http_cidr
  }

  # Outbound anywhere
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.tags
}

