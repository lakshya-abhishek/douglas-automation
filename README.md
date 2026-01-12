Douglas Parfum Automation Framework
Automated testing framework for Douglas.de Parfum section using Playwright and TypeScript.
Features
Page Object Model (POM) design pattern
Data-driven testing with JSON files
Cross-browser testing (Chrome, Firefox, Safari)
Parallel test execution
HTML and Allure reporting
CI/CD integration with GitHub Actions
Docker support
Automatic screenshots on failure
Retry mechanism for flaky tests
Prerequisites
Node.js 18 or higher
npm or yarn
Installation
bash
npm install
npx playwright install
Use code with caution.

Project Structure
douglas-automation/
├── tests/              # Test specifications
├── pages/              # Page object classes
├── utils/              # Helper utilities and config
├── data/               # Test data JSON files
├── documents/          # Documents to understand and execute tests
├── .github/workflows/  # CI/CD pipeline
├── playwright.config.ts
└── package.json
Running Tests
All tests
bash
npm test
Use code with caution.

Specific browser
bash
npm run test:chrome
npm run test:firefox
npm run test:safari
Use code with caution.

Headed mode
bash
npm run test:headed
Use code with caution.

Parallel execution
bash
npm run test:parallel
Use code with caution.

Serial execution
bash
npm run test:serial
Use code with caution.

Reports
View HTML report
bash
npm run report
Use code with caution.

Generate Allure report
bash
npm run allure:report
Use code with caution.

Docker
Build and run
bash
docker-compose up --build
Use code with caution.

Configuration
Edit .env file for environment-specific settings:
BASE_URL
LOCALE
TIMEOUT values
Browser settings
Test Coverage
Homepage navigation
Cookie consent handling
Parfum category navigation
Filter tests (Sale, Neu, Limitiert)
Brand filtering
Product type filtering
Multiple filter combinations
CI/CD
GitHub Actions workflow runs automatically on:
Push to main/master
Pull requests
Manual trigger
Approach
This framework was developed incrementally:
Basic test setup
Core test scenarios
Refactoring with POM
Configuration and data management
Reporting integration
Advanced features
CI/CD pipeline
Documentation
Notes
Tests use dynamic selectors to handle page variations
No hardcoded values in test cases
Retry logic for stability
Logs stored in logs/ directory