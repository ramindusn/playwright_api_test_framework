// @ts-check
const { devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use */
    baseURL: 'https://ssd-api.jpl.nasa.gov',
    extraHTTPHeaders: {
      'Content-type' : 'application/json; charset=UTF-8',
      'Accept': '*/*',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      //'Authorization': `token ${process.env.API_TOKEN}`,
    },
  },
};

module.exports = config;
