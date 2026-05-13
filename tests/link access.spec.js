const { test, expect } = require('@playwright/test');

test('Launch Web Application and Verify Title', async ({ page }) => {
  await page.goto('https://d1h8bf2ipt2loq.cloudfront.net/signin');

  // Check for expected title (update regex if needed)
  await expect(page).toHaveTitle(/Sign In/);

  // Check that login button is visible
  await expect(page.getByRole('button', { name: /Login|Sign In/})).toBeVisible();
});
