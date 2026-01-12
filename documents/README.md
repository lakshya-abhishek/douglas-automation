# Douglas Parfum Automation Framework

A comprehensive test automation framework for Douglas.de Parfum section built with Playwright and TypeScript, implementing industry best practices including Page Object Model, data-driven testing, and CI/CD integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [Docker Setup](#docker-setup)
- [CI/CD Integration](#cicd-integration)
- [Framework Architecture](#framework-architecture)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This framework automates testing of the Douglas.de e-commerce platform, specifically the Parfum (perfume) category with comprehensive filter testing capabilities. It demonstrates professional QA automation practices suitable for enterprise environments.

**Test Coverage:**
- Homepage navigation and cookie consent handling
- Parfum category navigation
- Product filtering (Sale, Neu, Limitiert)
- Brand (Marke) filtering
- Product type (Produktart) filtering
- Multiple filter combinations
- Data-driven test scenarios

## ✨ Features

- **Page Object Model (POM)**: Clean separation of test logic and UI elements
- **Data-Driven Testing**: External JSON files for test data management
- **Cross-Browser Support**: Chrome, Firefox, and Safari
- **Parallel Execution**: Configurable workers for faster test runs
- **Multiple Reporting**: HTML reports and Allure integration
- **CI/CD Ready**: GitHub Actions workflow included
- **Docker Support**: Containerized execution environment
- **Stealth Configuration**: Bot detection bypass for e-commerce testing
- **Retry Mechanism**: Automatic retry for flaky tests
- **Screenshot & Video**: Captured on test failures
- **Logging**: Comprehensive test execution logs

## 📦 Prerequisites

### Required

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **Git**: For version control
- **VPN/Proxy**: Connection to European server (Germany recommended)

### Optional

- **Docker**: Version 20.10+ for containerized execution
- **Allure CLI**: For advanced reporting
  ```bash
  npm install -g allure-commandline
  ```

### System Requirements

- **OS**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: 2GB free space

## 🚀 Installation

### Step 1: Clone Repository

```bash
git clone <your-repository-url>
cd douglas-automation
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Install Playwright Browsers

```bash
npx playwright install
```

Or install specific browser:

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### Step 4: Verify Installation

```bash
npx playwright --version
```

## 📁 Project Structure

```
douglas-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline configuration
├── data/
│   ├── filters.json                # Filter test data
│   └── testdata.json               # Selectors and configuration data
├── pages/
│   ├── BasePage.ts                 # Base page object class
│   ├── HomePage.ts                 # Home page object
│   └── ParfumPage.ts               # Parfum page object
├── tests/
│   ├── parfum.spec.ts              # Basic navigation tests
│   └── parfum-filters.spec.ts      # Filter functionality tests
├── utils/
│   ├── config.ts                   # Environment configuration
│   ├── helpers.ts                  # Utility functions
│   └── logger.ts                   # Logging utility
├── logs/                           # Test execution logs (generated)
├── playwright-report/              # HTML reports (generated)
├── test-results/                   # Test artifacts (generated)
├── allure-results/                 # Allure results (generated)
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── Dockerfile                      # Docker configuration
├── docker-compose.yml              # Docker Compose setup
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
# Base URL
BASE_URL=https://www.douglas.de
LOCALE=de

# Timeout settings (in milliseconds)
DEFAULT_TIMEOUT=30000
ELEMENT_TIMEOUT=5000

# Browser settings
HEADLESS=false
SLOW_MO=0

# Execution settings
RETRIES=1
WORKERS=3
```

### Playwright Configuration

Edit `playwright.config.ts` to customize:

```typescript
export default defineConfig({
  testDir: './tests',           // Test directory
  timeout: 60000,               // Test timeout
  retries: 1,                   // Retry failed tests
  workers: 3,                   // Parallel execution

  use: {
    baseURL: 'https://www.douglas.de',
    headless: false,            // Run with visible browser
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

### Test Data Configuration

Edit `data/filters.json` to add/modify test data:

```json
{
  "highlights": [
    { "name": "Sale", "enabled": true },
    { "name": "Neu", "enabled": true }
  ],
  "categories": {
    "marke": {
      "label": "Marke",
      "testBrands": ["First available"]
    }
  }
}
```

## 🎮 Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run with visible browser
npm run test:headed

# Run specific test file
npx playwright test tests/parfum.spec.ts

# Run tests matching pattern
npx playwright test --grep "filter"
```

### Browser-Specific Execution

```bash
# Run on Chrome only
npm run test:chrome

# Run on Firefox only
npm run test:firefox

# Run on Safari only
npm run test:safari
```

### Parallel vs Serial Execution

```bash
# Run tests in parallel (faster)
npm run test:parallel

# Run tests serially (one at a time)
npm run test:serial
```

### Debug Mode

```bash
# Run in debug mode with Playwright Inspector
npm run test:debug

# Run specific test in debug mode
npx playwright test tests/parfum.spec.ts --debug
```

### Advanced Options

```bash
# Run with custom workers
npx playwright test --workers=5

# Run with retry
npx playwright test --retries=2

# Run specific project
npx playwright test --project=firefox

# Run in headed mode with slow motion
npx playwright test --headed --slow-mo=1000
```

## 📊 Reporting

### HTML Report (Built-in)

Generate and view HTML report:

```bash
# Run tests (report auto-generated)
npm test

# View report
npm run report
```

Report location: `playwright-report/index.html`

### Allure Report

Generate comprehensive Allure report:

```bash
# Run tests
npm test

# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open

# Or combine both
npm run allure:report
```

### Logs

Test execution logs are stored in `logs/` directory with timestamps:
```
logs/
├── test-2026-01-12T19-30-45.log
└── test-2026-01-12T20-15-30.log
```

### Screenshots & Videos

On test failure:
- **Screenshots**: `test-results/*/test-failed-1.png`
- **Videos**: `test-results/*/video.webm`

## 🐳 Docker Setup

### Using Docker

#### Build Docker Image

```bash
docker build -t douglas-automation .
```

#### Run Tests in Docker

```bash
docker run --rm   -v $(pwd)/playwright-report:/app/playwright-report   -v $(pwd)/test-results:/app/test-results   douglas-automation
```

### Using Docker Compose (Recommended)

#### Run Tests

```bash
# Run tests
docker-compose up

# Run tests and rebuild
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f
```

#### Custom Configuration

Edit `docker-compose.yml`:

```yaml
services:
  playwright-tests:
    build: .
    environment:
      - BASE_URL=https://www.douglas.de
      - LOCALE=de
      - HEADLESS=true
      - WORKERS=3
    volumes:
      - ./playwright-report:/app/playwright-report
      - ./test-results:/app/test-results
```

#### Stop Container

```bash
docker-compose down
```

### Docker Best Practices

1. **Use Official Playwright Image**: Based on `mcr.microsoft.com/playwright`
2. **Mount Volumes**: For reports and test results
3. **Environment Variables**: Pass configuration via env vars
4. **Network Mode**: Use bridge network for isolation
5. **Cleanup**: Remove containers after execution

## 🔄 CI/CD Integration

### GitHub Actions

The framework includes a complete GitHub Actions workflow (`.github/workflows/playwright.yml`).

#### Automatic Triggers

- **Push**: To `main` or `master` branch
- **Pull Request**: To `main` or `master` branch
- **Manual**: Via workflow dispatch

#### Workflow Configuration

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

#### View Results

1. Go to **Actions** tab in GitHub repository
2. Select the workflow run
3. View test results and logs
4. Download artifacts (reports)

#### Configure Secrets

For sensitive data, add GitHub Secrets:

1. Go to **Settings** → **Secrets** → **Actions**
2. Add secrets:
   - `VPN_SERVER`
   - `VPN_USERNAME`
   - `VPN_PASSWORD`

Use in workflow:
```yaml
env:
  VPN_SERVER: ${{ secrets.VPN_SERVER }}
```

### Other CI/CD Platforms

#### Jenkins

```groovy
pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Report') {
            steps {
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }
    }
}
```

#### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test

playwright-tests:
  image: mcr.microsoft.com/playwright:v1.40.0-focal
  stage: test
  script:
    - npm ci
    - npm test
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
```

#### Azure Pipelines

```yaml
# azure-pipelines.yml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
  - script: npm ci
    displayName: 'Install dependencies'
  - script: npx playwright install --with-deps
    displayName: 'Install Playwright'
  - script: npm test
    displayName: 'Run tests'
  - task: PublishTestResults@2
    condition: always()
    inputs:
      testResultsFiles: 'test-results/results.xml'
```

## 🏗️ Framework Architecture

### Design Pattern: Page Object Model (POM)

The framework uses POM to separate test logic from UI interactions.

#### BasePage Class

```typescript
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common methods for all pages
  async goto(url: string) { }
  async waitForElement(selector: string) { }
  async clickElement(selector: string) { }
}
```

#### Page-Specific Classes

- **HomePage**: Navigation, cookie consent
- **ParfumPage**: Filters, product interactions

#### Benefits

- **Maintainability**: Change selectors in one place
- **Reusability**: Share common methods
- **Readability**: Tests read like user stories
- **Testability**: Easy to mock and unit test

### Data-Driven Testing

Test data is externalized in JSON files:

```json
{
  "highlights": [
    { "name": "Sale", "enabled": true }
  ]
}
```

Tests iterate through data:

```typescript
filtersData.highlights.forEach((filter) => {
  test(\`should filter by \${filter.name}\`, async ({ page }) => {
    await parfumPage.applyFilter(filter.name);
  });
});
```

### Configuration Management

Centralized configuration in `utils/config.ts`:

```typescript
export const config = {
  baseURL: process.env.BASE_URL || 'https://www.douglas.de',
  timeout: {
    default: 30000,
    element: 5000
  }
};
```

## 🎯 Best Practices

### 1. No Hardcoded Values
✅ Use configuration files and test data
❌ Avoid magic strings in tests

### 2. Proper Wait Strategies
✅ Use `waitFor()`, `waitForLoadState()`
❌ Avoid `waitForTimeout()` (use sparingly)

### 3. Error Handling
✅ Use try-catch blocks
✅ Log meaningful error messages
❌ Let tests fail silently

### 4. Clean Code
✅ Descriptive variable names
✅ Single responsibility per method
✅ Comment only when necessary

### 5. Test Independence
✅ Each test should run independently
✅ Use proper setup/teardown
❌ Tests depending on execution order

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. Access Denied Error

**Problem**: Douglas.de blocks non-European IPs

**Solution**:
```bash
# Connect to VPN (Germany/EU server)
# Then run tests
npm test
```

#### 2. Bot Detection

**Problem**: Website detects automation

**Solution**: Already configured in framework
- Headless mode disabled
- Automation flags masked
- Stealth configuration applied

#### 3. Cookie Banner Not Found

**Problem**: Cookie banner appears late

**Solution**: Already fixed in HomePage
```typescript
await cookieButton.waitFor({ state: 'visible', timeout: 10000 });
```

#### 4. Timeout Errors

**Problem**: Elements not found within timeout

**Solution**: Increase timeout in config
```typescript
timeout: 60000  // 60 seconds
```

#### 5. Flaky Tests

**Problem**: Tests pass/fail intermittently

**Solution**:
- Enable retries: `retries: 2`
- Use better wait strategies
- Check network stability

### Debug Commands

```bash
# View Playwright trace
npx playwright show-trace test-results/trace.zip

# Run with verbose logging
DEBUG=pw:api npm test

# Check browser versions
npx playwright --version
```

### Getting Help

- **Playwright Docs**: https://playwright.dev
- **GitHub Issues**: Report bugs in repository
- **Stack Overflow**: Tag with `playwright`

## 📝 Development Workflow

### Adding New Tests

1. Create test file in `tests/`
2. Import required page objects
3. Write test using POM methods
4. Add test data to `data/` if needed
5. Run and verify: `npm test`
6. Commit changes

### Adding New Page Objects

1. Create new file in `pages/`
2. Extend `BasePage`
3. Define selectors as private properties
4. Implement page-specific methods
5. Export and use in tests

### Updating Test Data

1. Edit `data/filters.json` or `data/testdata.json`
2. No code changes needed
3. Tests automatically use new data

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-test`
3. Commit changes: `git commit -m "Add new test"`
4. Push to branch: `git push origin feature/new-test`
5. Create Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Author

Created by [Your Name] for Test Automation Assessment

## 📞 Contact

For questions or support, please contact:
- Email: your.email@example.com
- GitHub: @your-github-username

---

**Note**: This framework requires VPN connection to European server for testing Douglas.de due to geo-restrictions. In production environments, use EU-based CI/CD runners or proxy configuration.
