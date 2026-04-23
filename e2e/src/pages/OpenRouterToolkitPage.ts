import { Page, expect, FrameLocator } from '@playwright/test';
import { SocketNavigationPage } from '@crowdstrike/foundry-playwright';

export class OpenRouterToolkitPage extends SocketNavigationPage {
  constructor(page: Page) {
    super(page);
  }

  async searchForNode(searchTerm: string): Promise<void> {
    return this.withTiming(async () => {
      let searchBox = this.page.getByRole('searchbox').first();
      const searchBoxVisible = await searchBox.isVisible().catch(() => false);

      if (!searchBoxVisible) {
        const searchButton = this.page.getByRole('button', { name: 'Search on graph' });
        await searchButton.waitFor({ state: 'visible', timeout: 10000 });
        await searchButton.click();
        await searchBox.waitFor({ state: 'visible', timeout: 5000 });
      }

      await searchBox.clear();
      await searchBox.fill(searchTerm);

      const resultsHeading = this.page.locator('text=/search results/i').first();
      await resultsHeading.waitFor({ state: 'visible', timeout: 10000 });

      const resultButtons = this.page.locator('button').filter({ hasText: /matches/i });
      const resultCount = await resultButtons.count();

      if (resultCount === 0) {
        throw new Error(`No search result buttons found for: ${searchTerm}`);
      }

      await resultButtons.first().click();

      const detailsHeading = this.page.locator('h2, h1').first();
      await detailsHeading.waitFor({ state: 'visible', timeout: 10000 });
    }, `Search for: ${searchTerm}`);
  }

  async verifyExtensionRenders(): Promise<void> {
    return this.withTiming(async () => {
      await this.page.waitForLoadState('domcontentloaded');

      const extensionHeading = this.page.locator('button', {
        hasText: /OpenRouter Toolkit/i,
      }).first();

      for (let attempt = 1; attempt <= 3; attempt++) {
        await this.page.keyboard.press('End');
        await this.page.keyboard.press('End');
        await this.page.waitForLoadState('domcontentloaded');

        const isVisible = await extensionHeading.isVisible().catch(() => false);
        if (isVisible) break;

        if (attempt < 3) {
          await this.page.keyboard.press('Home');
          await this.page.waitForLoadState('domcontentloaded');
        }
      }

      await extensionHeading.waitFor({ state: 'visible', timeout: 30000 });
      await extensionHeading.scrollIntoViewIfNeeded({ timeout: 10000 });

      const isExpanded = await extensionHeading.getAttribute('aria-expanded');
      if (isExpanded === 'false' || isExpanded === null) {
        await extensionHeading.click();
        await this.page.waitForLoadState('domcontentloaded');
      }

      await expect(this.page.locator('iframe[name="portal"]')).toBeVisible({ timeout: 15000 });

      const iframe: FrameLocator = this.page.frameLocator('iframe[name="portal"]');

      const requestTab = iframe.getByRole('tab', { name: /request/i });
      await expect(requestTab).toBeVisible({ timeout: 10000 });

      const queryInput = iframe.getByRole('textbox', { name: /query/i });
      await expect(queryInput).toBeVisible({ timeout: 10000 });

      const modelSelector = iframe.getByRole('combobox', { name: /model/i });
      await expect(modelSelector).toBeVisible({ timeout: 10000 });

      const submitButton = iframe.getByRole('button', { name: /submit/i });
      await expect(submitButton).toBeVisible({ timeout: 10000 });
    }, 'Verify OpenRouter Toolkit extension renders');
  }

  async verifyQueryFormPresent(): Promise<void> {
    return this.withTiming(async () => {
      const iframe: FrameLocator = this.page.frameLocator('iframe[name="portal"]');

      const queryInput = iframe.locator('textarea, input[type="text"]').first();
      await expect(queryInput).toBeVisible({ timeout: 10000 });

      const modelSelect = iframe.locator('select, [role="combobox"]').first();
      await expect(modelSelect).toBeVisible({ timeout: 5000 });

      const submitButton = iframe.getByRole('button', { name: /submit|send|query/i }).or(
        iframe.locator('button[type="submit"]'),
      );
      await expect(submitButton).toBeVisible({ timeout: 5000 });
    }, 'Verify query form present');
  }

  async testBasicQueryInteraction(): Promise<void> {
    return this.withTiming(async () => {
      const iframe: FrameLocator = this.page.frameLocator('iframe[name="portal"]');

      const queryInput = iframe.getByRole('textbox', { name: /query/i });
      await queryInput.fill('What is this incident about?');

      const submitButton = iframe.getByRole('button', { name: /submit/i });
      await submitButton.click({ force: true });
    }, 'Test basic query interaction');
  }
}
