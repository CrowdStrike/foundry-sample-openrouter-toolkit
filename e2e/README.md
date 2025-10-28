# E2E Tests for OpenRouter Toolkit

End-to-end tests for the OpenRouter Toolkit Foundry extension using Playwright.

## What is Tested

This E2E test suite verifies:

1. **Extension Installation and Discovery**
   - Extension accessibility from NGSIEM Incidents page
   - Extension renders in `ngsiem.workbench.details` socket

2. **Extension UI Rendering**
   - Extension iframe loads properly
   - UI components render without errors
   - Query form elements are present and visible

3. **Basic Functionality**
   - Form interactions work correctly
   - Error handling for invalid/missing API key
   - UI responsiveness validation

## Test Limitations

Due to the nature of the OpenRouter Toolkit extension:

- **API Integration**: Tests use dummy API keys and expect graceful error handling
- **Incident Context**: Full context-aware features require real incident data
- **AI Responses**: Tests focus on form submission and error handling, not actual AI response content

## Setup

### Prerequisites

- Node.js 22+
- npm or yarn
- Valid Falcon credentials with MFA configured
- OpenRouter Toolkit app deployed to your Falcon environment

### Installation

```bash
cd e2e
npm ci
npx playwright install chromium
cp .env.sample .env
# Edit .env with your credentials
```

### Environment Variables

Create a `.env` file in the `e2e` directory with the following variables:

```env
APP_NAME=foundry-sample-openrouter-toolkit
FALCON_BASE_URL=https://falcon.us-2.crowdstrike.com
FALCON_USERNAME=your-falcon-username
FALCON_PASSWORD=your-falcon-password
FALCON_AUTH_SECRET=your-mfa-secret-key
OPENROUTER_API_KEY=dummy-key-for-testing
```

**Important**: The `APP_NAME` must exactly match the deployed app name in Falcon.

## Running Tests

### Local Testing

```bash
npm test              # Run all tests
npm run test:debug    # Debug mode with browser
npm run test:ui       # Interactive Playwright UI
npm run test:verbose  # Verbose output with DEBUG logs
```

### CI/CD

E2E tests run automatically on:
- Push to `main` branch
- Pull requests to `main`
- Manual workflow dispatch

The CI workflow:
1. Builds the UI extension
2. Deploys the app to Falcon with a unique name
3. Runs all E2E tests
4. Uploads test results and screenshots
5. Cleans up by deleting the deployed app

## Test Structure

```
e2e/
├── src/
│   ├── pages/           # Page object models
│   │   ├── BasePage.ts
│   │   ├── FoundryHomePage.ts
│   │   ├── AppCatalogPage.ts
│   │   ├── AppManagerPage.ts
│   │   ├── SocketNavigationPage.ts
│   │   └── OpenRouterToolkitPage.ts
│   ├── config/          # Test configuration
│   └── utils/           # Utilities and helpers
├── tests/
│   ├── authenticate.setup.ts      # Authentication setup
│   ├── app-install.setup.ts       # App installation
│   ├── foundry.spec.ts            # Main test suite
│   └── app-uninstall.teardown.ts  # Cleanup
└── playwright.config.ts           # Playwright configuration
```

## Test Scenarios

### 1. Extension Installation and Discovery
Verifies the extension is accessible from the NGSIEM Incidents page.

### 2. Extension Rendering
Tests that the extension:
- Appears in the correct socket
- Expands when clicked
- Loads iframe content properly
- Displays OpenRouter branding/UI

### 3. Query Form Validation
Verifies that:
- Query input field is present
- Model selection dropdown exists
- Submit button is visible and clickable

### 4. Basic Interaction
Tests form submission with dummy credentials and validates:
- UI responds to user input
- Error handling works correctly
- No JavaScript errors prevent loading

## Troubleshooting

### App Not Found
If tests fail with "app not found":
1. Verify `APP_NAME` in `.env` matches the deployed app name exactly
2. Check the app is installed in your Falcon environment
3. Try manually installing from Custom Apps menu

### Authentication Failures
If authentication fails:
1. Verify `FALCON_USERNAME` and `FALCON_PASSWORD` are correct
2. Ensure `FALCON_AUTH_SECRET` is the correct MFA secret key
3. Check your Falcon account has necessary permissions

### Extension Not Rendering
If extension doesn't appear:
1. Verify the app is properly deployed with the extension
2. Check you're navigating to an actual NGSIEM incident
3. Ensure the socket location `ngsiem.workbench.details` is correct

### Test Timeouts
If tests timeout:
1. Increase timeouts in `playwright.config.ts`
2. Check network connectivity to Falcon
3. Verify the app deployment is complete and healthy

## Contributing

When adding new tests:
1. Follow the existing page object model pattern
2. Use semantic locators (getByRole, getByText) over CSS selectors
3. Add proper error handling and logging
4. Update this README with new test scenarios

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Foundry Documentation](https://docs.crowdstrike.com/falcon-foundry/)
- [E2E Testing Best Practices](https://playwright.dev/docs/best-practices)
