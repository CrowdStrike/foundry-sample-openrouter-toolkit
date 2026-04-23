import { test as baseTest } from '@playwright/test';
import {
  AppCatalogPage,
  config,
} from '@crowdstrike/foundry-playwright';
import { OpenRouterToolkitPage } from './pages/OpenRouterToolkitPage';

type FoundryFixtures = {
  appCatalogPage: AppCatalogPage;
  openRouterToolkitPage: OpenRouterToolkitPage;
  appName: string;
};

export const test = baseTest.extend<FoundryFixtures>({
  appCatalogPage: async ({ page }, use) => {
    await use(new AppCatalogPage(page));
  },

  openRouterToolkitPage: async ({ page }, use) => {
    await use(new OpenRouterToolkitPage(page));
  },

  appName: async ({}, use) => {
    await use(config.appName);
  },
});

export { expect } from '@playwright/test';
