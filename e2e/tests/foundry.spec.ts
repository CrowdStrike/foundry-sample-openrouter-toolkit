import { test, expect } from '../src/fixtures';

test.describe.configure({ mode: 'parallel' });

test.describe('OpenRouter Toolkit Extension E2E Tests', () => {
  test.describe('Extension Installation and Discovery', () => {
    test('should verify OpenRouter Toolkit extension is accessible from Cases page', async ({ openRouterToolkitPage, page }) => {
      await openRouterToolkitPage.navigateToNGSIEMCases();
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/\/xdr\/cases/);
    });
  });

  test.describe('Extension Rendering and UI Verification', () => {
    test('should navigate to extension and verify it renders', async ({ openRouterToolkitPage }) => {
      await openRouterToolkitPage.navigateToNGSIEMCaseExtension();
      await openRouterToolkitPage.verifyExtensionRenders();
    });

    test('should verify query form is present', async ({ openRouterToolkitPage }) => {
      await openRouterToolkitPage.navigateToNGSIEMCaseExtension();
      await openRouterToolkitPage.verifyExtensionRenders();
      await openRouterToolkitPage.verifyQueryFormPresent();
    });
  });

  test.describe('Extension Functionality', () => {
    test('should test basic query form interaction', async ({ openRouterToolkitPage }) => {
      await openRouterToolkitPage.navigateToNGSIEMCaseExtension();
      await openRouterToolkitPage.verifyExtensionRenders();
      await openRouterToolkitPage.testBasicQueryInteraction();
    });
  });

  test.describe('Extension UI Content', () => {
    test('should verify extension iframe loads without errors', async ({ openRouterToolkitPage, page }) => {
      await openRouterToolkitPage.navigateToNGSIEMCaseExtension();
      await openRouterToolkitPage.verifyExtensionRenders();

      const iframe = page.locator('iframe[name="portal"]');
      await expect(iframe).toBeVisible({ timeout: 15000 });

      const iframeContent = page.frameLocator('iframe[name="portal"]');

      const requestTab = iframeContent.getByRole('tab', { name: /request/i });
      await expect(requestTab).toBeVisible({ timeout: 15000 });

      const loadingIndicators = iframeContent.locator('.loading, .spinner, [data-testid="loading"], [aria-label*="loading"], sl-spinner');
      const loadingCount = await loadingIndicators.count();

      if (loadingCount > 0) {
        await expect(loadingIndicators.first()).not.toBeVisible({ timeout: 10000 });
      }
    });
  });
});
