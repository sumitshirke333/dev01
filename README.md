# 🚀 DevOps Internship Project

## 📘 Overview

Welcome to the **DevOps Internship Project**, designed to simulate a **real-world end-to-end DevOps environment**.
Interns will work on deploying a **React + Node.js (Express)** web application originally configured for **Azure**, but the task is to **migrate and deploy it completely on AWS (Free Tier only)** — replicating real-world migration and troubleshooting scenarios.

This project replicates production-level challenges through **intentional misconfigurations and debugging tasks** that interns must identify and resolve on their own.

---

## 🏗️ Project Structure

```
project root dir/
├── docker/                # Reusable Dockerfiles & multi-stage examples
├── terraform/             # Terraform modules and environment configs
├── scripts/               # Deployment and automation scripts
├── monitoring/            # Prometheus & Grafana configurations
├── security/              # Trivy config, Snyk notes, Docker security guidelines
├── app/
│   ├── frontend/          # React app (Dockerfile, build setup, tests)
│   └── backend/           # Node/Express app (Dockerfile, MongoDB integration)
└── .github/
    └── workflows/
        └── ci-cd.yaml     # GitHub Actions CI/CD pipeline
```

---

## ☁️ Deployment Requirement – AWS Migration

> The provided repository is **Azure-based**, but the challenge requires interns to **migrate and deploy the entire setup on AWS Free Tier**.
> You are not allowed to use Azure or any other paid services.
> Stay strictly within AWS Free Tier limits.

Interns can leverage services such as:

* **Amazon ECR / ECS / EKS**
* **AWS CodeBuild / CodePipeline**
* **AWS CloudWatch / Prometheus / Grafana**
* **AWS S3 / Route53 / IAM / Terraform**

---

## 🎯 Objective

The goal is to build, migrate, and manage a **cloud-native application pipeline** while demonstrating the ability to:

1. Recreate Azure-based deployments within AWS
2. Deploy containerized workloads using AWS services
3. Automate CI/CD pipelines via GitHub Actions
4. Manage infrastructure using Terraform
5. Apply DevSecOps principles (Trivy, Snyk, secrets management)
6. Set up monitoring and alerting dashboards
7. Debug and fix real-world configuration and pipeline issues

---

## 🧩 Error Challenge Scope

This project includes **predefined configuration and deployment challenges** intentionally placed across various layers.
Each intern must independently identify, debug, and resolve these challenges by following systematic troubleshooting and analysis.

> The project mimics real-world DevOps errors that can occur during cloud migration, pipeline automation, or infrastructure provisioning.
> No direct hints will be provided — interns must rely on logs, metrics, and problem-solving skills.

---

## 💡 Intern Guidelines

1. Treat every challenge as a **production-level incident**.
2. Use AWS CloudWatch logs, GitHub Actions logs, and monitoring tools to identify issues.
3. Maintain a structured **`TROUBLESHOOTING.md`** file including:

   * Issue observed
   * Root Cause Analysis (RCA)
   * Steps taken to resolve
   * Validation/testing results
4. Each intern must perform and document fixes independently.
5. Collaboration on concepts is encouraged, but **code and implementations must be original**.

---

## 🧾 Evaluation Criteria

| Area                             | Description                                           |
| -------------------------------- | ----------------------------------------------------- |
| **Debugging & RCA**              | Ability to identify and resolve real-world errors     |
| **Migration Skills**             | Successful deployment of Azure-based app on AWS       |
| **Automation & Infrastructure**  | Quality of Terraform, Docker, and CI/CD setup         |
| **Security Awareness**           | Handling of secrets, scans, and secure configurations |
| **Cost Management**              | Staying within AWS Free Tier                          |
| **Documentation & Presentation** | Clarity in RCA notes and final demo                   |

---

## 📄 Deliverables

Each intern must submit:

1. **Working AWS deployment** (publicly accessible endpoint)
2. **GitHub repository** with corrected implementation
3. **`TROUBLESHOOTING.md`** – detailed record of issues and fixes
4. **AWS architecture diagram**
5. **Final presentation or walkthrough video**

---

## 🙌 Conclusion

This challenge transforms interns from learners to **independent DevOps engineers** capable of real-world problem solving.
By completing this project, you’ll gain hands-on experience with **migration, automation, and debugging** — the core skills of a professional DevOps engineer.
