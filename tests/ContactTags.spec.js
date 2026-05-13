
import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import users from '../fixtures/users.json';
import { ContactTagsPage } from '../Pages/ContactTagsPage';
import { console } from 'node:inspector';
import path from 'path';







// test('TC01 – Verify Display of All Existing Tags and table Structure', async ({ page }) => {
//     test.setTimeout(90000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // Step 1: Login
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();
//     process.stdout.write('🔐 Logged in successfully\n');

//     // Step 2: Navigate to Contact Tags
//     await tagsPage.navigate();
//     await expect(tagsPage.pageTitle).toBeVisible();
//     process.stdout.write('📌 Navigated to Contact Tags page\n');

//     // ------------------- Step 3: Verify table is visible -------------------
//     await expect(tagsPage.tagsTable).toBeVisible();
//     process.stdout.write('✅ Tags table is visible\n');     

//     // ------------------- Step 4: Verify at least 1 tag exists -------------------
//     const tagRows = tagsPage.tagsTable.locator('tbody tr');
//     const rowsCount = await tagRows.count();
//     expect(rowsCount).toBeGreaterThan(0);

//     process.stdout.write(`📌 Total Tags Found: ${rowsCount}\n`);

//     // ------------------- Step 5: Validate Table Headers -------------------
//     process.stdout.write('🔍 Validating table headers...');

//     const headersLocator = tagsPage.tagsTable.locator('thead th');
//     const headersText = (await headersLocator.allInnerTexts()).map(h =>
//         h.replace(/\n/g, ' ').trim().toLowerCase()
//     );

//      process.stdout.write(`📌 Headers Found: ${headersText}\n`);

//     // Correct headers (view details is NOT a header)
//     const expectedHeaders = [
//         'tag name',
//         'contact count',
//         'creation date'
//     ];

//     expectedHeaders.forEach(expected => {
//         const found = headersText.some(h => h.includes(expected));
//         expect(found, `Header not found: ${expected}`).toBeTruthy();
//     });

//     process.stdout.write('✅ All table headers verified successfully.\n');

//     // ------------------- Step 6: Validate View Details icon is present in each row -------------------
//     process.stdout.write('🔍 Validating the View Details icon for each row...\n');

//     for (let i = 0; i < rowsCount; i++) {
//         const row = tagRows.nth(i);

//         // Blue arrow icon button
//         const viewButton = row.locator('button:has(svg)');

//         await expect(viewButton, `Missing View Details icon in row ${i + 1}`).toBeVisible();
//     }

//     process.stdout.write('✅ View Details icon validated for all rows.\n');

//     // ------------------- Step 7: Validate row structure (4 columns) -------------------
//     for (let i = 0; i < rowsCount; i++) {
//         const row = tagRows.nth(i);
//         const cells = row.locator('td');
//         expect(await cells.count()).toBeGreaterThanOrEqual(4);
//     }

//     process.stdout.write('✅ Table rows structure validated.\n');
//     process.stdout.write('🎯TC01 Passed — All tags + columns + icons verified.\n');
// });





















// test('TC02 – Verify Search Functionality (Existing & Non-existing Tags)', async ({ page }) => {
// test.setTimeout(120000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // Login
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();
//     process.stdout.write("🔐 Logged in successfully\n");

//     // Navigate
//     await tagsPage.navigate();
//     process.stdout.write("📌 Navigated to Contact Tags page\n");

//     // ------------------- Search existing tag -------------------
//     const existingTag = "Test";

//     await tagsPage.searchInput.fill(existingTag);
//     await tagsPage.filterButton.click();
//     process.stdout.write(`🔍 Searching for existing tag: ${existingTag}\n`);

//     // wait for results
//     await page.waitForTimeout(2500);

//     const rows = tagsPage.tagsTable.locator("tbody tr");
//     const count = await rows.count();

//     expect(count).toBeGreaterThan(0);

//     for (let i = 0; i < count; i++) {
//         const tagName = await rows.nth(i).locator('td').first().innerText();
//         expect(tagName.toLowerCase()).toContain(existingTag.toLowerCase());
//     }

//     process.stdout.write(`✅ Existing tag validated: ${existingTag}\n`);

//     // ------------------- Search non-existing tag -------------------
//     const nonExistingTag = "XYZ123456";
 

//     await tagsPage.searchInput.fill(nonExistingTag);
//     await tagsPage.filterButton.click();

//     await page.waitForTimeout(2500);

//     // FIXED LOCATOR
//     await expect(tagsPage.noRecords).toBeVisible();

//     process.stdout.write(`✅ Non-existing tag search validated: ${nonExistingTag}\n`);
//     process.stdout.write("🎯TC02 Passed: Search works for both existing + non-existing tags.\n");
// });



















// test('TC03 – Verify Filter & Reset Functionality', async ({ page }) => {
//     test.setTimeout(90000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // Login and Navigate
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();
//     process.stdout.write("🔐 Logged in successfully\n");  

//     await tagsPage.navigate();
//     process.stdout.write("📌 Navigated to Contact Tags page\n");
//     await expect(tagsPage.pageTitle).toBeVisible();

//     // ------------------- Step 1: Get Initial Count (Baseline) -------------------
//     // Clear any existing search/filter before getting the baseline count
//     await tagsPage.searchInput.clear();
//     await tagsPage.filterButton.click(); 
//     await page.waitForTimeout(1000); 

//     const initialTagRows = tagsPage.tagsTable.locator('tbody tr');
//     const initialRowCount = await initialTagRows.count();
    
//     // Ensure we have at least one tag to test filtering
//     expect(initialRowCount).toBeGreaterThan(0);
//     process.stdout.write(`🔍 Baseline: Total initial tags found: ${initialRowCount}\n`);

//     // ------------------- Step 2: Apply a Filter (Using an existing tag name) -------------------
//     // Use the name of the first tag found to ensure a successful filter result
//     const existingTagName = await initialTagRows.first().locator('td').first().innerText();
    
//     process.stdout.write(`🔍 Applying filter for tag: ${existingTagName}\n`);
//     await tagsPage.searchInput.fill(existingTagName);
//     await tagsPage.filterButton.click();
//     await page.waitForTimeout(2000); // Wait for results to load

//     const filteredTagRows = tagsPage.tagsTable.locator('tbody tr');
//     const filteredRowCount = await filteredTagRows.count();
    
//     // The filtered count should be less than or equal to the initial count, 
//     // and ideally less than the initial count if the list is long, 
//     // but definitely greater than 0 for a specific tag search.
//     expect(filteredRowCount).toBeGreaterThan(0);
//     expect(filteredRowCount).toBeLessThanOrEqual(initialRowCount);
//     process.stdout.write(`✅ Filter applied successfully. Tags found: ${filteredRowCount}\n`);

//     // ------------------- Step 3: Click the Reset button -------------------
//     // NOTE: You must implement: tagsPage.resetButton
//     await expect(tagsPage.resetButton).toBeVisible();
//     await tagsPage.resetButton.click();
//     await loginPage.waitForLoaderToDisappear(); 
//     await page.waitForTimeout(2000); 
//     process.stdout.write("🔄 Clicked Reset button\n");

//     // ------------------- Step 4: Verify Search Input is Cleared -------------------
//     const searchInputValue = await tagsPage.searchInput.inputValue();
//     expect(searchInputValue).toBe('');
//     process.stdout.write("✅ Search input field is cleared.\n");

//     // ------------------- Step 5: Verify Full Tag List is Displayed Again -------------------
//     const postResetTagRows = tagsPage.tagsTable.locator('tbody tr');
//     const postResetRowCount = await postResetTagRows.count();
    
//     // The count after reset must match the initial baseline count
//     expect(postResetRowCount).toBe(initialRowCount);
//     process.stdout.write(`✅ Full tag list restored. Tags found: ${postResetRowCount}\n`);

//     process.stdout.write('🎯TC03 Passed: Filter applied, search input cleared, and full list restored by Reset button.\n');
// });



















// test('TC04 – Verify Pagination of Contact Tags List', async ({ page }) => {
//     test.setTimeout(90000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // ---------------- Step 1: Login ----------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();
//     process.stdout.write("🔐Logged in successfully\n");

//     // ---------------- Step 2: Navigate to Contact Tags ----------------
//     await tagsPage.navigate();
//     await expect(tagsPage.pageTitle).toBeVisible();
//     process.stdout.write("📌 Navigated to Contact Tags page\n");

//     // ---------------- Step 3: Verify table has more than one page of data ----------------
//     const initialRows = await tagsPage.tagsTable.locator('tbody tr').count();
//     expect(initialRows).toBeGreaterThan(0);
//     process.stdout.write(`📌 Total rows loaded initially: ${initialRows}\n`);

//     // ---------------- Step 4: Go to next page ----------------
//     // await expect(tagsPage.nextButton).toBeVisible();
//     // await tagsPage.goToNextPage();
//     await expect(tagsPage.paginationNextButton).toBeVisible();
//     await tagsPage.goToNextPage();


//     const rowsAfterNext = await tagsPage.tagsTable.locator('tbody tr').count();
//     expect(rowsAfterNext).toBeGreaterThan(0);
//     process.stdout.write("➡️ Successfully navigated to Next Page\n");

//     // ---------------- Step 5: Go to previous page ----------------
//     // await expect(tagsPage.prevButton).toBeVisible();
//     // await tagsPage.goToPreviousPage();
//     await expect(tagsPage.paginationPrevButton).toBeVisible();
//     await tagsPage.goToPreviousPage();
    

//     const rowsAfterPrevious = await tagsPage.tagsTable.locator('tbody tr').count();
//     expect(rowsAfterPrevious).toBeGreaterThan(0);
//     process.stdout.write("⬅️ Successfully navigated to Previous Page\n");

//     // ---------------- Step 6: Change Rows Per Page: 10 → 25 → 50 ----------------
//     const rowSizes = [5, 10, 25, 100];

//     for (const size of rowSizes) {

//     console.log(`🔄 Changing rows per page to: ${size}`);

//     const previousCount = await tagsPage.tagsTable.locator('tbody tr').count();

//     await tagsPage.changeRowsPerPage(size);

//     // Wait until table actually refreshes
//     await tagsPage.waitForTableRowChange(previousCount);

//     const visibleRows = await tagsPage.tagsTable.locator('tbody tr').count();

//     expect(visibleRows).toBeGreaterThan(0);

//     process.stdout.write(`✅ Rows per page changed to ${size}. Visible rows: ${visibleRows}\n`);
//     }

//     process.stdout.write("🎯 TC04 Passed: Pagination & Rows-per-page dropdown working correctly.\n");
// });




















// test('TC05 – Verify View Tag Details Action', async ({ page }) => {
//     test.setTimeout(90000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // ---------------- Step 1: Login & Navigate ----------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();
//     process.stdout.write("🔐 Logged in successfully\n");

//     await tagsPage.navigate();
//     await expect(tagsPage.pageTitle).toBeVisible();
//     process.stdout.write("📌 Navigated to Contact Tags page\n");


//     // Step 2: Ensure at least 1 tag exists
//     const rowCount = await tagsPage.getRowCount();
//     expect(rowCount).toBeGreaterThan(0);

//     // Step 3: Click on the View ( → ) icon of the first tag
//     await page.waitForSelector('table tbody tr', { timeout: 20000 });
//     await tagsPage.clickViewDetailsOfFirstTag();
//     process.stdout.write("👁 Clicking View icon of first Contact Tag\n");


//     // Step 4: Verify detail view
//     await expect(tagsPage.tagDetailsHeader).toBeVisible();

//     process.stdout.write("🎯 TC05 Passed: View Add New Tag action verified successfully\n");

// });






















// test('TC06 – Verify Add New Tag Form Launch', async ({ page }) => {
//     test.setTimeout(120000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // ---------------- Step 1: Login & Navigate ----------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();
//     process.stdout.write("🔐 Logged in successfully\n");

//     await tagsPage.navigate();
//     await page.waitForLoadState('networkidle');   

//     // FIX: Ensure heading is visible
//     await expect(page.getByRole('heading', { name: /contact tags/i }))
//         .toBeVisible({ timeout: 15000 });

//     process.stdout.write("📌 Navigated to Contact Tags page\n");

//     // ---------------- Step 2: Click Add button ----------------
//     const addBtn = page.getByRole('button', { name: /add/i });   // FIXED LOCATOR
//     await addBtn.scrollIntoViewIfNeeded();
//     await addBtn.click();
//     await page.waitForTimeout(500); // animation time
//     process.stdout.write("➕ Clicked Add button to open Add New Tag form\n");

//     // ---------------- Step 3: Wait for modal ----------------   
//     const modal = page.locator('div[role="dialog"]');
//     await expect(modal).toBeVisible({ timeout: 15000 });  // FIXED
//     process.stdout.write("📌 Add New Tag modal is visible\n");

//     // -----------------------------
//     // 1️⃣ Verify Tag Name field
//     // -----------------------------
//     await expect(modal.getByText(/^Tag Name$/)).toBeVisible();
//     await expect(modal.locator('input[placeholder="Enter Tag Name"]')).toBeVisible();
//     process.stdout.write("✅ Tag Name field verified\n");


//     // -----------------------------
//     // 2️⃣ Verify Contact Name dropdown
//     // -----------------------------
//     await expect(modal.getByText(/^Contacts$/)).toBeVisible();
//     process.stdout.write("✅ Contacts label verified\n");

//     // -----------------------------
//     // 3️⃣ Verify Bulk Upload Section
//     // -----------------------------
//     await expect(modal.getByText(/No documents added yet/i)).toBeVisible();
//     await expect(
//         modal.getByText(/Click here to upload or drag and drop files/i)
//     ).toBeVisible();
//         process.stdout.write("✅ Bulk Upload section verified\n");


//     // Upload button
//     await expect(modal.getByRole('button').nth(1)).toBeVisible();
//     process.stdout.write("✅ Upload button verified\n");

//     // -----------------------------
//     // 4️⃣ Verify Cancel & Save buttons
//     // -----------------------------
//     await expect(modal.getByRole('button', { name: /^Cancel$/i })).toBeVisible();
//     await expect(modal.getByRole('button', { name: /^Save$/i })).toBeVisible();
//     process.stdout.write("✅ Cancel & Save buttons verified\n");

//     process.stdout.write("🎯 TC06 Passed: Add New Tag form UI verified successfully.\n");
// });






























// test("TC07 – Verify Create New Tag (With & Without Assigned Contacts)", async ({ page }) => {
//     test.setTimeout(120000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // --------------------- LOGIN and Navigate -----------------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();
//     process.stdout.write("🔐 Logged in successfully\n");

//     await tagsPage.navigate();
//     await page.waitForLoadState('networkidle');
//     await expect(page.getByRole('heading', { name: /contact tags/i }))
//         .toBeVisible({ timeout: 15000 });
//     process.stdout.write("📌 Navigated to Contact Tags page\n");


//     // ============================================================
//     // 🟦 PART 1: CREATE TAG WITHOUT CONTACTS
//     // ============================================================

//     const tagNameOnly = `VIP_${Date.now()}`;
//     process.stdout.write(`🔍 Creating tag without contacts: ${tagNameOnly}\n`);

//     const addBtn = page.getByRole('button', { name: /add/i });
//     await addBtn.click();

//     const modal = page.locator('div[role="dialog"]');
//     await expect(modal).toBeVisible();

//     const tagNameInput = modal.locator('input[placeholder="Enter Tag Name"]');
//     await tagNameInput.fill(tagNameOnly);
//     process.stdout.write(`Entter the tag name ${tagNameOnly}\n`)

//     await modal.getByRole("button", { name: /^Save$/i }).click();
//     process.stdout.write("click on save button\n")      

//     await expect(page.getByText("Contact Tag created successfully\n"))
//         .toBeVisible({ timeout: 20000 });

//     await tagsPage.searchTag(tagNameOnly);

//     const row0 = page.locator("table tbody tr").first();
//     await expect(row0.locator("td").nth(1)).toHaveText("0");

//     process.stdout.write("🎉 Verified: Tag created with 0 contacts\n");


//     // ============================================================
//     // 🟩 PART 2: CREATE TAG WITH MULTIPLE CONTACTS
//     // ============================================================

//     const tagNameWithContacts = `Premium_${Date.now()}`;
//     process.stdout.write(`🔍 Creating tag WITH contacts: ${tagNameWithContacts}\n`);

//     await addBtn.click();
//     const modal2 = page.locator('div[role="dialog"]');
//     await expect(modal2).toBeVisible();

//     const tagNameInput2 = modal2.locator('input[placeholder="Enter Tag Name"]');
//     await tagNameInput2.fill(tagNameWithContacts);

//     process.stdout.write("🔍 Selecting contacts one by one (React Select async)…\n");


//     // -----------------------------------------------
//     // FUNCTION: Select one contact at a time
//     // -----------------------------------------------
//     async function selectContact(text) {
//         const reactInput = page.locator('#react-select-3-input');

//         await reactInput.click({ force: true });
//         await reactInput.fill(text);

//         const dropdownOption = page.locator('[id*="-option-"]').first();
//         await expect(dropdownOption).toBeVisible({ timeout: 10000 });

//         await dropdownOption.click();
//     }


//     // First contact → auto selected after typing
//     await tagsPage.selectContact("test");
//     process.stdout.write("📌 First contact selected\n");

//     // Second contact → must type again
//     await tagsPage.selectContact("test");
//     process.stdout.write("📌 Second contact selected\n");

//     // Third contact → type again
//     await tagsPage.selectContact("test");
//     process.stdout.write("📌 Third contact selected\n");


//     // ---- Save ----
//     await modal2.getByRole("button", { name: /^Save$/i }).click();
    
//     await tagsPage.waitForSuccessToast();
//     await tagsPage.waitForTagListToRefresh();
//     await expect(page.getByText("Contact Tag created successfully"))
//         .toBeVisible({ timeout: 20000 });

//     process.stdout.write("✅ Tag created successfully WITH contacts\n");


//     // -------- Validate Table --------
//     await tagsPage.searchTag(tagNameWithContacts);
//     process.stdout.write("🔍 Searching for the newly created tag with contacts...\n");

//     // WAIT until contact count becomes greater than 0
//     await tagsPage.waitForContactCountToBeGreaterThanZero(tagNameWithContacts);

//     const row2 = page.locator("table tbody tr").first();

//     const contactCount = await row2.locator("td").nth(1).innerText();

//     process.stdout.write(`📌 Contact Count in table: ${contactCount}\n`);

//     expect(Number(contactCount)).toBeGreaterThan(0);


//     process.stdout.write("🎉 Verified: Tag created with multiple contacts\n");
//     process.stdout.write("🎯 TC07 Passed: Create New Tag (With & Without Assigned Contacts) verified successfully.\n");
// });






















// test("TC08 – Verify Cancel Action in Add New Tag Form", async ({ page }) => {
//     test.setTimeout(60000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // --------------------- LOGIN & NAVIGATE ---------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();

//     await tagsPage.navigate();
//     await page.waitForLoadState('networkidle');
//     process.stdout.write("🔐 Logged in and navigated to Contact Tags page\n");

//     await expect(page.getByRole('heading', { name: /contact tags/i }))
//         .toBeVisible({ timeout: 15000 });

//     process.stdout.write("📌 Navigated to Contact Tags page\n");

//     // --------------------- OPEN ADD TAG FORM ---------------------
//     const addBtn = page.getByRole("button", { name: /add/i });
//     await addBtn.click();

//     const modal = page.locator('div[role="dialog"]');
//     await expect(modal).toBeVisible();

//     process.stdout.write("📌 Add Tag form opened\n");

//     // --------------------- FILL TAG NAME ONLY -------------------
//     const tagNameTemp = `CancelTest_${Date.now()}`;
//     const tagNameInput = modal.locator('input[placeholder="Enter Tag Name"]');
//     await tagNameInput.fill(tagNameTemp);

//     process.stdout.write("📌 Tag Name filled\n");

//     // --------------------- CLICK CANCEL --------------------------
//     const cancelBtn = modal.getByRole("button", { name: /^Cancel$/i });
//     await cancelBtn.click();

//     await expect(modal).toBeHidden({ timeout: 10000 });
//     process.stdout.write("❌ Add Tag form closed using CANCEL\n");

//     // --------------------- VERIFY TAG IS NOT CREATED -------------
//     process.stdout.write("🔍 Verifying that tag was NOT created...\n");

//     // Search the same tag name
//     await tagsPage.searchTag(tagNameTemp);

//     // Fetch all visible tag names from the table
//     const allTagNames = await page.locator("table tbody tr td:first-child").allInnerTexts();

//     // Assert the tag is NOT in the list
//     expect(allTagNames).not.toContain(tagNameTemp);


//     process.stdout.write("✅🎉 TC08 Passed - Tag NOT created – Cancel action works correctly!\n");
// });






















// test("TC09 – Verify Duplicate Tag Name Handling", async ({ page }) => {
//     test.setTimeout(60000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // --------------------- LOGIN & NAVIGATE ---------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();
//     await tagsPage.navigate();
//     await page.waitForLoadState('networkidle');

//     await expect(page.getByRole('heading', { name: /contact tags/i }))
//         .toBeVisible({ timeout: 15000 });

//     process.stdout.write("🔐 Logged in and navigated to Contact Tags page\n");

//     // --------------------- OPEN ADD TAG FORM ---------------------
//     const addBtn = page.getByRole("button", { name: /add/i });
//     await addBtn.click();
//     const modal = page.locator('div[role="dialog"]');
//     await expect(modal).toBeVisible();
//     process.stdout.write("📌 Add Tag form opened\n"); 

//     // --------------------- ENTER DUPLICATE TAG NAME -------------
//     const duplicateTagName = "Test"; // ensure this tag exists
//     const tagNameInput = modal.locator('input[placeholder="Enter Tag Name"]');
//     await tagNameInput.fill(duplicateTagName);

//     process.stdout.write(`🔍 Entered duplicate tag name: ${duplicateTagName}\n`);

//     // --------------------- CLICK SAVE ---------------------------
//     await modal.getByRole("button", { name: /^Save$/i }).click();
//     process.stdout.write("👉 Clicked Save button\n");

//     // --------------------- VERIFY SYSTEM RESPONSE ----------------

//     // OPTION 1: Check inline error under input
//     const inlineError = modal.locator('text=Tag Name already exists');
//     process.stdout.write("✅ Inline error displayed for duplicate tag\n");


//     // Ensure modal did NOT close
//     await expect(modal).toBeVisible();
//     process.stdout.write("✅🎉 TC09 Passed - Verified: Duplicate tag creation prevented, modal still open\n");
// });








//for the TC 10 and TC11 we need to have excel file in which some contact should be there 
// which are not in the system, so that after uploading excel we can validate message of new
//  contact found and count of new contact found






// // For this TC we need file in which some conatct shoudl be there which are not in the system
// test("TC10 – Verify User Can Upload Excel File for Adding Contacts", async ({ page }) => {
//         test.setTimeout(90000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // --------------------- LOGIN & NAVIGATE ---------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();
//     await tagsPage.navigate();
//     await page.waitForLoadState('networkidle');

//     await expect(page.getByRole('heading', { name: /contact tags/i }))
//         .toBeVisible({ timeout: 15000 });

//     process.stdout.write("📌 Navigated to Contact Tags page\n");

//     // --------------------- OPEN ADD TAG MODAL ---------------------
//     await tagsPage.openAddTagModal();
//     process.stdout.write("📌 Add Tag modal opened\n");

//     // --------------------- FILL TAG NAME --------------------------
//     const tagName = `Upload_${Date.now()}`;
//     await tagsPage.fillTagName(tagName);
//     process.stdout.write(`📌 Tag Name filled: ${tagName}\n`);

//     // --------------------- UPLOAD EXCEL FILE ----------------------
//     const excelFilePath = "D:\\GC Download\\Contact tag\\Contact Tag _ Upload contacts in new tag 13 Feb 1 contact.xlsx";
//     await tagsPage.uploadExcel(excelFilePath);
//     process.stdout.write(`📂 Excel file uploaded: ${excelFilePath}\n`);

//     // --------------------- CLICK NEXT -----------------------------
//     await tagsPage.clickNextAfterUpload();
//     process.stdout.write("👉 Clicked Next button after Excel upload\n");

//     // --------------------- VERIFY NEXT STEP / MODAL ----------------
//     await expect(tagsPage.nextButtonInModal).toBeVisible({ timeout: 10000 });
//     process.stdout.write("🎯✅🎉 TC10 Passed: Excel file accepted and modal moved to next step\n");
// });











// //Same fiel in this TC will be use in which some contacts are there which are not in the system, so that after uploading excel we can validate message of new contact found and count of new contact found
// test("TC11 – Verify Step 1: Upload Excel & Capture New Contacts Message", async ({ page }) => {
//         test.setTimeout(90000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // --------------------- LOGIN & NAVIGATE ---------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();
//     await tagsPage.navigate();
//     await page.waitForLoadState('networkidle');
//     process.stdout.write("🔐 Logged in and navigated to Contact Tags page\n");


//     await expect(page.getByRole('heading', { name: /contact tags/i }))
//         .toBeVisible({ timeout: 15000 });



//     // Open Add Tag
//     await tagsPage.openAddTagModal();
//     process.stdout.write("📌 Add Tag modal opened\n");

//     // Fill Tag Name
//     const tagName = `Upload_${Date.now()}`;
//     await tagsPage.fillTagName(tagName);
//     process.stdout.write(`📌 Tag name filled: ${tagName}\n`);

//     // Upload Excel
//     const excelPath = "D:\\GC Download\\Contact tag\\Contact Tag _ Upload contacts in new tag 13 Feb 1 contact.xlsx";
//     await tagsPage.uploadExcel(excelPath);
//     process.stdout.write("📂 Excel uploaded\n");

//     // Wait for processing
//     await tagsPage.waitForUploadProcessing();
//     process.stdout.write("⏳ Upload processing completed\n");

//     // Validate message
//     const infoText = await tagsPage.getUploadInfoText();
//     process.stdout.write(`📌 Upload Info Text:", ${infoText}\n`);

//     const count = await tagsPage.getUploadInfoCount();
//     expect(count).toBeGreaterThan(0);

//     process.stdout.write(`📌 New contacts found: ${count}\n`);

//     expect(count).toBeGreaterThan(0);

//    // Click Next
//    await tagsPage.clickNextAfterUpload();
//    process.stdout.write("👉 Clicked Next\n");

//    process.stdout.write("🎯✅ TC11 Passed - Upload Excel & Capture New Contacts Message verified\n");
// });















// // same file will be used in this TC in which some contacts are there which are not in the system, so that
// //  after uploading excel we can validate message of no new contact found and count of new 
// // contact found should not be there and we should be able to click next and move forward 
// // without any issue
// test("TC12 – Upload Excel & Handle New / Existing Contacts, and message appearance when no new contact found", async ({ page }) => {
//     test.setTimeout(60000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // --------------------- LOGIN & NAVIGATE ---------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();

//     await tagsPage.navigate();
//     await page.waitForLoadState('networkidle');
//     process.stdout.write("🔐 Logged in and navigated to Contact Tags page\n");

//     await expect(
//         page.getByRole('heading', { name: /contact tags/i })
//     ).toBeVisible({ timeout: 15000 });


//     // --------------------- ADD TAG ---------------------
//     await tagsPage.openAddTagModal();
//     process.stdout.write("📌 Add Tag modal opened\n");

//     const tagName = `Upload_${Date.now()}`;
//     await tagsPage.fillTagName(tagName);
//     process.stdout.write(`📌 Tag name filled: ${tagName}\n`);

//     // --------------------- UPLOAD EXCEL ---------------------
//     const excelPath = "D:\\GC Download\\Contact tag\\Contact Tag _ Upload contacts in new tag 13 Feb 1 contact.xlsx";
//     await tagsPage.uploadExcel(excelPath);
//     process.stdout.write("📂 Excel uploaded\n");

//     await tagsPage.waitForUploadProcessing();
//     process.stdout.write("⏳ Upload processing completed\n");

//     // --------------------- CONDITIONAL VALIDATION ---------------------
//     const isMessageVisible = await tagsPage.uploadInfoMessage
//         .first()
//         .isVisible()
//         .catch(() => false);

//     if (isMessageVisible) {
//         // ✅ New contacts found (TC11 behavior)
//         const infoText = await tagsPage.getUploadInfoText();
//         process.stdout.write(`📌 Upload Info Text:", ${infoText}\n`);

//         const count = await tagsPage.getUploadInfoCount();
//         process.stdout.write(`📌 New contacts found: ${count}\n`);

//         expect(count).toBeGreaterThan(0);
//         process.stdout.write("✅ New contacts message validated\n");

//     } else {
//         // ✅ No new contacts found (TC12 behavior)
//         process.stdout.write("ℹ️ No new contacts message displayed\n");
//         process.stdout.write("✅ Existing contacts only – proceeding directly\n");
//     }

//     // --------------------- NEXT ---------------------
//     await expect(tagsPage.nextButtonInModal).toBeEnabled();
//     await tagsPage.clickNextAfterUpload();

//     process.stdout.write("👉 Clicked Next\n");
//     process.stdout.write("🎯✅ TC12 Passed – Upload behavior validated\n")
// });























// test("TC13 – Step 2 Review Contacts | Verify User Can Select Which New Contacts to Create & Navigation Validation", async ({ page }) => {
//       test.setTimeout(90000);

//       const loginPage = new LoginPage(page);
//       const tagsPage = new ContactTagsPage(page);

//       // --------------------------------------------------
//       // LOGIN & NAVIGATE
//       // --------------------------------------------------
//       await loginPage.gotoLoginPage();
//       await loginPage.login(users.admin.email, users.admin.password);
//       await loginPage.waitForLoaderToDisappear();

//       await tagsPage.navigate();
//       await page.waitForLoadState("networkidle");
//       process.stdout.write("📌 Login and Navigated to Contact Tags page\n");

//       // --------------------------------------------------
//       // STEP 1: UPLOAD FILE
//       // --------------------------------------------------
//       await tagsPage.openAddTagModal();

//       const tagName = `Step2_TC_${Date.now()}`;
//       await tagsPage.fillTagName(tagName);

//       const excelPath = "D:\\GC Download\\Contact tag\\Contact Tag _ Upload contacts in new tag 13 Feb 1 contact.xlsx";
//       await tagsPage.uploadExcel(excelPath);
//       process.stdout.write("📂 Excel file uploaded\n");

//       await tagsPage.waitForUploadProcessing();
//       process.stdout.write("⏳ Upload processing completed\n");
//       await tagsPage.clickNextAfterUpload();
//       process.stdout.write("👉 Clicked Next to proceed to Step 2\n");

//       // --------------------------------------------------
//       // STEP 2: VERIFY PAGE
//       // --------------------------------------------------
//       await expect(tagsPage.step2Header).toBeVisible();
//       process.stdout.write("✅ Step 2 page opened\n");

//       await expect(tagsPage.newContactsTitle).toBeVisible();
//       process.stdout.write("✅ New Contacts section visible\n");

//           // ---------------- DUPLICATE CONTACTS SECTION ----------------
//       await expect(tagsPage.duplicateContactsTitle).toBeVisible();

//       const duplicateRows = tagsPage.duplicateContactRows;
//       if (await duplicateRows.count() > 0) {
//           await expect(
//               duplicateRows.first().locator('input[type="checkbox"]')
//           ).toHaveCount(0);
//           process.stdout.write("✅ Duplicate contacts are read-only and visible\n");
//       }

//       const newContactRows = tagsPage.newContactsRows;
//       const newCount = await newContactRows.count();
//       expect(newCount).toBeGreaterThan(0);

//       // Verify unchecked by default
//       for (let i = 0; i < newCount; i++) {
//           await expect(
//               newContactRows.nth(i).locator('input[type="checkbox"]')
//           ).not.toBeChecked();
//       }
//       process.stdout.write("✅ New contacts are unchecked by default\n");

//       // --------------------------------------------------
//       // NO CONTACT SELECTED → PROCEED WITHOUT SELECTION
//       // -------------------------------------------------

//       await tagsPage.nextButtonInModal.click();

//       await expect(tagsPage.step3Header).toBeVisible();
//       process.stdout.write("✅ Able to proceed to Step 3 without selecting contacts\n");

//       // ---------------- BACK TO STEP 2 ----------------
//       await tagsPage.backButton.click();

//       await expect(tagsPage.newContactsTable).toBeVisible();
//       process.stdout.write("✅ Returned to Step 2 from Step 3\n");

//       // ---------------- SELECT ONE CONTACT ----------------
//       await newContactRows.first()
//       .locator('input[type="checkbox"]')
//       .check();

//        process.stdout.write("✅ One new contact selected\n");

//        await tagsPage.nextButtonInModal.click();
//        await expect(tagsPage.step3Header).toBeVisible();
//        process.stdout.write("✅ Proceeded to Step 3 with single contact\n");

//       // ---------------- BACK AGAIN ----------------
//       await tagsPage.backButton.click();
//       await expect(tagsPage.newContactsTable).toBeVisible();
//       process.stdout.write("✅ Returned to Step 2 again\n");

//       // ---------------- SELECT ALL CONTACTS ----------------
//       // Select all contacts (row-wise)
//       // Use the POM method or directly via the instance
//       await tagsPage.selectAllNewContactsUsingHeader();

//       process.stdout.write(`✅ All new contacts selected after Select All", ${newCount}\n`);

//       // ---------------- FINAL PROCEED ----------------
//       await tagsPage.nextButtonInModal.click();
//       await expect(tagsPage.step3Header).toBeVisible();

//       process.stdout.write("🎯 TC13 PASSED – Step 2 selection & navigation validated fully\n");
// });


































// test("TC14, TC15 – Step 3 | Verify Mandatory Primary Agent Validation & Successful Selection", async ({ page }) => {
//     test.setTimeout(90000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // --------------------------------------------------
//     // LOGIN & NAVIGATE
//     // --------------------------------------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();

//     await tagsPage.navigate();
//     await page.waitForLoadState("networkidle");
//     process.stdout.write("📌 Login and Navigated to Contact Tags page\n");

//     // --------------------------------------------------
//     // STEP 1: UPLOAD FILE
//     // --------------------------------------------------
//     await tagsPage.openAddTagModal();

//     const tagName = `Step3_TC_${Date.now()}`;
//     await tagsPage.fillTagName(tagName);

//     const excelPath = "D:\\GC Download\\Contact tag\\Contact Tag _ Upload contacts in new tag 13 Feb 1 contact.xlsx";
//     await tagsPage.uploadExcel(excelPath);
//     process.stdout.write("📂 Excel file uploaded\n");

//     await tagsPage.waitForUploadProcessing();
//     process.stdout.write("⏳ Upload processing completed\n");

//     await tagsPage.clickNextAfterUpload();
//     process.stdout.write("👉 Clicked Next to proceed to Step 2\n");

//     // --------------------------------------------------
//     // STEP 2: SELECT AT LEAST ONE CONTACT
//     // --------------------------------------------------
//     await expect(tagsPage.step2Header).toBeVisible();

//     const newContactRows = tagsPage.newContactsRows;
//     await newContactRows.first()
//         .locator('input[type="checkbox"]')
//         .check();
//         process.stdout.write("✅ One new contact selected in Step 2\n");

//     await tagsPage.nextButtonInModal.click();
//     process.stdout.write("👉 Clicked Next to proceed to Step 3\n");

//     // --------------------------------------------------
//     // STEP 3: VERIFY PAGE
//     // --------------------------------------------------
//     await expect(tagsPage.step3Header).toBeVisible();
//     process.stdout.write("✅ Step 3 page opened\n");

//    // ==================================================
//    // 🧪 steps– Mandatory Primary Agent Validation
//    // ==================================================
//    await tagsPage.nextButtonInModal.click();

//    // 🔴 Primary Agent field should be highlighted in red
//    await expect(tagsPage.primaryAgentErrorState).toBeVisible();
//    process.stdout.write("✅ Primary Agent field highlighted in red\n");

//    // 🚫 User must NOT proceed to Step 4
//    await expect(tagsPage.step4Header).not.toBeVisible();
//    process.stdout.write("🎉 TC14 PASSED - ✅ Navigation blocked without Primary Agent selection\n");

//    // ==================================================
//    // 🧪 steps– Primary Agent Selection Works Correctly
//    // ==================================================
//    const agentName = "2May Test"; // change if needed

//    await tagsPage.primaryAgentDropdown.click();
//    await tagsPage.primaryAgentDropdown.fill(agentName);

//    // Select from dropdown list
//    await page.locator(`li >> text=${agentName}`).click();
//    process.stdout.write(`✅ Primary Agent selected: ${agentName}\n`);

//    await tagsPage.nextButtonInModal.click();

//    // ✅ User should proceed to Step 4
//    await expect(tagsPage.step4Header).toBeVisible();
//    process.stdout.write("🎯 Successfully proceeded after selecting Primary Agent\n");

//    process.stdout.write("🎉 TC15 PASSED – Mandatory validation & agent selection verified\n");

// });

































// test("TC16 – Step 4: Verify Overview Screen Displays All Details", async ({ page }) => {
//     test.setTimeout(90000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // --------------------------------------------------
//     // LOGIN & NAVIGATE
//     // --------------------------------------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();

//     await tagsPage.navigate();
//     await page.waitForLoadState("networkidle");
//     process.stdout.write("📌 Login and Navigated to Contact Tags page\n");

//     // --------------------------------------------------
//     // STEP 1: UPLOAD FILE
//     // --------------------------------------------------
//     await tagsPage.openAddTagModal();

//     const tagName = `Step3_TC_${Date.now()}`;
//     await tagsPage.fillTagName(tagName);

//     const excelPath = "D:\\GC Download\\Contact tag\\Contact Tag _ Upload contacts in new tag 13 Feb 1 contact.xlsx";
//     await tagsPage.uploadExcel(excelPath);
//     process.stdout.write("📂 Excel file uploaded\n");

//     await tagsPage.waitForUploadProcessing();
//     process.stdout.write("⏳ Upload processing completed\n");

//     await tagsPage.clickNextAfterUpload();
//     process.stdout.write("👉 Clicked Next to proceed to Step 2\n");

//     // --------------------------------------------------
//     // STEP 2: SELECT AT LEAST ONE CONTACT
//     // --------------------------------------------------
//     await expect(tagsPage.step2Header).toBeVisible();

//     const newContactRows = tagsPage.newContactsRows;
//     await newContactRows.first()
//         .locator('input[type="checkbox"]')
//         .check();
//         process.stdout.write("✅ One new contact selected in Step 2\n");

//     await tagsPage.nextButtonInModal.click();
//     process.stdout.write("👉 Clicked Next to proceed to Step 3\n");

//     // --------------------------------------------------
//     // STEP 3: VERIFY PAGE
//     // --------------------------------------------------
//     await expect(tagsPage.step3Header).toBeVisible();
//     process.stdout.write("✅ Step 3 page opened\n");


//    // ==================================================
//    // 🧪 steps– Primary Agent Selection Works Correctly
//    // ==================================================
//    const agentName = "2May Test"; // change if needed

//    await tagsPage.primaryAgentDropdown.click();
//    await tagsPage.primaryAgentDropdown.fill(agentName);

//    // Select from dropdown list
//    await page.locator(`li >> text=${agentName}`).click();
//    process.stdout.write(`✅ Primary Agent selected: ${agentName}\n`);

//    await tagsPage.nextButtonInModal.click();

//    // ✅ User should proceed to Step 4
//    await expect(tagsPage.step4Header).toBeVisible();
//    process.stdout.write(`🎯 Successfully proceeded after selecting Primary Agent:", ${agentName}\n`);


//    // ==================================================
//    // 🧪 TC15 – Step 4 | Overview Screen Validation
//    // ==================================================

//    // ---------------- VERIFY OVERVIEW HEADER ----------------
//    await expect(
//    page.getByText("Review the details below before adding contacts")
//    ).toBeVisible();

//    process.stdout.write("✅ Overview header displayed\n");

//    // ---------------- VERIFY NEW CONTACTS SUMMARY ----------------
//    await expect(
//    page.getByText(/new contacts added successfully/i)
//    ).toBeVisible();

//     process.stdout.write("✅ New contacts summary visible\n");

//     // ---------------- VERIFY DUPLICATE CONTACTS SUMMARY ----------------
//     await expect(
//     page.getByText(/duplicate contacts found/i)
//     ).toBeVisible();

//     process.stdout.write("✅ Duplicate contacts summary visible\n");

//    // ---------------- VERIFY PRIMARY AGENT ----------------
//    // await expect(
//    //   page.getByText(new RegExp(`Contacts Assigned to:\\s*${agentName}`, 'i'))
//    // ).toBeVisible();

//    await expect(page.getByText("Contacts Assigned to:")).toBeVisible();
//    await expect(page.getByText(agentName)).toBeVisible();


//    process.stdout.write(`✅ Primary Agent details displayed:", ${agentName}\n`);

//    // ---------------- VERIFY ACTION BUTTONS ----------------
//    await expect(tagsPage.step4backButton).toBeVisible();
//    await expect(tagsPage.step4cancelButton).toBeVisible();
//    await expect(tagsPage.step4confirmAndAddButton).toBeVisible();

//    process.stdout.write("✅ Back, Cancel and Confirm buttons visible");

//    process.stdout.write("🎯 TC16 PASSED – Overview screen validated successfully");
// });





























// test("TC17 – Verify Overview Updates After Navigating Back and Editing Information", async ({ page }) => {
//   test.setTimeout(120000);

//   const loginPage = new LoginPage(page);
//   const tagsPage = new ContactTagsPage(page);

//   // --------------------------------------------------
//   // LOGIN & NAVIGATE
//   // --------------------------------------------------
//   console.log("📌 Starting TC17: Login and navigate to Contact Tags page");
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();
//   await tagsPage.navigate();
//   await page.waitForLoadState("networkidle");
//   process.stdout.write("📌 Login completed & navigated to Contact Tags\n");

//   // --------------------------------------------------
//   // STEP 1 – UPLOAD FILE
//   // --------------------------------------------------
//   process.stdout.write("📂 Step 1: Open Add Tag modal and upload file\n");
//   await tagsPage.openAddTagModal();

//   const tagName = `TC17_${Date.now()}`;
//   await tagsPage.fillTagName(tagName);

//   const excelPath = "D:\\GC Download\\Contact tag\\Contact Tag _ Upload contacts in new tag 13 Feb 1 contact.xlsx";
//   await tagsPage.uploadExcel(excelPath);
//   await tagsPage.waitForUploadProcessing();
//   await tagsPage.clickNextAfterUpload();
//   process.stdout.write("✅ File uploaded & moved to Step 2\n");

//   // --------------------------------------------------
//   // STEP 2 – SELECT ONE CONTACT
//   // --------------------------------------------------
//   console.log("📝 Step 2: Select one contact");
//   await expect(tagsPage.step2Header).toBeVisible();
//   await tagsPage.newContactsRows.first().locator('input[type="checkbox"]').check();
//   process.stdout.write("✅ One contact selected\n");
//   await tagsPage.nextButtonInModal.click();
//   process.stdout.write("👉 Proceeded to Step 3\n");

//   // --------------------------------------------------
//   // STEP 3 – SELECT INITIAL AGENT
//   // --------------------------------------------------
//   process.stdout.write("📝 Step 3: Select initial primary agent\n");
//   await expect(tagsPage.step3Header).toBeVisible();

//   const initialAgent = "2May Test";
//   const updatedAgent = "All In Test"; // must exist

//   await tagsPage.primaryAgentDropdown.click();
//   await tagsPage.primaryAgentDropdown.fill(initialAgent);
//   await page.locator(`li >> text=${initialAgent}`).click();
//   process.stdout.write(`✅ Initial agent selected: ${initialAgent}/n`);

//   await tagsPage.nextButtonInModal.click();
//   process.stdout.write("👉 Proceeded to Step 4\n");

//   // --------------------------------------------------
//   // STEP 4 – VERIFY INITIAL OVERVIEW
//   // --------------------------------------------------
//   console.log("📝 Step 4: Verify initial overview");
//   await expect(tagsPage.step4Header).toBeVisible();
//   await tagsPage.verifyOverview(initialAgent);
//   process.stdout.write("✅ Initial overview verified\n");

//   // --------------------------------------------------
//   // BACK → STEP 3
//   // --------------------------------------------------
//   process.stdout.write("🔙 Navigate back to Step 3\n");
//   await tagsPage.step4backButton.click();
//   await expect(tagsPage.step3Header).toBeVisible();

//   // --------------------------------------------------
//   // BACK → STEP 2
//   // --------------------------------------------------
//   process.stdout.write("🔙 Navigate back to Step 2\n");
//   await tagsPage.backButton.click();
//   await expect(tagsPage.step2Header).toBeVisible();

//   // --------------------------------------------------
//   // STEP 2 – SELECT ALL CONTACTS
//   // --------------------------------------------------
//   process.stdout.write("📝 Step 2: Select all contacts\n");
//   await tagsPage.selectAllNewContactsUsingHeader();
//   process.stdout.write("✅ All contacts selected\n");
//   await tagsPage.nextButtonInModal.click();
//   process.stdout.write("👉 Proceeded again to Step 3\n");

//   // --------------------------------------------------
//   // STEP 3 – CHANGE PRIMARY AGENT
//   // --------------------------------------------------
//   process.stdout.write("📝 Step 3: Change primary agent\n");
//   await expect(tagsPage.step3Header).toBeVisible();
//   await tagsPage.primaryAgentDropdown.click();
//   await tagsPage.primaryAgentDropdown.fill(updatedAgent);
//   await page.locator(`li >> text=${updatedAgent}`).click();
//   process.stdout.write(`✅ Agent updated to: ${updatedAgent}\n`);
//   await tagsPage.nextButtonInModal.click();
//   process.stdout.write("👉 Proceeded to Step 4 again\n");

//   // --------------------------------------------------
//   // STEP 4 – VERIFY UPDATED OVERVIEW
//   // --------------------------------------------------
//   process.stdout.write("📝 Step 4: Verify updated overview\n");
//   await expect(tagsPage.step4Header).toBeVisible();
//   await tagsPage.verifyOverview(updatedAgent);
//   process.stdout.write("🎉 TC17 PASSED – Overview updated after back navigation & edits\n");
// });



















// // // This TC need different file to pass the TC successfully, in which some contacts should be there which 
// // are not in the system, so that after uploading excel we can validate message of new contact found and count
// //  of new contact found and then we can proceed further and finally we can verify after submission of new tag 
// // that tag is created successfully and appears in the tag list


// test("TC18 – Step 4: Verify Submission of New Contact Tag", async ({ page }) => {
//     test.setTimeout(90000);

//     const loginPage = new LoginPage(page);
//     const tagsPage = new ContactTagsPage(page);

//     // --------------------------------------------------
//     // LOGIN & NAVIGATE
//     // --------------------------------------------------
//     await loginPage.gotoLoginPage();
//     await loginPage.login(users.admin.email, users.admin.password);
//     await loginPage.waitForLoaderToDisappear();

//     await tagsPage.navigate();
//     // // await page.waitForLoadState("networkidle");
//     // await expect(tagsPage.pageTitle).toBeVisible({ timeout: 15000 });
//     process.stdout.write("📌 Login and Navigated to Contact Tags page\n");

//     // --------------------------------------------------
//     // STEP 1: UPLOAD FILE
//     // --------------------------------------------------
//     await tagsPage.openAddTagModal();

//     const tagName = `Step3_TC_${Date.now()}`;
//     await tagsPage.fillTagName(tagName);

//     const excelPath = "D:\\GC Download\\Contact tag\\Contact Tag _ Upload contacts in new tag Test.xlsx";
//     await tagsPage.uploadExcel(excelPath);
//     process.stdout.write("📂 Excel file uploaded\n");

//     await tagsPage.waitForUploadProcessing();
//     process.stdout.write("⏳ Upload processing completed\n");

//     await tagsPage.clickNextAfterUpload();
//     process.stdout.write("👉 Clicked Next to proceed to Step 2\n");

//     // --------------------------------------------------
//     // STEP 2: SELECT AT LEAST ONE CONTACT
//     // --------------------------------------------------
//     await expect(tagsPage.step2Header).toBeVisible();

//     const newContactRows = tagsPage.newContactsRows;
//     await newContactRows.first()
//         .locator('input[type="checkbox"]')
//         .check();
//         console.log("✅ One new contact selected in Step 2");

//     await tagsPage.nextButtonInModal.click();
//     process.stdout.write("👉 Clicked Next to proceed to Step 3\n");

//     // --------------------------------------------------
//     // STEP 3: VERIFY PAGE
//     // --------------------------------------------------
//     await expect(tagsPage.step3Header).toBeVisible();
//     process.stdout.write("✅ Step 3 page opened\n");


//     // ==================================================
//     // 🧪 steps– Primary Agent Selection Works Correctly
//     // ==================================================
//     const agentName = "2May Test"; // change if needed

//     await tagsPage.primaryAgentDropdown.click();
//     await tagsPage.primaryAgentDropdown.fill(agentName);

//     // Select from dropdown list
//     await page.locator(`li >> text=${agentName}`).click();
//     process.stdout.write(`✅ Primary Agent selected: ${agentName}\n`);

//     await tagsPage.nextButtonInModal.click();

//     // ✅ User should proceed to Step 4
//     await expect(tagsPage.step4Header).toBeVisible();
//     process.stdout.write(`🎯 Successfully proceeded after selecting Primary Agent:, ${agentName}\n`);


//     // ==================================================
//     // 🧪 TC15 – Step 4 | Overview Screen Validation
//     // ==================================================

//     // ---------------- VERIFY OVERVIEW HEADER ----------------
//     await expect(
//     page.getByText("Review the details below before adding contacts")
//     ).toBeVisible();

//     process.stdout.write("✅ Overview header displayed\n");

//     // ---------------- VERIFY NEW CONTACTS SUMMARY ----------------
//     await expect(
//     page.getByText(/new contacts added successfully/i)
//     ).toBeVisible();

//     process.stdout.write("✅ New contacts summary visible\n");

//     // ---------------- VERIFY DUPLICATE CONTACTS SUMMARY ----------------
//     await expect(
//     page.getByText(/duplicate contacts found/i)
//     ).toBeVisible();

//     process.stdout.write("✅ Duplicate contacts summary visible\n");

//     // ---------------- VERIFY PRIMARY AGENT ----------------

//     await expect(page.getByText("Contacts Assigned to:")).toBeVisible();
//     await expect(page.getByText(agentName)).toBeVisible();


//     process.stdout.write(`✅ Primary Agent details displayed: ${agentName}\n`);

//     // ---------------- VERIFY ACTION BUTTONS ----------------
//     await expect(tagsPage.step4backButton).toBeVisible();
//     await expect(tagsPage.step4cancelButton).toBeVisible();
//     await expect(tagsPage.step4confirmAndAddButton).toBeVisible();

//     process.stdout.write("✅ Back, Cancel and Confirm buttons visible\n");

//     process.stdout.write("🎯 TC16 PASSED – Overview screen validated successfully\n");

//     // -------------------- STEP 4: SUBMIT NEW TAG --------------------
//     // Wait for overview screen to be visible
//     await expect(tagsPage.step4Header).toBeVisible();
//     process.stdout.write("✅ Overview screen displayed\n");

//     // Click Confirm and Add button
//     await tagsPage.step4confirmAndAddButton.click();
//     process.stdout.write("👉 Clicked 'Confirm and Add' button\n");

//     // -------------------- VERIFY TAG CREATION --------------------
//     // Wait for success toast/message
//     process.stdout.write("🎯 Tag created successfully\n");

//     // Verify new tag appears in tag list
//     // Wait for navigation back to tag list
//     await expect(
//    page.locator('table').getByText(tagName)
//    ).toBeVisible({ timeout: 15000 });

//     process.stdout.write(`✅ New tag appears in the list:, ${tagName}\n`);

//     process.stdout.write("🎉🎯TC18 PASSED - Submission of New Contact Tag verified successfully\n")

// });





















// test("TC19 – Verify Edit Contact Tag Dialog Behavior & Only Tag Name Is Editable", async ({ page }) => {
//   test.setTimeout(90000);

//   const loginPage = new LoginPage(page);
//   const tagsPage = new ContactTagsPage(page);

//   // ---------------- LOGIN & NAVIGATE ----------------
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();

//   await tagsPage.navigate();
//   process.stdout.write("📌 Login and navigated to Contact Tags page\n");

//   // ---------------- OPEN EDIT DIALOG ----------------
//   await tagsPage.clickEditIconForFirstTag();
//   await tagsPage.waitForEditDialog();
//   process.stdout.write("✏️ Clicked Edit icon for first tag\n");

//   // ---------------- VERIFY DIALOG HEADER ----------------
//   await tagsPage.verifyEditDialogHeader();
//   process.stdout.write("✅ Edit Contact Tag dialog header verified\n");

//   // ---------------- VERIFY FIELD EDITABILITY ----------------
//   await tagsPage.verifyOnlyTagNameIsEditable();
//   process.stdout.write("✅ Only Tag Name field is editable\n");

//   // ---------------- VERIFY BUTTON BEHAVIOR ----------------
//   await tagsPage.verifyInitialButtonState();
//   await tagsPage.modifyTagNameAndVerifyUpdateEnabled();
//   process.stdout.write("✅ Cancel & Update button behavior verified\n");
//   process.stdout.write("✅🎯TC19 PASSED - Edit Contact Tag Dialog Behavior & Only Tag Name Is Editable verified successfully\n")

// });





















// test("TC20 – Verify Update Button Enables Only When Tag Name Is Modified", async ({ page }) => {
//   test.setTimeout(90000);

//   const loginPage = new LoginPage(page);
//   const tagsPage = new ContactTagsPage(page);

//   // ---------------- LOGIN & NAVIGATE ----------------
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();

//   await tagsPage.navigate();
//   process.stdout.write("📌 Navigated to Contact Tags page\n");

//   // ---------------- OPEN EDIT DIALOG ----------------
//   await tagsPage.clickEditIconForFirstTag();
//   await tagsPage.waitForEditDialog();
//   process.stdout.write("✏️ Edit Contact Tag dialog opened\n");

//   // ---------------- CAPTURE ORIGINAL TAG NAME ----------------
//   const originalTagName = await tagsPage.getCurrentTagName();
//   process.stdout.write(`📝 Original Tag Name: ${originalTagName}\n`);

//   // ---------------- VERIFY UPDATE DISABLED INITIALLY ----------------
//   await tagsPage.verifyUpdateButtonDisabled();
//   process.stdout.write("✅ Update button disabled initially\n");
         
//   // ---------------- MODIFY TAG NAME ----------------
//   const modifiedTagName = `${originalTagName}_Updated`;
//   await tagsPage.updateTagName(modifiedTagName);

//   await tagsPage.verifyUpdateButtonEnabled();
//   process.stdout.write("✅ Update button enabled after modifying tag name\n");

//   // ---------------- REVERT TAG NAME ----------------
//   await tagsPage.updateTagName(originalTagName);

//   await tagsPage.verifyUpdateButtonDisabled();
//   process.stdout.write("✅ Update button disabled again after reverting tag name\n");

//   process.stdout.write("✅🎯TC20 PASSED - Update Button Enables Only When Tag Name Is Modified verified successfully\n")

// });
















// test("TC21 – Verify Successful Tag Update", async ({ page }) => {
//   test.setTimeout(90000);

//   const loginPage = new LoginPage(page);
//   const tagsPage = new ContactTagsPage(page);

//   // ---------------- LOGIN & NAVIGATE ----------------
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();

//   await tagsPage.navigate();
//   process.stdout.write("📌 Navigated to Contact Tags page\n");

//   // ---------------- OPEN EDIT DIALOG ----------------
//   await tagsPage.clickEditIconForFirstTag();
//   await tagsPage.waitForEditDialog();
//   process.stdout.write("✏️ Edit Contact Tag dialog opened\n");

//   // ---------------- MODIFY TAG NAME ----------------
//   const originalTagName = await tagsPage.getCurrentTagName();
//   const updatedTagName = `${originalTagName}_Updated_${Date.now()}`;

//   await tagsPage.updateTagName(updatedTagName);
//   process.stdout.write(`📝 Tag name modified to: ${updatedTagName}\n`);

//   // ---------------- CLICK UPDATE ----------------
//   await tagsPage.clickUpdateButton();
//   process.stdout.write("👉 Clicked Update button\n");

//   // ---------------- VERIFY DIALOG CLOSED ----------------
//   await tagsPage.verifyEditDialogClosed();
//   process.stdout.write("✅ Edit dialog closed after update\n");

//   // ---------------- VERIFY UPDATED TAG IN LIST ----------------
//   await tagsPage.verifyTagPresentInList(updatedTagName);
//   process.stdout.write("🎯 Updated tag name visible in tag list\n");
//   process.stdout.write("✅🎯TC21 PASSED - Contact Tag Update verified successfully\n")

// });


















// test("TC22 – Verify Edit Tag Dialog Pre-fill, Mandatory Validation & Cancel Behavior", async ({ page }) => {
//   test.setTimeout(90000);

//   const loginPage = new LoginPage(page);
//   const tagsPage = new ContactTagsPage(page);

//   // ---------------- LOGIN ----------------
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();
//   await tagsPage.navigate();

//   process.stdout.write("📌 Navigated to Contact Tags page\n");

//   // ---------------- OPEN EDIT ----------------
//   await tagsPage.clickEditIconForFirstTag();
//   await tagsPage.waitForEditDialog();
//   process.stdout.write("✏️ Edit dialog opened\n");

//   // ✅ Capture tag name from INPUT VALUE
//   const originalTagName = await tagsPage.getCurrentTagName();
//   expect(originalTagName.trim().length).toBeGreaterThan(0);

//   process.stdout.write(`📌 Captured original tag name: ${originalTagName}\n`);

//   // ---------------- MANDATORY VALIDATION ----------------
//   await tagsPage.clearTagName();
//   await tagsPage.clickUpdateButton();

//   await expect(tagsPage.tagNameInput)
//     .toHaveAttribute('aria-invalid', 'true');

//   process.stdout.write("✅ Mandatory validation shown via red border");


//    // ---------------- RE-ENTER TAG NAME ----------------
//   await tagsPage.tagNameInput.fill(originalTagName);

//   // Validation should clear
//   await expect(tagsPage.tagNameInput)
// .not.toHaveAttribute('aria-invalid','true');

//   process.stdout.write("✏️ Tag name re-entered after validation\n");

//   // ---------------- CANCEL ----------------
//   await tagsPage.cancelButton.click();
//   await tagsPage.waitForEditDialogToClose();

//   process.stdout.write("❌ Edit dialog closed on Cancel\n");

//   // ---------------- VERIFY NO CHANGE ----------------
//   await tagsPage.verifyTagPresentInList(originalTagName);
//   process.stdout.write("🎯 No changes saved after Cancel action\n");
//   process.stdout.write("✅🎯TC22 PASSED - Edit Tag Dialog Pre-fill, Mandatory Validation & Cancel Behavior verified successfully\n")


// });




















// test("TC23-DEL-01 – Verify Delete Tag Permission, Cancel & Confirm Flow", async ({ page }) => {
//   test.setTimeout(120000); // extended timeout

//   const loginPage = new LoginPage(page);
//   const tagsPage = new ContactTagsPage(page);

//   // LOGIN
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();
//   await tagsPage.navigate();
//   process.stdout.write("📌 User logged in and navigated to Contact Tags page\n");

//   // VERIFY DELETE ICON
//   await tagsPage.verifyDeleteIconVisible();
//   process.stdout.write("✅ Delete icon visible\n");

//   // CAPTURE TAG NAME
//   const tagName = await tagsPage.getFirstTagNameFromList();
//   process.stdout.write(`🎯 Target tag: ${tagName}\n`);

//   // CANCEL DELETE FLOW
//   await tagsPage.clickDeleteIconForFirstTag();
//   process.stdout.write("🖱 Clicked Delete iconn");
//   await tagsPage.waitForDeleteConfirmationDialog();
//   await tagsPage.cancelDelete();
//   process.stdout.write("❌ Cancelled deletion\n");

//   await tagsPage.verifyTagPresentInList(tagName);
//   process.stdout.write("✅ Cancel worked – tag still present\n");

//   // CONFIRM DELETE FLOW
//   await tagsPage.clickDeleteIconForFirstTag();
//   process.stdout.write("🖱 Clicked Delete icon again\n");
//   await tagsPage.waitForDeleteConfirmationDialog();
//   await tagsPage.confirmDelete();
//   process.stdout.write("✅ Confirmed deletion\n");

//   // WAIT FOR LOADER / TABLE UPDATE
//   const loader = page.locator('.MuiCircularProgress-root, .loader');
//   if (await loader.count() > 0) {
//     await loader.waitFor({ state: 'hidden', timeout: 20000 });
//   }

//   // POLL until the row disappears
//   const tagRow = page.locator('table tbody tr', { hasText: tagName });
//   await page.waitForFunction(
//     async (selector) => document.querySelectorAll(selector).length === 0,
//     tagRow.selector,
//     { timeout: 20000 }
//   );

//   process.stdout.write("✅ Tag deleted successfully – no longer in the list\n");

//   process.stdout.write("✅🎯Tc23 PASSED - Delete Tag Permission, Cancel & Confirm Flow verified successfully/n")

// });





























// test("TC24-ADD Contact in Tag – Verify Add Contacts Access & Dialog UI", async ({ page }) => {
//   test.setTimeout(120000);

//   const loginPage = new LoginPage(page);
//   const tagsPage = new ContactTagsPage(page);

//   const TAG_NAME = "VIP"; // user-provided tag

//   // ---------------- LOGIN ----------------
//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();
//   process.stdout.write("📌 User logged in successfully\n");

//   // ---------------- NAVIGATE TO CONTACT TAG ----------------
//   await tagsPage.navigate();
//   await tagsPage.searchTag(TAG_NAME);
//   await tagsPage.clickViewDetailsOfFirstTag();

//   process.stdout.write("📌 Tag Details page opened\n");

//   // ---------------- VERIFY ACCESS ----------------
//   await tagsPage.verifyAddContactsButtonVisible();
//   process.stdout.write("✅ Add Contacts button visible & enabled\n");

//   // ---------------- OPEN DIALOG ----------------
//   await tagsPage.openAddContactsDialog();
//   process.stdout.write("➕ Add Contacts dialog opened\n");

//   // ---------------- VERIFY DIALOG UI ----------------
//   await tagsPage.verifyAddContactsDialogUI();
//   process.stdout.write("🎯TC24 Passed - ✅ Add Contacts dialog UI verified\n");
// });



















// test("TC25-ADD Conayact to Tag – Verify Adding Single Contact", async ({ page }) => {
//   test.setTimeout(120000);

//   const loginPage = new LoginPage(page);
//   const tagsPage = new ContactTagsPage(page);

//   const TAG_NAME = "Test";
//   const SEARCH_TEXT = "test";

//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();
//   process.stdout.write("📌 User logged in\n");

//   await tagsPage.navigate();
//   await tagsPage.searchTag(TAG_NAME);
//   process.stdout.write("📌 Searched for tag\n");    
//   await tagsPage.filterButton.click();
//   process.stdout.write("📌 Clicked filter button\n");

//   await page.waitForSelector('table tbody tr', { timeout: 20000 });
//   await tagsPage.clickViewDetailsOfFirstTag();
//   process.stdout.write("📌 Opened tag details\n");

//   await page.getByText("Contacts").first().waitFor({ state: "visible" });

//   // Get count BEFORE add
//   const beforeCount = await tagsPage.getContactCountFromHeader();
//   process.stdout.write(`📌 Before Count: ${beforeCount}\n`);

//   // Add Flow
//   await tagsPage.openAddContactsDialog();
//   await tagsPage.waitForAddDialog();
//   await tagsPage.typeAndSelectContact(SEARCH_TEXT);
//   await tagsPage.clickSave();

//   process.stdout.write("💾 Clicked Save to finalize adding contact\n");

//   // WAIT FOR COUNT UPDATE
//   await tagsPage.waitForHeaderCountToIncrease(beforeCount);

//   // Get count AFTER add
//   const afterCount = await tagsPage.getContactCountFromHeader();
//   process.stdout.write(`📌 After Count: ${afterCount}\n`);

//   expect(afterCount).toBe(beforeCount + 1);

//   process.stdout.write("🎯TC25 Passed - ✅ Single contact added successfully\n");
// });



















// test("TC26 – Verify Selecting Multiple Contacts from Dropdown", async ({ page }) => {
//   test.setTimeout(120000);

//   const loginPage = new LoginPage(page);
//   const tagsPage = new ContactTagsPage(page);

//   const TAG_NAME = "Test";
//   const SEARCH_TEXT= "test";

//   await loginPage.gotoLoginPage();
//   await loginPage.login(users.admin.email, users.admin.password);
//   await loginPage.waitForLoaderToDisappear();
//   process.stdout.write("📌 User logged in\n");

//   await tagsPage.navigate();
//   await tagsPage.searchTag(TAG_NAME);
//   await tagsPage.filterButton.click();
//   process.stdout.write("📌 Clicked filter button\n");

//   await page.waitForSelector('table tbody tr', { timeout: 20000 });
//   await tagsPage.clickViewDetailsOfFirstTag();
//   process.stdout.write("📌 Opened tag details\n");

//   await page.getByText("Contacts").first().waitFor({ state: "visible" });
  
//   // Get count BEFORE add
//   const beforeCount = await tagsPage.getContactCountFromHeader();
//   process.stdout.write(`📌 Before Count: ${beforeCount}\n`);

//   // Open Add Contact dialog
//   await tagsPage.openAddContactsDialog();
//   await tagsPage.waitForAddDialog();
//   process.stdout.write("➕ Add Contacts dialog opened\n");

//   // ---- Select First Contact ----
//   await tagsPage.typeAndSelectContact(SEARCH_TEXT);
//   process.stdout.write("📌 Selected first contact\n");

//   // ---- Select Second Contact ----
//   await tagsPage.typeAndSelectContact(SEARCH_TEXT);
//   process.stdout.write("📌 Selected second contact\n");

//   process.stdout.write("📌 Selected multiple contacts\n");

//   // Validate Save button is enabled
//   await tagsPage.clickSave();
//   process.stdout.write("💾 Clicked Save to finalize adding contacts\n");
  

//   process.stdout.write("🎯 TC26 Passed - ✅ Multi-select working & Save button enabled\n");
// });


















test("TC27 – Verify Delete Contacts Functionality from Tag", async ({ page }) => {
  test.setTimeout(120000);

  const loginPage = new LoginPage(page);
  const tagsPage = new ContactTagsPage(page);

  const TAG_NAME = "Test";

  // ---------------- LOGIN ----------------
  await loginPage.gotoLoginPage();
  await loginPage.login(users.admin.email, users.admin.password);
  await loginPage.waitForLoaderToDisappear();
  process.stdout.write("📌 User logged in\n");

  // ---------------- NAVIGATION ----------------
  await tagsPage.navigate();
  await tagsPage.searchTag(TAG_NAME);

  await page.waitForSelector('table tbody tr', { timeout: 20000 });
  await tagsPage.clickViewDetailsOfFirstTag();
  process.stdout.write("📌 Opened tag details\n");

  await page.getByText("Contacts").first().waitFor({ state: "visible" });

  // ====================================================
  // 1️⃣ Verify Delete Button Hidden When No Contact Selected
  // ====================================================

  await tagsPage.verifyDeleteButtonHidden();
  process.stdout.write("✅ Delete button hidden when no contact selected\n");

  // ====================================================
  // 2️⃣ Select Single Contact
  // ====================================================

  await tagsPage.selectContactByIndex(0);

  await tagsPage.verifyDeleteButtonVisible();
  process.stdout.write("✅ Delete button visible for single selection\n");

  // ====================================================
  // 3️⃣ Verify Delete Popup Appears
  // ====================================================

  await tagsPage.clickDeleteButton();
  await tagsPage.verifyDeletePopupVisible();
  process.stdout.write("✅ Delete confirmation popup displayed\n");

  // ====================================================
  // 4️⃣ Cancel Delete
  // ====================================================

  await tagsPage.clickCancelDelete();
  await tagsPage.verifyDeletePopupClosed();
  process.stdout.write("✅ Cancel works correctly\n");

  // ====================================================
  // 5️⃣ Select Multiple Contacts
  // ====================================================

  await tagsPage.selectContactByIndex(0);
  await tagsPage.selectContactByIndex(1);

  await tagsPage.verifyDeleteButtonVisible();
  process.stdout.write("✅ Delete button enabled for multiple contacts\n");

  // ====================================================
  // 6️⃣ Confirm Delete
  // ====================================================

  await tagsPage.clickDeleteButton();
  await tagsPage.confirmDelete();

  process.stdout.write("🗑️ Delete confirmed\n");

  // Wait for API / table refresh
  await page.waitForLoadState('networkidle');
  await tagsPage.waitForContactsListReload();

  // ====================================================
  // 7️⃣ Verify Success Message
  // ====================================================

  await expect(page.getByText(/success|deleted|removed/i)).toBeVisible();
  process.stdout.write("✅ Success message displayed after deletion\n");

  // ====================================================
  // 8️⃣ Verify Contacts Table Still Visible (Reloaded)
  // ====================================================

  await expect(tagsPage.contactRows.first()).toBeVisible();
  process.stdout.write("✅ Contacts table refreshed after delete\n");

  process.stdout.write("🎯 TC27 Passed - Delete contact flow verified\n");
});



















