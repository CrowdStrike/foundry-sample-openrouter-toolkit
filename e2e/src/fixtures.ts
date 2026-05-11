import { test as baseTest } from '@playwright/test';
import { OpenRouterToolkitPage } from './pages/OpenRouterToolkitPage';

type FoundryFixtures = {
  openRouterToolkitPage: OpenRouterToolkitPage;
};

export const test = baseTest.extend<FoundryFixtures>({
  openRouterToolkitPage: async ({ page }, use) => {
    await use(new OpenRouterToolkitPage(page));
  },
});

export { expect } from '@playwright/test';
