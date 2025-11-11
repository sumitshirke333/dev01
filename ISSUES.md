# 🧾 ISSUES.md — DevOps Internship Project

## 📘 Purpose
This document tracks and documents **all issues** encountered during the setup, deployment, and monitoring of the **React + Node.js full stack application** deployed on **AWS** using **Docker, ECR, EC2, Terraform, SSM, Prometheus, and Grafana**.  
Each issue includes reproduction steps, root cause, resolution, and status.

---

## ⚙️ Issue #1 — Backend API Not Responding from Frontend

**Phase:** Local Development  
**Date Reported:** 2025-10-28  
**Environment:** Localhost (React + Node.js)

**Steps to Reproduce:**
1. Start backend and frontend servers.
2. Access frontend app at `http://localhost:3000`.
3. Check network requests in browser dev tools.

**Observed Behavior:**  
`Access to fetch at 'http://localhost:5000/api' from origin 'http://localhost:3000' has been blocked by CORS policy.`

**Expected Behavior:**  
API should respond successfully with JSON data.

**Root Cause:**  
CORS not enabled in backend.

**Resolution:**
```js
import cors from "cors";
app.use(cors());


🐳 Issue #2 — Docker Build Failed for Backend

Phase: Dockerization
Date Reported: 2025-10-29
Environment: Local Docker

Steps to Reproduce:

docker build -t backend:local .


Observed Behavior:
Error: cannot find module '/app/server.js'

Expected Behavior:
Docker image should build successfully.

Root Cause:
Incorrect working directory and missing file copy in Dockerfile.

Resolution:

WORKDIR /app
COPY . .
CMD ["node", "server.js"]


Status: ✅ Resolved

☁️ Issue #3 — ECR Login Failed

Phase: AWS ECR Deployment
Date Reported: 2025-11-02
Environment: AWS CLI + Docker

Steps to Reproduce:

docker push <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/backend:latest


Observed Behavior:
Error: no basic auth credentials

Expected Behavior:
Image should push to ECR successfully.

Root Cause:
ECR login command not executed before push.

Resolution:

aws ecr get-login-password --region ap-south-1 \
| docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com


Status: ✅ Resolved

🖥️ Issue #4 — EC2 Instance Not Showing in SSM

Phase: AWS Infrastructure Setup
Date Reported: 2025-11-03
Environment: AWS EC2 + SSM

Steps to Reproduce:

aws ssm describe-instance-information --region ap-south-1


Observed Behavior:
Instance not listed.

Expected Behavior:
Instance should appear and be connectable via Session Manager.

Root Cause:

EC2 missing IAM role

SSM agent not started

Resolution:

Attached IAM policy: AmazonSSMManagedInstanceCore

Enabled agent:

sudo systemctl enable --now amazon-ssm-agent


Status: ✅ Resolved

🧱 Issue #5 — Terraform Apply Failed (AccessDenied)

Phase: Terraform (IaC)
Date Reported: 2025-11-05
Environment: Terraform CLI + AWS

Steps to Reproduce:

terraform init
terraform apply -auto-approve


Observed Behavior:
Error: UnauthorizedOperation (AccessDenied)

Expected Behavior:
Terraform should create AWS resources.

Root Cause:
User IAM policy missing permissions.

Resolution:
Added temporary permissions:

AmazonEC2FullAccess

AmazonECRFullAccess

AmazonSSMFullAccess

Status: ✅ Resolved

⚙️ Issue #8 — GitHub Actions Deployment Failure

Phase: CI/CD
Date Reported: 2025-11-09
Environment: GitHub Actions + AWS

Steps to Reproduce:
Trigger workflow manually or via push to main branch.

Observed Behavior:
Error: Cannot find credentials for AWS

Expected Behavior:
Workflow should authenticate and deploy automatically via SSM.

Root Cause:
AWS credentials missing in repository secrets.

Resolution:
Added GitHub Secrets:

AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY


Status: ✅ Resolved

📡 Issue #6 — Prometheus Metrics Not Scraping

Phase: Monitoring Setup
Date Reported: 2025-11-07
Environment: EC2 + Prometheus + Docker Compose

Steps to Reproduce:

Access Prometheus UI (http://<EC2_PUBLIC_IP>:9090/targets)

Observe target status for backend and frontend exporters.

Observed Behavior:
Status shows DOWN for backend metrics endpoint.

Expected Behavior:
Prometheus should scrape /metrics endpoint successfully.

Root Cause:
Application metrics endpoint not exposed or incorrect target in prometheus.yml.

Resolution:

Exposed metrics in backend (using prom-client):

import client from 'prom-client';
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});


Updated Prometheus config:

scrape_configs:
  - job_name: 'node_app'
    static_configs:
      - targets: ['backend:5000']


Status: ✅ Resolved

📊 Issue #7 — Grafana Dashboard Not Loading Data

Phase: Monitoring Visualization
Date Reported: 2025-11-08
Environment: Grafana + Prometheus

Steps to Reproduce:

Open Grafana at http://<EC2_PUBLIC_IP>:3000

Add Prometheus as a data source.

Import dashboard → Observe empty panels.

Observed Behavior:
No data points or metrics visible.

Expected Behavior:
Grafana should visualize live metrics from Prometheus.

Root Cause:

Incorrect Prometheus data source URL

Prometheus targets temporarily unavailable

Resolution:

Updated Prometheus data source in Grafana:
http://prometheus:9090

Restarted Docker Compose:

docker-compose down
docker-compose up -d


Verified metrics on Prometheus /targets page.

Status: ✅ Resolved
