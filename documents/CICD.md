# CI/CD Integration Guide

## GitHub Actions (Included)

### Setup

Workflow file: `.github/workflows/playwright.yml`

Already configured to run on:
- Push to main/master
- Pull requests
- Manual trigger

### Viewing Results

1. Go to **Actions** tab in GitHub
2. Select workflow run
3. View logs and download artifacts

### Customize Workflow

Edit `.github/workflows/playwright.yml`:

```yaml
on:
  push:
    branches: [ main, develop ]
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
```

### Add Secrets

Settings → Secrets → Actions:
- `VPN_SERVER`
- `VPN_USERNAME`
- `VPN_PASSWORD`

## Jenkins

### Jenkinsfile

```groovy
pipeline {
    agent any

    environment {
        BASE_URL = 'https://www.douglas.de'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/douglas-automation.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Publish Reports') {
            steps {
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])

                allure([
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            junit 'test-results/*.xml'
            archiveArtifacts artifacts: 'test-results/**/*'
        }
    }
}
```

### Jenkins Setup

1. Install plugins:
   - NodeJS Plugin
   - HTML Publisher
   - Allure Plugin

2. Configure NodeJS installation
3. Create pipeline job
4. Point to Jenkinsfile

## GitLab CI

### .gitlab-ci.yml

```yaml
image: mcr.microsoft.com/playwright:v1.40.0-focal

stages:
  - test
  - report

variables:
  BASE_URL: "https://www.douglas.de"

cache:
  paths:
    - node_modules/

before_script:
  - npm ci

test:
  stage: test
  script:
    - npm test
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
      - allure-results/
    reports:
      junit: test-results/results.xml

pages:
  stage: report
  dependencies:
    - test
  script:
    - mkdir public
    - cp -r playwright-report/* public/
  artifacts:
    paths:
      - public
  only:
    - main
```

## Azure Pipelines

### azure-pipelines.yml

```yaml
trigger:
  branches:
    include:
      - main
      - develop

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
    displayName: 'Install Node.js'

  - script: npm ci
    displayName: 'Install dependencies'

  - script: npx playwright install --with-deps
    displayName: 'Install Playwright browsers'

  - script: npm test
    displayName: 'Run Playwright tests'
    env:
      BASE_URL: $(BASE_URL)

  - task: PublishTestResults@2
    condition: always()
    inputs:
      testResultsFormat: 'JUnit'
      testResultsFiles: 'test-results/results.xml'
    displayName: 'Publish test results'

  - task: PublishPipelineArtifact@1
    condition: always()
    inputs:
      targetPath: 'playwright-report'
      artifact: 'playwright-report'
    displayName: 'Publish HTML report'
```

## CircleCI

### .circleci/config.yml

```yaml
version: 2.1

orbs:
  node: circleci/node@5.0.0

jobs:
  test:
    docker:
      - image: mcr.microsoft.com/playwright:v1.40.0-focal
    steps:
      - checkout
      - node/install-packages
      - run:
          name: Install Playwright
          command: npx playwright install --with-deps
      - run:
          name: Run tests
          command: npm test
      - store_artifacts:
          path: playwright-report
      - store_test_results:
          path: test-results

workflows:
  test-workflow:
    jobs:
      - test
```

## Best Practices

### 1. Use Docker Images
- Consistent environment
- Faster setup
- Isolated execution

### 2. Cache Dependencies
```yaml
# GitHub Actions
- uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
```

### 3. Parallel Execution
```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
```

### 4. Artifact Management
- Upload reports
- Store screenshots
- Archive test results
- Retention policy

### 5. Notifications
```yaml
# Slack notification
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Playwright tests completed'
```

## Environment-Specific Configuration

### Development
```yaml
- run: npm test
  env:
    BASE_URL: https://dev.douglas.de
```

### Staging
```yaml
- run: npm test
  env:
    BASE_URL: https://staging.douglas.de
```

### Production
```yaml
- run: npm test
  env:
    BASE_URL: https://www.douglas.de
```

## Scheduled Runs

### GitHub Actions
```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
    - cron: '0 */6 * * *'  # Every 6 hours
```

### Jenkins
```groovy
triggers {
    cron('H 0 * * *')  # Daily
}
```

## Monitoring & Alerts

### Test Failure Alerts
```yaml
- name: Send failure notification
  if: failure()
  uses: actions/github-script@v6
  with:
    script: |
      github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: 'Test Failure Alert',
        body: 'Playwright tests failed in ${{ github.workflow }}'
      })
```

## Reporting Integration

### Allure
```yaml
- run: npm run allure:generate
- uses: actions/upload-artifact@v3
  with:
    name: allure-report
    path: allure-report/
```

### TestRail
```yaml
- run: npm run upload-to-testrail
  env:
    TESTRAIL_API_KEY: ${{ secrets.TESTRAIL_API_KEY }}
```
