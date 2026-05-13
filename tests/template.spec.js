import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage.js';
import TemplatePage from '../Pages/TemplatePage.js';
import users from '../fixtures/users.json';




test('TC01 - Verify redirection to template builder from Marketing > Templates', async ({ page }) => {
  test.setTimeout(120000);

  const loginPage = new LoginPage(page);
  const templatePage = new TemplatePage(page);

  // ---------------- LOGIN ----------------
  await loginPage.gotoLoginPage();
  await loginPage.login(users.admin.email, users.admin.password);
  await loginPage.waitForLoaderToDisappear();
  process.stdout.write("📌 User logged in\n");

  // Step → Navigate to Templates page
  await templatePage.navigateToTemplates();
  process.stdout.write("📌 Navigated to Templates page\n");

  // Expected Result → User is on Templates listing page
  await expect(page).toHaveURL(/\/templates$/);
  process.stdout.write("✅ User is on Templates listing page\n");

  // Step → Click "New Template" and wait for widget selection panel
  await templatePage.clickNewTemplate();
  process.stdout.write("📌 Clicked 'New Template' and waiting for widget selection panel\n");

  // Expected Result → User is on Template creation page
  await expect(page).toHaveURL(/\/templates\/create$/);
  process.stdout.write("✅ User is on Template creation page\n");

   // Step 4: Verify Widget Selection Panel is visible
  await expect(templatePage.widgetSelectionPanel).toBeVisible({ timeout: 15000 });
  process.stdout.write("✅ Widget Selection Panel is visible\n");

   // Step 5: Verify Live Preview area is visible
  await expect(templatePage.livePreviewArea).toBeVisible({ timeout: 15000 });
  process.stdout.write("✅ Live Preview area is visible\n");

  process.stdout.write("🎉 TC01 Passed — Redirection to template builder verified\n");
});



// test('TC02 - Infinite Scroll with and without Filters', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const templatePage = new TemplatePage(page);

//   // Step 1: Login
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);
//   await templatePage.waitForLoaderToDisappear();

//   // Step 2: Navigate to Templates page
//   await templatePage.navigateToTemplates();
//   await templatePage.waitForLoaderToDisappear();

//   // Step 3: Verify infinite scroll without filters
//   console.log('Checking infinite scroll - All Templates');
//   await templatePage.verifyInfiniteScroll();

//   // Step 4: Apply "My Templates" filter & verify
//   console.log('Checking infinite scroll - My Templates');
//   await templatePage.applyFilter('My Templates');
//   await templatePage.verifyInfiniteScroll();

//   // Step 5: Apply "Global Templates" filter & verify
//   console.log('Checking infinite scroll - Global Templates');
//   await templatePage.applyFilter('Global Templates');
//   await templatePage.verifyInfiniteScroll();
// });


// test('R2 - Verify infinite scroll works with/without filters', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const templatePage = new TemplatePage(page);

//   // Step 1: Login
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);

//   // Wait for dashboard to load completely
//   await page.waitForLoadState('networkidle');

//   // Step 2: Navigate to Templates page via POM
//   await templatePage.navigateToTemplates();
//   await expect(page).toHaveURL(/\/templates$/);

//   // Filters to test (make sure your POM supports these filter buttons)
//   const filters = ['All Templates', 'Global Templates', 'My Templates'];

//   for (const filter of filters) {
//     // Use TemplatePage method to apply filter (make sure this exists)
//     await templatePage.applyFilter(filter);

//     // Locator for template cards from POM
//     const templateCards = templatePage.templateCards;

//     let previousCount = 0;
//     let currentCount = await templateCards.count();

//     // Scroll and wait for new templates to load, until no new templates are added
//     while (currentCount > previousCount) {
//       previousCount = currentCount;

//       // Scroll using page.evaluate
//       await page.evaluate(() => {
//         window.scrollBy(0, window.innerHeight);
//       });

//       // Wait for loading and UI update
//       await page.waitForTimeout(3000);

//       currentCount = await templateCards.count();
//     }

//     // Scroll more to confirm no new data loads
//     await page.evaluate(() => {
//       window.scrollBy(0, window.innerHeight * 2);
//     });
//     await page.waitForTimeout(3000);

//     const finalCount = await templateCards.count();
//     expect(finalCount).toBe(currentCount);
//   }
// });


// test('TC03 – Template Filtering & Search', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const templatePage = new TemplatePage(page);

//   // Login
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);

//   // Navigate to Templates
//   await templatePage.navigateToTemplates();
//   await templatePage.waitForLoaderToDisappear();

//   // Apply "All Templates" filter
//   await templatePage.selectAllTemplatesFilter();
//   await templatePage.waitForLoaderToDisappear();
//   const allTemplatesCount = await templatePage.templateCards.count();
//   expect(allTemplatesCount).toBeGreaterThan(0);

//   // Apply "Global Templates" filter
//   await templatePage.selectGlobalTemplatesFilter();
//   await templatePage.waitForLoaderToDisappear();
//   const globalTemplatesCount = await templatePage.templateCards.count();
//   expect(globalTemplatesCount).toBeGreaterThan(0);

//   // Apply "My Templates" filter
//   await templatePage.selectMyTemplatesFilter();
//   await templatePage.waitForLoaderToDisappear();
//   const myTemplatesCount = await templatePage.templateCards.count();
//   expect(myTemplatesCount).toBeGreaterThanOrEqual(0); // Can be 0 if user has no personal templates

//   // Search exact match (use first template name from All Templates)
//   await templatePage.selectAllTemplatesFilter();
//   const firstTemplateName = await templatePage.templateNames.nth(0).innerText();
//   await templatePage.searchTemplate(firstTemplateName);
//   await templatePage.waitForLoaderToDisappear();
//   const searchCountExact = await templatePage.templateCards.count();
//   expect(searchCountExact).toBe(1);

//   // Search partial match
//   const partialKeyword = firstTemplateName.slice(0, 3);
//   await templatePage.searchTemplate(partialKeyword);
//   await templatePage.waitForLoaderToDisappear();
//   const searchCountPartial = await templatePage.templateCards.count();
//   expect(searchCountPartial).toBeGreaterThanOrEqual(1);

//   // Search non-existing term
//   await templatePage.searchTemplate('zzqwertyxyz');
//   await templatePage.waitForLoaderToDisappear();
//   const noResultsVisible = await templatePage.noTemplatesFoundMsg.isVisible();
//   expect(noResultsVisible).toBeTruthy();
// });



// test('R5 - Verify template creation with widgets and live preview', async ({ page }) => {
// // --- Step 1: Login ---
// await page.goto('https://d1h8bf2ipt2loq.cloudfront.net/signin');
//   await page.fill('input[placeholder="Email"]', 'testadminadd@tset.com');
//   await page.fill('input[placeholder="Password"]', 'Test@123');
//   await page.click('button:has-text("Login")');
//   await page.waitForLoadState('networkidle');

// // --- Step 2: Navigate to Templates ---
//   await page.locator('text=Marketing').click();
//   await page.locator('text=Templates').click();
//   await expect(page).toHaveURL("https://d1h8bf2ipt2loq.cloudfront.net/templates");

//  // --- Step 3: Click "New Template" ---
//   await page.click('button:has-text("New Template")');
//   await expect(page).toHaveURL('https://d1h8bf2ipt2loq.cloudfront.net/templates/create');

// // Step: Open the Content Widgets panel


// });






// test('R5 - Verify template creation with widgets and live preview', async ({ page }) => {
//   // --- Step 1: Login ---
//   await page.goto('https://d1h8bf2ipt2loq.cloudfront.net/signin');
//   await page.fill('input[placeholder="Email"]', 'testadminadd@tset.com');
//   await page.fill('input[placeholder="Password"]', 'Test@123');
//   await page.click('button:has-text("Login")');
//   await page.waitForLoadState('networkidle');

//   // --- Step 2: Navigate to Templates ---
//   await page.locator('text=Marketing').click();
//   await page.locator('text=Templates').click();
//   await expect(page).toHaveURL("https://d1h8bf2ipt2loq.cloudfront.net/templates");

//   // --- Step 3: Click "New Template" ---
//   await page.click('button:has-text("New Template")');
//   await expect(page).toHaveURL('https://d1h8bf2ipt2loq.cloudfront.net/templates/create');

// // Step: Open the Content Widgets panel
// await page.getByText('Content Widgets', { exact: true }).click();
// await page.waitForSelector('section:has-text("Content Widgets")');

// // Step: Scope to Content Widgets section
// const contentWidgetSection = page.locator('section:has-text("Content Widgets")');
// await expect(contentWidgetSection).toBeVisible();

// // Step: Click "Listing"
// await contentWidgetSection.getByText(/^Listing$/, { exact: true }).first().click();

// // Step: Click "2Listing"
// await page.getByText('2Listing', { exact: true }).click();
// await page.getByRole('button', { name: 'Apply' }).click();


//   // Content Widget -> Image and Text -> Apply
//   await page.locator('text="Image and text"').click();
//   await page.locator('button:has-text("Apply")').click();

//   // Content Widget -> Image -> Multiple Images -> Select 2 -> Apply
//   await page.locator('text="Image"').click();
//   await page.locator('text="Multiple Images"').click();
//   await page.locator('input[type="file"]').setInputFiles([
//     'tests/assets/image1.jpg',
//     'tests/assets/image2.jpg'
//   ]);
//   await page.locator('button:has-text("Apply")').click();

//   // Content Widget -> Text -> Agent
//   await page.locator('text="Text"').click();
//   await page.locator('text="Agent"').click();
//   await page.locator('button:has-text("Apply")').click();

//   // Content Widget -> Social Media
//   await page.locator('text="Social Media"').click();
//   await page.locator('button:has-text("Apply")').click();

//   // Content Widget -> Videos
//   await page.locator('text="Videos"').click();
//   await page.locator('button:has-text("Apply")').click();

//   // Content Widget -> Button -> Enter text & link -> Apply
//   await page.locator('text="Button"').click();
//   await page.fill('input[placeholder="Button Text"]', 'Test Button');
//   await page.fill('input[placeholder="Link"]', 'https://example.com');
//   await page.locator('button:has-text("Apply")').click();

//   // --- Step 6: Save Template ---
//   await page.locator('button:has-text("Save")').click();

//   // --- Step 7: Create Template Modal ---
//   const templateName = '8/8/2025 template';
//   await page.fill('input[placeholder="Template Name"]', templateName);
//   await page.locator('button:has-text("Create Template")').click();

//   // --- Step 8: Verify Success Message ---
//   await expect(page.locator('text="Email template list get successfully."')).toBeVisible();

//   // --- Step 9: Verify Template Appears in All Templates ---
//   await page.locator('text=All').click();
//   const templates = page.locator('[data-testid="template-card"]');
//   const found = await templates.locator(`text="${templateName}"`).count();
//   expect(found).toBeGreaterThan(0);
// });

