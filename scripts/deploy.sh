#!/bin/bash
# ----------------------------
# Deploy Frontend & Backend Containers from ACR
# ----------------------------

# Set variables
ACR_LOGIN_SERVER="devopsdemoacr123.azurecr.io"   # replace if different
ACR_USERNAME="<ACR_USERNAME>"
ACR_PASSWORD="<ACR_PASSWORD>"

FRONT_IMAGE="$ACR_LOGIN_SERVER/frontend:latest"
BACK_IMAGE="$ACR_LOGIN_SERVER/backend:latest"

# ----------------------------
# Login to Azure Container Registry
# ----------------------------
echo "🔐 Logging in to ACR..."
echo $ACR_PASSWORD | docker login $ACR_LOGIN_SERVER -u $ACR_USERNAME --password-stdin

# ----------------------------
# Stop & Remove old containers
# ----------------------------
echo "🛑 Stopping old containers..."
docker rm -f frontend || true
docker rm -f backend || true

# ----------------------------
# Pull latest images
# ----------------------------
echo "⬇️ Pulling latest images..."
docker pull $FRONT_IMAGE
docker pull $BACK_IMAGE

# ----------------------------
# Run Backend container
# ----------------------------
echo "▶️ Running backend container..."
docker run -d --name backend --restart unless-stopped -p 5000:4000 $BACK_IMAGE

# ----------------------------
# Run Frontend container
# ----------------------------
echo "▶️ Running frontend container..."
docker run -d --name frontend --restart unless-stopped -p 80:80 $FRONT_IMAGE

# ----------------------------
# Show running containers
# ----------------------------
echo "✅ Deployment completed. Current running containers:"
docker ps
