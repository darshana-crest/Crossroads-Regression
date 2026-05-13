import { expect } from '@playwright/test';

export class AllContactsPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.contactsMenu = page.getByRole('button', { name: 'Contacts' });
    this.allContactsLink = page.getByText('All Contacts', { exact: true });

    // Filters and actions
    this.profileTypeDropdown = page.getByLabel('Profile type');
    this.agentDropdown = page.getByLabel('Agent');
    this.searchInput = page.getByPlaceholder('Search contacts');
    this.filterBtn = page.getByRole('button', { name: 'Filter' });
    this.resetBtn = page.getByRole('button', { name: 'Reset' });
    this.addBtn = page.getByRole('button', { name: 'Add' });

    // Upload/Download
    this.uploadBtn = page.locator('button.upld-btn');
    this.downloadBtn = page.locator('button[aria-label*="Download a sample CSV/XLS"]');

    // Table & pagination
    this.contactsTable = page.locator('table');
    this.paginationNext = page.locator('button[aria-label="Next page"]');
  }
  
  async navigate() {
    await this.contactsMenu.click();
    await this.allContactsLink.click();
    await expect(this.page).toHaveURL(/all-contacts/);
  }

  async verifyAllContactsModule() {
    await expect(this.page.getByText('All Contacts', { exact: false })).toBeVisible();

    await expect(this.profileTypeDropdown).toBeVisible();
    await expect(this.agentDropdown).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.filterBtn).toBeVisible();
    await expect(this.resetBtn).toBeVisible();
    await expect(this.addBtn).toBeVisible();

    await expect(this.uploadBtn).toBeVisible();
    await expect(this.downloadBtn).toBeVisible();

    const expectedColumns = [
      'First Name',
      'Last Name',
      'Contact Info',
      'Profile Type',
      'Assigned Agent',
      'Creation Date'
    ];

    for (const column of expectedColumns) {
      const headerLocator = this.page.locator(`th:has-text("${column}")`);
      await expect(headerLocator, `Column "${column}" should be visible`).toBeVisible();
    }

    const rowCount = await this.page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
  }
  
  async filterContacts(profileType, agentName) {
  // Wait for filters to be visible
  await expect(this.profileTypeDropdown).toBeVisible({ timeout: 10000 });
  await expect(this.agentDropdown).toBeVisible();

  // Select Profile Type
  this.profileTypeDropdown = this.page.getByPlaceholder('Select Profile Type');

  // Select Agent (if provided)
  if (agentName) {
    this.agentDropdown = this.page.getByRole('button', { name: /Agent/i });
    await this.agentDropdown.click();
  }

  // Click Filter button
  await this.filterBtn.click();

  // Wait for results to refresh
  await this.page.waitForTimeout(2000);

  // ✅ Verify filtered results
  const rows = this.page.locator('tbody tr');
  const rowCount = await rows.count();

  expect(rowCount, 'Expected filtered results to appear').toBeGreaterThan(0);

  // Verify each row contains the selected Profile Type text
  const allTexts = await rows.allTextContents();
  for (const text of allTexts) {
    expect(
      text,
      `Expected row to contain profile type "${profileType}" but found: ${text}`
    ).toContain(profileType);
  }

  console.log(`✅ Filtered contacts displayed for Profile Type "${profileType}"`);

  // ✅ Reset the filter to clear applied filters
  await expect(this.resetBtn).toBeVisible();
  await this.resetBtn.click();
  await this.page.waitForTimeout(1000);

  console.log('✅ Filters reset successfully');
}
  async clickResetButton() {
  await expect(this.resetBtn).toBeVisible({ timeout: 5000 });
  await this.resetBtn.click();
  await this.page.waitForTimeout(1500);
  console.log('✅ Reset button clicked — filters cleared');
}





  // ✅ Verify that contact info (email & phone) is blurred/masked for restricted users
  async verifyBlurredContactInfo() {
    await this.page.waitForSelector('table tbody tr', { timeout: 10000 });
    const rows = this.page.locator('table tbody tr');
    const totalRows = await rows.count();

    if (totalRows === 0) {
      console.log('⚠️ No contacts found — cannot verify blur status.');
      return false;
    }

    let maskedFound = false;

    for (let i = 0; i < Math.min(totalRows, 5); i++) {
      const contactCell = rows.nth(i).locator('td').nth(2); // assuming Contact Info column index = 2
      const text = (await contactCell.textContent())?.trim() || '';

      // Check if info is masked with * or hidden symbols
      if (text.includes('*') || text.includes('•••') || text.includes('hidden')) {
        maskedFound = true;
        console.log(`🔹 Row ${i + 1}: Contact Info is masked (${text})`);
      } else {
        console.log(`⚠️ Row ${i + 1}: Contact Info seems unmasked (${text})`);
      }
    }

    return maskedFound;
  }

  // ✅ Verify that contact info is fully visible for users with full access
  async verifyFullContactInfo() {
    await this.page.waitForSelector('table tbody tr', { timeout: 10000 });
    const rows = this.page.locator('table tbody tr');
    const totalRows = await rows.count();

    if (totalRows === 0) {
      console.log('⚠️ No contacts found — cannot verify full info.');
      return false;
    }

    let allVisible = true;

    for (let i = 0; i < Math.min(totalRows, 5); i++) {
      const contactCell = rows.nth(i).locator('td').nth(2);
      const text = (await contactCell.textContent())?.trim() || '';

      // Check if info is unmasked (no stars or dots)
      if (text.includes('*') || text.includes('•••')) {
        allVisible = false;
        console.log(`❌ Row ${i + 1}: Contact info appears masked (${text})`);
      } else {
        console.log(`✅ Row ${i + 1}: Contact info visible (${text})`);
      }
    }

    return allVisible;
  }







// ✅ Robust version — finds "Contact Info" column by header name, extracts only emails
async getSearchResults() {
  const table = this.page.locator('table');
  const headers = table.locator('thead th');
  const headerCount = await headers.count();

  // Find which column contains "Contact Info"
  let contactInfoIndex = -1;
  for (let i = 0; i < headerCount; i++) {
    const headerText = (await headers.nth(i).innerText()).trim().toLowerCase();
    if (headerText.includes('contact info')) {
      contactInfoIndex = i;
      break;
    }
  }

  if (contactInfoIndex === -1) {
    throw new Error('❌ Could not find "Contact Info" column in table headers.');
  }

  // Extract emails from each row of that column
  const rows = table.locator('tbody tr');
  const rowCount = await rows.count();
  const emails = [];

  for (let i = 0; i < rowCount; i++) {
    const cell = rows.nth(i).locator('td').nth(contactInfoIndex);
    const text = (await cell.innerText()).trim();

    // Extract only email from the text (ignores phone numbers)
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      emails.push(emailMatch[0]);
    }
  }

  console.log('📧 Extracted emails:', emails);
  return emails;
}





async viewContactDetails(contactName) {
  // Wait for table to load
  await this.page.waitForSelector('tbody tr', { timeout: 10000 });

  // Click on contact name (assumes it's clickable)
  const contactLink = this.page.locator('tbody tr').filter({ hasText: contactName }).locator('a');
  await contactLink.first().click({ delay: 200 });
  console.log(`🔹 Clicked on contact: ${contactName}`);

  // Wait for the contact detail modal/panel to appear
  const detailModal = this.page.locator('.MuiDialog-paper, .contact-detail-modal, [role="dialog"]');
  await expect(detailModal).toBeVisible({ timeout: 10000 });
  console.log('✅ Contact detail modal opened successfully');

  // Verify key sections or tabs
  const tabs = this.page.locator('.MuiTabs-root, .contact-tabs');
  await expect(tabs).toBeVisible({ timeout: 5000 });

  console.log('✅ All sections and tabs are visible in Contact Details modal');

  // Optionally, close modal if needed
  const closeBtn = this.page.getByRole('button', { name: /Close|Cancel/i });
  if (await closeBtn.isVisible()) {
    await closeBtn.click({ delay: 100 });
    console.log('🔹 Contact detail modal closed');
  }
}


  async searchContactByName(contactName) {
    // Wait for search input to be ready
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });

    // Clear and type the contact name
    await this.searchInput.fill('');
    await this.searchInput.fill(contactName);

    // Click Filter/Search button
    await this.filterBtn.click();

    // Wait for results to load
    await this.page.waitForTimeout(2000);

    // Get all visible rows
    const rows = this.page.locator('tbody tr');
    const totalRows = await rows.count();

    expect(totalRows, 'Expected at least one contact row after search').toBeGreaterThan(0);

    // Gather all visible row texts
    const visibleTexts = await rows.allTextContents();

    // Check if at least one row contains the searched name
    const matchingRows = visibleTexts.filter(text =>
      text.toLowerCase().includes(contactName.toLowerCase())
    );

    expect(
      matchingRows.length,
      `Expected at least one row containing "${contactName}", but found none`
    ).toBeGreaterThan(0);

    // Verify all displayed results are relevant
    for (const [i, rowText] of visibleTexts.entries()) {
      expect(
        rowText.toLowerCase(),
        `Row ${i + 1} text "${rowText}" should contain searched term "${contactName}"`
      ).toContain(contactName.toLowerCase());
    }

    console.log(`✅ Found ${matchingRows.length}/${totalRows} rows matching "${contactName}"`);
  }

  // --- TC05: Download Selected Contacts ---
  async selectContacts(count = 3) {
    console.log(`🔹 Selecting ${count} contact(s) from the list...`);
    await this.page.waitForSelector('tbody tr', { timeout: 10000 });

    const rows = this.page.locator('tbody tr');
    const totalRows = await rows.count();
    console.log(`📋 Total rows available: ${totalRows}`);

    const selectCount = Math.min(count, totalRows);

    for (let i = 0; i < selectCount; i++) {
      const checkbox = rows.nth(i).locator('input[type="checkbox"]');
      if (await checkbox.isVisible()) {
        await checkbox.click({ force: true });
        console.log(`☑️ Selected contact row #${i + 1}`);
      }
    }
  }

  async clickDownloadButtonAndVerify() {
    console.log('⬇️ Clicking Download button...');

    // Expect the download to start
    const [download] = await Promise.all([
      this.page.waitForEvent('download', { timeout: 15000 }),
      this.downloadBtn.click()
    ]);

    // Wait for file to complete
    const path = await download.path();
    const fileName = download.suggestedFilename();
    console.log(`✅ File downloaded: ${fileName}`);

    // Basic file validation
    expect(fileName).toMatch(/\.xlsx|\.xls$/);

    // Optional: verify file content includes "*"
    const fs = require('fs');
    const fileBuffer = fs.readFileSync(path);
    const fileSizeKB = (fileBuffer.length / 1024).toFixed(2);
    console.log(`📁 Downloaded file size: ${fileSizeKB} KB`);

    expect(fileBuffer.length).toBeGreaterThan(0);
  }

  async clickDownloadTemplateButton() {
  console.log('⬇️ Clicking Download Template button...');
  const downloadButton = this.page.locator('button:has-text("Download Template")');
  await downloadButton.waitFor({ state: 'visible', timeout: 10000 });
  await downloadButton.click();
 }



 // 🔹 Method to search contacts by email
async searchContactByEmail(email) {
  await expect(this.searchInput).toBeVisible({ timeout: 10000 });

  // Clear and enter the email
  await this.searchInput.fill('');
  await this.searchInput.fill(email);

  // Click the filter/search button
  await this.filterBtn.click();

  // Wait for table refresh
  await this.page.waitForSelector('tbody tr', { timeout: 10000 });
  await this.page.waitForTimeout(2000);

  console.log(`🔍 Searched for contacts with email containing: ${email}`);
}

// 🔹 Method to get all emails from search results
async getSearchResults() {
  const rows = this.page.locator('tbody tr');
  const rowCount = await rows.count();

  if (rowCount === 0) {
    throw new Error('❌ No search results found for provided email.');
  }

  const emails = [];
  for (let i = 0; i < rowCount; i++) {
    const emailCell = rows.nth(i).locator('td').nth(3); // Adjust index if Email column changes
    if (await emailCell.isVisible()) {
      const emailText = (await emailCell.textContent())?.trim() || '';
      emails.push(emailText);
    }
  }

  console.log(`📬 Found ${emails.length} contact(s) in search results.`);
  return emails;
}


}




// 2. AddContactModal - (Ensure this is a named export)

export class AddContactModal {
    constructor(page) {
        this.page = page;
        this.modalTitle = page.locator('h2:has-text("Add Contact")'); // Updated title text
        
        // ⭐ LOCATORS UPDATED BASED ON YOUR IDs/CLASSES ⭐
        this.firstNameField = page.locator('#first_name'); 
        this.lastNameField = page.locator('#last_name');
        this.cellPhoneField = page.locator('#primary_phone');
        this.emailField = page.locator('#email');
        
        // Profile Type (ID matches your input)
        this.profileTypeSelect = page.locator('#profile_types');
        
        // Tags field: Targeting the general input that handles the selection
        this.tagsInputField = page.locator('input[id*="react-select"], input[aria-label="Tags"]');
        
        // Agent Dropdown (ID matches your input)
        this.agentDropdown = page.locator('#primary_agent'); 
        
        this.saveButton = page.locator('button[type="submit"]:has-text("Save")');

        this.closeButton = page.getByRole('button', { name: 'Cancel' });
    }

    // Existing helper method for dropdown selection (Handles click-out to close)
    async selectDropdownValue(dropdownLocator, value) {
        await dropdownLocator.click();

        // Wait for the options listbox to appear
        const listbox = this.page.locator('ul[role="listbox"]').or(this.page.locator('div[role="listbox"]'));
        await listbox.waitFor({ state: 'visible', timeout: 10000 });

        // Select the option
        const option = this.page.locator('[role="option"]', { hasText: value }).first();
        await expect(option).toBeVisible({ timeout: 5000 });
        await option.click();
        
        // ⭐ CRITICAL: Click outside (on the modal title) to close the dropdown/clear the backdrop
        await this.modalTitle.click({ position: { x: 5, y: 5 } });
        await this.page.waitForTimeout(300); // Small pause for stability
    }
    
    // ⭐ New/Updated method to fill ALL fields for success TC ⭐
    // File: ../Pages/AllContactsPage.js (inside export class AddContactModal)

async fillContactForm(data) {
    await this.firstNameField.fill(data.firstName);
    await this.lastNameField.fill(data.lastName);
    await this.cellPhoneField.fill(data.cellPhone);
    await this.emailField.fill(data.email);

    // Profile Type (Dropdown - Click outside handled by selectDropdownValue)
    // The previous ESCAPE fix in selectDropdownValue should ensure this is clean.
    await this.selectDropdownValue(this.profileTypeSelect, data.profileType);

    // ⭐ START: TAGS FIELD FIX ⭐
    // Tags (Multi-select - Requires typing and Enter press)
    await this.tagsInputField.scrollIntoViewIfNeeded();
    await this.tagsInputField.type(data.tag, { delay: 100 });
    
    // Check if the search result option appears before pressing Enter
    const tagOptionLocator = this.page.locator(`[role="option"]:has-text("${data.tag}")`);
    await tagOptionLocator.waitFor({ state: 'visible', timeout: 5000 }); 
    
    await this.page.keyboard.press('Enter'); // Press Enter to select the searched tag
    await this.page.waitForTimeout(500); // Small wait to let the tag stabilize
    // ⭐ END: TAGS FIELD FIX ⭐

    // Agent (Dropdown - Click outside handled by selectDropdownValue)
    await this.selectDropdownValue(this.agentDropdown, data.agent);
    
    // Note: The click-out for the Agent dropdown will also clear any lingering tag listbox.
}

    // File: ../Pages/AllContactsPage.js

// ... (existing code for AllContactsPage and AddContactModal constructor) ...

    // Fixed helper method for dropdown selection
    async selectDropdownValue(dropdownLocator, value) {
        await dropdownLocator.click();

        // 1. Wait for the listbox (options container) to appear
        const listbox = this.page.locator('ul[role="listbox"]').or(this.page.locator('div[role="listbox"]'));
        await listbox.waitFor({ state: 'visible', timeout: 10000 });

        // 2. Select the option
        const option = this.page.locator('[role="option"]', { hasText: value }).first();
        await expect(option).toBeVisible({ timeout: 5000 });
        await option.click();
        
        // ⭐ FIX: Use ESCAPE key to reliably dismiss the popover/dropdown
        console.log('Attempting to dismiss dropdown using ESCAPE key...');
        await this.page.keyboard.press('Escape'); 

        // 3. Wait for the dropdown (MUI Popover) container to detach/disappear
        // This confirms the ESCAPE key worked and clears the blocking backdrop.
        const dropdownPopover = this.page.locator(`div[role="presentation"][id^="menu-"]`);
        // Increased timeout for this crucial synchronization point
        await expect(dropdownPopover).not.toBeVisible({ timeout: 10000 }); 
        
        console.log('Dropdown successfully dismissed via ESCAPE. Ready for next action.');
    }
    async saveContact() {
    await expect(this.saveButton).toBeVisible({ timeout: 10000 });
    await this.saveButton.click(); // The click() is already here!
}

// File: ../Pages/AllContactsPage.js (inside export class AddContactModal)

// ... (Existing methods) ...

/**
 * Executes steps to verify the confirmation dialog when canceling with unsaved changes.
 * @param {string} dialogTitle The expected title/message of the confirmation dialog.
 * @param {string} actionButton The button to click after verification (e.g., 'Got it' or 'Close').
 */
async verifyCancelWithUnsavedChanges(dialogTitle, actionButton) {
    // 1. Click the Cancel button (defined in constructor as this.closeButton)
    console.log('Clicking the Cancel button...');
    await this.closeButton.click(); 

    // 2. Wait for the confirmation dialog to appear
    const confirmationDialog = this.page.locator('.MuiDialog-root').last();
    await expect(confirmationDialog).toBeVisible({ timeout: 10000 });

    // 3. Verify the Warning Message
    const dialogMessage = confirmationDialog.getByText(dialogTitle, { exact: false });
    await expect(dialogMessage).toBeVisible();
    console.log(`Verified dialog message: "${dialogTitle}"`);

    // 4. Click the specified action button (either "Got it" or "Close without saving")
    if (actionButton === 'Got it') {
        await confirmationDialog.getByRole('button', { name: 'Got it', exact: true }).click();
        console.log('Clicked "Got it" - returning to the form.');
        
        // Ensure the confirmation dialog disappears and the form is still open
        await expect(confirmationDialog).not.toBeVisible();

    } else if (actionButton === 'Close without saving') {
        await confirmationDialog.getByRole('button', { name: 'Close without saving', exact: true }).click();
        console.log('Clicked "Close without saving" - exiting the form.');
        
        // Ensure the main Add/Edit Contact modal disappears
        await expect(this.modalTitle).not.toBeVisible();
    }
}





// File: ../Pages/AllContactsPage.js (inside export class AddContactModal)

async verifyCancelWithUnsavedChanges(dialogTitle, actionButton) {
    // 1. Click the Cancel button (defined in constructor as this.closeButton)
    console.log('Clicking the Cancel button...');
    await this.closeButton.click(); 

    // 2. Wait for the confirmation dialog to appear
    const confirmationDialog = this.page.locator('.MuiDialog-root').last();
    // Ensuring the main dialog container is visible first
    await expect(confirmationDialog).toBeVisible({ timeout: 10000 });

    // ⭐ FIX 1: Use regex for partial, case-insensitive message matching.
    // This handles potential leading/trailing spaces or minor casing issues.
    // FIX 2: Increasing the specific message verification timeout to 10 seconds.
    const dialogTitleRegex = new RegExp(dialogTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    
    // 3. Verify the Warning Message
    const dialogMessage = confirmationDialog.getByText(dialogTitleRegex); // Using regex for better matching
    await expect(dialogMessage).toBeVisible({ timeout: 10000 }); // Increased timeout
    console.log(`Verified dialog message: "${dialogTitle}"`);

    // ⭐ CRITICAL LOCATOR CHECK (Ensure buttons are using robust locators)
    // Please confirm your final locators here are using the /regex/i format 
    // to avoid the failures we fixed in TC15.
    const closeWithoutSavingLocator = confirmationDialog.getByRole('button', { name: /Close without saving/i });
    const gotItLocator = confirmationDialog.getByRole('button', { name: /Got it/i });
    // ------------------------------------------------------------------

    // 4. Click the specified action button...
    if (actionButton === 'Got it') {
        await gotItLocator.click(); 
        console.log('Clicked "Got it" - returning to the form.');
        await expect(confirmationDialog).not.toBeVisible();

    } else if (actionButton === 'Close without saving') {
        await closeWithoutSavingLocator.click();
        console.log('Clicked "Close without saving" - exiting the form.');
        await expect(this.modalTitle).not.toBeVisible();
        
    } else {
        throw new Error(`Invalid actionButton provided: ${actionButton}`);
    }
}





}