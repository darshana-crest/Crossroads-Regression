// import { test, expect } from '@playwright/test';
// import LoginPage from '../Pages/LoginPage.js';
// import users from '../fixtures/users.json';

// test('TC01 - Verify Mandatory Fields Highlight on Show Required Fields', async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   // Step 1: Login
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);

//   await page.waitForLoadState('networkidle');

//   // Step 2: Navigate to Listing -> Add Listing
//   await page.getByRole('button', { name: 'Listing' }).click();
//   await page.getByText('Add Listing', { exact: true }).click();

//   // Step 3: Verify Add Listing form loaded
//   await expect(page.getByRole('heading', { name: 'Listing Details' })).toBeVisible();

//   // Step 4: Click "Show Required Fields"
//   await page.getByRole('button', { name: 'Show Required Fields' }).click();

//   // Step 5: Verify required fields are highlighted
//   const requiredFields = [
//     { label: 'Primary Agent', selector: '#primaryAgent' },
//     { label: 'Listing Type', selector: '#listingType' },
//     { label: 'Transaction Type', selector: '#transactionType' },
//     { label: 'Owner Information', selector: '#ownerInfo' },
//     { label: 'Commission Split', selector: '#commissionSplit' },
//     { label: 'Property Name', selector: '#propertyName' },
//     { label: 'Island', selector: '#island' },
//     { label: 'Area', selector: '#area' }
//   ];

//   for (const field of requiredFields) {
//     const fieldLocator = page.locator(field.selector);

//     if (await fieldLocator.count() === 0) {
//       console.log(`❌ Field not found: ${field.label}`);
//       continue;
//     }

//     // ✅ Check if highlighted in red (example: has class "error" or border style)
//     const className = await fieldLocator.first().getAttribute('class');
//     console.log(`Field "${field.label}" classes: ${className}`);

//     // If your app adds a specific error/highlight class (adjust as per app)
//     expect(className).toMatch(/error|invalid|required/i);
//   }
// });



import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
 

test('test', async ({ page }) => {
  await page.goto('https://stage-crossroads20.hgchristie.net/signin');
  await page.getByRole('textbox', { name: 'Email' }).fill('dptesthgc@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@1234');
  await page.getByRole('button', { name: 'Login' }).click();
});