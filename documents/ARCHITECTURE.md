# Framework Architecture Documentation

## System Overview

The Douglas Automation Framework follows a layered architecture pattern with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────┐
│                     Test Layer                          │
│  (parfum.spec.ts, parfum-filters.spec.ts)              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Page Object Layer                      │
│    (HomePage.ts, ParfumPage.ts, BasePage.ts)           │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Utility Layer                         │
│      (config.ts, helpers.ts, logger.ts)                 │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                           │
│         (filters.json, testdata.json)                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                 Playwright Core                         │
│            (Browser Automation Engine)                  │
└─────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Test Layer
**Purpose**: Define test scenarios and assertions

**Files**: `tests/*.spec.ts`

**Responsibilities**:
- Test case definitions
- Test data iteration
- Assertions and validations
- Test hooks (beforeEach, afterEach)

**Example**:
```typescript
test('should filter by Sale', async ({ page }) => {
  await parfumPage.applyFilter('Sale');
  const hasProducts = await parfumPage.verifyProductsDisplayed();
  expect(hasProducts).toBeTruthy();
});
```

### 2. Page Object Layer
**Purpose**: Abstract UI interactions

**Files**: `pages/*.ts`

**Responsibilities**:
- Element selectors management
- Page-specific actions
- Navigation logic
- Element wait strategies

**Hierarchy**:
```
BasePage (abstract)
  ├── HomePage (extends BasePage)
  └── ParfumPage (extends BasePage)
```

**Example**:
```typescript
export class HomePage extends BasePage {
  private cookieButton = 'button:has-text("Accept")';

  async acceptCookies() {
    await this.page.locator(this.cookieButton).click();
  }
}
```

### 3. Utility Layer
**Purpose**: Provide reusable functions and configuration

**Files**: `utils/*.ts`

**Components**:

#### config.ts
- Environment configuration
- Timeout settings
- URL management

#### helpers.ts
- Common DOM interactions
- Wait utilities
- Screenshot helpers

#### logger.ts
- Test execution logging
- Error tracking
- Debug information

### 4. Data Layer
**Purpose**: External test data management

**Files**: `data/*.json`

**Structure**:
```json
{
  "highlights": [
    { "name": "Sale", "enabled": true }
  ],
  "categories": {
    "marke": { "label": "Marke" }
  }
}
```

**Benefits**:
- Non-technical users can modify test data
- No code changes for data updates
- Easy to add test scenarios

## Design Patterns

### Page Object Model (POM)

**Implementation**:
1. Each page = one class
2. Element selectors = private properties
3. User actions = public methods
4. No assertions in page objects

**Benefits**:
- Single source of truth for selectors
- Easy maintenance
- Improved readability

### Data-Driven Testing

**Implementation**:
```typescript
filtersData.highlights.forEach((filter) => {
  test(\`filter by \${filter.name}\`, async () => {
    await parfumPage.applyFilter(filter.name);
  });
});
```

**Benefits**:
- Same test logic, multiple data sets
- Easy to expand test coverage
- Reduces code duplication

### Factory Pattern

Used for creating page objects:
```typescript
test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  parfumPage = new ParfumPage(page);
});
```

## Configuration Management

### Environment-Based Config

```typescript
export const config = {
  baseURL: process.env.BASE_URL || 'default',
  timeout: parseInt(process.env.TIMEOUT || '30000')
};
```

### Multi-Environment Support

```bash
# Development
BASE_URL=https://dev.douglas.de npm test

# Staging
BASE_URL=https://staging.douglas.de npm test

# Production
BASE_URL=https://www.douglas.de npm test
```

## Error Handling Strategy

### Hierarchical Error Handling

1. **Page Object Level**: Handle UI-specific errors
```typescript
async acceptCookies() {
  try {
    await cookieButton.click();
  } catch {
    console.log('Cookie banner not found');
  }
}
```

2. **Test Level**: Handle test-specific errors
```typescript
test('should filter', async () => {
  try {
    await parfumPage.applyFilter('Sale');
  } catch (error) {
    await screenshot(page, 'filter-error');
    throw error;
  }
});
```

3. **Framework Level**: Global error handling via Playwright hooks

## Reporting Architecture

### Multi-Level Reporting

```
Test Execution
      │
      ├──> Console Output (real-time)
      │
      ├──> Log Files (persistent)
      │
      ├──> HTML Report (visual)
      │
      └──> Allure Report (comprehensive)
```

### Report Components

1. **Console**: Immediate feedback
2. **Logs**: Detailed execution trace
3. **Screenshots**: Failure evidence
4. **Videos**: Test replay
5. **HTML Report**: Summary and trends
6. **Allure**: Advanced analytics

## Scalability Considerations

### Horizontal Scaling
- Parallel test execution
- Worker configuration
- Test sharding

### Vertical Scaling
- Optimized selectors
- Efficient waits
- Resource management

### Cloud Scaling
- CI/CD integration
- Containerization
- Distributed execution

## Security Considerations

### Credentials Management
- Never commit credentials
- Use environment variables
- Encrypt sensitive data

### Test Data
- Anonymize production data
- Use mock data when possible
- GDPR compliance

## Performance Optimization

### Test Execution Speed
- Parallel execution (3 workers)
- Network idle wait strategy
- Efficient selectors

### Resource Usage
- Browser context reuse
- Proper cleanup
- Memory management

## Maintenance Strategy

### Selector Strategy
- Prefer data-testid attributes
- Fallback selectors
- Regular selector audits

### Version Management
- Lock dependencies
- Test against new Playwright versions
- Browser version compatibility

### Documentation
- Inline comments (minimal)
- External documentation (comprehensive)
- Code self-documentation
