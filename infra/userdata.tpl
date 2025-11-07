#!/bin/bash
set -euxo pipefail

# Core updates + tools
dnf update -y
dnf install -y docker amazon-ssm-agent
systemctl enable --now docker
systemctl enable --now amazon-ssm-agent

# Install Docker Compose plugin
mkdir -p /usr/libexec/docker/cli-plugins
curl -L "https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-x86_64" \
  -o /usr/libexec/docker/cli-plugins/docker-compose
chmod +x /usr/libexec/docker/cli-plugins/docker-compose

# ECR login using instance role
REGION="${region}"
ECR_DOMAIN="$(echo "${ecr_frontend_url}" | cut -d'/' -f1)"
aws ecr get-login-password --region "$REGION" \
  | docker login --username AWS --password-stdin "$ECR_DOMAIN"

# Write docker-compose file with your two services
mkdir -p /opt/app
cat >/opt/app/docker-compose.yml <<'YAML'
services:
  backend:
    image: ${ecr_backend_url}:latest
    restart: always
    ports:
      - "8080:8080"
    environment:
%{ for kv in backend_env_pairs ~}
      - ${kv}
%{ endfor ~}

  frontend:
    image: ${ecr_frontend_url}:latest
    restart: always
    ports:
      - "80:80"
    environment:
%{ for kv in frontend_env_pairs ~}
      - ${kv}
%{ endfor ~}
    depends_on:
      - backend
YAML

# Pull images and start
cd /opt/app
docker compose pull
docker compose up -d

# Simple visibility
sleep 5
docker ps
echo "Reach app on port 80"

