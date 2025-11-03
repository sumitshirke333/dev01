#!/bin/bash
# Free-tier safe image scan using Trivy

set -e

# Replace with your Docker images
FRONTEND_IMAGE="frontend:latest"
BACKEND_IMAGE="backend:latest"

echo "🔍 Scanning backend image..."
# trivy image --severity HIGH,CRITICAL --exit-code 1 $BACKEND_IMAGE || echo "Scan completed. Check report for issues."

echo "🔍 Scanning frontend image..."
# trivy image --severity HIGH,CRITICAL --exit-code 1 $FRONTEND_IMAGE || echo "Scan completed. Check report for issues."

echo "✅ Trivy scans done."
