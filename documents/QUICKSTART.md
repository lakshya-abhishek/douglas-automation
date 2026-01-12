# Quick Start Guide - Douglas Automation Framework

## 5-Minute Setup

### Step 1: Install (2 minutes)
```bash
git clone <repo-url>
cd douglas-automation
npm install
npx playwright install chromium
```

### Step 2: Configure (1 minute)
```bash
# Connect VPN to Germany
# (Required for Douglas.de access)
```

### Step 3: Run (2 minutes)
```bash
npm test
```

Done! View report:
```bash
npm run report
```

## Common Commands

```bash
# Run all tests
npm test

# Run with visible browser
npm run test:headed

# Run specific browser
npm run test:chrome
npm run test:firefox

# Debug mode
npm run test:debug

# View report
npm run report

# Generate Allure report
npm run allure:report
```

## Troubleshooting

### Issue: Access Denied
**Fix**: Connect to VPN (Germany server)

### Issue: Cookie banner not found
**Fix**: Already handled in framework

### Issue: Tests timeout
**Fix**: Increase timeout in playwright.config.ts

## Next Steps

1. Read full README.md
2. Explore test files in `tests/`
3. Check page objects in `pages/`
4. Modify test data in `data/`
5. Run tests and review reports

## Need Help?

- Check README.md
- Review ARCHITECTURE.md
- Check troubleshooting section
