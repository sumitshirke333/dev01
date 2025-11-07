#!/usr/bin/env bash
set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
PROJECT_NAME="${PROJECT_NAME:-devops-intern}"

# paths for your Dockerfiles (you said they are under app/)
APP_DIR="${APP_DIR:-app}"
FRONTEND_DIR="${FRONTEND_DIR:-$APP_DIR/frontend}"
BACKEND_DIR="${BACKEND_DIR:-$APP_DIR/backend}"

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

FRONTEND_REPO="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}-frontend"
BACKEND_REPO="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}-backend"

echo "Checking/creating ECR repositories..."
aws ecr describe-repositories --repository-names "${PROJECT_NAME}-frontend" >/dev/null 2>&1 || \
  aws ecr create-repository --repository-name "${PROJECT_NAME}-frontend" >/dev/null
aws ecr describe-repositories --repository-names "${PROJECT_NAME}-backend"  >/dev/null 2>&1 || \
  aws ecr create-repository --repository-name "${PROJECT_NAME}-backend"  >/dev/null

echo "Logging in to ECR..."
aws ecr get-login-password --region "$AWS_REGION" | \
  docker login --username AWS --password-stdin "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

# sanity checks
[[ -f "$FRONTEND_DIR/Dockerfile" ]] || { echo "ERROR: $FRONTEND_DIR/Dockerfile not found"; exit 1; }
[[ -f "$BACKEND_DIR/Dockerfile"  ]] || { echo "ERROR: $BACKEND_DIR/Dockerfile not found";  exit 1; }

echo "Building Docker images..."
docker build -t frontend:local "$FRONTEND_DIR"
docker build -t backend:local  "$BACKEND_DIR"

echo "Tagging images..."
docker tag frontend:local "${FRONTEND_REPO}:latest"
docker tag backend:local  "${BACKEND_REPO}:latest"

echo "Pushing images..."
docker push "${FRONTEND_REPO}:latest"
docker push "${BACKEND_REPO}:latest"

echo
echo "✅ Done:"
echo "  FRONTEND -> ${FRONTEND_REPO}:latest"
echo "  BACKEND  -> ${BACKEND_REPO}:latest"

