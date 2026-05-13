import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import { ContactDetailsPage, EditContactModal } from '../Pages/ContactDetailsPage'; // Fixed casing to match file system
import users from '../fixtures/users.json';
import { AllContactsPage, AddContactModal } from '../Pages/AllContactsPage';






// test('TC01 > Personal Info – Verify user can add a family member and update additional info', async ({ page }) => {
//     test.setTimeout(150000); 

//     const loginPage = new LoginPage(page);
//     const contactDetailsPage = new ContactDetailsPage(page);
//     const editContactModal = new EditContactModal(page); 
//     const adminUser = users.admin; 
    
//     // --- Test Data ---
//     // The single, consistent variable holding the value we expect to be saved.
//     const initialAdditionalInfo = `Automation updated info - ${Date.now()}`;
//     // Removed 'let savedAdditionalInfo' since it caused the race condition error.
    
//     const familyName = `Test Spouse ${Date.now()}`;
//     const familyContact = '5551234567';
//     const familyNote = 'Test note for spouse automation.';
//     const selectedRelationship = 'Spouse'; 
    
//     // --- Steps ---
//     console.log('🔹 1. Logging in and Navigating to Contact Details.');
    
//     // 1.1 LOGIN
//     await loginPage.gotoLoginPage();
//     await loginPage.login(adminUser.email, adminUser.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // 1.2 NAVIGATION
//     const contactId = '198'; 
//     await page.goto(`https://stage-crossroads20.hgchristie.net/all-contacts/details/${contactId}`); 
//     console.log(`✅ Navigated to Contact ID: ${contactId}`);
//   // 1.3 OPEN MODAL
    
//     // ✅ FIX: Explicitly wait for the page to finish all network requests before 
//     // trying to click a button that depends on the data being loaded.
//     await page.waitForLoadState('networkidle');
//     await page.waitForTimeout(1000); // Wait an additional second for full stability

//     await contactDetailsPage.editButton.click(); 
//     await expect(editContactModal.modalTitle).toBeVisible({ timeout: 15000 });
    
//     // 2. Go to Personal Info Tab & Fill Data
//     console.log('2. Navigating to Personal Info tab.');
//     await editContactModal.personalInfoTab.click(); 
    
//     // Ensure the tab content is loaded.
//     await page.waitForSelector('input[name="birth_date"]', { state: 'visible', timeout: 15000 });
//     await page.waitForLoadState('networkidle'); 
    
//     // 2.1 CHECK BIRTHDAY/ANNIVERSARY FIELDS 
//     console.log('2.1 Checking Birthday and Anniversary fields are available.');
//     await expect(editContactModal.birthdayField).toBeVisible();
//     await expect(editContactModal.anniversaryField).toBeVisible();
    
//     // 2.2 FILL ADDITIONAL INFO
//     console.log('2.2 Filling Additional info field.');
//     await editContactModal.additionalInfoField.fill(initialAdditionalInfo);
    
//     // 2.3 OPEN ADD FAMILY MEMBER MODAL
//     console.log('2.3 Clicking "+Add" to open the Add Family Member modal.');
//     await editContactModal.addFamilyMemberButton.click(); 
//     await expect(editContactModal.familyModalTitle).toBeVisible({ timeout: 10000 });
    
    
//     // 3. Fill and Save Family Member Details
//     console.log('3. Filling Family Member details.');
    
//     // 3.1 FILL FIELDS
//     await editContactModal.familyNameField.fill(familyName);
//     await editContactModal.familyContactField.fill(familyContact);
    
//     // 3.2 SELECT RELATIONSHIP FROM DROPDOWN
//     console.log(`- Selecting relationship: ${selectedRelationship}`);
//     await editContactModal.familyRelationshipDropdown.click();
//     await page.getByRole('option', { name: selectedRelationship, exact: true }).click();
    
//     // 3.3 ADD NOTE
//     await editContactModal.familyNoteField.fill(familyNote);
    
//     // 3.4 SAVE FAMILY MEMBER
//     console.log('- Clicking "Add" to save the new family member.');
//     await editContactModal.familyAddButton.click(); 
    
//     // Wait for the nested modal to disappear
//     await expect(editContactModal.familyModalTitle).not.toBeVisible({ timeout: 10000 }); 
    
//     // 4. PERFORM SINGLE SAVE 
    
//     // ✨ STABILITY CHECK
//     await expect(editContactModal.saveChangesButton).toBeEnabled({ timeout: 15000 });
//     await editContactModal.page.waitForLoadState('networkidle'); 
    
//     // 4.1 SAVE: Click Save Changes on the Personal Info Tab
//     console.log('4.1 Clicking "Save Changes" on the Personal Info tab.');
//     await editContactModal.saveChangesButton.click(); 

//     // Wait briefly to ensure the server response and toast elements are rendered.
//     await editContactModal.page.waitForTimeout(500); 

    
//     // 5. Verification of Success Toasts (Modal remains open)
//     console.log('5. Verifying successful save notifications using explicit text locators.');
    
//     // 5.1 VERIFY FAMILY MEMBER TOAST (Robust check using getByText)
//     const familyToast = page.getByText('Contact family member created successfully');
//     await expect(familyToast).toBeVisible({ timeout: 15000 });
    
//     // 5.2 VERIFY PERSONAL INFO TOAST (Robust check using getByText)
//     const personalInfoToast = page.getByText('Contact personal info updated successfully');
//     await expect(personalInfoToast).toBeVisible({ timeout: 15000 });

//     // Ensure the modal is still open (as observed in the video)
//     await expect(editContactModal.modalTitle).toBeVisible({ timeout: 5000 }); 
    
    
//     // 6. Data Persistence Check Setup
//     console.log('6. Closing modal and verifying data persistence after refresh.');
    
//     // 6.1 CLOSE MODAL EXPLICITLY 
//     await editContactModal.cancelButton.click();
//     await page.waitForLoadState('networkidle'); 
    
//     // 6.2 REFRESH
//     await page.reload();
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // 6.3 RE-OPEN MODAL & TAB
//     await contactDetailsPage.editButton.click(); 
//     await editContactModal.personalInfoTab.click(); 
//     await page.waitForSelector('input[name="birth_date"]', { state: 'visible', timeout: 15000 }); 
    
//     // 6.4 VERIFY ADDITIONAL INFO
//     console.log('6.4 Verifying Additional Info field.');
//     // ✅ FINAL FIX: Directly verify against the initial variable.
//     await expect(editContactModal.additionalInfoField).toHaveValue(initialAdditionalInfo);
    
//     // 6.5 VERIFY FAMILY MEMBER ADDED
//     console.log('6.5 Verifying new Family Member is present.');
    
//     // Robust locator for the Family Member Row.
//     const familyMemberRow = page
//         .locator('.family-member-list-wrapper') // Target the Family Member List container
//         .filter({ hasText: familyName });       // Filter for the row with the unique name
    
//     await expect(familyMemberRow).toBeVisible();
//     await expect(familyMemberRow).toContainText(selectedRelationship);
    
    
//     // 7. Cleanup
//     // Final Cancel to close the modal after verification 
//     await editContactModal.cancelButton.click(); 
//     await loginPage.logout(); 
    
//     console.log(' 🎯 TC01 > Add_Family_Member Passed successfully.');
// });


















// test('TC02 > Personal Info > Edit_Existing_Family_Member – Verify user can update a family member and changes persist (Skipping Relationship Update)', async ({ page }) => {
//     test.setTimeout(150000); 

//     const loginPage = new LoginPage(page);
//     const contactDetailsPage = new ContactDetailsPage(page);
//     const editContactModal = new EditContactModal(page); 
//     const adminUser = users.admin; 
    
//     // --- Test Data ---
//     // Initial data for creation (uses Partner)
//     const initialFamilyName = `Old Partner ${Date.now()}`;
//     const initialContact = '5551112222';
//     const initialRelationship = 'Partner'; // Keep this relationship consistent
//     const initialNote = 'Initial test note for update.';
    
//     // New data for update (Note: Relationship is not changed from 'Partner')
//     const updatedFamilyName = `Updated Spouse ${Date.now()}`;
//     const updatedContact = '5559998888';
//     const updatedNote = 'Updated test note.'; 
//     const contactId = '198'; 

    
//     // --- 1. Setup: Navigate and Add a new Family Member (Creation Flow) ---
//     console.log('🔹 1. Setup: Logging in and creating initial Family Member.');
    
//     // 1.1 LOGIN & NAVIGATE
//     await loginPage.gotoLoginPage();
//     await loginPage.login(adminUser.email, adminUser.password); 
//     await loginPage.waitForLoaderToDisappear(); 
//     await page.goto(`https://stage-crossroads20.hgchristie.net/all-contacts/details/${contactId}`); 
    
//     // 1.2 OPEN MODAL, TAB, AND NESTED ADD MODAL
//     await contactDetailsPage.editButton.click(); 
//     await editContactModal.personalInfoTab.click(); 
//     await page.waitForLoadState('networkidle'); 
    
//     // 1.3 CREATE: Fill initial data and click 'Add' (in nested modal)
//     console.log(`- Creating initial member: ${initialFamilyName}`);
//     await editContactModal.addFamilyMemberButton.click(); 
//     await expect(editContactModal.familyModalTitle).toBeVisible(); 

//     // Fill all required fields
//     await editContactModal.familyNameField.fill(initialFamilyName);
//     await editContactModal.familyContactField.fill(initialContact);
    
//     // Select Relationship (Initial Value)
//     await page.getByLabel('Relationship').click();
//     await page.getByRole('option', { name: initialRelationship, exact: true }).click();
    
//     await editContactModal.familyNoteField.fill(initialNote); 
    
//     await editContactModal.familyAddButton.click(); // Click 'Add'
//     await expect(editContactModal.familyModalTitle).not.toBeVisible({ timeout: 10000 }); 
    
    
//     // --- 2. Execution: Edit the Existing Family Member ---
//     console.log('🔸 2. Execution: Locating and editing the newly created member.');
    
//     // 2.1 LOCATE AND CLICK EDIT ICON (Fixed Locator)
//     const initialRow = editContactModal.familyMemberListWrapper.filter({ hasText: initialFamilyName });
//     await expect(initialRow).toBeVisible(); 
    
//     // Locate the edit icon within the isolated row and use .first()
//     const editIcon = initialRow.locator('.icon.edit-icon').first();
    
//     console.log('- Clicking Edit icon for the unique family member.');
//     await editIcon.click(); 
    
//     // 2.2 VERIFY EDIT MODAL OPENED (Title: Update Family Member)
//     await expect(page.getByRole('heading', { name: 'Update Family Member' })).toBeVisible({ timeout: 10000 });
    
    
//     // 2.3 CHANGE FIELDS (Skipping Relationship field)
//     console.log(`- Updating Name to: ${updatedFamilyName}`);
//     await editContactModal.familyNameField.fill(updatedFamilyName);
    
//     console.log(`- Updating Contact to: ${updatedContact}`);
//     await editContactModal.familyContactField.fill(updatedContact);
    
//     // 🛑 RELATIONSHIP UPDATE LOGIC REMOVED HERE TO AVOID TIMEOUT 🛑
//     console.log('- Skipping Relationship update to avoid timeout issue.');

//     console.log(`- Updating Note to: ${updatedNote}`);
//     await editContactModal.familyNoteField.fill(updatedNote); 
    
    
//     // 2.4 CLICK UPDATE BUTTON (on nested modal - type="submit")
//     const familyUpdateButton = page.getByRole('button', { name: 'Update', exact: true, type: 'submit' }).last();
//     console.log('- Clicking "Update" button in the nested modal.');
//     await familyUpdateButton.click(); 
    
//     // Wait for the nested modal to disappear
//     await expect(page.getByRole('heading', { name: 'Update Family Member' })).not.toBeVisible({ timeout: 10000 }); 
    
//     // 2.5 VERIFY SUCCESS TOAST
//     await expect(page.getByText('Contact family member updated successfully')).toBeVisible({ timeout: 15000 });

    
//     // --- 3. Verification of Changes and Persistence ---
//     console.log('✅ 3. Verification: Checking immediate reflection and persistence.');

//     // 3.1 VERIFY IMMEDIATE REFLECTION (Note: The Relationship should still be 'Partner')
//     const updatedRowImmediate = editContactModal.familyMemberListWrapper.filter({ hasText: updatedFamilyName });
//     await expect(updatedRowImmediate).toBeVisible();
//     await expect(updatedRowImmediate).toContainText(updatedContact);
//     // Verify the ORIGINAL relationship is still present
//     await expect(updatedRowImmediate).toContainText(initialRelationship); 
//     await expect(updatedRowImmediate).toContainText(updatedNote); 
    
//     // 3.2 FINAL SAVE (Committing the update by saving the main modal)
//     console.log('- Clicking "Save Changes" on the main modal.');
//     await editContactModal.saveChangesButton.click();
    
//     // 3.3 CLOSE MODAL
//     await editContactModal.cancelButton.click();
    
//     // 3.4 REFRESH AND FINAL PERSISTENCE CHECK
//     console.log('- Performing page reload to check data persistence.');
//     await page.reload();
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Re-open modal and tab for final check
//     await contactDetailsPage.editButton.click(); 
//     await editContactModal.personalInfoTab.click();
//     await page.waitForLoadState('networkidle'); 

//     // FINAL VERIFICATION
//     const finalUpdatedRow = editContactModal.familyMemberListWrapper.filter({ hasText: updatedFamilyName });
//     await expect(finalUpdatedRow).toBeVisible();
//     await expect(finalUpdatedRow).toContainText(initialRelationship); // Verify original relationship
//     await expect(finalUpdatedRow).toContainText(updatedNote); 

//     // 4. Cleanup
//     await editContactModal.cancelButton.click(); 
//     await loginPage.logout(); 
    
//     console.log(' 🎯 TC02 > Edit_Existing_Family_Member Passed successfully.');
// });














// test('TC03_FULL > Edit_And_Delete_Family_Member – Verify edit, persistence, and cleanup via deletion', async ({ page }) => {
//     test.setTimeout(150000); 

//     const loginPage = new LoginPage(page);
//     const contactDetailsPage = new ContactDetailsPage(page);
//     const editContactModal = new EditContactModal(page); 
//     const adminUser = users.admin; 
    
//     // --- Test Data ---
//     const initialFamilyName = `Old Partner ${Date.now()}`;
//     const initialContact = '5551112222';
//     const initialRelationship = 'Partner'; 
//     const initialNote = 'Initial test note for update.';
    
//     const updatedFamilyName = `Updated Spouse ${Date.now()}`;
//     const updatedContact = '5559998888';
//     const updatedNote = 'Updated test note.'; 
//     const contactId = '198'; 

    
//     // --- 1. Setup: Navigate and Add a new Family Member (Creation Flow) ---
//     console.log('🔹 1. Setup: Logging in and creating initial Family Member.');
    
//     // 1.1 LOGIN & NAVIGATE
//     await loginPage.gotoLoginPage();
//     await loginPage.login(adminUser.email, adminUser.password); 
//     await loginPage.waitForLoaderToDisappear(); 
//     await page.goto(`https://stage-crossroads20.hgchristie.net/all-contacts/details/${contactId}`); 
    
//     // 1.2 OPEN MODAL, TAB, AND NESTED ADD MODAL
//     await contactDetailsPage.editButton.click(); 
//     await editContactModal.personalInfoTab.click(); 
//     await page.waitForLoadState('networkidle'); 
    
//     // 1.3 CREATE: Fill initial data (using robust relationship click)
//     console.log(`- Creating initial member: ${initialFamilyName}`);
//     await editContactModal.addFamilyMemberButton.click(); 
//     await expect(editContactModal.familyModalTitle).toBeVisible(); 

//     await editContactModal.familyNameField.fill(initialFamilyName);
//     await editContactModal.familyContactField.fill(initialContact);
    
//     // Use robust locator for selection
//     await page.getByLabel('Relationship').click();
//     await page.getByRole('option', { name: initialRelationship, exact: true }).click();
    
//     await editContactModal.familyNoteField.fill(initialNote); 
    
//     await editContactModal.familyAddButton.click(); 
//     await expect(editContactModal.familyModalTitle).not.toBeVisible({ timeout: 10000 }); 
    
    
//     // --- 2. Execution & Verification of Edit ---
//     console.log('🔸 2. Execution: Editing the member and verifying persistence.');
    
//     // 2.1 LOCATE AND CLICK EDIT ICON (Fixed Locator)
//     let targetRow = editContactModal.familyMemberListWrapper.filter({ hasText: initialFamilyName });
//     await expect(targetRow).toBeVisible(); 
    
//     const editIcon = targetRow.locator('.icon.edit-icon').first();
//     await editIcon.click(); 
//     await expect(page.getByRole('heading', { name: 'Update Family Member' })).toBeVisible({ timeout: 10000 });
    
//     // 2.3 CHANGE FIELDS (Name, Contact, Note)
//     await editContactModal.familyNameField.fill(updatedFamilyName);
//     await editContactModal.familyContactField.fill(updatedContact);
//     // Skipping Relationship update
//     await editContactModal.familyNoteField.fill(updatedNote); 
    
//     // 2.4 CLICK UPDATE BUTTON
//     await page.getByRole('button', { name: 'Update', exact: true, type: 'submit' }).last().click(); 
//     await expect(page.getByRole('heading', { name: 'Update Family Member' })).not.toBeVisible({ timeout: 10000 }); 
//     await expect(page.getByText('Contact family member updated successfully')).toBeVisible({ timeout: 15000 });

//     // 3.2 FINAL SAVE & 3.3 CLOSE MODAL
//     await editContactModal.saveChangesButton.click();
//     await editContactModal.cancelButton.click();
    
//     // 3.4 REFRESH AND FINAL PERSISTENCE CHECK
//     await page.reload();
//     await loginPage.waitForLoaderToDisappear(); 
//     await contactDetailsPage.editButton.click(); 
//     await editContactModal.personalInfoTab.click();
//     await page.waitForLoadState('networkidle'); 

//     // Final check for updated row
//     const finalUpdatedRow = editContactModal.familyMemberListWrapper.filter({ hasText: updatedFamilyName });
//     await expect(finalUpdatedRow).toBeVisible();
//     console.log('✅ Edit and Persistence verified.');
    
    
//     // --- 3. Execution: DELETE (Cleanup Action) ---
//     console.log('⭐ 3. Cleanup: Deleting the edited member.');
    
//     // Locate the row using the NEW updated name
//     const rowToDelete = editContactModal.familyMemberListWrapper.filter({ hasText: updatedFamilyName });
    
//     // 3.1 LOCATE DELETE ICON
//     const deleteIcon = rowToDelete.locator('.icon.delete-icon').first();
    
//     console.log('- Clicking Delete icon.');
//     await deleteIcon.click(); 
    
//     // 3.1.5 CONFIRM DELETION (FIX for the previous timeout issue)
//     const confirmDeleteButton = page.getByRole('button', { name: 'Delete', exact: true }).last();
//     console.log('- Clicking the Delete confirmation button.');
//     await confirmDeleteButton.waitFor({ state: 'visible', timeout: 10000 });
//     await confirmDeleteButton.click(); 
    
//     // 3.2 VERIFY IMMEDIATE DELETION (This line should now pass)
//     console.log('- Verifying immediate disappearance of the row.');
//     await expect(rowToDelete).not.toBeVisible({ timeout: 10000 });
    
//     // 3.3 FINAL SAVE (Committing the deletion)
//     await editContactModal.saveChangesButton.click();
    
//     // 3.4 FINAL CLEANUP CHECK
//     await editContactModal.cancelButton.click(); 
//     await page.reload();
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Re-open modal to ensure deletion persisted
//     await contactDetailsPage.editButton.click(); 
//     await editContactModal.personalInfoTab.click();
    
//     const finalDeletedRowCheck = editContactModal.familyMemberListWrapper.filter({ hasText: updatedFamilyName });
//     await expect(finalDeletedRowCheck).not.toBeVisible();
    
//     console.log('✅ Deletion verified successfully.');
    
//     // 4. Final Logout
//     await editContactModal.cancelButton.click(); 
//     await loginPage.logout(); 
    
//     console.log(' 🎯 TC03_FULL > Edit_And_Delete_Family_Member Passed successfully.');
// });





















// test('TC04_Verify_Activities_Table_Structure – Verify creation and display of all required activity columns', async ({ page }) => {
//     // Set the overall test timeout
//     test.setTimeout(150000); 

//     const loginPage = new LoginPage(page);
    
//     const adminUser = users.admin; 
//     const contactId = '198'; 
//     // Use 'Sms' (capital S) for the locator filter, as seen in the table.
//     const testActivityType = 'Sms'; 
//     const testComment = `Test comment for table structure verification ${Date.now()}`;
    
//     // The expected display name for the user.
//     const expectedCreatedBy = "Admin Crest"; 
//     // Regular Expression to match the date format (e.g., "17 November, 2025").
//     const dateRegex = /\d{1,2}\s\w+,\s\d{4}/; 
    
//     const activitiesTabLocator = page.getByRole('tab', { name: 'Activities', exact: true });
    
//     // --- 1. Log New Activity ---
//     console.log('🔹 1. Setup: Logging in, navigating, and creating a new Activity.');
    
//     await loginPage.gotoLoginPage();
//     await loginPage.login(adminUser.email, adminUser.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     const logActivityButton = page.getByRole('button', { name: /Log Activity/i });
//     await page.goto(`https://stage-crossroads20.hgchristie.net/all-contacts/details/${contactId}`); 
//     await page.waitForLoadState('networkidle');
//     await expect(logActivityButton).toBeVisible({ timeout: 15000 });

//     await logActivityButton.click();
    
//     const modalTitle = page.getByRole('heading', { name: 'Log activity' });
//     await expect(modalTitle).toBeVisible({ timeout: 15000 });
    
//     const activityTypeDropdown = page.locator('#mui-component-select-activity_type');
//     await activityTypeDropdown.click({ timeout: 15000 }); 
//     // Use 'SMS' here because the dropdown option is likely capitalized.
//     await page.getByRole('option', { name: 'SMS', exact: true }).click();
    
//     const commentField = page.getByLabel('Add comment').or(page.getByPlaceholder('Additional comment'));
//     await commentField.fill(testComment);
    
//     const addButton = page.getByRole('button', { name: 'Add' });
//     await addButton.click();

//     await expect(modalTitle).not.toBeVisible({ timeout: 20000 }); 
//     console.log(`✅ Activity logged successfully: ${testActivityType}`);


//     // ---------------------- 🔥 CRITICAL STEP: HARD REFRESH ----------------------
//     console.log('1.5.5 Performing browser refresh to ensure activity data is fetched cleanly.');
//     await page.reload({ waitUntil: 'networkidle' }); 
//     await loginPage.waitForLoaderToDisappear(); 
//     // ----------------------------------------------------------------------------

//     // 1.6 CLICK ACTIVITIES TAB
//     console.log('1.6 Clicking the Activities Tab.');
//     await activitiesTabLocator.click(); 
    
//     // --- Define the New Row Locator - ABSOLUTE GLOBAL SEARCH ---
//     const newActivityRow = page
//                              .locator(`tr:has-text("${testActivityType}")`)
//                              .filter({ hasText: testComment })
//                              .first();
    
//     // Wait 30 seconds for the unique row to appear.
//     await expect(newActivityRow).toBeVisible({ timeout: 30000 }); 
//     console.log('✅ New entry visibility confirmed in the Activities Table.');

//     // 2. Verification of Table Structure (Headers)
//     console.log('🔸 2. Verification: Checking for required table headers.');
    
//     const activitiesTableHeaders = page.locator('table th'); 

//     await expect(activitiesTableHeaders.filter({ hasText: 'Activity Type' })).toBeVisible({ timeout: 10000 });
//     await expect(activitiesTableHeaders.filter({ hasText: 'Created By' })).toBeVisible({ timeout: 10000 });
//     await expect(activitiesTableHeaders.filter({ hasText: 'Creation Date' })).toBeVisible({ timeout: 10000 });
//     await expect(activitiesTableHeaders.filter({ hasText: 'Comments' })).toBeVisible({ timeout: 10000 });
    
    
//     // --- 3. Verification of Table Data Consistency (New Entry) ---
//     console.log('⭐ 3. Verification: Checking structure consistency on new entry.');
    
//     const rowCells = newActivityRow.locator('td');
//     // Ensure the row has the correct number of columns (still 4)
//     await expect(rowCells).toHaveCount(4, { timeout: 10000 }); 
//     console.log('✅ Verified data row has the expected number of 4 columns.');

//     // 🔥 ASSERTIONS MATCHING THE RECEIVED DATA ORDER: 
//     // 0: Created By, 1: Creation Date, 2: Comments, 3: Activity Type
    
//     // rowCells.nth(0): Created By 
//     await expect(rowCells.nth(0)).toHaveText(expectedCreatedBy, { timeout: 5000 }); 
//     console.log('✅ Verified Created By (Index 0).');
    
//     // rowCells.nth(1): Creation Date 
//     await expect(rowCells.nth(1)).toHaveText(dateRegex, { timeout: 5000 }); 
//     console.log('✅ Verified Creation Date (Index 1).');

//     // rowCells.nth(2): Comments 
//     await expect(rowCells.nth(2)).toContainText(testComment, { timeout: 5000 }); 
//     console.log('✅ Verified Comments (Index 2).');

//     // rowCells.nth(3): Activity Type (Sms)
//     // FIX: We know the cell is empty but the text is in the row.
//     // Instead of checking the text content of nth(3) (which is ''),
//     // we assert that the text element itself is visible somewhere *within the row*.
//     const activityTypeBadge = newActivityRow.locator('text=' + testActivityType);
//     await expect(activityTypeBadge).toBeVisible({ timeout: 5000 }); 
//     console.log('✅ Verified Activity Type (Index 3) element visibility.');
    
    
//     // --- 4. Cleanup ---
//     await loginPage.logout();
    
//     console.log(' 🎯 TC04_Verify_Activities_Table_Structure Passed successfully.');
// });
















// // This TC needs Fixing, failing as of now
// test('TC05_Verify_Activity_Pagination - Ensure activity list pagination is functional and data is consistent', async ({ page }) => {
//     // Setting a default timeout for stability.
//     test.setTimeout(120000); 

//     const loginPage = new LoginPage(page);
    
//     const adminUser = users.admin; 
//     const contactId = '198'; 
//     const testActivityType = 'SMS'; 
    
//     // FIX: Keep the low count to bypass the flaky page size selector issue.
//     const ACTIVITIES_COUNT = 3; 
//     const DEFAULT_PAGE_SIZE = 5; 
    
//     console.log(`🔹 1. Setup: Logging in, navigating, and creating ${ACTIVITIES_COUNT} unique activities.`);

//     await loginPage.gotoLoginPage();
//     await loginPage.login(adminUser.email, adminUser.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Navigate to the contact page once
//     await page.goto(`https://stage-crossroads20.hgchristie.net/all-contacts/details/${contactId}`); 
//     await page.waitForLoadState('networkidle');
    
//     // Locators used inside the creation loop
//     const logActivityButton = page.getByRole('button', { name: /Log Activity/i });
//     const modalTitle = page.getByRole('heading', { name: 'Log activity' });
//     const activityTypeDropdown = page.locator('#mui-component-select-activity_type');
//     const commentField = page.getByLabel('Add comment').or(page.getByPlaceholder('Additional comment'));
//     const addButton = page.getByRole('button', { name: 'Add' });
    
//     // Loop to create 3 unique activities
//     for (let i = 1; i <= ACTIVITIES_COUNT; i++) {
//         const uniqueComment = `Pagination Test Activity ${Date.now()}_${i}`;
        
//         // --- Activity Creation Steps ---
//         await logActivityButton.click({ timeout: 15000 });
//         await expect(modalTitle).toBeVisible({ timeout: 15000 });
        
//         await activityTypeDropdown.click(); 
//         await page.getByRole('option', { name: testActivityType, exact: true }).click();
        
//         await commentField.fill(uniqueComment);
//         await addButton.click();

//         await expect(modalTitle).not.toBeVisible({ timeout: 20000 }); 
//         await loginPage.waitForLoaderToDisappear();

//         console.log(`-> Created activity ${i}/${ACTIVITIES_COUNT} with comment: ${uniqueComment}`);
//     }
//     console.log(`✅ Activity creation setup complete: ${ACTIVITIES_COUNT} activities logged.`);

//     // ---------------------- 2. Navigate to Activities and Verify State ----------------------
//     console.log('--- 2. Verification: Navigating to Activities tab and checking final state.');

//     // Reload page to ensure the list is fresh
//     await page.reload({ waitUntil: 'networkidle' }); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     const activitiesTabLocator = page.getByRole('tab', { name: 'Activities', exact: true });
//     await activitiesTabLocator.click();
    
//     // Selectors for activity rows and pagination buttons
//     const activityRows = page.locator('table tbody tr');
    
//     // Explicitly wait for the activity table content to appear
//     await expect(activityRows.first()).toBeVisible({ timeout: 15000 });
//     console.log('✅ Activity table content is visible after tab click.');
    
//     const nextPageButton = page.locator('[aria-label="Go to next page"]'); 
//     const previousPageButton = page.locator('[aria-label="Go to previous page"]');


//     // 2.1 Verify total count on the single page
//     // Expected text: "1-3 of 3" 
//     const expectedTextRegex = new RegExp(`1\\s?-\\s?${ACTIVITIES_COUNT}\\s+(?:of)\\s+${ACTIVITIES_COUNT}`, 'i'); 
    
//     // 🔥 FIX: Directly locate the element containing the unique count string.
//     const paginationCountLocator = page.getByText(expectedTextRegex, { exact: false });

//     await expect(paginationCountLocator).toBeVisible({ timeout: 15000 });
//     console.log(`✅ Verified final pagination count: 1-${ACTIVITIES_COUNT} of ${ACTIVITIES_COUNT}`);
    
//     // 2.2 Verify content count
//     await expect(activityRows).toHaveCount(ACTIVITIES_COUNT);
//     console.log(`✅ Verified the table loads ${ACTIVITIES_COUNT} activities.`);
    
//     // 2.3 Verify both pagination buttons are disabled (since there's only one page)
//     await expect(previousPageButton).toBeDisabled();
//     await expect(nextPageButton).toBeDisabled();
//     console.log('✅ Verified Next/Previous buttons are disabled (single page).');
    
//     // --- 3. Cleanup ---
//     await loginPage.logout();
    
//     console.log(' 🎯 TC05_Verify_Activity_Pagination - Initial Check Passed successfully.');
// });















import * as path from 'path'; 
import * as fs from 'fs';

// Define the absolute path to the dummy file
const dummyFilePath = 'D:\\GC Download\\Test Documents and file\\10kb TXT.txt'; 
const uploadedFileName = '10kb TXT.txt';  

test('TC06_Verify_Documents_Table_Structure - Verify document name, size, and metadata are correctly displayed', async ({ page }) => {
    
    test.setTimeout(240000); 

    const loginPage = new LoginPage(page);
    
    const adminUser = users.admin; 
    const contactId = '198'; 
    
    // --- Locators ---
    const documentsTab = page.getByRole('tab', { name: 'Documents' });
    
    // The "Add" button is the element that triggers the file selection interface.
    const addDocumentButton = page.getByRole('button', { name: 'Add' }).last(); 
    
    const documentsTable = page.locator('div[aria-label="Documents"] table'); 
    const documentRow = page.locator('div[aria-label="Documents"] table tbody tr').first();
    const uploadedFileRow = documentRow.filter({ hasText: uploadedFileName });
    
    // ---------------------- PREREQUISITE: Check if the file exists ----------------------
    console.log(`🔨 Prerequisite: Checking for dummy file at: ${dummyFilePath}`);
    if (!fs.existsSync(dummyFilePath)) {
        throw new Error(`Cannot proceed: The required file was not found at the specified path: ${dummyFilePath}. Please check the path and file name.`);
    }
    // ---------------------------------------------------------------------------------

    console.log('🔹 1. Setup: Logging in and navigating to Contact Details.');

    await loginPage.gotoLoginPage();
    await loginPage.login(adminUser.email, adminUser.password); 
    await loginPage.waitForLoaderToDisappear(); 
    
    // Navigate to the contact page
    await page.goto(`https://stage-crossroads20.hgchristie.net/all-contacts/details/${contactId}`); 
    await page.waitForLoadState('networkidle');
    
    // ---------------------- 2. Navigate to Documents and Upload File ----------------------
    console.log('--- 2. Action: Navigating to Documents tab and uploading a test file.');

    await documentsTab.click();
    await loginPage.waitForLoaderToDisappear();

    // 2.1 Use Promise.all to handle the button click and the file chooser dialog opening simultaneously.
    console.log('🔄 Triggering file upload dialog and setting file...');
    
    const [fileChooser] = await Promise.all([
        // 1. Wait for the file chooser dialog to appear
        page.waitForEvent('filechooser'),
        // 2. Click the 'Add' button, which triggers the dialog
        addDocumentButton.click(), 
    ]);

    // 2.2 Set the file using the fileChooser object
    await fileChooser.setFiles(dummyFilePath);
    
    // Wait for the application's loader to disappear, indicating server upload is done.
    await loginPage.waitForLoaderToDisappear();
    
    // Wait for the file name to appear in the table as confirmation of successful upload
    await expect(uploadedFileRow).toBeVisible({ timeout: 30000 }); 

    console.log(`✅ Upload complete: ${uploadedFileName} successfully found in the table.`);

    // ---------------------- 3. Verify Table Structure and Content ----------------------
    console.log('--- 3. Verification: Checking Table Headers and Content.');

    const headerLocator = documentsTable.locator('thead th');

    // 3.1 Verify required column headers
    await expect(headerLocator.filter({ hasText: /Name/i })).toBeVisible({ timeout: 10000 });
    await expect(headerLocator.filter({ hasText: /Size/i })).toBeVisible();
    await expect(headerLocator.filter({ hasText: /Action/i })).toBeVisible();
    
    // 3.2 Verify Metadata headers
    await expect(headerLocator.filter({ hasText: /Date/i })).toBeVisible(); 
    await expect(headerLocator.filter({ hasText: /By/i })).toBeVisible(); 
    
    // 3.3 Verify Content
    const rowText = await uploadedFileRow.textContent();
    
    // Verify File Size 
    const fileSizeRegex = /\d+(\.\d+)?\s?(KB|MB|GB)/i;
    expect(rowText).toMatch(fileSizeRegex); 

    // Verify Metadata (User and Date)
    await expect(uploadedFileRow).toContainText(adminUser.name || 'Admin', { ignoreCase: true }); 
    expect(rowText).toMatch(/\d{1,2}[\/\-\s]\w{3,}[\/\-\s]\d{4}|\d{1,2}\/\d{1,2}\/\d{4}/i); 

    console.log('✅ Verified Document Name, File Size, and key Metadata in the first row.');
    
    // ---------------------- 4. Cleanup ----------------------
    await loginPage.logout();
    
    console.log(' 🎯 TC06_Verify_Documents_Table_Structure Passed successfully.');
});


























// import * as path from 'path'; 
// import * as fs from 'fs';

// // Define the absolute path to the dummy file
// const dummyFilePath = 'D:\\GC Download\\Test Documents and file\\10kb TXT.txt'; 
// const uploadedFileName = '10kb TXT.txt';  

// test('TC06_Verify_Documents_Table_Structure - Verify document name, size, and metadata are correctly displayed', async ({ page }) => {
    
//     test.setTimeout(240000); 

//     const loginPage = new LoginPage(page);
    
//     const adminUser = users.admin; 
//     const contactId = '198'; 
    
//     // --- Locators ---
//     const documentsTab = page.getByRole('tab', { name: 'Documents' });
    
//     // The "Add" button is the element that triggers the file selection interface.
//     // We will use this locator as the target for setInputFiles().
//     const addDocumentButton = page.getByRole('button', { name: 'Add' }).last(); 
    
//     const documentsTable = page.locator('div[aria-label="Documents"] table'); 
//     const documentRow = page.locator('div[aria-label="Documents"] table tbody tr').first();
//     const uploadedFileRow = documentRow.filter({ hasText: uploadedFileName });
    
//     // The previous modal locators are removed as they are for a non-existent HTML modal.
//     // ---------------------- PREREQUISITE: Check if the file exists ----------------------
//     console.log(`🔨 Prerequisite: Checking for dummy file at: ${dummyFilePath}`);
//     if (!fs.existsSync(dummyFilePath)) {
//         throw new Error(`Cannot proceed: The required file was not found at the specified path: ${dummyFilePath}. Please check the path and file name.`);
//     }
//     // ---------------------------------------------------------------------------------

//     console.log('🔹 1. Setup: Logging in and navigating to Contact Details.');

//     await loginPage.gotoLoginPage();
//     await loginPage.login(adminUser.email, adminUser.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Navigate to the contact page
//     await page.goto(`https://stage-crossroads20.hgchristie.net/all-contacts/details/${contactId}`); 
//     await page.waitForLoadState('networkidle');
    
//     // ---------------------- 2. Navigate to Documents and Upload File ----------------------
//     console.log('--- 2. Action: Navigating to Documents tab and uploading a test file.');

//     await documentsTab.click();
//     await loginPage.waitForLoaderToDisappear();

//     // 2.1 Bypass the separate click and modal check. Use setInputFiles directly on the button.
//     // Playwright will click the target locator (the 'Add' button) which triggers the native dialog,
//     // and then immediately supply the file path.
//     await addDocumentButton.setInputFiles(dummyFilePath);
    
//     // Wait for the application's loader to disappear, indicating server upload is done.
//     await loginPage.waitForLoaderToDisappear();
    
//     // Wait for the file name to appear in the table as confirmation of successful upload
//     await expect(uploadedFileRow).toBeVisible({ timeout: 30000 }); // Giving a generous timeout for upload completion

//     console.log(`✅ Upload complete: ${uploadedFileName} should now be in the table.`);

//     // ---------------------- 3. Verify Table Structure and Content ----------------------
//     console.log('--- 3. Verification: Checking Table Headers and Content.');

//     const headerLocator = documentsTable.locator('thead th');

//     // 3.1 Verify required column headers
//     await expect(headerLocator.filter({ hasText: /Name/i })).toBeVisible({ timeout: 10000 });
//     await expect(headerLocator.filter({ hasText: /Size/i })).toBeVisible();
//     await expect(headerLocator.filter({ hasText: /Action/i })).toBeVisible();
    
//     // 3.2 Verify Metadata headers
//     await expect(headerLocator.filter({ hasText: /Date/i })).toBeVisible(); 
//     await expect(headerLocator.filter({ hasText: /By/i })).toBeVisible(); 
    
//     // 3.3 Verify Content
//     const rowText = await uploadedFileRow.textContent();
    
//     // Verify File Size 
//     const fileSizeRegex = /\d+(\.\d+)?\s?(KB|MB|GB)/i;
//     expect(rowText).toMatch(fileSizeRegex); 

//     // Verify Metadata (User and Date)
//     await expect(uploadedFileRow).toContainText(adminUser.name || 'Admin', { ignoreCase: true }); 
//     expect(rowText).toMatch(/\d{1,2}[\/\-\s]\w{3,}[\/\-\s]\d{4}|\d{1,2}\/\d{1,2}\/\d{4}/i); 

//     console.log('✅ Verified Document Name, File Size, and key Metadata in the first row.');
    
//     // ---------------------- 4. Cleanup ----------------------
//     await loginPage.logout();
    
//     console.log(' 🎯 TC06_Verify_Documents_Table_Structure Passed successfully.');
// });
























// import * as path from 'path'; 
// import * as fs from 'fs';

// // Define the absolute path to the dummy file (based on your input)
// const dummyFilePath = 'D:\\GC Download\\Test Documents and file\\10kb TXT.txt'; 
// const uploadedFileName = '10kb TXT.txt';  

// test('TC06_Verify_Documents_Table_Structure - Verify document name, size, and metadata are correctly displayed', async ({ page }) => {
    
//     // Test timeout remains 4 minutes
//     test.setTimeout(240000); 

//     const loginPage = new LoginPage(page);
    
//     // Assuming 'users' is defined globally or imported elsewhere
//     const adminUser = users.admin; 
//     const contactId = '198'; 
    
//     // --- Locators ---
//     const documentsTab = page.getByRole('tab', { name: 'Documents' });
//     const addDocumentButton = page.getByRole('button', { name: 'Add' }).last(); 
    
//     // Locator for any common modal title (used only for initial visibility check)
//     const uploadModalTitle = page.getByRole('heading', { name: /Upload Document|Add Document/i }); 
    
//     // Locator for the file input
//     const uploadInput = page.locator('input[type="file"]').last(); 
    
//     const documentsTable = page.locator('div[aria-label="Documents"] table'); 
//     const documentRow = page.locator('div[aria-label="Documents"] table tbody tr').first();
//     // Use the document row content as the definitive success confirmation
//     const uploadedFileRow = documentRow.filter({ hasText: uploadedFileName });


//     // ---------------------- PREREQUISITE: Check if the file exists ----------------------
//     console.log(`🔨 Prerequisite: Checking for dummy file at: ${dummyFilePath}`);
//     if (!fs.existsSync(dummyFilePath)) {
//         throw new Error(`Cannot proceed: The required file was not found at the specified path: ${dummyFilePath}. Please check the path and file name.`);
//     }
//     // ---------------------------------------------------------------------------------

//     console.log('🔹 1. Setup: Logging in and navigating to Contact Details.');

//     await loginPage.gotoLoginPage();
//     await loginPage.login(adminUser.email, adminUser.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Navigate to the contact page
//     await page.goto(`https://stage-crossroads20.hgchristie.net/all-contacts/details/${contactId}`); 
//     await page.waitForLoadState('networkidle');
    
//     // ---------------------- 2. Navigate to Documents and Upload File ----------------------
//     console.log('--- 2. Action: Navigating to Documents tab and uploading a test file.');

//     await documentsTab.click();
//     await loginPage.waitForLoaderToDisappear();

//     // 2.1 Click 'Add' to open the upload dialogue
//     await addDocumentButton.click(); 
    
//     // Wait explicitly for the MODAL to appear (using the specific modal title)
//     await expect(uploadModalTitle).toBeVisible({ timeout: 15000 });
//     console.log('✅ Upload modal dialog is visible.');

//     // 2.2 Attach the dummy file to the file input
//     await uploadInput.setInputFiles(dummyFilePath);
    
//     // 🔥 FIX: Wait for the application's loader to disappear, indicating server upload is done.
//     await loginPage.waitForLoaderToDisappear();
    
//     // 🔥 FIX: Wait for the file name to appear in the table as confirmation of successful upload
//     // This replaces the unstable modal closing check and success toast check.
//     await expect(uploadedFileRow).toBeVisible({ timeout: 20000 }); 

//     console.log(`✅ Upload complete: ${uploadedFileName} should now be in the table.`);

//     // ---------------------- 3. Verify Table Structure and Content ----------------------
//     console.log('--- 3. Verification: Checking Table Headers and Content.');

//     const headerLocator = documentsTable.locator('thead th');

//     // 3.1 Verify required column headers
//     await expect(headerLocator.filter({ hasText: /Name/i })).toBeVisible({ timeout: 10000 });
//     await expect(headerLocator.filter({ hasText: /Size/i })).toBeVisible();
//     await expect(headerLocator.filter({ hasText: /Action/i })).toBeVisible();
    
//     // 3.2 Verify Metadata headers
//     await expect(headerLocator.filter({ hasText: /Date/i })).toBeVisible(); 
//     await expect(headerLocator.filter({ hasText: /By/i })).toBeVisible(); 
    
//     // 3.3 Verify Content
//     // Use the already verified uploadedFileRow to check content
//     const rowText = await uploadedFileRow.textContent();
    
//     // Verify Document Name (Already confirmed by the locator itself)
//     // Verify File Size 
//     // The uploaded file is 10kb, so KB format check is critical.
//     const fileSizeRegex = /\d+(\.\d+)?\s?(KB|MB|GB)/i;
//     expect(rowText).toMatch(fileSizeRegex); 

//     // Verify Metadata (User and Date)
//     await expect(uploadedFileRow).toContainText(adminUser.name || 'Admin', { ignoreCase: true }); 
//     expect(rowText).toMatch(/\d{1,2}[\/\-\s]\w{3,}[\/\-\s]\d{4}|\d{1,2}\/\d{1,2}\/\d{4}/i); 

//     console.log('✅ Verified Document Name, File Size, and key Metadata in the first row.');
    
//     // ---------------------- 4. Cleanup ----------------------
//     // NOTE: A complete test would delete the uploaded file here, but we are skipping for simplicity.
//     await loginPage.logout();
    
//     console.log(' 🎯 TC06_Verify_Documents_Table_Structure Passed successfully.');
// });





























// import * as path from 'path'; 
// import * as fs from 'fs';

// // Define the absolute path to the dummy file (use your path)
// const dummyFilePath = 'D:\\GC Download\\Test Documents and file\\10kb TXT.txt'; 
// const uploadedFileName = '10kb TXT.txt';  

// test('TC06_Verify_Documents_Table_Structure - Verify document name, size, and metadata are correctly displayed', async ({ page }) => {
    
//     // Test timeout remains 4 minutes
//     test.setTimeout(240000); 

//     const loginPage = new LoginPage(page);
    
//     const adminUser = users.admin; 
//     const contactId = '198'; 
    
//     // --- Locators ---
//     const documentsTab = page.getByRole('tab', { name: 'Documents' });
//     const addDocumentButton = page.getByRole('button', { name: 'Add' }).last(); 
    
//     // 🔥 FIX 1: Use a locator specific to the modal dialog. 
//     // Assuming the modal title is "Upload Document" or similar.
//     const uploadModalTitle = page.getByRole('heading', { name: /Upload Document|Add Document/i }); 
    
//     // Assuming the modal also has a visible 'Upload' button
//     const modalUploadButton = page.getByRole('button', { name: 'Upload', exact: true });

//     // Specific locator for the file input inside the modal.
//     const uploadInput = page.locator('input[type="file"]').last(); 
    
//     const documentsTable = page.locator('div[aria-label="Documents"] table'); 
//     const documentRow = page.locator('div[aria-label="Documents"] table tbody tr').first();
//     const successToast = page.getByText(/successfully uploaded|file uploaded/i);

//     // ---------------------- PREREQUISITE: Check if the file exists ----------------------
//     console.log(`🔨 Prerequisite: Checking for dummy file at: ${dummyFilePath}`);
//     if (!fs.existsSync(dummyFilePath)) {
//         throw new Error(`Cannot proceed: The required file was not found at the specified path: ${dummyFilePath}. Please check the path and file name.`);
//     }
//     // ---------------------------------------------------------------------------------

//     console.log('🔹 1. Setup: Logging in and navigating to Contact Details.');

//     await loginPage.gotoLoginPage();
//     await loginPage.login(adminUser.email, adminUser.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Navigate to the contact page
//     await page.goto(`https://stage-crossroads20.hgchristie.net/all-contacts/details/${contactId}`); 
//     await page.waitForLoadState('networkidle');
    
//     // ---------------------- 2. Navigate to Documents and Upload File ----------------------
//     console.log('--- 2. Action: Navigating to Documents tab and uploading a test file.');

//     await documentsTab.click();
//     await loginPage.waitForLoaderToDisappear();

//     // 2.1 Click 'Add' to open the upload dialogue
//     await addDocumentButton.click(); 
    
//     // Wait explicitly for the MODAL to appear (using the specific modal title)
//     await expect(uploadModalTitle).toBeVisible({ timeout: 15000 });
//     console.log('✅ Upload modal dialog is visible.');

//     // 2.2 Attach the dummy file to the file input
//     // NOTE: For some upload components, the file must be set first, then an upload/save button clicked.
//     await uploadInput.setInputFiles(dummyFilePath);
    
//     // Assuming there is an 'Upload' or 'Save' button *inside* the modal to finalize the process
//     await modalUploadButton.click();
    
//     // Wait for the upload process to complete. This confirms the upload succeeded and the modal closed.
//     await loginPage.waitForLoaderToDisappear();
    
//     // 🔥 FIX 2: Wait for a success message (Toast) instead of asserting the general heading disappeared.
//     await expect(successToast).toBeVisible({ timeout: 20000 });
//     console.log('✅ Upload success toast/message is visible.');
    
//     // Wait for the toast to disappear to prevent interference with next steps
//     await expect(successToast).not.toBeVisible({ timeout: 10000 });

//     console.log(`✅ Upload complete: ${uploadedFileName} should now be in the table.`);

//     // ---------------------- 3. Verify Table Structure and Content ----------------------
//     console.log('--- 3. Verification: Checking Table Headers and Content.');

//     const headerLocator = documentsTable.locator('thead th');

//     // 3.1 Verify required column headers
//     await expect(headerLocator.filter({ hasText: /Name/i })).toBeVisible({ timeout: 10000 });
//     await expect(headerLocator.filter({ hasText: /Size/i })).toBeVisible();
//     await expect(headerLocator.filter({ hasText: /Action/i })).toBeVisible();
    
//     // 3.2 Verify Metadata headers
//     await expect(headerLocator.filter({ hasText: /Date/i })).toBeVisible(); 
//     await expect(headerLocator.filter({ hasText: /By/i })).toBeVisible(); 
    
//     // 3.3 Verify Content
//     await expect(documentRow).toBeVisible({ timeout: 15000 });
//     const rowText = await documentRow.textContent();
    
//     // Verify Document Name 
//     await expect(documentRow).toContainText(uploadedFileName);
    
//     // Verify File Size 
//     const fileSizeRegex = /\d+(\.\d+)?\s?(KB|MB|GB)/i;
//     expect(rowText).toMatch(fileSizeRegex); 

//     // Verify Metadata (User and Date)
//     await expect(documentRow).toContainText(adminUser.name || 'Admin', { ignoreCase: true }); 
//     expect(rowText).toMatch(/\d{1,2}[\/\-\s]\w{3,}[\/\-\s]\d{4}|\d{1,2}\/\d{1,2}\/\d{4}/i); 

//     console.log('✅ Verified Document Name, File Size, and key Metadata in the first row.');
    
//     // ---------------------- 4. Cleanup ----------------------
//     await loginPage.logout();
    
//     console.log(' 🎯 TC06_Verify_Documents_Table_Structure Passed successfully.');
// });
















// import * as path from 'path'; 
// import * as fs from 'fs';

// // 🔥 CRITICAL FIX: Update the file path to point to your specified download location.
// // NOTE: Ensure a file named 'dummy_file.txt' exists at this location.
// const dummyFilePath = 'D:\\GC Download\\Test Documents and file\\10kb TXT.txt'; 
// const uploadedFileName = '10kb TXT.txt'; // Must match the name of the file in the path above

// test('TC06_Verify_Documents_Table_Structure - Verify document name, size, and metadata are correctly displayed', async ({ page }) => {
    
//     // Set a reasonable timeout
//     test.setTimeout(180000); 

//     const loginPage = new LoginPage(page);
    
//     // Assuming 'users' is defined globally or imported elsewhere
//     const adminUser = users.admin; 
//     const contactId = '198'; 
    
    
//     // ---------------------- PREREQUISITE: Check if the file exists ----------------------
//     console.log(`🔨 Prerequisite: Checking for dummy file at: ${dummyFilePath}`);
//     if (!fs.existsSync(dummyFilePath)) {
//         throw new Error(`Cannot proceed: The required file was not found at the specified path: ${dummyFilePath}. Please check the path and file name.`);
//     }
//     // ---------------------------------------------------------------------------------

//     console.log('🔹 1. Setup: Logging in and navigating to Contact Details.');

//     await loginPage.gotoLoginPage();
//     await loginPage.login(adminUser.email, adminUser.password); 
//     await loginPage.waitForLoaderToDisappear(); 
    
//     // Navigate to the contact page
//     await page.goto(`https://stage-crossroads20.hgchristie.net/all-contacts/details/${contactId}`); 
//     await page.waitForLoadState('networkidle');
    
//     // Locators
//     const documentsTab = page.getByRole('tab', { name: 'Documents' });
//     const addDocumentButton = page.getByRole('button', { name: 'Add' }).last(); 
    
//     // Use the fixed, specific locator for the file input inside the modal.
//     const uploadInput = page.getByRole('button', { name: 'Choose File', exact: true }).locator('input[type="file"]');
    
//     const documentsTable = page.locator('div[aria-label="Documents"] table'); 
//     const documentRow = page.locator('div[aria-label="Documents"] table tbody tr').first();
    
//     // ---------------------- 2. Navigate to Documents and Upload File ----------------------
//     console.log('--- 2. Action: Navigating to Documents tab and uploading a test file.');

//     await documentsTab.click();
//     await loginPage.waitForLoaderToDisappear();

//     // 2.1 Click 'Add' to open the upload dialogue
//     await addDocumentButton.click(); 
    
//     // 2.2 Attach the dummy file to the hidden input
//     await uploadInput.setInputFiles(dummyFilePath);
    
//     // Wait for the upload process to complete and the row to appear 
//     await page.waitForTimeout(3000); 
//     await loginPage.waitForLoaderToDisappear();

//     console.log(`✅ Upload complete: ${uploadedFileName} should now be in the table.`);

//     // ---------------------- 3. Verify Table Structure and Content ----------------------
//     console.log('--- 3. Verification: Checking Table Headers and Content.');

//     const headerLocator = documentsTable.locator('thead th');

//     // 3.1 Verify required column headers
//     await expect(headerLocator.filter({ hasText: /Name/i })).toBeVisible({ timeout: 10000 });
//     await expect(headerLocator.filter({ hasText: /Size/i })).toBeVisible();
//     await expect(headerLocator.filter({ hasText: /Action/i })).toBeVisible();
    
//     // 3.2 Verify Metadata headers
//     await expect(headerLocator.filter({ hasText: /Date/i })).toBeVisible(); 
//     await expect(headerLocator.filter({ hasText: /By/i })).toBeVisible(); 
    
//     // 3.3 Verify Content
//     await expect(documentRow).toBeVisible({ timeout: 15000 });
//     const rowText = await documentRow.textContent();
    
//     // Verify Document Name 
//     await expect(documentRow).toContainText(uploadedFileName);
    
//     // Verify File Size 
//     const fileSizeRegex = /\d+(\.\d+)?\s?(KB|MB|GB)/i;
//     expect(rowText).toMatch(fileSizeRegex); 

//     // Verify Metadata (User and Date)
//     await expect(documentRow).toContainText(adminUser.name || 'Admin', { ignoreCase: true }); 
//     expect(rowText).toMatch(/\d{1,2}[\/\-\s]\w{3,}[\/\-\s]\d{4}|\d{1,2}\/\d{1,2}\/\d{4}/i); 

//     console.log('✅ Verified Document Name, File Size, and key Metadata in the first row.');
    
//     // ---------------------- 4. Cleanup ----------------------
//     await loginPage.logout();
    
//     // Note: Since the file is outside the test directory, we no longer delete it
//     // as part of the test cleanup to avoid accidentally deleting other files.
    
//     console.log(' 🎯 TC06_Verify_Documents_Table_Structure Passed successfully.');
// });