import { Page, expect, FrameLocator } from '@playwright/test';
import { SocketNavigationPage } from './SocketNavigationPage';

/**
 * Page object for testing the OpenRouter Toolkit UI extension
 */
export class OpenRouterToolkitPage extends SocketNavigationPage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToExtension(): Promise<void> {
    return this.withTiming(
      async () => {
        await this.navigateToNGSIEMIncidents();
        await this.openFirstCase();
        await this.navigateToWorkbench();
        await this.clickGraphNode();
        await this.page.waitForLoadState('networkidle');

        this.logger.success('Navigated to incident workbench with OpenRouter Toolkit extension');
      },
      'Navigate to OpenRouter Toolkit Extension'
    );
  }

  async openFirstCase(): Promise<void> {
    return this.withTiming(
      async () => {
        await this.page.waitForLoadState('networkidle');

        const firstIncidentButton = this.page.locator('[role="gridcell"] button, [role="row"]:has([role="gridcell"]) a').first();
        await firstIncidentButton.waitFor({ state: 'visible', timeout: 15000 });
        await firstIncidentButton.click();

        await this.page.waitForLoadState('networkidle');

        this.logger.success('Opened first incident');
      },
      'Open first incident'
    );
  }

  async navigateToWorkbench(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Navigating to Workbench view via Actions menu');

        const actionsButton = this.page.getByRole('button', { name: /Actions/i });
        await actionsButton.waitFor({ state: 'visible', timeout: 10000 });
        await actionsButton.click();
        this.logger.debug('Clicked Actions button');

        const workbenchViewOption = this.page.getByRole('menuitem', { name: /Workbench View/i }).or(
          this.page.locator('text="Workbench View"')
        );
        await workbenchViewOption.waitFor({ state: 'visible', timeout: 10000 });
        await workbenchViewOption.click();
        this.logger.debug('Clicked Workbench View');

        await this.page.waitForLoadState('networkidle');

        this.logger.success('Navigated to Workbench view');
      },
      'Navigate to Workbench view'
    );
  }

  async searchForNode(searchTerm: string): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info(`Searching for: ${searchTerm}`);

        let searchBox = this.page.getByRole('searchbox').first();
        const searchBoxVisible = await searchBox.isVisible().catch(() => false);

        if (!searchBoxVisible) {
          const searchButton = this.page.getByRole('button', { name: 'Search on graph' });
          await searchButton.waitFor({ state: 'visible', timeout: 10000 });
          await searchButton.click();
          this.logger.debug('Clicked "Search on graph" button');

          await searchBox.waitFor({ state: 'visible', timeout: 5000 });
          this.logger.debug('Search box appeared');
        }

        await searchBox.clear();
        await searchBox.fill(searchTerm);
        this.logger.debug(`Entered search term: ${searchTerm}`);

        await this.page.waitForTimeout(3000);

        const resultsHeading = this.page.locator('text=/search results/i').first();
        const hasResults = await resultsHeading.isVisible({ timeout: 2000 }).catch(() => false);

        if (!hasResults) {
          this.logger.warn(`No search results found for: ${searchTerm}`);
          throw new Error(`No search results found for: ${searchTerm}`);
        }

        const resultButtons = this.page.locator('button').filter({ hasText: /matches/i });
        const resultCount = await resultButtons.count();

        if (resultCount === 0) {
          this.logger.warn(`No result buttons found for: ${searchTerm}`);
          throw new Error(`No search result buttons found for: ${searchTerm}`);
        }

        this.logger.debug(`Found ${resultCount} search result buttons`);
        await resultButtons.first().click();
        this.logger.debug('Clicked first search result');

        const detailsHeading = this.page.locator('h2, h1').first();
        await detailsHeading.waitFor({ state: 'visible', timeout: 10000 });
        this.logger.success('Details panel opened for selected node');
      },
      `Search for: ${searchTerm}`
    );
  }

  async clickGraphNode(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Selecting a graph node to reveal extension panel');

        await this.page.waitForLoadState('networkidle');

        // Wait for loading indicators to disappear
        const loadingIndicators = this.page.locator('[class*="loading"], [class*="spinner"], [data-testid*="loading"]');
        const spinnerCount = await loadingIndicators.count();
        if (spinnerCount > 0) {
          this.logger.debug(`Waiting for ${spinnerCount} loading indicators to disappear`);
          try {
            await loadingIndicators.first().waitFor({ state: 'hidden', timeout: 30000 });
            this.logger.debug('Loading indicators disappeared');
          } catch (error) {
            this.logger.warn('Loading indicators still present after 30s, continuing anyway');
          }
        }

        // Wait for graph to render
        const graphContainer = this.page.locator('canvas, svg').first();
        await graphContainer.waitFor({ state: 'visible', timeout: 15000 });
        this.logger.debug('Graph container is visible');

        // Wait for toolbar to be ready
        await this.page.waitForTimeout(3000);

        // Use search to select a node - searching for "e" returns multiple results
        await this.searchForNode('e');
        this.logger.success('Successfully selected a node using search');
      },
      'Click graph node'
    );
  }

  async verifyExtensionRenders(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Verifying OpenRouter Toolkit extension renders');

        await this.page.waitForLoadState('networkidle');

        // Scroll to bottom of details panel where extensions appear
        await this.page.keyboard.press('End');
        await this.page.keyboard.press('End');
        await this.page.waitForTimeout(1000);

        const extensionHeading = this.page.locator('button', {
          hasText: /OpenRouter Toolkit/i
        }).first();

        await extensionHeading.waitFor({ state: 'visible', timeout: 15000 });
        this.logger.info('Found OpenRouter Toolkit extension heading');

        await extensionHeading.scrollIntoViewIfNeeded({ timeout: 5000 });

        // Expand extension if collapsed
        const isExpanded = await extensionHeading.getAttribute('aria-expanded');
        if (isExpanded === 'false' || isExpanded === null) {
          this.logger.info('Extension is collapsed, clicking to expand');
          await extensionHeading.click();
          await this.page.waitForTimeout(1000);
          this.logger.info('Clicked to expand OpenRouter Toolkit extension');
        }

        // Verify iframe and form elements
        await expect(this.page.locator('iframe')).toBeVisible({ timeout: 15000 });
        this.logger.info('Extension iframe loaded');

        const iframe: FrameLocator = this.page.frameLocator('iframe');

        const requestTab = iframe.getByRole('tab', { name: /request/i });
        await expect(requestTab).toBeVisible({ timeout: 10000 });

        const queryInput = iframe.getByRole('textbox', { name: /query/i });
        await expect(queryInput).toBeVisible({ timeout: 10000 });

        const modelSelector = iframe.getByRole('combobox', { name: /model/i });
        await expect(modelSelector).toBeVisible({ timeout: 10000 });

        const submitButton = iframe.getByRole('button', { name: /submit/i });
        await expect(submitButton).toBeVisible({ timeout: 10000 });

        this.logger.success('OpenRouter Toolkit extension renders correctly with all expected form elements');
      },
      'Verify OpenRouter Toolkit extension renders'
    );
  }

  async verifyQueryFormPresent(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Verifying query form is present');

        const iframe: FrameLocator = this.page.frameLocator('iframe');

        const queryInput = iframe.locator('textarea, input[type="text"]').first();
        await expect(queryInput).toBeVisible({ timeout: 10000 });

        const modelSelect = iframe.locator('select, [role="combobox"]').first();
        await expect(modelSelect).toBeVisible({ timeout: 5000 });

        const submitButton = iframe.getByRole('button', { name: /submit|send|query/i }).or(
          iframe.locator('button[type="submit"]')
        );
        await expect(submitButton).toBeVisible({ timeout: 5000 });

        this.logger.success('Query form elements are present and visible');
      },
      'Verify query form present'
    );
  }

  async testBasicQueryInteraction(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Testing basic query form interaction');

        const iframe: FrameLocator = this.page.frameLocator('iframe');

        const queryInput = iframe.getByRole('textbox', { name: /query/i });
        await queryInput.fill('What is this incident about?');
        this.logger.info('Entered test query');

        const submitButton = iframe.getByRole('button', { name: /submit/i });
        await submitButton.click({ force: true });
        this.logger.info('Clicked submit button');

        this.logger.success('Query form interaction completed (expecting API error is normal)');
      },
      'Test basic query interaction'
    );
  }
}
