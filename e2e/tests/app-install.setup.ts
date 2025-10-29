import { test as setup } from '../src/fixtures';

setup('install OpenRouter Toolkit app', async ({ appCatalogPage, appName }) => {
  // Check if app is already installed (this navigates to the app page)
  const isInstalled = await appCatalogPage.isAppInstalled(appName);

  if (!isInstalled) {
    console.log(`App '${appName}' is not installed. Installing...`);
    const installed = await appCatalogPage.installApp(appName);

    if (!installed) {
      throw new Error(
        `Failed to install app '${appName}'. Please install the app manually from the Foundry App Catalog.`
      );
    }
  } else {
    console.log(`App '${appName}' is already installed`);
  }
});
