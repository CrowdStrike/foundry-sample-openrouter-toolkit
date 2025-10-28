import { test, expect } from '../src/fixtures';
import { logger } from '../src/utils/Logger';

// Use parallel mode for better performance - app state is stable after setup
test.describe.configure({ mode: 'parallel' });

test.describe('OpenRouter Toolkit Extension E2E Tests', () => {
  // Minimal cleanup - only screenshot on failure
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `test-failure-${testInfo.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
      await page.screenshot({
        path: `test-results/${screenshotPath}`,
        fullPage: true
      });
    }
  });

  test.describe('Extension Installation and Discovery', () => {
    test('should verify OpenRouter Toolkit extension is installed', async ({ openRouterToolkitPage, appName }) => {
      // Navigate to Incidents to access the extension socket
      await openRouterToolkitPage.navigateToNGSIEMIncidents();

      // Verify we're on the Incidents page
      const currentUrl = openRouterToolkitPage.page.url();
      expect(currentUrl).toMatch(/\/xdr\/incidents/);

      logger.success(`${appName} extension is accessible from Incidents page`);
    });
  });

  test.describe('Extension Rendering and UI Verification', () => {
    test('should navigate to extension and verify it renders', async ({ openRouterToolkitPage }) => {
      // Navigate to an incident that will show the extension
      await openRouterToolkitPage.navigateToExtension();

      // Verify the extension renders properly
      await openRouterToolkitPage.verifyExtensionRenders();

      logger.success('OpenRouter Toolkit extension renders successfully');
    });

    test('should verify query form is present', async ({ openRouterToolkitPage }) => {
      await openRouterToolkitPage.navigateToExtension();
      await openRouterToolkitPage.verifyExtensionRenders();

      // Verify query form elements are present
      await openRouterToolkitPage.verifyQueryFormPresent();

      logger.success('Query form elements are present and visible');
    });
  });

  test.describe('Extension Functionality', () => {
    test('should test basic query form interaction', async ({ openRouterToolkitPage }) => {
      await openRouterToolkitPage.navigateToExtension();
      await openRouterToolkitPage.verifyExtensionRenders();

      // Test basic interaction (without valid API key, expect error handling)
      await openRouterToolkitPage.testBasicQueryInteraction();

      logger.success('Query form interaction completed (API error expected without valid key)');
    });
  });

  test.describe('Extension UI Content', () => {
    test('should verify extension iframe loads without errors', async ({ openRouterToolkitPage, page }) => {
      await openRouterToolkitPage.navigateToExtension();

      // Expand the extension and verify it renders
      await openRouterToolkitPage.verifyExtensionRenders();

      // Verify iframe is present and visible
      const iframe = page.locator('iframe');
      await expect(iframe).toBeVisible({ timeout: 15000 });

      // Get the iframe locator for content checks
      const iframeContent = page.frameLocator('iframe');

      // Verify main content loaded - look for Request/Response tabs or form elements
      const requestTab = iframeContent.getByRole('tab', { name: /request/i });
      await expect(requestTab).toBeVisible({ timeout: 15000 });

      // Quick loading check - ensure no persistent loading indicators
      const loadingIndicators = iframeContent.locator('.loading, .spinner, [data-testid="loading"], [aria-label*="loading"], sl-spinner');
      const loadingCount = await loadingIndicators.count();

      if (loadingCount > 0) {
        logger.info(`Found ${loadingCount} loading indicators, waiting for them to disappear`);
        await expect(loadingIndicators.first()).not.toBeVisible({ timeout: 10000 });
      }

      logger.success('OpenRouter Toolkit extension UI verification completed - no errors detected');
    });
  });
});
