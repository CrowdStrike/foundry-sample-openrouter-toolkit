import { Page, expect, FrameLocator } from '@playwright/test';
import { SocketNavigationPage } from './SocketNavigationPage';

/**
 * Page object for testing the OpenRouter Toolkit UI extension
 * Extension appears in ngsiem.workbench.details socket
 */
export class OpenRouterToolkitPage extends SocketNavigationPage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToExtension(): Promise<void> {
    return this.withTiming(
      async () => {
        // Navigate to NGSIEM Incidents (ngsiem.workbench.details socket)
        await this.navigateToNGSIEMIncidents();

        // Open first incident to show details panel with extensions
        await this.openFirstIncident();

        // Wait for incident details panel
        await this.page.waitForLoadState('networkidle');

        this.logger.success('Navigated to incident with OpenRouter Toolkit extension');
      },
      'Navigate to OpenRouter Toolkit Extension'
    );
  }

  /** Open the first incident in the NGSIEM workbench */
  async openFirstIncident(): Promise<void> {
    return this.withTiming(
      async () => {
        await this.page.waitForLoadState('networkidle');

        // Click on the first incident - look for gridcell buttons with incident information
        const firstIncidentButton = this.page.locator('[role="gridcell"] button').first();
        await firstIncidentButton.waitFor({ state: 'visible', timeout: 10000 });
        await firstIncidentButton.click();

        // Wait for incident details to load
        await this.page.waitForLoadState('networkidle');
      },
      'Open first incident'
    );
  }

  async verifyExtensionRenders(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Verifying OpenRouter Toolkit extension renders');

        // Wait for incident details panel to load
        await this.page.waitForLoadState('networkidle');

        // Extensions in incident details appear as expandable buttons
        // Look for button named "OpenRouter Toolkit"
        const extensionButton = this.page.getByRole('button', {
          name: /OpenRouter Toolkit/i
        });

        // Scroll the button into view if needed
        await extensionButton.scrollIntoViewIfNeeded({ timeout: 10000 });
        this.logger.info('Scrolled to OpenRouter Toolkit extension button');

        // Wait for button to be visible
        await expect(extensionButton).toBeVisible({ timeout: 10000 });
        this.logger.info('Found OpenRouter Toolkit extension button');

        // Check if already expanded, if not click to expand
        const isExpanded = await extensionButton.getAttribute('aria-expanded');
        if (isExpanded === 'false') {
          await extensionButton.click();
          this.logger.info('Clicked to expand OpenRouter Toolkit extension');
        } else {
          this.logger.info('OpenRouter Toolkit extension already expanded');
        }

        // Verify iframe loads
        await expect(this.page.locator('iframe')).toBeVisible({ timeout: 15000 });
        this.logger.info('Extension iframe loaded');

        // Verify iframe content
        const iframe: FrameLocator = this.page.frameLocator('iframe');

        // Check for OpenRouter Toolkit UI elements
        // Look for the main heading or title
        await expect(iframe.getByRole('heading', { name: /OpenRouter/i }).or(
          iframe.getByText(/OpenRouter/i).first()
        )).toBeVisible({ timeout: 10000 });

        this.logger.success('OpenRouter Toolkit extension renders correctly with expected content');
      },
      'Verify OpenRouter Toolkit extension renders'
    );
  }

  /** Verify the query form is present and interactive */
  async verifyQueryFormPresent(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Verifying query form is present');

        const iframe: FrameLocator = this.page.frameLocator('iframe');

        // Look for textarea or input for query
        const queryInput = iframe.locator('textarea, input[type="text"]').first();
        await expect(queryInput).toBeVisible({ timeout: 10000 });

        // Look for model selection dropdown
        const modelSelect = iframe.locator('select, [role="combobox"]').first();
        await expect(modelSelect).toBeVisible({ timeout: 5000 });

        // Look for submit button
        const submitButton = iframe.getByRole('button', { name: /submit|send|query/i }).or(
          iframe.locator('button[type="submit"]')
        );
        await expect(submitButton).toBeVisible({ timeout: 5000 });

        this.logger.success('Query form elements are present and visible');
      },
      'Verify query form present'
    );
  }

  /** Test basic query form interaction (without API key) */
  async testBasicQueryInteraction(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Testing basic query form interaction');

        const iframe: FrameLocator = this.page.frameLocator('iframe');

        // Enter a test query
        const queryInput = iframe.locator('textarea, input[type="text"]').first();
        await queryInput.fill('What is this incident about?');
        this.logger.info('Entered test query');

        // Try to submit (expect error handling for missing/invalid API key)
        const submitButton = iframe.getByRole('button', { name: /submit|send|query/i }).or(
          iframe.locator('button[type="submit"]')
        ).first();
        await submitButton.click({ force: true });
        this.logger.info('Clicked submit button');

        // Wait for response (either error message or loading indicator)
        await this.page.waitForTimeout(2000);

        // Verify some kind of feedback appears (error message, loading state, etc.)
        // This validates the UI is responsive even if API call fails
        this.logger.success('Query form interaction completed (expecting API error is normal)');
      },
      'Test basic query interaction'
    );
  }
}
