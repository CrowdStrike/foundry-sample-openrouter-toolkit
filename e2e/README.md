# E2E Tests for OpenRouter Toolkit

End-to-end tests for the OpenRouter Toolkit Foundry extension using Playwright.

## What is Tested

- Extension installation and accessibility from NGSIEM Workbench
- Extension renders in `ngsiem.workbench.details` socket
- UI components load properly within iframe
- Query form elements are present and functional

## Setup

### Prerequisites

- Node.js 22+
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

Create a `.env` file:

```env
APP_NAME=foundry-sample-openrouter-toolkit
FALCON_BASE_URL=https://falcon.us-2.crowdstrike.com
FALCON_USERNAME=your-falcon-username
FALCON_PASSWORD=your-falcon-password
FALCON_AUTH_SECRET=your-mfa-secret-key
```

**Note**: `APP_NAME` must match the deployed app name in Falcon.

## Running Tests

```bash
npm test              # Run all tests
npm run test:debug    # Debug mode with browser
npm run test:ui       # Interactive Playwright UI
```

## CI/CD

E2E tests run automatically on push to `main` and pull requests. The CI workflow builds the UI, deploys the app, runs tests, and cleans up.

## Troubleshooting

### App Not Found
- Verify `APP_NAME` in `.env` matches the deployed app name
- Manually install from the Foundry App Catalog if needed

### Authentication Failures
- Verify credentials and MFA secret key are correct
- Check account has necessary permissions

### Extension Not Rendering
- Verify app is properly deployed
- Check you're navigating to an actual NGSIEM incident
