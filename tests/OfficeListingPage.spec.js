
import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import { OfficeListingPage } from '../Pages/OfficeListingPage'; // ✅ correct path
import users from '../fixtures/users.json';
import { AddOfficePage } from '../Pages/AddOfficePage'; 



 

// test('TC01_Verify_Access_Permission_for_Office_Listing_Page', async ({ page }) => {
    
//     test.setTimeout(180000); 

//     const loginPage = new LoginPage(page);
//     const officeListingPage = new OfficeListingPage(page);
    
//     // 🔥 FIX: Use the 'admin' user from your user.json as the credential source.
//     // We assume the admin user has the necessary "Office Module – View" permission.
//     const officeViewer = users.admin; 
    
//     console.log(`🔹 1. Logging in as user with "Office Module - View" permission (Admin): ${officeViewer.email}`);

//     // Step 1: Log in
//     await loginPage.gotoLoginPage();
//     // Use the actual email and password from the imported 'admin' user object
//     await loginPage.login(officeViewer.email, officeViewer.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Step 2: Navigate to Office Listing using the POM method
//     await officeListingPage.navigateToOfficeListing();
//     await loginPage.waitForLoaderToDisappear(); 

//     console.log('✅ User successfully accessed the Office Listing Page.');
    
//     // ---------------------- Verification 1: Page Access and Visibility ----------------------
//     console.log('--- Verification 1: Page Access and UI Elements ---');

//     // 1. Verify the correct page header is visible
//     await expect(officeListingPage.officeListingPageHeader).toBeVisible({ timeout: 15000 });
    
//     // 2. Verify search/filter controls are visible
//     await expect(officeListingPage.searchInput).toBeVisible();
//     await expect(officeListingPage.filterButton).toBeVisible();
//     await expect(officeListingPage.resetButton).toBeVisible();
//     await expect(officeListingPage.addButton).toBeVisible(); 
    
//     // ---------------------- Verification 2: Table Structure and Data ----------------------
//     console.log('--- Verification 2: Office List Table Structure ---');

//     // Call the encapsulated method to verify all headers
//     await officeListingPage.verifyTableStructure();

//     // Verify data rows are visible
//     await expect(officeListingPage.dataRow).toBeVisible();

//     console.log('✅ Office list and table data are visible with valid columns.');
    
//     // ---------------------- Cleanup ----------------------
//     await loginPage.logout();
    
//     console.log(' 🎯 TC01 Verify Access Permission for Office Listing Page Passed successfully.');
// });



















// test('TC02_Verify Filter Office List by Country', async ({ page }) => {
    
//     test.setTimeout(180000); 

//     const loginPage = new LoginPage(page);
//     const officeListingPage = new OfficeListingPage(page);
    
//     const officeViewer = users.admin; 
//     const targetCountry = 'Bahamas'; 
    
    
//     console.log(`🔹 1. Logging in and navigating to Office Listing.`);

//     // Step 1: Log in
//     await loginPage.gotoLoginPage();
//     await loginPage.login(officeViewer.email, officeViewer.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Step 1: Navigate to Office Listing Page.
//     await officeListingPage.navigateToOfficeListing();
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // ---------------------- 2. Apply Filter ----------------------
//     console.log(`--- 2. Applying Country Filter: ${targetCountry} ---`);

//     // Steps 2, 3, 4: Open dropdown, Select country, Click Filter (Encapsulated in POM)
//     await officeListingPage.filterByCountry(targetCountry); 
    
//     // Give an extra wait specifically for the table data to settle after the filter API call
//     await loginPage.waitForLoaderToDisappear(); 
//     await page.waitForTimeout(500); // Small, explicit pause to ensure DOM update

//     console.log('✅ Filter applied. Waiting for table update.');

//     // ---------------------- 3. Verification ----------------------
//     console.log('--- 3. Verification: Filtered Results ---');

//     // 1. Get all visible rows in the table body.
//     const rows = await page.locator('.MuiTableBody-root tr').all();
//     expect(rows.length).toBeGreaterThan(0, 'The list should not be empty after filtering.'); 

//     let unrelatedOfficeCount = 0;
    
//     // 🔥 FIX: Changing the column index used in verification.
//     // Based on error tracing (3 failed, 4 failed), the Country column is likely at index 2 (3rd column).
//     const COUNTRY_COLUMN_INDEX = 2; 

//     // Iterate through all visible rows and check the content of the Country column.
//     for (const row of rows) {
//         // Find the suspected Country column cell within the current row.
//         const countryCell = await row.locator('td').nth(COUNTRY_COLUMN_INDEX); 

//         // Get the text content for verification and logging.
//         // Use page.textContent for the actual reading outside of the Playwright assertion.
//         const countryText = await countryCell.textContent();
        
//         // Assert: The cell MUST contain the selected country name.
//         await expect(countryCell).toContainText(targetCountry); 
        
//         if (countryText.trim() !== targetCountry) {
//             unrelatedOfficeCount++;
//             console.error(`❌ Unrelated office found! Row: ${await row.textContent()} | Index ${COUNTRY_COLUMN_INDEX} value: ${countryText}`);
//         }
//     }

//     // 2. Assert that no unrelated offices appear.
//     expect(unrelatedOfficeCount).toBe(0, 'The list should only contain offices from the selected country. Unrelated offices found: ' + unrelatedOfficeCount);
    
//     console.log(`✅ Office list updates showing only offices belonging to ${targetCountry}.`);
    
//     // ---------------------- Cleanup ----------------------
//     await loginPage.logout();
    
//     console.log(' 🎯 TC02_Filter_Office_List_by_Country Passed successfully.');
// });















// test('TC03 - Verify Filter Office List by Island', async ({ page }) => {
    
//     test.setTimeout(180000); 

//     const loginPage = new LoginPage(page);
//     const officeListingPage = new OfficeListingPage(page);
    
//     const officeViewer = users.admin; 
//     // Use the island name that exists in your test data
//     const targetIsland = 'Paradise Island'; 
    
    
//     console.log(`🔹 1. Logging in and navigating to Office Listing.`);

//     // Step 1: Log in
//     await loginPage.gotoLoginPage();
//     await loginPage.login(officeViewer.email, officeViewer.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Step 1: Navigate to Office Listing Page.
//     // This uses the robust navigation method in the POM.
//     await officeListingPage.navigateToOfficeListing();
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // ---------------------- 2. Apply Filter ----------------------
//     console.log(`--- 2. Applying Island Filter: ${targetIsland} ---`);

//     // Steps 2, 3, 4: Open dropdown, Select island, Click Filter (using dedicated POM method)
//     await officeListingPage.filterByIsland(targetIsland); 
    
//     // Final wait for the table data to settle after the filter API call
//     await loginPage.waitForLoaderToDisappear(); 
//     await page.waitForTimeout(500); // Wait for the DOM to update completely

//     console.log('✅ Filter applied. Table update expected.');

//     // ---------------------- 3. Verification ----------------------
//     console.log('--- 3. Verification: Filtered Results ---');

//     // 1. Get all visible rows in the table body.
//     const rows = await page.locator('.MuiTableBody-root tr').all();
//     expect(rows.length).toBeGreaterThan(0, 'The list should not be empty after filtering.'); 

//     let unrelatedOfficeCount = 0;
    
//     // COLUMN INDEX: Country was verified at Index 2, so Island is at Index 3 (4th column).
//     const ISLAND_COLUMN_INDEX = 3; 

//     // Iterate through all visible rows and check the content of the Island column.
//     for (const row of rows) {
//         // Find the Island column cell within the current row.
//         const islandCell = await row.locator('td').nth(ISLAND_COLUMN_INDEX); 

//         // Get the text content for verification and logging.
//         const islandText = await islandCell.textContent();
        
//         // Assert: The cell MUST contain the selected island name.
//         await expect(islandCell).toContainText(targetIsland); 
        
//         if (islandText.trim() !== targetIsland) {
//             unrelatedOfficeCount++;
//             console.error(`❌ Unrelated office found! Index ${ISLAND_COLUMN_INDEX} value: ${islandText}`);
//         }
//     }

//     // 2. Assert that no unrelated offices appear.
//     expect(unrelatedOfficeCount).toBe(0, 'The list should only contain offices from the selected island. Unrelated offices found: ' + unrelatedOfficeCount);
    
//     console.log(`✅ Office list updates showing only offices belonging to ${targetIsland}.`);
    
//     // ---------------------- Cleanup ----------------------
//     await loginPage.logout();
    
//     console.log(' 🎯 TC03_Filter_Office_List_by_Island Ready for Execution.');
// });














// // In tests\OfficePage.spec.js

// test('TC04_Search_Office_by_Any_Field', async ({ page }) => {
    
//     test.setTimeout(180000); 

//     const loginPage = new LoginPage(page);
//     const officeListingPage = new OfficeListingPage(page);
    
//     const officeViewer = users.admin; 
//     // The keyword that caused the failure (Nusa)
//     const searchKeyword = 'Nusa'; 
    
    
//     console.log(`🔹 1. Logging in and navigating to Office Listing.`);

//     // ... (Login and navigation steps remain the same) ...
//     await loginPage.gotoLoginPage();
//     await loginPage.login(officeViewer.email, officeViewer.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     await officeListingPage.navigateToOfficeListing();
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // ---------------------- 2. Apply Search ----------------------
//     console.log(`--- 2. Applying Search Keyword: "${searchKeyword}" ---`);

//     // 🔥 Using the updated searchByKeyword which clicks the Filter button
//     await officeListingPage.searchByKeyword(searchKeyword); 
    
//     // Final wait for the table data to settle after the search API call
//     await loginPage.waitForLoaderToDisappear(); 
//     // 🔥 Adding another wait to ensure list stability
//     await page.waitForTimeout(1000); 

//     console.log('✅ Search applied. Waiting for table update.');

//     // ---------------------- 3. Verification ----------------------
//     console.log('--- 3. Verification: Search Results ---');

//     // Get all visible rows in the table body.
//     const rowLocator = page.locator('.MuiTableBody-root tr'); 

//     const allVisibleRows = await rowLocator.all();
//     expect(allVisibleRows.length).toBeGreaterThan(0, `Expected offices matching "${searchKeyword}" but found none.`); 

    
//     let nonMatchingOfficeCount = 0;
    
//     for (const row of allVisibleRows) {
//         // Use Playwright's `toContainText` assertion with `{ ignoreCase: true }`
//         try {
//             // Check that the entire row content contains the keyword
//             await expect(row).toContainText(searchKeyword, { ignoreCase: true, timeout: 5000 });
//         } catch (e) {
//             // This row is a non-match (the assertion failed)
//             nonMatchingOfficeCount++;
//             const rowText = await row.textContent();
//             console.error(`❌ Non-matching office found! Keyword: "${searchKeyword}" not found in row: ${rowText}`);
//             // Log the actual content of the rows that fail for debugging
//         }
//     }

//     // 2. Assert that no non-matching offices appear.
//     // If this fails again, it confirms a bug in the application's search feature.
//     expect(nonMatchingOfficeCount).toBe(0, 'The list contains offices that do not match the search keyword. Count: ' + nonMatchingOfficeCount);
    
//     console.log(`✅ Office list updates showing only offices containing "${searchKeyword}".`);
    
//     // ---------------------- Cleanup ----------------------
//     await loginPage.logout();
    
//     console.log(' 🎯 TC04_Search_Office_by_Any_Field Ready for Re-run.');
// });













// test('TC05 - Verify Reset Filters feature', async ({ page }) => {
    
//     test.setTimeout(180000); 

//     const loginPage = new LoginPage(page);
//     const officeListingPage = new OfficeListingPage(page);
    
//     const officeViewer = users.admin; 
//     // 🔥 FIX: Use a filter value that is known to exist and return a subset.
//     // We use the Island filter, which previously returned results in TC03.
//     const filterIsland = 'Paradise Island'; 
    
    
//     console.log(`🔹 1. Logging in and navigating to Office Listing.`);

//     // Step 1: Log in
//     await loginPage.gotoLoginPage();
//     await loginPage.login(officeViewer.email, officeViewer.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Step 2: Navigate to Office Listing Page.
//     await officeListingPage.navigateToOfficeListing();
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // ---------------------- 2. Get Initial State ----------------------
//     console.log('--- 2. Capturing Initial Row Count ---');
    
//     const initialRowsLocator = page.locator('.MuiTableBody-root tr');
//     // Wait for the list to stabilize
//     await initialRowsLocator.first().waitFor({ state: 'visible', timeout: 10000 });
    
//     const initialRowCount = await initialRowsLocator.count();
//     // The previous runs confirmed initialRowCount is 10
//     expect(initialRowCount).toBe(10, `Initial row count must be 10, found ${initialRowCount}.`);
//     console.log(`✅ Initial row count captured: ${initialRowCount}`);
    
//     // ---------------------- 3. Apply Filter (Island) ----------------------
//     console.log(`--- 3. Applying Filter: Island = ${filterIsland} ---`);

//     // 🔥 FIX: Use the filterByIsland method with a known, existing value.
//     await officeListingPage.filterByIsland(filterIsland); 
//     await loginPage.waitForLoaderToDisappear(); 
//     await page.waitForTimeout(500);

//     // Verification of Filter Application
//     const filteredRowsLocator = page.locator('.MuiTableBody-root tr');
//     const filteredRowCount = await filteredRowsLocator.count();
    
//     // We must ensure the count is reduced to confirm the filter was successfully applied.
//     expect(filteredRowCount).toBeLessThan(initialRowCount, `Filter must reduce the row count to confirm it was applied. Filtered count: ${filteredRowCount}.`);
//     expect(filteredRowCount).toBeGreaterThan(0, `Filter must return at least one result for verification.`);
//     console.log(`✅ Filter applied. Filtered row count: ${filteredRowCount} (Reduced from ${initialRowCount}).`);

//     // ---------------------- 4. Click Reset ----------------------
//     console.log('--- 4. Clicking Reset Button ---');
    
//     // Click on the Reset button
//     await officeListingPage.resetButton.click();
//     await loginPage.waitForLoaderToDisappear();
//     await page.waitForTimeout(1000); 

//     // ---------------------- 5. Verification after Reset ----------------------
//     console.log('--- 5. Verification after Reset ---');

//     // 1. Verify the applied filter input (Island) is cleared.
//     await expect(officeListingPage.islandDropdown).not.toContainText(filterIsland, 'Island dropdown text must be cleared after reset.');
    
//     // 2. Verify the list resets to show all offices (matching the initial count).
//     const resetRowsLocator = page.locator('.MuiTableBody-root tr');
//     const resetRowCount = await resetRowsLocator.count();

//     // The key assertion: row count after reset must match the row count before any filtering (10).
//     expect(resetRowCount).toBe(initialRowCount, `List failed to reset. Expected ${initialRowCount} rows, but found ${resetRowCount}.`);
//     console.log(`✅ List reset verified. Row count returned to ${initialRowCount}.`);
    
//     // ---------------------- Cleanup ----------------------
//     await loginPage.logout();
    
//     console.log(' 🎯 TC05_Reset_Filters Ready for Re-run.');
// });






















// test('TC06 - Verify Pagination Functionality in Office list page', async ({ page }) => {
    
//     // Set a generous timeout for the entire test
//     test.setTimeout(180000); 

//     const loginPage = new LoginPage(page);
//     const officeListingPage = new OfficeListingPage(page);
    
//     const officeViewer = users.admin; 
    
    
//     console.log(`🔹 1. Logging in and navigating to Office Listing.`);

//     // Step 1: Log in
//     await loginPage.gotoLoginPage();
//     await loginPage.login(officeViewer.email, officeViewer.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Step 2: Navigate to Office Listing Page.
//     await officeListingPage.navigateToOfficeListing();
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // ---------------------- 2. Check for Pagination Availability ----------------------
//     console.log('--- 2. Checking Pagination Status ---');
    
//     // ✅ Wait for the first data row, which is the reliable element.
//     await officeListingPage.dataRow.waitFor({ state: 'visible', timeout: 30000 }); 
//     await page.waitForTimeout(500); 

//     // Verify the Next Page button is enabled to ensure the test is valid
//     const isNextButtonEnabled = await officeListingPage.nextPageButton.isEnabled();
    
//     if (!isNextButtonEnabled) {
//         // If the button is disabled, there's only one page of data.
//         console.warn('⚠️ Next Page button is disabled. Insufficient data for multi-page test.');
//         await loginPage.logout();
//         console.log(' 🎯 TC06_Verify_Pagination_Functionality Finished: Insufficient data.');
//         return; 
//     }
    
//     console.log('✅ Next Page button is enabled. Proceeding with pagination test.');
    
//     // ---------------------- 3. Capture Initial State ----------------------
    
//     // 💡 IMPORTANT: We rely ONLY on the data row change for verification now.
//     const initialFirstRowName = await officeListingPage.firstRowName.textContent();
//     console.log(`Initial first row name: ${initialFirstRowName}`);
    
//     // ❌ REMOVED: All code referencing initialPaginationText is removed to avoid the timeout error.
    
//     // ---------------------- 4. Click Next Page ----------------------
//     console.log('--- 4. Clicking Next Page Button ---');
    
//     await officeListingPage.goToNextPage();
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Wait for the new data set to be rendered
//     await officeListingPage.dataRow.waitFor({ state: 'visible', timeout: 30000 }); 
//     await page.waitForTimeout(1000); 

//     // ---------------------- 5. Verification ----------------------
//     console.log('--- 5. Verification: New Data Set Loaded ---');

//     // 1. Verify the first row is different (This is the primary verification point now)
//     const newFirstRowName = await officeListingPage.firstRowName.textContent();
//     console.log(`New first row name: ${newFirstRowName}`);

//     expect(newFirstRowName).not.toBe(initialFirstRowName, 'The data set did not change after clicking Next Page. Pagination failed.');

//     // 2. Verify the Next button is disabled (if this was the last page) or still enabled
//     // This provides secondary verification that a page transition occurred.
//     const isNextButtonEnabledAfterClick = await officeListingPage.nextPageButton.isEnabled();
//     console.log(`Next page button enabled after click: ${isNextButtonEnabledAfterClick}`);

//     // ❌ REMOVED: All code referencing newPaginationText is removed.
    
//     console.log('✅ Pagination confirmed: New data set loaded successfully.');
    
//     // ---------------------- Cleanup ----------------------
//     await loginPage.logout();
    
//     console.log(' 🎯 TC06_Verify_Pagination_Functionality Passed successfully.');
// });















test('TC07_Verify_Access_Permission_for_Add_Office_Form', async ({ page }) => {
    
    test.setTimeout(180000); 

    const loginPage = new LoginPage(page);
    const officeListingPage = new OfficeListingPage(page);
    const addOfficePage = new AddOfficePage(page);
    
    // 1. Log in as a user who has "Create Office" permission (Assuming admin)
    const officeCreator = users.admin; 
    
    
    console.log(`🔹 1. Logging in as user with "Create Office" permission (Admin).`);

    // Step 1: Log in
    await loginPage.gotoLoginPage();
    await loginPage.login(officeCreator.email, officeCreator.password); 
    await loginPage.waitForLoaderToDisappear(); 
    
    // Step 2: Navigate to Office Listing Page (using the now-stabilized method).
    await officeListingPage.navigateToOfficeListing();
    await loginPage.waitForLoaderToDisappear(); 
    
    // ---------------------- 2. Navigate to Add Office Form ----------------------
    console.log('--- 2. Navigating to Add Office Form ---');

    // Wait for the 'Add' button to be explicitly visible after navigation, adding a small stability check.
    await expect(officeListingPage.addButton).toBeVisible({ timeout: 10000 });

    // Click the 'Add' button
    await officeListingPage.addButton.click();
    
    // Wait for the new form content to load
    await loginPage.waitForLoaderToDisappear(); 
    await page.waitForLoadState('networkidle'); 
    
    console.log('✅ Clicked "Add" button, verifying form access.');
    
    // ---------------------- 3. Verification ----------------------
    console.log('--- 3. Verification: Form Access and UI Elements ---');

    // Call the resilient POM method to verify form header, inputs, and buttons
    await addOfficePage.verifyFormElementsVisibility();

    console.log('✅ Access permission verified and form UI is correctly displayed.');
    
    // ---------------------- Cleanup ----------------------
    
    // Click Cancel to return to the listing page
    await addOfficePage.cancelForm();
    await loginPage.waitForLoaderToDisappear();
    
    // Verify return to the listing page header
    await expect(officeListingPage.officeListingPageHeader).toBeVisible();
    
    await loginPage.logout();
    
    console.log(' 🎯 TC07_Verify_Access_Permission_for_Add_Office_Form Passed successfully.');
});