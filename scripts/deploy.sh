#!/usr/bin/env bash
set -euo pipefail

# Deploy Frontend & Backend from AWS ECR (manual run)
AWS_REGION="${AWS_REGION:-ap-south-1}"
PROJECT_NAME="${PROJECT_NAME:-devops-intern}"

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"

FRONT_IMAGE="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}-frontend:${FRONTEND_TAG:-latest}"
BACK_IMAGE="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}-backend:${BACKEND_TAG:-latest}"

# Ports (host:container). Adjust if your container listens on a different port.
HOST_FRONTEND_PORT="${HOST_FRONTEND_PORT:-80}"
CONTAINER_FRONTEND_PORT="${CONTAINER_FRONTEND_PORT:-80}"
HOST_BACKEND_PORT="${HOST_BACKEND_PORT:-3000}"
CONTAINER_BACKEND_PORT="${CONTAINER_BACKEND_PORT:-3000}"

echo "Logging in to ECR..."
aws ecr get-login-password --region "$AWS_REGION" \
  | docker login --username AWS --password-stdin "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

echo "Stopping old containers (if any)..."
docker rm -f frontend || true
docker rm -f backend || true

echo "Pulling latest images..."
docker pull "$FRONT_IMAGE"
docker pull "$BACK_IMAGE"

echo "Running backend..."
docker run -d --name backend --restart unless-stopped \
  -p "${HOST_BACKEND_PORT}:${CONTAINER_BACKEND_PORT}" \
  "$BACK_IMAGE"

echo "Running frontend..."
docker run -d --name frontend --restart unless-stopped \
  -p "${HOST_FRONTEND_PORT}:${CONTAINER_FRONTEND_PORT}" \
  "$FRONT_IMAGE"

echo "Done. Running containers:"
docker ps

