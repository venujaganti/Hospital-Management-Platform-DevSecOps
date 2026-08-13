# Hospital-Management-Platform

A modern **Hospital Management Platform** designed to manage hospital operations such as patients, doctors, appointments, and medical information. The project is containerized with Docker and deployed using Kubernetes, with a DevSecOps CI/CD pipeline for automated build, security scanning, and deployment.

## 🚀 Features

* 👨‍⚕️ Doctor management
* 🧑‍⚕️ Patient management
* 📅 Appointment management
* 🏥 Hospital dashboard
* 🔐 Secure application deployment
* 🐳 Docker containerization
* ☸️ Kubernetes deployment
* 🔄 Jenkins CI/CD pipeline
* 🔍 Security scanning with Trivy
* 📊 Application monitoring
* ☁️ AWS deployment support

## 🛠️ Technologies Used

| Technology           | Purpose                     |
| -------------------- | --------------------------- |
| React.js             | Frontend                    |
| Node.js / Express.js | Backend API                 |
| MySQL                | Database                    |
| Docker               | Containerization            |
| Kubernetes           | Container orchestration     |
| Jenkins              | CI/CD                       |
| Git & GitHub         | Version control             |
| Trivy                | Container security scanning |
| Prometheus           | Monitoring                  |
| Grafana              | Visualization               |
| AWS EC2              | Cloud deployment            |
| Linux                | Server environment          |

## 📂 Project Structure

```text
Hospital-Management-Platform-DevSecOps-Deployment/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── kubernetes/
│   ├── namespace.yaml
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── mysql-deployment.yaml
│   └── services.yaml
│
├── screenshots/
│   ├── login.png
│   ├── dashboard.png
│   ├── patients.png
│   ├── doctors.png
│   ├── appointments.png
│   ├── jenkins.png
│   ├── docker.png
│   └── kubernetes.png
│
├── docker-compose.yml
├── Jenkinsfile
├── README.md
└── .gitignore
```

## 🐳 Run with Docker

Clone the repository:

```bash
git clone https://github.com/venujaganti/Hospital-Management-Platform.git
cd Hospital-Management-Platform-DevSecOps-Deployment
```

Build and start the application:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker ps
```

Stop the application:

```bash
docker compose down
```

## ☸️ Kubernetes Deployment

Apply the Kubernetes manifests:

```bash
kubectl apply -f kubernetes/
```

Check the deployments:

```bash
kubectl get deployments
```

Check pods:

```bash
kubectl get pods
```

Check services:

```bash
kubectl get svc
```

For a specific namespace:

```bash
kubectl get pods -n hospital-management
```

## 🔄 CI/CD Pipeline

The project uses **Jenkins** to automate the DevSecOps pipeline.

### Pipeline Flow

```text
GitHub
   ↓
Jenkins
   ↓
Build Application
   ↓
Run Tests
   ↓
Code/Security Scan
   ↓
Docker Build
   ↓
Trivy Image Scan
   ↓
Push Docker Image
   ↓
Kubernetes Deployment
   ↓
Application Running
```

The pipeline helps automate application delivery while adding security checks before deployment.

## 🔍 Security

**Trivy** is used to scan Docker images for known vulnerabilities.

Example:

```bash
trivy image hospital-frontend:latest
```

Backend image:

```bash
trivy image hospital-backend:latest
```

Deployment can be configured to stop when critical security vulnerabilities are detected.

## 📊 Monitoring

The project can use **Prometheus and Grafana** for monitoring the deployed application and infrastructure.

Monitoring can include:

* CPU usage
* Memory usage
* Pod status
* Container metrics
* Application availability
* Kubernetes resource usage

## ☁️ AWS Deployment

The application can be deployed on an AWS EC2 instance.

Typical architecture:

```text
                AWS
                 │
              EC2 Server
                 │
        ┌────────┴────────┐
        │                 │
      Docker          Kubernetes
        │                 │
   ┌────┴────┐       ┌────┴────┐
 Frontend  Backend  Frontend  Backend
                     │
                   MySQL
```

The EC2 Security Group should allow only the required ports, such as:

```text
22    → SSH
80    → HTTP
443   → HTTPS
8080  → Jenkins (if required)
```

For production environments, unnecessary public ports should be restricted.

# 📸 Screenshots

## 🏠 Hospital Management Dashboard

![Hospital Dashboard](<Screenshot 2026-08-13 161008.png>)

## 🧑‍⚕️ Patient Management

![Patient Management](<Screenshot 2026-08-13 161036.png>)

## 👨‍⚕️ Doctor Management

![Doctor Management](<Screenshot 2026-08-13 161052.png>)

## 📅 Appointment Management

![Appointment Management](<Screenshot 2026-08-13 161107.png>)

## 🔄 Jenkins CI/CD Pipeline

![Jenkins Pipeline](<Screenshot 2026-08-13 163459.png>)

## 🐳 Docker Containers

![Docker Containers](<Screenshot 2026-08-13 163349.png>)

## ☸️ Kubernetes Pods

![Kubernetes Pods](<Screenshot 2026-08-13 163431.png>)

## 🧪 Useful Commands

Check Docker containers:

```bash
docker ps
```

Check Docker images:

```bash
docker images
```

Check Kubernetes pods:

```bash
kubectl get pods -A
```

Check Kubernetes services:

```bash
kubectl get svc -A
```

View pod logs:

```bash
kubectl logs <pod-name>
```

Check Jenkins container:

```bash
docker logs jenkins
```

## 🎯 Project Goals

The main goal of this project is to demonstrate how a web-based hospital management application can be developed and deployed using modern **DevOps and DevSecOps practices**.

The project combines:

* Application development
* Containerization
* CI/CD automation
* Security scanning
* Kubernetes orchestration
* Cloud deployment
* Monitoring and observability

## 👨‍💻 Author

**Venu Jaganti**

B.Tech – Computer Science & Engineering

### ⭐ Project Highlights

**Hospital Management Platform | Docker | Kubernetes | Jenkins | AWS | DevSecOps | Trivy | Prometheus | Grafana**

---
