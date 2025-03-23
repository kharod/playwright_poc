# MyLocalSearch Automation Testing Framework

This repository showcases automation testing skills using Playwright with TypeScript. The test suite runs against a custom-built local HTML page called "MyLocalSearch," which mimics Google's search page.

## Features

- **Page Object Model (POM)**: Well-structured and maintainable code
- **External Locators**: Element selectors stored in separate JSON files
- **Data-Driven Testing**: Test data stored in JSON format
- **Detailed Reporting**: Test execution reports with screenshots
- **Cross-Browser Testing**: Tests run on Chromium, Firefox, and WebKit
- **CI/CD Integration**: Configured with GitHub Actions
- **Failure Analysis**: Screenshots captured for failed tests
- **Visual Testing**: Screenshots for comparison between runs
- **Responsive Testing**: Tests for different viewport sizes
- **Retry Mechanism**: Automatic retries for flaky tests
- **Step-by-Step Logging**: Detailed test execution flow
- **Custom Utilities**: Helper methods for common tasks

## Technology Stack

- **Playwright**: Modern automation framework for web applications
- **TypeScript**: Type-safe JavaScript for better maintainability
- **Node.js**: JavaScript runtime environment
- **HTML/CSS/JavaScript**: Front-end technologies for the test application
- **GitHub Actions**: CI/CD pipeline
- **Jest**: Assertion library
- **ESLint**: Code quality and style checking

## Project Structure

```
├── public/                   # Web pages for testing
│   ├── index.html            # MyLocalSearch home page
│   ├── results.html          # Search results page
│   └── lucky.html            # "I'm Feeling Lucky" page
├── src/
│   ├── pages/                # Page objects
│   │   ├── BasePage.ts       # Base page with common functions
│   │   ├── SearchPage.ts     # Home page POM
│   │   ├── SearchResultsPage.ts # Results page POM
│   │   └── LuckyPage.ts      # Lucky page POM
│   ├── locators/             # Element locators
│   │   └── search-page-locators.json
│   ├── data/                 # Test data files
│   │   └── search-data.json
│   └── utils/                # Utility functions
│       └── reportHelper.ts   # Reporting helpers
├── tests/                    # Test files
│   ├── searchFunctionality.spec.ts
│   ├── luckyButtonFunctionality.spec.ts
│   └── uiVerification.spec.ts
├── reports/                  # Test reports (generated)
├── .github/workflows/        # GitHub Actions configurations
│   └── playwright.yml
├── playwright.config.ts      # Playwright configuration
└── package.json              # Dependencies and scripts
```

## Framework Architecture

### Page Object Model

The framework follows the Page Object Model design pattern, which encapsulates page elements and actions in dedicated classes:

- **BasePage**: Contains common methods for all pages (navigation, element interaction, etc.)
- **SearchPage**: Represents the home page with search functionality
- **SearchResultsPage**: Represents the search results page
- **LuckyPage**: Represents the "I'm Feeling Lucky" page

Each page object:
- Loads its locators from a centralized JSON file
- Provides methods for interacting with page elements
- Contains assertions and verifications relevant to that page

### Data-Driven Approach

All test data is externalized in JSON files to separate test logic from test data:

- **search-data.json**: Contains test queries, expected results, and UI verification data
- This allows for easy maintenance and expansion of test scenarios

### Reporting System

The framework uses multiple reporting mechanisms:

1. **HTML Reports**: Visual reports with test results and screenshots
2. **JSON Reports**: Structured data for programmatic analysis
3. **Screenshots**: Automatic captures on test failures
4. **Video Recording**: Captures of test execution when tests fail and are retried
5. **Trace Files**: Detailed step-by-step playback of test execution

## Test Scenarios

1. **Search Functionality Tests**
   - Search with valid queries
   - Handle empty search queries
   - Search with special characters
   - Search with long queries
   - Test for non-existent elements (intentionally failing)

2. **"I'm Feeling Lucky" Tests**
   - Test with valid queries
   - Test with empty queries
   - Verify the back button functionality

3. **UI Element Verification Tests**
   - Verify all home page UI elements
   - Test responsive design with mobile viewports
   - Verify hover effects

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)
- Browser dependencies (installed automatically by Playwright)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/playwright-automation-poc.git
   cd playwright-automation-poc
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Install Playwright browsers
   ```bash
   npx playwright install
   ```

### Running Tests

- Run all tests
  ```bash
  npm test
  ```

- Run with UI mode (for interactive debugging)
  ```bash
  npm run test:ui
  ```

- Run tests in headed mode (to see browser execution)
  ```bash
  npm run test:headed
  ```

- Run tests in a specific browser
  ```bash
  npm run test:chrome   # Chromium only
  npm run test:firefox  # Firefox only
  npm run test:webkit   # WebKit only
  ```

- View test report
  ```bash
  npm run report
  ```

- Start the local server (required for tests)
  ```bash
  npm run serve
  ```

## Advanced Usage

### Running Specific Tests

You can run specific test files or use grep to run tests that match a pattern:

```bash
# Run a specific test file
npx playwright test tests/searchFunctionality.spec.ts

# Run tests matching a pattern
npx playwright test --grep "search"

# Run a specific test within a file (line number)
npx playwright test tests/searchFunctionality.spec.ts:22
```

### Debugging Tests

For debugging, you can use the following options:

```bash
# Run in debug mode
npx playwright test --debug

# Run with UI mode
npx playwright test --ui

# Run with headed browsers
npx playwright test --headed
```

### Viewing Test Traces

Playwright captures traces for failed tests, which can be viewed using:

```bash
npx playwright show-trace path/to/trace.zip
```

## Reports

Test reports are generated in the `reports/` directory:

- **HTML Report**: `reports/html-report/`
  - Visual representation of test results
  - Screenshots of failed tests
  - Test execution time and status

- **JSON Report**: `reports/json-report/test-results.json`
  - Structured data for programmatic analysis
  - Can be integrated with other reporting tools

- **Screenshots**: `reports/screenshots/`
  - Captures of the application state
  - Useful for visual verification and debugging

- **Test Results**: `reports/test-results/`
  - Raw test execution data
  - Traces and videos for failed tests

## CI/CD Integration

This project is configured with GitHub Actions to run tests automatically on each push or pull request to the main branch. The workflow configuration is in `.github/workflows/playwright.yml`.

### CI/CD Workflow

1. **Checkout Code**: Retrieves the repository code
2. **Setup Node.js**: Installs Node.js runtime
3. **Install Dependencies**: Installs npm packages
4. **Install Playwright Browsers**: Sets up required browsers
5. **Create Reports Directory**: Prepares folders for test artifacts
6. **Run Tests**: Executes the test suite
7. **Upload Artifacts**: Stores test results for review

### Important CI/CD Requirements

- **Package Lock File**: Ensure `package-lock.json` is committed to your repository. This file is critical for CI/CD as it guarantees consistent installations across environments.
- **Node.js Version**: The workflow uses Node.js 18. Adjust if your application requires a different version.
- **Report Artifacts**: Test reports are preserved for 30 days after each run.
- **Timeouts**: The workflow has a 60-minute timeout to accommodate long-running tests.

### Viewing CI Results

After tests run in the CI pipeline:

1. Navigate to the GitHub Actions tab in your repository
2. Select the workflow run to inspect
3. Download the artifacts to view HTML reports and screenshots

## Troubleshooting

### Common Issues

1. **Tests failing on CI but passing locally**
   - Check for browser version mismatches
   - Ensure timeouts are sufficient for CI environments
   - Verify that paths are correct for both environments

2. **Element not found errors**
   - Check if locators have changed
   - Increase timeouts for slow elements
   - Verify the element is actually in the DOM

3. **Timeouts during test execution**
   - Increase the timeout values in playwright.config.ts
   - Check for performance issues in the application
   - Ensure network connectivity is stable

4. **CI/CD Pipeline dependency errors**
   - Ensure package-lock.json is committed to your repository
   - Never add package-lock.json to .gitignore
   - Run `npm ci` instead of `npm install` in CI/CD environments for consistent installations

### Solutions for Flaky Tests

1. Add retries for unstable tests:
   ```typescript
   test.describe.configure({ retries: 3 });
   ```

2. Use more robust waiting mechanisms:
   ```typescript
   await expect(locator).toBeVisible({ timeout: 10000 });
   ```

3. Add explicit waiting for network idle:
   ```typescript
   await page.waitForLoadState('networkidle');
   ```

## Best Practices Implemented

- **POM Pattern**: Separating UI interaction from test logic
- **Centralized Locators**: All element selectors in dedicated files
- **Data-Driven Approach**: Test data separated from test code
- **Meaningful Assertions**: Clear error messages for failed assertions
- **Retries**: Configured retry mechanism for flaky tests
- **Screenshot Capture**: Visual evidence of test execution
- **Step Logging**: Clear steps in test execution for better debugging
- **Browser Compatibility**: Tests run on multiple browsers
- **Responsive Testing**: Tests for different viewport sizes
- **Code Documentation**: Comprehensive comments and JSDoc annotations
- **Error Handling**: Proper try-catch blocks and error reporting
- **Clean Code**: Following SOLID principles and clean code practices
