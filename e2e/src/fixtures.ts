import { test as baseTest } from '@playwright/test';
import { AppCatalogPage } from './pages/AppCatalogPage';
import { OpenRouterToolkitPage } from './pages/OpenRouterToolkitPage';
import { config } from './config/TestConfig';

type FoundryFixtures = {
  appCatalogPage: AppCatalogPage;
  openRouterToolkitPage: OpenRouterToolkitPage;
  appName: string;
};

export const test = baseTest.extend<FoundryFixtures>({
  // Configure page with centralized settings
  page: async ({ page }, use) => {
    const timeouts = config.getPlaywrightTimeouts();
    page.setDefaultTimeout(timeouts.timeout);

    // Log configuration on first use
    if (!process.env.CONFIG_LOGGED) {
      config.logSummary();
      process.env.CONFIG_LOGGED = 'true';
    }

    await use(page);
  },

  // Page object fixtures with dependency injection
  appCatalogPage: async ({ page }, use) => {
    await use(new AppCatalogPage(page));
  },

  openRouterToolkitPage: async ({ page }, use) => {
    await use(new OpenRouterToolkitPage(page));
  },

  // App name from centralized config
  appName: async ({}, use) => {
    await use(config.appName);
  },
});

export { expect } from '@playwright/test';