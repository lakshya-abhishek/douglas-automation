# Docker Setup Guide

## Prerequisites

- Docker 20.10+
- Docker Compose 1.29+

## Quick Start with Docker

### 1. Build Image
```bash
docker build -t douglas-automation .
```

### 2. Run Tests
```bash
docker run --rm douglas-automation
```

### 3. With Volume Mounts
```bash
docker run --rm   -v $(pwd)/playwright-report:/app/playwright-report   -v $(pwd)/test-results:/app/test-results   douglas-automation
```

## Using Docker Compose (Recommended)

### Basic Usage
```bash
# Run tests
docker-compose up

# Run with rebuild
docker-compose up --build

# Run in background
docker-compose up -d

# Stop
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

### Custom Configuration

Edit `docker-compose.yml`:
```yaml
services:
  playwright-tests:
    build: .
    environment:
      - BASE_URL=https://www.douglas.de
      - HEADLESS=true
      - WORKERS=3
    volumes:
      - ./playwright-report:/app/playwright-report
      - ./test-results:/app/test-results
      - ./logs:/app/logs
```

## Dockerfile Explained

```dockerfile
# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Run tests
CMD ["npm", "test"]
```

## Advanced Docker Usage

### Custom Entrypoint
```bash
docker run --rm   --entrypoint npx   douglas-automation   playwright test --project=firefox
```

### Environment Variables
```bash
docker run --rm   -e BASE_URL=https://staging.douglas.de   -e WORKERS=5   douglas-automation
```

### Interactive Mode
```bash
docker run -it --rm   douglas-automation   /bin/bash
```

## CI/CD with Docker

### GitHub Actions
```yaml
- name: Run tests in Docker
  run: docker-compose up --abort-on-container-exit
```

### Jenkins
```groovy
stage('Test') {
    steps {
        sh 'docker-compose up --abort-on-container-exit'
    }
}
```

## Troubleshooting Docker

### Issue: Permission Denied
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Issue: Port Already in Use
```bash
docker-compose down
docker ps -a
docker rm $(docker ps -aq)
```

### Issue: Out of Disk Space
```bash
docker system prune -a
```

## Best Practices

1. Use official Playwright image
2. Mount volumes for reports
3. Use docker-compose for complex setups
4. Tag images with versions
5. Clean up after tests
