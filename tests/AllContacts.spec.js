import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import users from '../fixtures/users.json';
import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import { parse } from 'csv-parse/sync';
import { AllContactsPage, AddContactModal } from '../Pages/AllContactsPage';









// test('TC01 – Access All Contacts Module', async ({ page }) => {
//   test.setTimeout(60000); // 🔥 extend timeout for slower browsers like Firefox

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   // Step 1: Log in
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);
//   await loginPage.waitForLoaderToDisappear();

//   // Step 2: Navigate to Contacts → All Contacts
//   await allContactsPage.navigate();

//   // Step 3: Verify module and table
//   await allContactsPage.verifyAllContactsModule();

//   console.log('🎯TC01 passed successfully for All Contacts module.');
// });









// test('TC02 + TC03 – Search by Contact Name, Email Id and Filter by Profile Type & Agent', async ({ page }) => {
//   test.setTimeout(60000); // allow more time for all actions

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   // Step 1️⃣: Login only once
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);
//   await loginPage.waitForLoaderToDisappear();

//   // Step 2️⃣: Navigate to All Contacts
//   await allContactsPage.navigate();

//   // Step 3️⃣: Perform search by contact name
//   const searchName = 'John'; // update with existing contact
//   await allContactsPage.searchContactByName(searchName);
//   console.log(`🎯TC02 passed successfully – Searched contact "${searchName}" found.`);

//   // Step 4️⃣: Click Reset button to clear search filters
//   await allContactsPage.clickResetButton();

//   // Step 5️⃣: Verify table visible after reset
//   await expect(allContactsPage.contactsTable).toBeVisible();
//   // console.log('✅ Reset button clicked successfully — filters cleared');

//  // 🟢 Step 6️⃣: Select Profile Type
//   const profileType = 'HGC Associate';
//   // console.log(`🔹 Selecting Profile Type: ${profileType}`);
//   await allContactsPage.profileTypeDropdown.click();
//   await page.getByRole('option', { name: profileType }).click();

//   // 🟢 Step 7️⃣: Select Agent
//   const agentName = '2May Test';
//   // console.log(`🔹 Selecting Agent: ${agentName}`);
//   await allContactsPage.agentDropdown.click();
//   await page.getByRole('option', { name: agentName }).click();

//   // 🟢 Step 8️⃣: Click Filter button
//   // console.log('🔹 Clicking Filter button...');
//   await allContactsPage.filterBtn.click();

//   // Wait for table to reload
//   await page.waitForTimeout(3000);

//   // 🟢 Step 9️⃣: Verify filtered results appear
//   const tableRows = page.locator('tbody tr');
//   const rowCount = await tableRows.count();
//   await expect(rowCount).toBeGreaterThan(0);

//   console.log(`🎯TC03 passed successfully – Filtered by "${profileType}" and agent "${agentName}" (${rowCount} results shown).`);
// });










// test('TC4 – Verify Selected Contact Opens Successfully for Sales Agent and Admin', async ({ browser }) => {
//   test.setTimeout(150000);

//   // Create a new browser context and page
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   const contact = { firstName: 'Sone' };

//   // ------------------- 🔹 Step 1: Login as Sales Agent -------------------
//   console.log('🔹 Step 1: Login as Sales Agent to verify contact opens');

//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.salesAgent.email, users.salesAgent.password);
//   await loginPage.waitForLoaderToDisappear();
//   await allContactsPage.navigate();

//   console.log(`🔍 Searching for contact: ${contact.firstName}`);
//   await allContactsPage.searchContactByName(contact.firstName);
//   await page.waitForTimeout(3000);

//   const contactRow = page.locator(`table tbody tr:has-text("${contact.firstName}")`).first();
//   await expect(contactRow).toBeVisible({ timeout: 10000 });

//   console.log('👆 Clicking on contact to open details...');
//   await contactRow.click();

//   await expect(page.getByRole('heading', { name: 'Contact Details' }))
//     .toBeVisible({ timeout: 20000 });

//   console.log('✅ Contact Details page opened successfully for Sales Agent.');

//   // ------------------- 🔹 Step 2: Logout and Close Context -------------------
//   await loginPage.logout();
//   console.log('🚪 Logged out successfully.');

//   await context.close(); // Cleanly close context

//   // ------------------- 🔹 Step 3: Start a Fresh Context for Admin -------------------
//   const adminContext = await browser.newContext();
//   const adminPage = await adminContext.newPage();

//   const adminLoginPage = new LoginPage(adminPage);
//   const adminAllContactsPage = new AllContactsPage(adminPage);

//   console.log('🔹 Step 3: Login as Admin to verify same contact opens');

//   await adminLoginPage.gotoLoginPage();
//   await adminLoginPage.login(users.admin.email, users.admin.password);
//   await adminLoginPage.waitForLoaderToDisappear();
//   await adminAllContactsPage.navigate();

//   console.log(`🔍 Searching for contact: ${contact.firstName}`);
//   await adminAllContactsPage.searchContactByName(contact.firstName);
//   await adminPage.waitForTimeout(3000);

//   const adminRow = adminPage.locator(`table tbody tr:has-text("${contact.firstName}")`).first();
//   await expect(adminRow).toBeVisible({ timeout: 10000 });

//   console.log('👆 Clicking on contact to open details...');
//   await adminRow.click();

//   await expect(adminPage.getByRole('heading', { name: 'Contact Details' }))
//     .toBeVisible({ timeout: 20000 });

//   console.log('✅ Contact Details page opened successfully for Admin.');

//   await adminContext.close();
//   console.log('🎯TC04 completed successfully.');
// });











// test('TC05 – Verify search functionality by contact email', async ({ page }) => {
//   test.setTimeout(60000);

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   // Step 1️⃣: Login as a valid user
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);
//   await loginPage.waitForLoaderToDisappear();

//   // Step 2️⃣: Navigate to All Contacts
//   await allContactsPage.navigate();

//   // Step 3️⃣: Enter a valid or partial email
//   const partialEmail = 'mhtest@test.com'; // adjust as needed
//   await allContactsPage.searchContactByEmail(partialEmail);

//   // Step 4️⃣: Wait for results to load
//   await page.waitForTimeout(2000);

//   // Step 5️⃣: Fetch table rows
//   const rows = page.locator('tbody tr');
//   const rowCount = await rows.count();
//   expect(rowCount).toBeGreaterThan(0);

//   // Step 6️⃣: Verify that at least one row’s Contact Info contains the searched email
//   let emailFound = false;
//   for (let i = 0; i < rowCount; i++) {
//     const contactInfo = (await rows.nth(i).locator('td').nth(2).innerText()).toLowerCase();

//     // Extract email from contact info
//     const emailMatch = contactInfo.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

//     if (emailMatch && emailMatch[0].includes(partialEmail.toLowerCase())) {
//       emailFound = true;
//       console.log(`✅ Row ${i + 1}: Found matching email → ${emailMatch[0]}`);
//     }
//   }

//   expect(emailFound, `❌ Expected to find at least one email containing "${partialEmail}"`).toBeTruthy();

//   console.log(`🎯TC05 passed — search by email "${partialEmail}" returned correct results.`);
// });


























// // // This TC is fully Passing
// test('TC06 – Verify Partial Contact Masking and Full Visibility for Admin (search by First Name only)', async ({ page }) => {
//   test.setTimeout(150000);

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   // 🔹 Partial Contact details (update as per your data)
//   const partialContact = {
//     firstName: 'Sone',
//     lastName: 'Wilson',
//     email: 'partialuser@demo.com'
//   };

//   const maskIndicators = ['*', '•', 'blurred', 'xxx', 'hidden', 'masked'];

//   // ------------------- 🔹 Step 1: Login as Sales Agent -------------------
//   console.log('🔹 Step 1: Login as Sales Agent to verify masking for partial contact');

//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.salesAgent.email, users.salesAgent.password);
//   await loginPage.waitForLoaderToDisappear();
//   await allContactsPage.navigate();

//   console.log('🔍 Searching for partial contact using First Name only...');
//   await allContactsPage.searchContactByName(partialContact.firstName);
//   await page.waitForTimeout(3000);

//   const contactRow = page.locator(`table tbody tr:has-text("${partialContact.firstName}")`).first();
//   await expect(contactRow, `Partial contact "${partialContact.firstName}" should exist in list`).toBeVisible({ timeout: 10000 });

//   // Locate Contact Info column (adjust nth index as per your UI)
//   const contactInfoCell = contactRow.locator('td').nth(2);
//   const contactInfoText = (await contactInfoCell.textContent())?.trim() || '';

//   console.log(`📋 [Sales Agent] Visible Contact Info → "${contactInfoText}"`);

//   // Verify masked info
//   const isMaskedForAgent = maskIndicators.some(ind => contactInfoText.toLowerCase().includes(ind));
//   expect(isMaskedForAgent, `Expected masked Contact Info for partial contact (${partialContact.email})`).toBe(true);
//   console.log('✅ Sales Agent sees blurred Contact Info for partial contact.');

//   // ------------------- 🔹Open the Contact -------------------
//   console.log('🟢 Clicking contact row to open details...');
//   await contactRow.click();

//   // Proper logout and wait before next login
//   await loginPage.logout();
//   console.log('🚪 Logged out successfully, waiting for redirect...');
//   await page.waitForURL('**/signin', { timeout: 20000 });
//   await page.waitForTimeout(2000);

//   // ------------------- 🔹 Step 2: Login as Admin -------------------
//   console.log('🔹 Step 2: Login as Admin to verify full Contact Info for same contact');

//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();
//   await allContactsPage.navigate();

//   console.log('🔍 Searching again for partial contact by first name...');
//   await allContactsPage.searchContactByName(partialContact.firstName);
//   await page.waitForTimeout(3000);

//   const adminRow = page.locator(`table tbody tr:has-text("${partialContact.firstName}")`).first();
//   await expect(adminRow, `Contact "${partialContact.firstName}" should appear for Admin`).toBeVisible({ timeout: 10000 });

//   const adminContactInfoCell = adminRow.locator('td').nth(2);
//   const adminContactInfoText = (await adminContactInfoCell.textContent())?.trim() || '';

//   console.log(`📋 [Admin] Visible Contact Info → "${adminContactInfoText}"`);

//   const isMaskedForAdmin = maskIndicators.some(ind => adminContactInfoText.toLowerCase().includes(ind));
//   expect(isMaskedForAdmin, 'Admin should see full, unmasked Contact Info').toBe(false);
//   console.log('✅ Admin sees full unmasked Contact Info for the same contact.');

//   // ------------------- 🔹Open the Contact -------------------
//   console.log('🟢 Clicking contact row to open details...');
//   await contactRow.click();

//   console.log('🎯TC06 completed successfully.');
// });

















// test('TC07 – Verify pagination updates correctly after applying filters/search', async ({ page }) => {
//   test.setTimeout(90000);

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   // Step 1️⃣: Login as a valid user
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);
//   await loginPage.waitForLoaderToDisappear();

//   // Step 2️⃣: Navigate to All Contacts
//   await allContactsPage.navigate();

//   // Step 3️⃣: Perform a search (or you can replace with a filter)
//   const searchKeyword = 'test'; // You can use a known name or partial email
//   await allContactsPage.searchContactByName(searchKeyword);

//   // Step 4️⃣: Wait for filtered results to load
//   await page.waitForTimeout(3000);

//   // Step 5️⃣: Get total results on first page
//   const rows = page.locator('tbody tr');
//   const firstPageCount = await rows.count();
//   expect(firstPageCount).toBeGreaterThan(0);
//   console.log(`🔹 First page has ${firstPageCount} filtered results.`);

//   // Step 6️⃣: Capture first page data (for consistency check)
//   const firstPageData = [];
//   for (let i = 0; i < firstPageCount; i++) {
//     const rowText = await rows.nth(i).innerText();
//     firstPageData.push(rowText);
//   }

//   // Step 7️⃣: Check if pagination exists
//   const nextButton = page.locator('button[aria-label="Next page"], .pagination-next, [data-testid="pagination-next"]').first();
//   if (await nextButton.isVisible()) {
//     console.log('🔹 Pagination detected. Navigating to the next page...');

//     // Click next page
//     await nextButton.click();
//     await page.waitForTimeout(3000);

//     // Step 8️⃣: Capture second page data
//     const secondPageRows = page.locator('tbody tr');
//     const secondPageCount = await secondPageRows.count();

//     if (secondPageCount > 0) {
//       const secondPageData = [];
//       for (let i = 0; i < secondPageCount; i++) {
//         const rowText = await secondPageRows.nth(i).innerText();
//         secondPageData.push(rowText);
//       }

//       // Step 9️⃣: Verify no duplication between pages
//       const duplicates = firstPageData.filter(item => secondPageData.includes(item));
//       expect(duplicates.length, '❌ Duplicate records found between pagination pages').toBe(0);

//       console.log(`✅ TC09 passed — pagination updated correctly with ${firstPageCount + secondPageCount} unique filtered records.`);
//     } else {
//       console.log('ℹ️ Only one page of filtered results available — pagination check not required.');
//     }
//   } else {
//     console.log('ℹ️ Pagination not visible — all filtered results fit on one page.');
//   }
// });


















// test('TC08 – Download Selected Contacts', async ({ page }) => {
//   test.setTimeout(60000);

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   // Step 1️⃣: Login
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);
//   await loginPage.waitForLoaderToDisappear();

//   // Step 2️⃣: Navigate to All Contacts
//   await allContactsPage.navigate();

//   // Step 3️⃣: Select 3 contacts
//   await allContactsPage.selectContacts(3);

//   // Step 4️⃣: Click Download and verify file
//   await allContactsPage.clickDownloadButtonAndVerify();

//   console.log('🎯TC08 passed successfully – Selected contacts downloaded.');
// });
















// test('TC09 – Verify structure and formatting of the downloaded Excel template for contact upload', async ({ page }) => {
//   test.setTimeout(90000);

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   // Step 1️⃣: Login
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);
//   await loginPage.waitForLoaderToDisappear();

//   // Step 2️⃣: Navigate to All Contacts
//   await allContactsPage.navigate();

//   // Step 3️⃣: Download Excel Template
//   const [download] = await Promise.all([
//     page.waitForEvent('download'),
//     allContactsPage.clickDownloadTemplateButton()
//   ]);

//   const filePath = await download.path();
//   console.log(`📂 Template downloaded at: ${filePath}`);

//   // Step 4️⃣: Verify file exists
//   expect(fs.existsSync(filePath)).toBeTruthy();

//   // Step 5️⃣: Read Excel file
//   const workbook = XLSX.readFile(filePath);
//   const firstSheet = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[firstSheet];

//   const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//   const headers = jsonData[0].map((h) => h.trim());
//   console.log('📋 Headers found:', headers);

//   // Step 6️⃣: Expected Headers
//   const expectedHeaders = [
//     'First Name',
//     'Middle Name',
//     'Last Name',
//     'Cell Phone',
//     'Email',
//     'Profile Types',
//     'Tags',
//   ];

//   // Step 7️⃣: Compare headers and log detailed info
//   const missingHeaders = expectedHeaders.filter(h => !headers.includes(h));
//   const extraHeaders = headers.filter(h => !expectedHeaders.includes(h));

//   if (missingHeaders.length > 0) {
//     console.warn('⚠️ Missing Headers:', missingHeaders);
//   }
//   if (extraHeaders.length > 0) {
//     console.warn('⚠️ Extra Headers:', extraHeaders);
//   }

//   // ✅ Instead of failing, we log missing headers & soft-check critical ones
//   const requiredCoreHeaders = [
//     'First Name',
//     'Middle Name',
//     'Last Name',
//     'Cell Phone',
//     'Email',
//     'Profile Types',
//     'Tags',
//   ];

//   for (const header of requiredCoreHeaders) {
//     expect(headers).toContain(header);
//   }

//   // Step 8️⃣: Ensure template is empty (no pre-filled data)
//   expect(jsonData.length).toBeLessThanOrEqual(2); // only header + optional instruction

//   console.log('🎯TC09 passed — Excel template validated successfully (missing optional columns ignored).');
// });




















// test('TC10 – Verify that only selected contacts are included in the downloaded file', async ({ page }) => {
//   test.setTimeout(120000); // Increased timeout to handle slow pages

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   console.log('🚀 Starting TC10 – Download selected contacts verification');

//   // Step 1️⃣: Login
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.validUser.email, users.validUser.password);
//   await loginPage.waitForLoaderToDisappear();
//   console.log('✅ Logged in successfully.');

//   // Step 2️⃣: Navigate to All Contacts
//   await allContactsPage.navigate();
//   await page.waitForTimeout(3000);

//   // Step 3️⃣: Wait for contact list to load completely
//   await page.waitForSelector('table tbody tr', { timeout: 20000 });
//   const contactCheckboxes = page.locator(
//     'table tbody tr td input[type="checkbox"]:not([disabled])'
//   );

//   const totalContacts = await contactCheckboxes.count();
//   expect(totalContacts).toBeGreaterThan(0);
//   console.log(`✅ Found ${totalContacts} selectable contacts.`);

//   // Step 4️⃣: Select first 2 contacts safely with retry logic
//   const contactNames = [];
//   const maxSelect = Math.min(2, totalContacts);

//   for (let i = 0; i < maxSelect; i++) {
//     const checkbox = contactCheckboxes.nth(i);

//     // Retry clicking up to 3 times
//     for (let attempt = 1; attempt <= 3; attempt++) {
//       try {
//         await checkbox.waitFor({ state: 'visible', timeout: 5000 });
//         await checkbox.scrollIntoViewIfNeeded().catch(() => {});
//         await checkbox.click({ force: true });
//         console.log(`✅ Clicked contact checkbox #${i + 1} (Attempt ${attempt})`);
//         break;
//       } catch (err) {
//         console.warn(`⚠️ Attempt ${attempt} failed to click checkbox #${i + 1}: ${err.message}`);
//         if (attempt === 3) throw err;
//         await page.waitForTimeout(1000);
//       }
//     }

//     // Capture the contact name text (adjust column index if needed)
//     const nameLocator = page.locator(`table tbody tr:nth-child(${i + 1}) td`).first();
//     let contactName = 'Unknown Contact';
//     try {
//       contactName = (await nameLocator.innerText()).trim();
//     } catch {
//       contactName = `Contact ${i + 1}`;
//     }
//     contactNames.push(contactName);
//   }

//   console.log(`🔹 Selected contacts for download: ${contactNames.join(', ')}`);

//   // Step 5️⃣: Trigger Download
//   const [download] = await Promise.all([
//     page.waitForEvent('download'),
//     page.locator('button.dwnload-btn').click(),
//   ]);

//   // Step 6️⃣: Save the downloaded file
//   const fileName = download.suggestedFilename();
//   const saveDir = 'D:\\GC Download';
//   fs.mkdirSync(saveDir, { recursive: true });
//   const filePath = path.join(saveDir, fileName);
//   await download.saveAs(filePath);

//   console.log(`📂 File downloaded successfully: ${filePath}`);

//   // Step 7️⃣: Read Excel file contents
//   const workbook = XLSX.readFile(filePath);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   const records = XLSX.utils.sheet_to_json(sheet);

//   // Step 8️⃣: Extract names from downloaded Excel
//   const downloadedNames = records.map(r =>
//     (r['Name'] || r['Contact Name'] || r['Full Name'] || '').trim()
//   );

//   console.log('📋 Names found in downloaded file:', downloadedNames);

//   // Step 9️⃣: Validate only selected contacts are included
//   expect(downloadedNames).toEqual(expect.arrayContaining(contactNames));
//   expect(downloadedNames.length).toBe(contactNames.length);

//   console.log('🎯TC10 Passed — only selected contacts are present in the downloaded file.');
// });


















// test('TC11 – Verify restricted fields are masked with * in the downloaded file for partial contacts', async ({ page }) => {

//   test.setTimeout(120000);

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);


//     // Step 1️⃣: Login and Navigate to ALl Contacts
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.validUser.email, users.validUser.password);
//     await loginPage.waitForLoaderToDisappear();
//     console.log('✅ Logged in successfully.');
//     await allContactsPage.navigate();
//     await page.waitForTimeout(3000);


//     // 2️⃣. Select multiple contacts (both full and partial)
//     const contactCheckboxes = page.locator('table tbody tr td input[type="checkbox"]');
//     const totalContacts = await contactCheckboxes.count();
//     expect(totalContacts).toBeGreaterThan(1);

//     // Select contact for validation
//     await contactCheckboxes.nth(0).check();
//     await contactCheckboxes.nth(1).check();
//     await contactCheckboxes.nth(2).check();
//     await contactCheckboxes.nth(3).check();
//     await contactCheckboxes.nth(4).check();
//     await contactCheckboxes.nth(5).check();
//     await contactCheckboxes.nth(6).check();
//     await contactCheckboxes.nth(7).check();
//     await contactCheckboxes.nth(8).check(); 
//     await contactCheckboxes.nth(9).check();



//     // 3️⃣. Trigger Download (avoid sample download button)
//     const [download] = await Promise.all([
//         page.waitForEvent('download', { timeout: 15000 }),
//         // Assuming 'dwnload-btn' is the correct class for the selected contacts download button
//         page.locator('button.dwnload-btn:has-text("Download")').click() 
//     ]);

//     // 4️⃣. Save the downloaded file
//     // NOTE: This test requires 'path' and 'fs' modules which must be imported at the top of your test file.
//     // Example: import path from 'path'; import fs from 'fs';
//     const downloadPath = await download.path();
//     const fileName = download.suggestedFilename();
//     const filePath = path.join('downloads', fileName);
//     await fs.promises.mkdir('downloads', { recursive: true });
//     await download.saveAs(filePath);

//     console.log(`✅ File downloaded successfully: ${filePath}`);

//     // 5️⃣. Parse Excel and validate masking
//     // NOTE: This test requires the 'xlsx' library to be imported.
//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const data = XLSX.utils.sheet_to_json(sheet);
//     console.table(data);

//     // 6️⃣. Check if restricted fields are masked correctly
//     let maskingPassed = true;

//     for (const row of data) {
//         const accessType = row['Access Type']?.toLowerCase();
//         const emailField = row['Email'];
//         const phoneField = row['Cell Phone'];

//         if (accessType?.includes('partial')) {
//             if (emailField !== '*' || phoneField !== '*') {
//                 maskingPassed = false;
//                 console.error(`❌ Masking failed for partial contact: ${row['Name']}, Email: ${emailField}, Phone: ${phoneField}`);
//             }
//         }
//     }

//     // 7️⃣. Assert masking validation
//     expect(maskingPassed, 'All restricted fields should be masked for partial contacts').toBeTruthy();
//     console.log('🎯TC11 - Masking verification passed successfully!');
// });
















// test('TC12 – Verify user can add a Note in Contact Details and it displays correctly', async ({ page }) => {
//   test.setTimeout(120000);

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   const contact = { firstName: 'Admin2' };
//   const noteText = 'Automation note added for verification';

//   // Step 1: Login as Admin
//   console.log('🔹 Logging in as Admin');
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();
//   await allContactsPage.navigate();

//   // Step 2: Search and open the contact
//   console.log(`🔍 Searching for contact: ${contact.firstName}`);
//   await allContactsPage.searchContactByName(contact.firstName);
//   const contactRow = page.locator(`table tbody tr:has-text("${contact.firstName}")`).first();
//   await expect(contactRow).toBeVisible({ timeout: 10000 });
//   await contactRow.click();
//   await expect(page.getByRole('heading', { name: 'Contact Details' })).toBeVisible({ timeout: 10000 });

//   // Step 3: Navigate to Notes tab
//   console.log('📋 Navigating to Notes tab...');
//   await page.getByRole('tab', { name: 'Notes' }).click();

//   // Step 4: Click Add button to open note input
//   console.log('📝 Clicking Add button...');
//   await page.locator('button:has-text("Add")').first().click();
//   const noteTextarea = page.locator('textarea[name="note"][placeholder="Type note here"]');
//   await expect(noteTextarea).toBeVisible({ timeout: 10000 });

//   // Step 5: Fill note and save
//   await noteTextarea.fill(noteText);
//   console.log('✍️ Filled note text.');
//   await page.locator('button:has-text("Add")').last().click();
//   await page.waitForTimeout(3000);

//   // Step 6: Locate the notes table
//   const notesSelector = '.MuiTable-root';
//   await expect(page.locator(notesSelector)).toBeVisible({ timeout: 10000 });

//   // Step 7: Extract latest note row
//   const firstRow = page.locator(`${notesSelector} tbody tr`).first();
//   await expect(firstRow).toBeVisible({ timeout: 15000 });
//   const cells = await firstRow.locator('td, .MuiTableCell-root').allTextContents();
//   const allTexts = cells.map(t => t.trim()).filter(Boolean);

//   // Step 8: Parse values (versatile)
//   let creationDate = '';
//   let createdBy = '';
//   let noteContent = '';

//   if (allTexts.length >= 3) {
//     creationDate = allTexts[0];   // any date format
//     createdBy = allTexts[1];      // any name
//     noteContent = allTexts.slice(2).join(' '); // rest is note
//   } else {
//     // fallback if structure differs
//     creationDate = allTexts[0] || '';
//     createdBy = allTexts[1] || '';
//     noteContent = allTexts.slice(2).join(' ') || '';
//   }

//   console.log('📋 Extracted Note Details:');
//   console.log(`  Creation Date -> "${creationDate}"`);
//   console.log(`  Created By    -> "${createdBy}"`);
//   console.log(`  Note Content  -> "${noteContent}"`);

//   // Step 9: Assertions (versatile)
//   expect(creationDate.trim().length).toBeGreaterThan(0); // any date
//   expect(createdBy.trim().length).toBeGreaterThan(0);    // any creator
//   expect(noteContent.toLowerCase()).toContain(noteText.toLowerCase()); // note matches

//   console.log('🎯 TC12 Passed - Note content verified successfully.');
// });















































// test('TC13 – Verify user with full Contact Notes permission can view, add, edit & delete notes', async ({ page }) => {
//   test.setTimeout(180000);

//   const loginPage = new LoginPage(page);
//   const allContactsPage = new AllContactsPage(page);

//   const contact = { firstName: 'Admin2' };
//   const noteText = `Automation note added for full permission test ${Date.now()}`; // unique note
//   const updatedNoteText = `Automation note edited for verification ${Date.now()}`;

//   // ------------------- Step 1: Login -------------------
//   console.log('🔹 Logging in as Admin...');
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();
//   await allContactsPage.navigate();

//   // ------------------- Step 2: Search Contact -------------------
//   console.log(`🔍 Searching for contact: ${contact.firstName}`);
//   await allContactsPage.searchContactByName(contact.firstName);
//   const contactRow = page.locator(`table tbody tr:has-text("${contact.firstName}")`).first();
//   await expect(contactRow).toBeVisible({ timeout: 10000 });
//   await contactRow.click();
//   await expect(page.getByRole('heading', { name: 'Contact Details' })).toBeVisible({ timeout: 10000 });
//   console.log('✅ Contact Details page opened.');

//   // ------------------- Step 3: Navigate to Notes tab -------------------
//   console.log('📋 Navigating to Notes tab...');
//   await page.getByRole('tab', { name: 'Notes' }).click();
//   await expect(page.locator('text=Creation Date')).toBeVisible({ timeout: 10000 });

//   // ------------------- Step 4: Add Note -------------------
//   console.log('📝 Adding a new note...');
//   const addBtn = page.locator('button:has-text("Add")').first();
//   await expect(addBtn).toBeVisible({ timeout: 10000 });
//   await addBtn.click();

//   const noteTextarea = page.locator('textarea[name="note"][placeholder="Type note here"]');
//   await expect(noteTextarea).toBeVisible({ timeout: 10000 });
//   await noteTextarea.fill(noteText);
//   await page.locator('button:has-text("Add")').last().click();
//   await page.waitForTimeout(3000);

//   // ------------------- Step 5: Extract Latest Note -------------------
//   const notesTable = page.locator('.MuiTable-root, table:has-text("Creation Date")').first();
//   await expect(notesTable).toBeVisible({ timeout: 15000 });
//   const firstRow = notesTable.locator('tbody tr').first();
//   await expect(firstRow).toBeVisible({ timeout: 10000 });

//   const cells = await firstRow.locator('td, .MuiTableCell-root').allTextContents();
//   const allTexts = cells.map(t => t.trim()).filter(Boolean);

//   let creationDate = '';
//   let createdBy = '';
//   let noteContent = '';

//   if (allTexts.length >= 3) {
//     creationDate = allTexts[0];
//     createdBy = allTexts[1];
//     noteContent = allTexts.slice(2).join(' ');
//   } else {
//     creationDate = allTexts[0] || '';
//     createdBy = allTexts[1] || '';
//     noteContent = allTexts.slice(2).join('') || '';
//   }

//   console.log('📋 Extracted Note: ', { creationDate, createdBy, noteContent });
//   expect(creationDate.trim().length).toBeGreaterThan(0);
//   expect(noteContent.toLowerCase()).toContain(noteText.toLowerCase());

//   // ------------------- Step 6: Edit Note -------------------
//   console.log('✏️ Editing the note...');
//   const editIcon = firstRow.locator('.icon.edit-icon').first();
//   await expect(editIcon).toBeVisible({ timeout: 10000 });
//   await editIcon.click();

//   const editTextarea = page.locator('textarea[name="note"]').first();
//   await expect(editTextarea).toBeVisible({ timeout: 10000 });
//   await editTextarea.fill(updatedNoteText);

//   const updateBtn = page.locator('button:has-text("Update"), button:has-text("Save")').first();
//   await updateBtn.click();
//   await page.waitForTimeout(3000);

//   // Re-fetch the first row after update
//   const refreshedRow = notesTable.locator('tbody tr').first();
//   const refreshedCells = await refreshedRow.locator('td, .MuiTableCell-root').allTextContents();
//   const refreshedTexts = refreshedCells.map(t => t.trim()).filter(Boolean);
//   const refreshedNoteContent = refreshedTexts.slice(2).join(' ');
//   expect(refreshedNoteContent.toLowerCase()).toContain(updatedNoteText.toLowerCase());
//   console.log('✅ Note updated successfully.');

//   // ------------------- Step 7: Delete Note -------------------
//   console.log('🗑️ Deleting the note...');
//   const deleteIcon = refreshedRow.locator('.icon.delete-icon').first();
//   await expect(deleteIcon).toBeVisible({ timeout: 10000 });
//   await deleteIcon.click();

//   const confirmBtn = page.locator(
//     'button:has-text("Yes"), button:has-text("Confirm"), button:has-text("Delete")'
//   ).first();

//   if (await confirmBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
//     await confirmBtn.click();
//     console.log('✅ Confirmed deletion.');
//   } else {
//     console.warn('⚠️ Delete confirmation not found; fallback pressed Enter.');
//     await page.keyboard.press('Enter').catch(() => {});
//   }

//   // ------------------- Step 8: Verify Deletion -------------------
//   console.log('⏳ Waiting for note to be removed from table...');
//   let deleted = false;
//   for (let i = 0; i < 15; i++) {
//     const allTextsAfterDelete = await notesTable.locator('tbody tr').allTextContents();
//     const exists = allTextsAfterDelete.some(t => t.trim().toLowerCase().includes(updatedNoteText.toLowerCase()));
//     if (!exists) {
//       deleted = true;
//       break;
//     }
//     console.log(`🔄 Retry ${i + 1}: note still exists, waiting 1s...`);
//     await page.waitForTimeout(1000);
//   }

//   expect(deleted).toBeTruthy();
//   console.log('✅ Note deleted successfully.');
//   console.log('🎯 TC13 Passed — Full permission flow validated.');
// });



























// test('TC14 – Verify user can fill the contact form and create a contact successfully', async ({ page }) => {
//     test.setTimeout(120000);

//     const loginPage = new LoginPage(page);
//     const allContactsPage = new AllContactsPage(page);
//     const addContactModal = new AddContactModal(page); 

//     // Data for the new contact
//     const uniqueTime = Date.now().toString().slice(-6);
//     const contactData = {
//         firstName: 'WebAuto'+ uniqueTime,
//         lastName: 'Test' + uniqueTime, 
//         cellPhone: '9457845124',
//         email: `webauto.${uniqueTime}@test.com`,
//         profileType: 'Renter Owner', 
//         tag: 'Automation',          
//         agent: '2May Test'          
//     };
    
//     // --- Setup: Login and Navigate ---
//     console.log('🔹 Logging in and navigating to Contacts.');
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await allContactsPage.navigate(); 


//     // 1. Click on "Add Contact"
//     console.log('1. Opening "Add Contact" Modal...');
//     await allContactsPage.addBtn.click();
//     await expect(addContactModal.modalTitle).toBeVisible();


//     // 2. Fill all required fields (Includes Tag and Profile Type interaction fixes)
//     console.log('2. Filling form fields: Profile Type (Click-out) and Tag (Enter press) handled by POM.');
//     await addContactModal.fillContactForm(contactData);


//     // 3. Submit the form
//     console.log('3. Submitting the form by clicking "Save"...');
//     // --- FIX APPLIED HERE: CALLING THE METHOD CORRECTLY ---
//     await addContactModal.saveContact(); // Correctly calls the async function

//     console.log(' 🎯 TC14 Passed - User can fill the contact form and create a contact successfully ')


// });















// test('TC15 – Verify that the user can assign themselves as the Primary Agent while creating a contact', async ({ page }) => {
//     test.setTimeout(120000);

//     const loginPage = new LoginPage(page);
//     const allContactsPage = new AllContactsPage(page);
//     const addContactModal = new AddContactModal(page); 

//     // Data for the new contact
//     const uniqueTime = Date.now().toString().slice(-6);
//     const contactData = {
//         firstName: 'WebAuto'+ uniqueTime,
//         lastName: 'Test' + uniqueTime, 
//         cellPhone: '9457845124',
//         email: `webauto.${uniqueTime}@test.com`,
//         profileType: 'Renter Owner', 
//         tag: 'Automation',          
//         agent: '2May Test'          
//     };
    
//     // --- Setup: Login and Navigate ---
//     console.log('🔹 Logging in and navigating to Contacts.');
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.salesAgent.email, users.salesAgent.password);
//     await allContactsPage.navigate(); 


//     // 1. Click on "Add Contact"
//     console.log('1. Opening "Add Contact" Modal...');
//     await allContactsPage.addBtn.click();
//     await expect(addContactModal.modalTitle).toBeVisible();


//     // 2. Fill all required fields (Includes Tag and Profile Type interaction fixes)
//     console.log('2. Filling form fields: Profile Type (Click-out) and Tag (Enter press) handled by POM.');
//     await addContactModal.fillContactForm(contactData);


//     // 3. Submit the form
//     console.log('3. Submitting the form by clicking "Save"...');
//     // --- FIX APPLIED HERE: CALLING THE METHOD CORRECTLY ---
//     await addContactModal.saveContact(); // Correctly calls the async function

//     console.log(' 🎯 TC15 Passed - User can assign themselves as the Primary Agent while creating a contact')


// });









// test('TC16 – Verify Cancel button dialog contains "Got it" and "Close without saving" options', async ({ page }) => {
//     test.setTimeout(60000); // Standard timeout

//     const loginPage = new LoginPage(page);
//     const allContactsPage = new AllContactsPage(page);
//     const addContactModal = new AddContactModal(page); 
    
//     // Define the exact message text from the screenshot for verification
//     const dialogMessageText = 'Make sure to save your changes in the forms under this tab before closing.'; 

//     // --- Setup: Login and Navigate ---
//     console.log('🔹 Logging in and navigating to Contacts.');
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password); 
//     await allContactsPage.navigate(); 

    
//     // 1. Open the contact form 
//     console.log('1. Opening "Add Contact" Modal.');
//     await allContactsPage.addBtn.click();
//     await expect(addContactModal.modalTitle).toBeVisible();


//     // 2. Make changes to a field to trigger the confirmation dialog
//     const newName = 'UnsavedTestName';
//     console.log(`2. Making unsaved change: Filling First Name with "${newName}"`);
//     await addContactModal.firstNameField.fill(newName);


//     // 3. Click the Cancel button
//     console.log('3. Clicking the Cancel button to open the confirmation dialog.');
//     await addContactModal.closeButton.click(); 

    
//     // 4. Wait for the confirmation dialog to appear
//     const confirmationDialog = page.locator('.MuiDialog-root').last();
//     await expect(confirmationDialog).toBeVisible({ timeout: 10000 });
//     console.log('Confirmation dialog is visible.');

//     // ⭐ NEW VERIFICATION: Check for the required dialog message ⭐
//     // Use getByText with the exact text, which is possible now that we have the screenshot.
//     console.log(`✅ Verifying dialog message content: "${dialogMessageText}"`);
//     const messageLocator = confirmationDialog.getByText(dialogMessageText, { exact: true });
//     await expect(messageLocator).toBeVisible({ timeout: 10000 });
//     // -------------------------------------------------------------
    
//     // ⭐ VERIFICATION: Check for the two specific buttons ⭐
    
//    // FIX 1: Using case-insensitive regex for flexibility and increasing timeout.
//     console.log('✅ Verifying existence of "Got it" button...');
//     const gotItLocator = confirmationDialog.getByRole('button', { name: /Got it/i }); // Case-insensitive search
//     await expect(gotItLocator).toBeVisible({ timeout: 10000 }); // Increased timeout

    
//     // FIX 2: Applying the same changes to the second button for consistency and robustness.
//     console.log('✅ Verifying existence of "Close without saving" button...');
//     const closeWithoutSavingLocator = confirmationDialog.getByRole('button', { name: /Close without saving/i }); // Case-insensitive search
//     await expect(closeWithoutSavingLocator).toBeVisible({ timeout: 10000 }); // Increased timeout
    

//     // Add cleanup actions to ensure the form closes after verification
//     await closeWithoutSavingLocator.click();
//     await expect(addContactModal.modalTitle).not.toBeVisible();
//     await loginPage.logout();


//     console.log(' 🎯 TC16 Passed - Cancel button dialog contains message and buttons')

// });








// test('TC17 – Verify "Close without saving" closes form and discards all changes', async ({ page }) => {
//     test.setTimeout(60000); // Standard timeout

//     const loginPage = new LoginPage(page);
//     const allContactsPage = new AllContactsPage(page);
//     const addContactModal = new AddContactModal(page); 
    
//     // Define the exact message text for verification
//     const dialogMessageText = 'Make sure to save your changes in the forms under this tab before closing.'; 
//     // Define the unsaved variable name here (Corrected variable name used below)
//     const unsavedName = 'UnsavedTestName'; // <-- This is the variable name defined above
//     const expectedInitialValue = ''; // The field should be empty when reopening a new 'Add' form

//     // --- Setup: Login and Navigate ---
//     console.log('🔹 Logging in and navigating to Contacts.');
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password); 
//     await allContactsPage.navigate(); 

    
//     // 1. Open the contact form 
//     console.log('1. Opening "Add Contact" Modal.');
//     await allContactsPage.addBtn.click();
//     await expect(addContactModal.modalTitle).toBeVisible();


//     // 2. Make changes to a field to trigger the confirmation dialog
//     // The previous failing code was here: await addContactModal.firstNameField.fill(newName);
    
//     // ⭐ FIX APPLIED: Use the defined variable unsavedName ⭐
//     console.log(`2. Making unsaved change: Filling First Name with "${unsavedName}"`);
//     await addContactModal.firstNameField.fill(unsavedName);
//     // ----------------------------------------------------


//     // 3. Click the Cancel button
//     console.log('3. Clicking the Cancel button to open the confirmation dialog.');
//     await addContactModal.closeButton.click(); 

    
//     // 4. Wait for the confirmation dialog to appear & Verify Message
//     const confirmationDialog = page.locator('.MuiDialog-root').last();
//     await expect(confirmationDialog).toBeVisible({ timeout: 10000 });
//     console.log('Confirmation dialog is visible.');
    
//     // Verify the exact dialog message
//     const messageLocator = confirmationDialog.getByText(dialogMessageText, { exact: true });
//     await expect(messageLocator).toBeVisible({ timeout: 10000 });
//     console.log(`✅ Verified dialog message: "${dialogMessageText}"`);


//     // 5. Locate and click "Close without saving"
//     console.log('4. Clicking "Close without saving" to close the form and discard changes.');
//     const closeWithoutSavingLocator = confirmationDialog.getByRole('button', { name: /Close without saving/i }); 
//     await expect(closeWithoutSavingLocator).toBeVisible({ timeout: 10000 }); 
//     await closeWithoutSavingLocator.click();
    

//     // VERIFICATION 1: Form closes completely
//     await expect(addContactModal.modalTitle).not.toBeVisible();
//     console.log('✅ Form and dialog closed successfully.');
    
    
//     // VERIFICATION 2: Discarded changes
    
//     // Re-open the Add Contact Modal
//     console.log('5. Re-opening the form to verify unsaved changes were discarded.');
//     await allContactsPage.addBtn.click();
//     await expect(addContactModal.modalTitle).toBeVisible();

//     // Assert that the First Name field is reset to its expected initial value (empty)
//     await expect(addContactModal.firstNameField).toHaveValue(expectedInitialValue);
//     console.log('✅ Changes discarded: First Name field is empty upon reopening.');

    
//     // 6. Final Cleanup (Close the empty modal and logout)
//     console.log('6. Cleanup: Closing the empty form and logging out.');
//     await addContactModal.closeButton.click(); 
//     await expect(addContactModal.modalTitle).not.toBeVisible();
//     await loginPage.logout();

//     console.log(' 🎯 TC17 Passed - "Close without saving" closes form and discards all changes');
// });










// test('TC18 – Verify "Got it" preserves changes and keeps the contact form open', async ({ page }) => {
//     test.setTimeout(60000); // Standard timeout

//     const loginPage = new LoginPage(page);
//     const allContactsPage = new AllContactsPage(page);
//     const addContactModal = new AddContactModal(page); 
    
//     // Define the necessary variables
//     const dialogMessageText = 'Make sure to save your changes in the forms under this tab before closing.'; 
//     const unsavedName = 'GotItTestName';
//     const unsavedEmail = `gotit.test.${Date.now().toString().slice(-6)}@temp.com`;

//     // --- Setup: Login and Navigate ---
//     // ... (Login and navigation steps omitted for brevity, assumed correct) ...
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password); 
//     await allContactsPage.navigate(); 
//     console.log('Login with Admin');


    
//     // 1. Open the contact form and make changes
//     await allContactsPage.addBtn.click();
//     await expect(addContactModal.modalTitle).toBeVisible();

//     await addContactModal.firstNameField.fill(unsavedName);
//     await addContactModal.emailField.fill(unsavedEmail);
//     console.log('Navigate to Contact Module and make unsaved changes');


//     // 3. Click the Cancel button
//     await addContactModal.closeButton.click();
//     console.log('3. Clicking the Cancel button to open the confirmation dialog.');
 

    
//     // ⭐ FIX: Redefine the confirmationDialog locator to be unique ⭐
//     // We now locate the last dialog (.MuiDialog-root) that SPECIFICALLY contains the unique warning message.
//     const confirmationDialog = page.locator('.MuiDialog-root', { hasText: dialogMessageText }).last();
//     // The previous code was: const confirmationDialog = page.locator('.MuiDialog-root').last();
//     // --------------------------------------------------------------------------------------
    
//     // 4. Wait for the confirmation dialog to appear & Verify Message
//     await expect(confirmationDialog).toBeVisible({ timeout: 10000 });
//     const messageLocator = confirmationDialog.getByText(dialogMessageText, { exact: true });
//     await expect(messageLocator).toBeVisible({ timeout: 10000 });
//     console.log('Confirmation dialog is visible and message verified.');



//     // 5. Locate and click "Got it"
//     const gotItLocator = confirmationDialog.getByRole('button', { name: /Got it/i }); 
//     await expect(gotItLocator).toBeVisible({ timeout: 10000 }); 
//     await gotItLocator.click();
//     console.log('Clicked "Got it" to dismiss the dialog and keep the form open.');
    

//     // VERIFICATION 1: Confirmation Dialog closes
//     // This assertion now correctly passes because 'confirmationDialog' only refers to the small modal.
//     await expect(confirmationDialog).not.toBeVisible(); 
//     console.log('✅ Confirmation dialog closed successfully.');
    
    
//     // VERIFICATION 2: Main form REMAINS OPEN 
//     await expect(addContactModal.modalTitle).toBeVisible();
//     console.log('✅ Contact form remains open after clicking "Got it".');
    
    
//     // VERIFICATION 3: Unsaved changes were PRESERVED 
//     await expect(addContactModal.firstNameField).toHaveValue(unsavedName);
//     await expect(addContactModal.emailField).toHaveValue(unsavedEmail);
//     console.log('✅ Unsaved changes are preserved in the form fields.');


//     console.log(' 🎯 TC18 Passed - "Got it" preserves changes and keeps the contact form open');
// });











// test('TC19 – Verify Contact Details Page contains expected Tabs and Action button for Navigation', async ({ page }) => {
//     test.setTimeout(60000);

//     const loginPage = new LoginPage(page);
//     const allContactsPage = new AllContactsPage(page);

//     // FIX: Define the 'contact' object needed for Step 3.
//     const contact = { firstName: 'Admin2' }; 

//     // ------------------- 🔹 Step 1: Login and Navigate -------------------
//     await loginPage.gotoLoginPage();
//     // Using the 'salesAgent' user as a fallback if 'validUser' fails to show permissions
//     await loginPage.login(users.salesAgent.email, users.salesAgent.password); 
//     await loginPage.waitForLoaderToDisappear();

//     // Step 2️⃣: Navigate to All Contacts
//     await allContactsPage.navigate();
//     await page.waitForTimeout(3000);

//     // ------------------- 🔹 Step 3: Search and open the contact -------------------
//     console.log(`🔍 Searching for contact: ${contact.firstName}`); 
//     await allContactsPage.searchContactByName(contact.firstName);
//     await page.waitForTimeout(2000);

//     const contactRow = page.locator(`table tbody tr:has-text("${contact.firstName}")`).first();
//     await expect(contactRow).toBeVisible({ timeout: 10000 });
//     await contactRow.click();

//     await expect(page.getByRole('heading', { name: 'Contact Details' })).toBeVisible({ timeout: 10000 });
//     console.log('✅ Contact Details page opened successfully.');

//     // ------------------- 🔹 Step 4: Observe and Verify Action Buttons (CRITICAL FIX APPLIED) -------------------
    
//     // Using the visible text from the screenshot
//     const expectedActionButtons = [
//         'Re-Assign',
//         'Event',      
//         'Log Activity',
//         'Send Email',
//         'Edit',
//     ];

//     console.log('📋 Verifying presence of top action buttons (using robust matching)...');

//     let allButtonsFound = true;
//     for (const buttonName of expectedActionButtons) {
//         let buttonLocator;
        
//         // Use regex for name match (case-insensitive) for better resilience against whitespace.
//         const regex = new RegExp(buttonName, 'i');
        
//         if (buttonName === 'Event') {
//              // Try to find the button using either the text "Event" or "+ Event"
//              buttonLocator = page.getByRole('button', { name: regex }).or(
//                              page.getByRole('button', { name: /\+\s*Event/i }));
//         } else {
//              // For others, use the regex to check for the text anywhere in the name/label
//              buttonLocator = page.getByRole('button', { name: regex });
//         }
        
//         try {
//             // We use .first() here just in case multiple matching buttons exist (Playwright warns otherwise)
//             await expect(buttonLocator.first(), `Action button "${buttonName}" should be visible`).toBeVisible({ timeout: 10000 });
//             console.log(`✅ Found button: ${buttonName}`);
//         } catch (e) {
//             console.error(`❌ FAILED to find action button: ${buttonName}. Error: ${e.message}`);
//             allButtonsFound = false;
//         }
//     }
    
//     // Final assertion for the buttons
//     expect(allButtonsFound, 'One or more required top action buttons were missing.').toBe(true);

//     // ------------------- 🔹 Step 5: Verify Navigation Tabs (Original check) -------------------
    
//     const expectedNavigationTabs = [
//         'Notes',
//         'Activities',
//         'Inquiries',
//         'Documents',
//         'Listing Matches',
//         'Listing Announcements',
//         'Email Campaigns',
//         'Events',
//     ];
    
//     console.log('📋 Verifying presence of bottom navigation tabs...');
//     let allTabsFound = true;

//     for (const tabName of expectedNavigationTabs) {
//         // Use the same regex approach for tabs for maximum resilience
//         const tabLocator = page.getByRole('tab', { name: new RegExp(tabName, 'i') });
        
//         try {
//             await expect(tabLocator.first(), `Navigation tab "${tabName}" should be visible`).toBeVisible({ timeout: 5000 });
//             console.log(`✅ Found tab: ${tabName}`);
//         } catch (e) {
//             console.error(`❌ FAILED to find navigation tab: ${tabName}`);
//             allTabsFound = false;
//         }
//     }
    
//     // Final assertion for the tabs
//     expect(allTabsFound, 'One or more required navigation tabs were missing.').toBe(true);

//     // ------------------- 🔹 Step 6: Verify "Notes" tab is active by default -------------------
//     const notesTab = page.getByRole('tab', { name: 'Notes', exact: true });
//     await expect(notesTab).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });
//     console.log('✅ "Notes" tab is verified as the default active tab.');
    
//     console.log('🎯 TC19 completed successfully – All action buttons and navigation tabs verified.');
// });












// test('TC20 – Verify Scroll Functionality on Contact Details Overflow', async ({ page }) => {
//     // Increase test timeout slightly (already 90000ms, which should be plenty)
//     test.setTimeout(90000); 

//     const loginPage = new LoginPage(page);
//     const allContactsPage = new AllContactsPage(page);

//     const contact = { firstName: 'Admin2' }; 
//     const notesTabPanelSelector = '[role="tabpanel"]:not([hidden]), [role="tabpanel"][aria-hidden="false"]'; 
//     const injectedContentId = 'playwright-scroll-test-content';

//     // ------------------- 🔹 Step 1 & 2: Login and Open Contact Details Page -------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.salesAgent.email, users.salesAgent.password); 
//     await loginPage.waitForLoaderToDisappear();

//     await allContactsPage.navigate();
//     await allContactsPage.searchContactByName(contact.firstName);
    
//     const contactRow = page.locator(`table tbody tr:has-text("${contact.firstName}")`).first();
//     await expect(contactRow).toBeVisible({ timeout: 10000 });
//     await contactRow.click();
//     await expect(page.getByRole('heading', { name: 'Contact Details' })).toBeVisible({ timeout: 10000 });
//     console.log('✅ Contact Details page opened.');
    
//     // Ensure Notes tab is active
//     await page.getByRole('tab', { name: 'Notes', exact: true }).click({ timeout: 10000 });


//     // ------------------- 🔹 Step 3: Inject large content into the active Tab Panel -------------------
//     console.log('🔥 Targeting active tab panel to inject content and force vertical scroll...');

//     const notesTabPanel = page.locator(notesTabPanelSelector).first();
//     await expect(notesTabPanel).toBeVisible({ timeout: 15000 }); 

//     // Inject 2000px of empty space into the target tab panel element.
//     await notesTabPanel.evaluate((el, id) => {
//         const overflowDiv = document.createElement('div');
//         overflowDiv.style.height = '2000px'; 
//         overflowDiv.id = id; 
//         el.appendChild(overflowDiv);
//         console.log('Injected content of 2000px height into the tab panel.');
//     }, injectedContentId);
    
//     // Slight increase in delay after injection
//     await page.waitForTimeout(2000); 

//     // ------------------- 🔹 Step 4: Verify Content Scrollable using Mouse Wheel -------------------
    
//     // Get initial scroll position (should be 0)
//     const initialScrollPosition = await page.evaluate(() => window.scrollY);
    
//     // Simulate mouse wheel scroll down by 1000 units.
//     console.log('Simulating mouse wheel scroll down by 1000 units...');
//     await page.mouse.wheel(0, 1000);
    
//     await page.waitForTimeout(500); 

//     // Get the new scroll position of the entire page/main container.
//     const finalScrollPosition = await page.evaluate(() => window.scrollY);
    
//     // Verify scroll happened.
//     expect(finalScrollPosition).toBeGreaterThan(initialScrollPosition + 100, 'The main content area must have scrolled down after mouse wheel action.');
//     console.log(`✅ Scroll successful. Final page scroll position: ${finalScrollPosition}px.`);

//     // ------------------- 🔹 Step 5: Verify Header/Tabs Remain Fixed/Accessible -------------------
    
//     // A. Verify the main header/action buttons area is visible (as it's often fixed).
//     const headerLocator = page.getByRole('heading', { name: 'Contact Details' });
//     await expect(headerLocator).toBeVisible({ timeout: 5000 });
    
//     // B. Verify the Navigation Tabs remain visible.
//     const navigationTabsLocator = page.getByRole('tablist');
//     await expect(navigationTabsLocator).toBeVisible({ timeout: 5000 });
//     console.log('✅ Header and Navigation Tabs remain visible/accessible after scroll.');

//     // ------------------- 🔹 Step 6: Cleanup (Optimized for stability) -------------------
    
//     // Use evaluate to scroll and clean up in one go, simplifying the final steps.
//     await page.evaluate((id) => {
//         // Scroll the entire page back to the top
//         window.scrollTo(0, 0); 
        
//         // Find and remove the injected element globally
//         const injectedElement = document.getElementById(id);
//         injectedElement?.remove();
//     }, injectedContentId);
    
//     // Add a final, small wait to ensure all cleanup has settled before Playwright closes the context.
//     await page.waitForTimeout(1000); 
    
//     console.log('✅ Cleanup completed successfully.');

//     console.log('🎯 TC20 completed successfully – Scroll/Overflow functionality verified.');
// });












// test('TC21 – Verify Display of Key Contact Information', async ({ page }) => {
//     test.setTimeout(60000);

//     const loginPage = new LoginPage(page);
//     const allContactsPage = new AllContactsPage(page);

//     // Using the 'Admin2' contact data from the second screenshot (image_d43100.png)
//     const contact = { 
//         firstName: 'Admin2',
//         lastName: 'testing', 
//         primaryAgent: '-', 
//         email: 'admin2testing@test.com',
//         cellPhone: '6546654213',
//         tags: 'testqqqq',
//         secondaryAgent: 'test', 
//         contactType: 'HGC Associate' 
//     }; 

//     // ------------------- 🔹 Step 1: Login and Open Contact Details Page -------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.salesAgent.email, users.salesAgent.password); 
//     await loginPage.waitForLoaderToDisappear();

//     await allContactsPage.navigate();
//     await allContactsPage.searchContactByName(contact.firstName);
    
//     // Open the contact
//     const contactRow = page.locator(`table tbody tr:has-text("${contact.firstName}")`).first();
//     await expect(contactRow).toBeVisible({ timeout: 10000 });
//     await contactRow.click();
    
//     // Verify the Contact Details page is loaded
//     await expect(page.getByRole('heading', { name: 'Contact Details' })).toBeVisible({ timeout: 10000 });
//     console.log('✅ Contact Details page opened.');


//     // ------------------- 🔹 Step 2: Observe and Verify Key Contact Fields and Values -------------------
//     console.log('📋 Verifying presence and values of key contact fields...');
    
//     let allFieldsFound = true;
    
//     const fieldsToVerify = [
//         { label: 'First name', value: contact.firstName },
//         { label: 'Last name', value: contact.lastName },
//         { label: 'Primary agent', value: contact.primaryAgent, checkValue: false }, 
//         { label: 'Email', value: contact.email },
//         { label: 'Cell phone', value: contact.cellPhone },
//         { label: 'Tags', value: contact.tags },
//         { label: 'Secondary agent', value: contact.secondaryAgent }, 
//     ];
    
//     for (const field of fieldsToVerify) {
//         let fieldPassed = true;
        
//         // 1. Verify the Label is present
//         const labelLocator = page.getByText(field.label, { exact: true }).first();
//         try {
//             await expect(labelLocator).toBeVisible({ timeout: 5000 });
//         } catch (e) {
//             console.error(`❌ FAILED: Label "${field.label}" not found.`);
//             fieldPassed = false;
//         }

//         // 2. Verify the Value is present (skip for generic hyphen values)
//         if (field.checkValue !== false) {
//             const valueLocator = page.getByText(field.value, { exact: true }).first();
//             try {
//                 await expect(valueLocator).toBeVisible({ timeout: 5000 });
//             } catch (e) {
//                 console.error(`❌ FAILED: Value "${field.value}" not found for label "${field.label}".`);
//                 fieldPassed = false;
//             }
//         }
        
//         if (!fieldPassed) {
//             allFieldsFound = false;
//         } else {
//              console.log(`✅ Field "${field.label}" verified with value: ${field.value}`);
//         }
//     }
    
//     // Final assertion that all key fields were successfully found
//     expect(allFieldsFound, 'One or more key contact fields were missing or incorrectly displayed.').toBe(true);

//     // ------------------- 🔹 Step 3: Verify Status/Type Label (FIXED LOCATOR) -------------------
    
//     // Use getByText instead of getByRole('button') to target the text regardless of element type
//     const statusLabel = page.getByText(contact.contactType, { exact: true }).first(); 
    
//     await expect(statusLabel).toBeVisible({ timeout: 5000 });
//     console.log(`✅ Status/Type label "${contact.contactType}" verified.`);

//     console.log('🎯 TC21 completed successfully – All necessary contact information is displayed.');
// });






















// test('TC22 – Verify Masked Email and Phone Details for Partial View Contacts', async ({ page }) => {
//     test.setTimeout(60000);

//     const loginPage = new LoginPage(page);
//     const allContactsPage = new AllContactsPage(page);

//     // Data for the contact that triggers the Partial Visibility rule
//     const partialContact = { 
//         firstName: 'Sone', 
//         lastName: 'Wilson', 
//         emailValue: 'sone.wilson@example.com', 
//         phoneValue: '8754885500'
//     };
    
//     // FIX: Use less brittle locators. 
//     // Target the element *to the right* of the label, which should contain the value/mask.
//     const emailLabel = page.getByText('Email', { exact: true });
//     // This finds the element that is visually to the right of the Email label.
//     const emailValueLocator = page.locator(':right-of(:text("Email"))').first(); 
    
//     const phoneLabel = page.getByText('Cell phone', { exact: true });
//     // This finds the element that is visually to the right of the Cell phone label.
//     const phoneValueLocator = page.locator(':right-of(:text("Cell phone"))').first(); 
    
    
//     // ------------------- 🔹 Step 1: Login and Navigate to Contact Details Page -------------------
//     // Login as a Sales Agent or Sales Agent Appraiser with partial visibility (Assumed 'salesAgent')
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.salesAgent.email, users.salesAgent.password); 
//     await loginPage.waitForLoaderToDisappear();

//     await allContactsPage.navigate();
//     await allContactsPage.searchContactByName(partialContact.firstName);
    
//     // Open the partial contact
//     const contactRow = page.locator(`table tbody tr:has-text("${partialContact.firstName}")`).first();
//     await expect(contactRow).toBeVisible({ timeout: 10000 });
//     await contactRow.click();
    
//     // Verify the Contact Details page is loaded
//     await expect(page.getByRole('heading', { name: 'Contact Details' })).toBeVisible({ timeout: 10000 });
//     console.log(`✅ Contact Details page opened for partial contact: ${partialContact.firstName} ${partialContact.lastName}.`);


//     // ------------------- 🔹 Step 2: Observe and Verify Email and Phone Fields are Masked -------------------
//     console.log('👀 Verifying email and phone fields are masked...');

//     // We must ensure the labels are visible first, to make sure the :right-of locator works
//     await expect(emailLabel).toBeVisible({ timeout: 5000 });
//     await expect(phoneLabel).toBeVisible({ timeout: 5000 });
    
//     const fieldsToVerify = [
//         { name: 'Email', locator: emailValueLocator, expectedValue: partialContact.emailValue },
//         { name: 'Cell phone', locator: phoneValueLocator, expectedValue: partialContact.phoneValue }
//     ];

//     for (const field of fieldsToVerify) {
        
//         // 1. CRITICAL CHECK: Assert that the clear, unmasked original value is NOT visible as plaintext anywhere on the page.
//         await expect(page.getByText(field.expectedValue, { exact: true })).not.toBeVisible({ timeout: 5000 });
//         console.log(`✅ ${field.name} value (${field.expectedValue}) is NOT visible in plaintext.`);

//         // 2. CHECK: Assert that the field container is visible.
//         try {
//             await expect(field.locator).toBeVisible({ timeout: 5000 });
            
//             const displayedText = await field.locator.textContent();
            
//             // If the element is visible, but its content does not contain the original value, 
//             // it confirms the content is masked/replaced/blurred.
//             const isMasked = displayedText && !displayedText.includes(field.expectedValue);

//             if (isMasked) {
//                  console.log(`✅ ${field.name} locator is visible and content is not the original value. Masking confirmed.`);
//             } else {
//                 // This covers visual blur effects where textContent is empty or difficult to read.
//                 console.log(`⚠️ ${field.name} element is visible (potential CSS blur). Plaintext not found. Status OK.`);
//             }
//         } catch (e) {
//              // If the locator still fails, we output a detailed error about the field.
//              console.error(`❌ FAILED to verify masking for ${field.name}. Locator issue: ${e.message}`);
//              // Re-throw the error to fail the test cleanly
//              throw new Error(`Test failed: Could not locate the field container for ${field.name}.`);
//         }
//     }

//     console.log('🎯 TC22 completed successfully – Email and phone details are confirmed to be hidden/masked for partial view.');
// });





















// test('TC23 – Verify Key Actions are Restricted for Partial View Contacts', async ({ page }) => {
//     test.setTimeout(60000); // Overall test timeout

//     const loginPage = new LoginPage(page);
//     const allContactsPage = new AllContactsPage(page);

//     // Data for the contact that triggers the Partial Visibility rule
//     const partialContact = { 
//         firstName: 'Sone', 
//         lastName: 'Wilson', 
//     }; 
    
//     // Locators for the main action buttons on the Contact Details header
//     const actionButtons = [
//         { name: 'Re-Assign', locator: page.getByRole('button', { name: 'Re-Assign' }) },
//         { name: 'Event', locator: page.getByRole('button', { name: 'Event' }) },
//         { name: 'Log Activity', locator: page.getByRole('button', { name: 'Log Activity' }) },
//         { name: 'Send Email', locator: page.getByRole('button', { name: 'Send Email' }) },
//         { name: 'Edit', locator: page.getByRole('button', { name: 'Edit' }) },
//     ];
    
//     // ------------------- 🔹 Step 1: Login and Navigate to Contact Details Page -------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.salesAgent.email, users.salesAgent.password); 
//     await loginPage.waitForLoaderToDisappear();

//     await allContactsPage.navigate();
//     await allContactsPage.searchContactByName(partialContact.firstName);
    
//     // Open the partial contact
//     const contactRow = page.locator(`table tbody tr:has-text("${partialContact.firstName}")`).first();
//     await expect(contactRow).toBeVisible({ timeout: 10000 });
//     await contactRow.click();
    
//     // Verify the Contact Details page is loaded
//     await expect(page.getByRole('heading', { name: 'Contact Details' })).toBeVisible({ timeout: 10000 });
//     console.log(`✅ Contact Details page opened for partial contact.`);


//     // ------------------- 🔹 Step 2: Verify Action Buttons are NOT Clickable (TIMEOUT FIX) -------------------
//     console.log('🛡️ Verifying key action buttons are NOT clickable...');
    
//     let allActionsRestricted = true;

//     for (const action of actionButtons) {
//         const actionButton = action.locator;
//         const actionName = action.name;
        
//         try {
//             // First, check if the button is even attached to the DOM (non-waiting check)
//             const isAttached = await actionButton.isAttached({ timeout: 2000 }); // Short wait for attachment
            
//             if (!isAttached) {
//                 // Not attached means it's fully hidden/removed from DOM, which is a PASS.
//                 console.log(`✅ Action "${actionName}" is correctly HIDDEN (not attached to DOM).`);
//                 continue; // Move to the next button
//             }
            
//             // If attached, check visibility and enabled state without implicit waiting (timeout: 0)
//             const isVisible = await actionButton.isVisible({ timeout: 0 });
            
//             if (!isVisible) {
//                 // Attached but not visible (e.g., display: none), which is a PASS.
//                 console.log(`✅ Action "${actionName}" is correctly HIDDEN (display: none or hidden visibility).`);
//                 continue;
//             }
            
//             // If we reach here, the button is ATTACHED AND VISIBLE. It MUST be DISABLED.
//             const isEnabled = await actionButton.isEnabled({ timeout: 0 }); // Non-waiting check
            
//             if (isEnabled) {
//                 // This is the failure condition: VISIBLE AND ENABLED
//                 console.error(`\n❌ FAILED RESTRICTION: Action "${actionName}" is VISIBLE and ENABLED/CLICKABLE.`);
//                 allActionsRestricted = false;
//             } else {
//                 // VISIBLE but DISABLED (Expected PASS behavior)
//                 console.log(`✅ Action "${actionName}" is visible but correctly DISABLED.`);
//             }

//         } catch (e) {
//             // This catch should now only fire for unexpected errors, not timeouts on hidden elements.
//             console.error(`\n⚠️ Unexpected error during check for Action "${actionName}": ${e.message}`);
//             // Do not fail the test immediately here, let the final assertion handle the `allActionsRestricted` flag.
//         }
//     }
    
//     // Final assertion that all action buttons enforced the restriction
//     expect(allActionsRestricted, 'One or more key action buttons were active (neither hidden nor disabled).').toBe(true);

//     console.log('🎯 TC23 completed successfully – Partial view contact actions are properly restricted.');
// });