import { test as setup } from '@playwright/test';
import { AppCatalogPage, config } from '@crowdstrike/foundry-playwright';

setup('install app', async ({ page }) => {
  setup.setTimeout(120000);
  const catalog = new AppCatalogPage(page);
  await catalog.installApp(config.appName, {
    configureSettings: async (page) => {
      await page.getByLabel('Name').fill('OpenRouter API');
      await page.getByLabel('API key').fill('sk-dummy-api-key-12345');
    },
  });
});
