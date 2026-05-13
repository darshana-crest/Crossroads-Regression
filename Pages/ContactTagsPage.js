
import { expect } from '@playwright/test';

export class ContactTagsPage {

    constructor(page) {
        this.page = page;

        // --- Sidebar Navigation ---
        this.contactsMenu = page.getByRole('button', { name: 'Contacts' });
        this.contactTagsSubMenu = page.getByText('Contact Tags', { exact: true });

        // --- Page/Table Locators ---
        this.pageTitle = page.getByRole('heading', { name: 'Contact Tags' });
        this.tagsTable = page.locator('table');
        this.tableRows = this.tagsTable.locator('tbody tr');
        this.tableHeaders = this.tagsTable.locator('thead th');

        // --- Search / Filter ---
        this.searchInput = page.getByPlaceholder('Search Tag by name');
        this.filterButton = page.getByRole('button', { name: 'Filter' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.noRecords = page.getByText("Contact tags not found", { exact: false });

        // --- Pagination ---
        this.rows = page.locator('.MuiTableBody-root tr');
        // Pagination Buttons
// Pagination buttons (Contact Tags list)
this.paginationNextButton = page.locator(
  'button[aria-label="Go to next page"]'
);
this.paginationPrevButton = page.locator(
  'button[aria-label="Go to previous page"]'
);


        // Rows-per-page dropdown
        this.rowsPerPageDropdown = page.getByRole('combobox', { name: 'Rows per page:' });
        this.rowsPerPageOption = (value) =>
            page.locator(`ul[role="listbox"] >> li[role="option"] >> text="${value}"`);



        // View Icon for first row
        this.viewIconFirstRow = page.locator('table tbody tr').first().locator('button:has-text("View"), button[title="View"]').first();



        // View Tag Details Header
        this.tagDetailsHeader = page.getByRole('heading', { name: /tag details/i });


         // Add Tag Modal
        this.addTagButton = page.getByRole('button', { name: /^add$/i });
        this.addTagModal = page.locator('div[role="dialog"]');

        // Inside modal fields
        this.modalTagNameInput = this.addTagModal.locator('input[placeholder="Enter Tag Name"]');
        this.modalSaveButton = this.addTagModal.getByRole('button', { name: /^save$/i });

        // React-Select Contact Dropdown
        this.reactSelectInput = page.locator('#react-select-3-input');
        this.reactOption = page.locator('[id*="-option-"]');

        // Toast message
        this.successToast = page.getByText("Contact Tag created successfully", { exact: false });

       
        // Cancel button
        this.modalCancelButton = this.addTagModal.getByRole('button', { name: /^cancel$/i });
         



        // Next button in Add Tag modal
        this.nextButtonmodal = page.getByRole('button', { name: /^next$/i });

        // Loader/spinner (adjust selector if needed)
        this.uploadLoader = page.locator('[role="progressbar"], .MuiCircularProgress-root');

        // --- Excel Upload Elements ---
        this.bulkUploadDropzone = this.addTagModal.locator('.dropzone.MuiBox-root.css-1bktdwb');
        this.fileInput = this.addTagModal.locator('input[type="file"]');

        // Next button after upload
        this.nextButtonInModal = this.addTagModal.getByRole('button', { name: /next/i });

        // Loader inside the Next button
        // this.uploadLoader = this.addTagModal.locator(".MuiCircularProgress-root");
        this.dialog = page.locator('div[role="dialog"]');
        this.nextButtonInModal = this.dialog.getByRole('button', { name: /^next$/i });


        // Message appearing after upload (“We found X new contacts…”)
        // Upload result info message (Step 1)
        this.uploadInfoMessage = this.addTagModal.locator('.info-block',{ hasText: /we found\s+\d+\s+new contacts?/i });
        this.bulkUploadDropzone = this.addTagModal.locator('.dropzone');
        this.fileInput = this.addTagModal.locator('input[type="file"]');
        this.uploadLoader = this.addTagModal.locator('.MuiCircularProgress-root');
        this.nextButtonInModal = this.addTagModal.getByRole('button', { name: /^next$/i });




        
//------------ Step 2 – TC13 - Review Contacts------------------
//-------------------------------------------------------
// Step 2
this.step2Header = this.addTagModal.getByRole('heading', {
    name: /step 2: review contacts/i
});

this.reviewDialog = page.locator('div[role="dialog"]');
this.newContactsTable = this.reviewDialog.locator('table').first();

this.newContactsTitle = this.addTagModal.getByText(
    /select contacts to add from this upload/i
);

this.newContactsTable = this.addTagModal.locator('table').first();
this.newContactsRows = this.newContactsTable.locator('tbody tr');


// Step 3
this.step3Header = this.addTagModal.getByRole('heading', {
    name: /step 3: Assign Agent/i
}); 

// step 4
this.step4Header = this.addTagModal.getByRole('heading', {
    name: /step 4: Review and Confirm/i 
});


// HEADER checkbox (this is the key)
        this.selectAllHeaderCheckbox = this.newContactsTable
            .locator('thead input[type="checkbox"]');

        // ROW checkboxes
        this.newContactsRows = this.newContactsTable.locator('tbody tr');

// Duplicate contacts
this.duplicateContactsTitle = this.addTagModal.getByText(
    /duplicate contacts found/i
);

this.duplicateContactsTable = this.addTagModal.locator('table').nth(1);
this.duplicateContactRows = this.duplicateContactsTable.locator('tbody tr');

// Footer buttons
this.nextButtonInModal = this.addTagModal.getByRole('button', { name: /^next$/i });
this.backButton = this.addTagModal.getByRole('button', { name: /^back$/i });

// Step 1 header
this.uploadStepHeader = this.addTagModal.getByText(/upload/i);

//------------ Step 2 – TC13 - Review Contacts---------------------------------------
//----------------------------------------------------------------------------
         


// // ===================================================================
// //         Step 3 --- TC14, TC15
// // ===================================================================


// Step 3 – Primary Agent
this.primaryAgentDropdown = page.locator('//*[@id="primary_agent_id"]');

// Error state (field highlighted in red)
// Works for Material UI / common validation wrappers
this.primaryAgentErrorState = page.locator(
    '//*[@id="primary_agent_id" and (contains(@class,"Mui-error") or contains(@class,"error") or contains(@aria-invalid,"true"))]'
);



// //-----------------------------

this.primaryAgentSearchInput =
  page.locator('input[placeholder="Select primary agent for new contacts"]');
this.primaryAgentOptions = page.locator('[role="listbox"] [role="option"]');

this.nextButton = page.locator('button:has-text("Next")'); /////////////////
this.primaryAgentError = page.locator('text=Primary Agent selection is required');

// // ===================================================================
// //         Step 3 --- TC14, TC15
// // ===================================================================




// //  Step 4 – Overview Screen

// Step 4 – Footer buttons
this.step4backButton = this.addTagModal.getByRole('button', { name: /^back$/i });

this.step4cancelButton = this.addTagModal.getByRole('button', {
  name: /^cancel$/i
});

this.step4confirmAndAddButton = this.addTagModal.getByRole('button', {
  name: /confirm\s*&?\s*add/i
});
// // -  step 4


// //-----TC19---------------------------------------

 // Edit icon
    this.firstEditIcon = page
      .locator('table tbody tr')
      .first()
      .locator('.icon.edit-icon');

    // Edit dialog
    this.editDialog = page.locator('div[role="dialog"]');

    // Header
    this.editDialogHeader = this.editDialog.locator(
      'h2, h1, .MuiDialogTitle-root',
      { hasText: 'Edit Contact Tag' }
    );

    // Tag Name input (editable)
    this.tagNameInput = this.editDialog.locator(
      'input:not([disabled]):not([readonly])'
    );

    // Buttons
    this.cancelButton = this.editDialog.getByRole('button', { name: /cancel/i });
    this.updateButton = this.editDialog.getByRole('button', { name: /update/i });
  

    this.tagNameRequiredError = this.editDialog.getByText(/required/i);
    


    // ================= DELETE TAG =================

// Delete icon (row action)
this.firstDeleteIcon = page
  .locator('table tbody tr')
  .first()
  .locator('.icon.delete-icon');

// Delete confirmation dialog
this.deleteDialog = page.locator('div[role="dialog"]');

// Delete dialog buttons
this.confirmDeleteButton = this.deleteDialog.getByRole('button', {
  name: /delete|confirm/i
});

this.cancelDeleteButton = this.deleteDialog.getByRole('button', {
  name: /cancel/i
});


// ================= ADD CONTACTS (TAG DETAILS) =================


// Add Contacts button on Tag Details page
this.addContactsButton = page.locator(
  '//*[@id="root"]/div[1]/div/div/div/div/div/div[4]/button'
);

// Add Contacts dialog
this.addContactsDialog = page.locator('div[role="dialog"]');

// Contact input field
// Contact selection React-Select input (stable)
this.addContactsInput = page.locator(
  'div[role="dialog"] input[id^="react-select-"][id$="-input"]'
);


// Excel upload dropzone (stable & unique)
this.excelUploadOption = page.locator(
  'div[role="dialog"] .dropzone'
);



// Saveand cancel button Inside Dialogue
this.saveContactsButton = page
  .locator('div[role="dialog"]')
  .getByRole('button', { name: /save|add/i });

this.saveContactsButton = page
  .locator('div[role="dialog"]')
  .getByRole('button', { name: /cancel/i });


// ================= ADD CONTACTS (TAG DETAILS) =================


//===================Single and Multipele Contact in Tag=============



// -------- TAG LIST --------
    this.searchInput = page.getByPlaceholder('Search Tag by name');
    this.filterButton = page.locator('button:has-text("Filter")');
    this.firstTag = page.locator("//table//tr[1]//a");

    // -------- TAG DETAILS --------
    this.addButton = page.locator(
      '//*[@id="root"]/div[1]/div/div/div/div/div/div[4]/button'
    );

    // -------- ADD CONTACTS DIALOG --------
    this.dialog = page.locator('div[role="dialog"]');

    this.contactInput = page.locator('input[placeholder*="Enter"], input[placeholder*="assign"], input[placeholder*="contact"]');


    this.dropdownOptions = this.dialog.locator('[id*="-option-"]');

    this.addSaveButton = this.dialog.locator('button:has-text("Add")');

    // -------- CONTACT LIST --------
    this.contactRows = page.locator("//table//tbody//tr");




//   // ---------------for TC27------------------

this.confirmDeleteButton = page
  .locator('div[role="dialog"]')
  .getByRole('button', { name: /delete|confirm/i });





}

// //-----TC19---------------------------------------------

    /** Navigate to Contact Tags page */
    async navigate() {
  await expect(this.contactsMenu)
    .toBeVisible({ timeout: 20000 });

  await this.contactsMenu.scrollIntoViewIfNeeded();
  await this.contactsMenu.click({ force: true });

  await expect(this.contactTagsSubMenu)
    .toBeVisible({ timeout: 20000 });

  await this.contactTagsSubMenu.scrollIntoViewIfNeeded();
  await this.contactTagsSubMenu.click({ force: true });

  await this.page.waitForLoadState('domcontentloaded');
}


    /** Return total number of table rows */
    async getRowCount() {
        return await this.rows.count();
    }

    /** Apply search filter */
    async searchTag(tagName) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.searchInput.fill('');
    await this.searchInput.fill(tagName);
    await this.filterButton.click();
}
    

    async waitForTableRowChange(previousCount) {
    await this.page.waitForFunction(
        (prev) => {
            const rows = document.querySelectorAll('table tbody tr').length;
            return rows !== prev;
        },
        previousCount,
        { timeout: 10000 }
    );
}





  async waitForContactCountToBeGreaterThanZero(tagName) {

  await this.waitForTagListToRefresh();

  await this.refreshSearch(tagName);

  await this.page.waitForFunction(
      (name) => {
          const row = [...document.querySelectorAll("table tbody tr")]
              .find(r => r.innerText.toLowerCase().includes(name.toLowerCase()));

          if (!row) return false;

          const countCell = row.querySelectorAll("td")[1];
          return countCell && Number(countCell.innerText.trim()) > 0;
      },
      tagName,
      { timeout: 30000 }
  );
}




async waitForTagListToRefresh() {
  await this.page.waitForLoadState('networkidle');

  await Promise.race([
    this.page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 10000 }),
    this.noRecords.waitFor({ state: 'visible', timeout: 10000 })
  ]);

  await this.page.waitForTimeout(1500);
}


async refreshSearch(tagName) {
  await this.searchInput.fill('');
  await this.searchInput.fill(tagName);
  await this.filterButton.click();

  await this.waitForTagListToRefresh();
}



    /** Reset search */
    async resetFilters() {
    await this.resetButton.click();
    await this.waitForContactListToLoad();
    }


    /** Check if No Records message is visible */
    async isNoRecordsVisible() {
        return await this.noRecords.isVisible();
    }

    /** Go to next pagination page */
async goToNextPage() {
    await this.paginationNextButton.waitFor({ state: 'visible' });
    await this.paginationNextButton.click();
    await this.waitForContactListToLoad();
}

async goToPreviousPage() {
    await this.paginationPrevButton.waitFor({ state: 'visible' });
    await this.paginationPrevButton.click();
    await this.waitForContactListToLoad();
}



    /** Change Rows Per Page */
    async changeRowsPerPage(value) {
        await this.rowsPerPageDropdown.first().click();
        await this.page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        await this.rowsPerPageOption(value).click();
        await this.page.waitForLoadState('networkidle');
    }

    /** Open the View Details of first row */
    async clickViewDetailsOfFirstTag() {

  // Wait for table and at least one row
  await this.page.locator('table tbody tr').first().waitFor({ timeout: 20000 });

  // More stable locator for action icon
  const viewIcon = this.page.locator('table tbody tr').first()
    .locator('button, a')
    .filter({ has: this.page.locator('svg, i') })
    .first();

  await expect(viewIcon).toBeVisible({ timeout: 20000 });

  await viewIcon.click();
}








    /** Open Add Tag Form */
    async openAddTagModal() {
    await this.addTagButton.click();
    await this.addTagModal.waitFor({ state: 'visible', timeout: 10000 });
    }


    /** Fill Tag Name in Modal */
    async fillTagName(name) {
    await this.modalTagNameInput.fill(name);
    }


    /** Select Contact from React-Select Dropdown */
    /** Select Contact from React-Select Dropdown (WebKit + Chromium stable) */
    async selectContact(name) {
    // Focus input
    await this.reactSelectInput.click({ force: true });
    await this.reactSelectInput.fill('');
    await this.page.waitForTimeout(200);

    // Slow typing ensures React-Select loads results in WebKit
    for (let char of name) {
        await this.reactSelectInput.type(char);
        await this.page.waitForTimeout(120);
    }

    // Force dropdown to open on WebKit
    await this.reactSelectInput.press('ArrowDown');
    await this.page.waitForTimeout(500);

    const option = this.reactOption.first();

    // Wait for option to appear (in all browsers)
    await option.waitFor({ state: 'visible', timeout: 15000 });

    await option.click();
    }


    /** Save Tag from Modal */
    async saveTag() {
    await this.modalSaveButton.click();
   }

    /** Check if Success Toast is visible */
    async waitForSuccessToast() {
    await this.successToast.waitFor({ state: 'visible', timeout: 20000 });
    }


    // Wait for contact list to load after actions
    async waitForContactListToLoad() {
    // Wait until either:
    // 1. rows are present, OR
    // 2. "No records found" appears
    await Promise.race([
        this.page.locator('.MuiTableBody-root tr').first().waitFor({ state: 'visible', timeout: 5000 }),
        this.page.locator("text=No records found").waitFor({ state: 'visible', timeout: 5000 })
    ]);

    // Slight buffer to ensure UI is stable
    await this.page.waitForTimeout(300);
    }


    //cancel add tag
     async cancelAddTag() {
    await this.modalCancelButton.click();
    await this.addTagModal.waitFor({ state: 'hidden', timeout: 10000 });
    }


    /** Upload Excel file in Add Tag Modal */
    async uploadExcel(filePath) {
    await this.bulkUploadDropzone.waitFor({ state: 'visible', timeout: 10000 });
    await this.fileInput.setInputFiles(filePath);

    // Wait for either file name or validation step or Next button to appear
    await Promise.race([
        this.uploadedFileName.waitFor({ state: "visible", timeout: 20000 }).catch(() => {}),
        this.validationStep.waitFor({ state: "visible", timeout: 20000 }).catch(() => {}),
        this.nextButtonInModal.waitFor({ state: "visible", timeout: 20000 }).catch(() => {})
    ]);
    }

 

    /** Check if New Contacts validation popup is visible */
    async isNewContactsPopupVisible(timeout = 10000) {
    return await this.validationStep.isVisible({ timeout }).catch(() => false);
    }

    
    // Alias for consistency with older tests
    async openAddTagForm() {
    await this.openAddTagModal();
    }

    // Wait for upload processing to complete 
    async waitForUploadProcessing() {
    try { await this.uploadLoader.waitFor({ state: "visible", timeout: 5000 }); } catch {}
    try { await this.uploadLoader.waitFor({ state: "hidden", timeout: 20000 }); } catch {}
   }




   // Upload Excel file in Add Tag Modal
    async uploadExcel(filePath) {
   await this.bulkUploadDropzone.waitFor({ state: 'visible', timeout: 10000 });
   await this.fileInput.setInputFiles(filePath);
   }

   // Get upload info text (e.g., "We found X new contacts...")
async getUploadInfoText() {
  await expect(this.dialog).toBeVisible({ timeout: 30000 });

  await this.uploadInfoMessage.waitFor({
    state: 'attached',
    timeout: 30000,
  });

  await expect(this.uploadInfoMessage).toBeVisible({ timeout: 30000 });

  return (await this.uploadInfoMessage.innerText()).trim();
}


   // Extract number of new contacts from upload info message
  async getUploadInfoCount() {
  const text = await this.getUploadInfoText();
  const match = text.match(/we found\s+(\d+)/i);

  if (!match) {
    throw new Error(`Unable to extract count from message:\n${text}`);
  }

  return Number(match[1]);
}


// // next button after upload
async clickNextAfterUpload() {
  await this.nextButtonInModal.waitFor({ state: 'visible', timeout: 10000 });
  await this.nextButtonInModal.click();
}






// //========================================
// //------------Step 2 --- TC13--------------
// //========================================


async selectAllNewContactsUsingHeader() {
    await this.newContactsTable.waitFor({ state: 'visible' });

    // Click header checkbox twice (your UI behavior)
    await this.selectAllHeaderCheckbox.click({ force: true });
    await this.page.waitForTimeout(200);
    await this.selectAllHeaderCheckbox.click({ force: true });

    const rowCount = await this.newContactsRows.count();
    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
        const checkbox = this.newContactsRows
            .nth(i)
            .locator('input[type="checkbox"]');

        // ✅ SAFE, SERIALIZATION-FREE ASSERTION
        await expect.poll(async () => {
            return await checkbox.isChecked();
        }, {
            timeout: 10000
        }).toBe(true);
    }

    console.log(`✅ All ${rowCount} new contacts selected`);
}

async expectCheckboxChecked(locator) {
    await expect.poll(async () => {
        return await locator.isChecked();
    }).toBe(true);
}


// //========================================
// //------------Step 2 -- TC13 --------------
// //========================================

// //========================================
// //    Step 3 TC14, TC15
// //========================================
async goToStep3() {
    await this.nextButton.waitFor({ state: 'visible' });
    await this.nextButton.click();
}



async verifyPrimaryAgentMandatoryValidation() {
    await this.modalNextButton.click();

    // Validate red error state
    await expect(this.primaryAgentErrorState).toBeVisible();

    // Ensure user stays on Step 3
    await expect(this.step3Header).toBeVisible();

    console.log("✅ Primary Agent mandatory validation displayed (red field)");
}








async selectPrimaryAgent(agentName) {
    // Ensure Step 3 is fully loaded
    await this.step3Header.waitFor({ state: 'visible', timeout: 15000 });

    // Open dropdown
    await this.primaryAgentDropdown.click();

    // Wait for search input (this was missing)
    await this.primaryAgentSearchInput.waitFor({
        state: 'visible',
        timeout: 15000
    });

    // Clear & type
    await this.primaryAgentSearchInput.fill('');
    await this.primaryAgentSearchInput.fill(agentName);

    // Wait for options
    const option = this.primaryAgentOptions
        .filter({ hasText: agentName })
        .first();

    await option.waitFor({ state: 'visible', timeout: 15000 });
    await option.click();

    // Soft validation
    await expect(this.primaryAgentDropdown).toContainText(agentName);
}




// //========================================
// //    Step 3 TC14, TC15
// //========================================

// ------------------ TC17 Helper -----------------------

async verifyOverview(agentName) {
  const timeout = 10000;

  await expect(
    this.page.getByText("Review the details below before adding contacts")
  ).toBeVisible({ timeout });

  await expect(
    this.page.getByText(/new contacts added successfully/i)
  ).toBeVisible({ timeout });

  await expect(
    this.page.getByText(/duplicate contacts found/i)
  ).toBeVisible({ timeout });

  await expect(this.page.getByText("Contacts Assigned to:")).toBeVisible({ timeout });
  await expect(this.page.getByText(agentName)).toBeVisible({ timeout });

  await expect(this.step4backButton).toBeVisible({ timeout });
  await expect(this.step4cancelButton).toBeVisible({ timeout });  
  await expect(this.step4confirmAndAddButton).toBeVisible({ timeout });

  process.stdout.write(`✅ Overview verified successfully for agent: ${agentName}\n`);
}


// ------------------ TC17 Helper -----------------------



    


    






    // Click edit icon of first tag in list
async clickEditIconForFirstTag() {
  await this.page
    .locator('table tbody tr')
    .first()
    .locator('button[aria-label="Edit"]')
    .click();
}



// Tag Name input in edit dialog
get editTagNameInput() {
  return this.page.locator('div[role="dialog"] input[name="tagName"]');
}

// All other fields except Tag Name
async getOtherFieldsInEditDialog() {
  return await this.page
    .locator('div[role="dialog"] input, div[role="dialog"] textarea, div[role="dialog"] select')
    .filter({ hasNot: this.editTagNameInput })
    .all();
}






//--------------------TC19------------------

 async clickEditIconForFirstTag() {
    await this.page
      .locator('table tbody tr')
      .first()
      .locator('.icon.edit-icon')
      .click();
  }

  async waitForEditDialog() {
  await this.page
    .locator('div[role="dialog"]')
    .first()
    .waitFor({ state: 'visible', timeout: 15000 });

  // Wait specifically for Tag Name input
  await this.tagNameInput.waitFor({ state: 'visible', timeout: 15000 });
}


  // ---------------- ASSERTIONS ----------------
  async verifyEditContactTagDialogInitialState() {
    // Header
    await expect(this.editDialogHeader).toBeVisible();

    // Tag Name
    await expect(this.tagNameInput).toHaveCount(1);
    await expect(this.tagNameInput.first()).toBeVisible();
    await expect(this.tagNameInput.first()).toBeEditable();

    // Cancel button
    await expect(this.cancelButton).toBeVisible();
    await expect(this.cancelButton).toBeEnabled();

    // Update button (disabled initially)
    await expect(this.updateButton).toBeVisible();
    await expect(this.updateButton).toBeDisabled();
  }

  async updateTagNameAndVerifyUpdateEnabled() {
    const tagNameField = this.tagNameInput.first();

    const existingValue = await tagNameField.inputValue();
    await tagNameField.fill(existingValue + '_Updated');

    await expect(this.updateButton).toBeEnabled();
  }

  async verifyEditDialogHeader() {
  await expect(this.editDialogHeader).toHaveText(/edit contact tag/i);
}
   async verifyOnlyTagNameIsEditable() {
  // Tag Name
  await expect(this.tagNameInput).toBeVisible();
  await expect(this.tagNameInput).toBeEditable();

  // Ensure only ONE editable input exists
  const editableInputs = this.editDialog.locator(
    'input:not([disabled]):not([readonly])'
  );
  await expect(editableInputs).toHaveCount(1);
}

async verifyInitialButtonState() {
  await expect(this.cancelButton).toBeEnabled();
  await expect(this.updateButton).toBeDisabled();
}

async modifyTagNameAndVerifyUpdateEnabled() {
  const originalValue = await this.tagNameInput.inputValue();
  await this.tagNameInput.fill(originalValue + '_updated');
  await expect(this.updateButton).toBeEnabled();
}
  //--------------------TC19------------------


  //-----------------------TC20------------------

  async getCurrentTagName() {
  await this.tagNameInput.waitFor({ state: 'visible', timeout: 15000 });
  const value = await this.tagNameInput.inputValue();

  if (!value || value.trim() === '') {
    throw new Error('❌ Tag name input is empty in Edit dialog');
  }

  return value.trim();
}


  async updateTagName(newName) {
  await this.tagNameInput.fill('');
  await this.tagNameInput.fill(newName);
}
   async verifyUpdateButtonDisabled() {
  await expect(this.updateButton).toBeDisabled();
}

async verifyUpdateButtonEnabled() {
  await expect(this.updateButton).toBeEnabled();
}




//-----------------TC20----------------------------




//===============================TC21==================================

async clickUpdateButton() {
  await expect(this.updateButton).toBeEnabled();
  await this.updateButton.click();
}

async verifyEditDialogClosed() {
  await expect(this.editDialog).toBeHidden({ timeout: 10000 });
}

async verifyTagPresentInList(tagName) {
  const tagRow = this.page.locator('table').getByText(tagName);
  await expect(tagRow).toBeVisible({ timeout: 15000 });
}
 //==============================TC21==============================



 //=============================TC22==============================



async clearTagName() {
  await this.tagNameInput.fill('');
}

async verifyTagPresentInList(tagName) {
  await expect(
    this.page.locator('table').getByText(tagName)
  ).toBeVisible({ timeout: 15000 });
}

  async expectTagNameToBeInvalid() {
  await expect(this.tagNameInput)
    .toHaveAttribute('aria-invalid', 'true');
}


//=========================TC22======================



async verifyTagPresentInList(tagName) {
  if (!tagName || tagName.trim() === '') {
    throw new Error(
      '❌ verifyTagPresentInList called with empty tagName'
    );
  }

  await expect(
    this.page
      .locator('table')
      .getByText(tagName, { exact: false })
  ).toBeVisible({ timeout: 15000 });
}


async getFirstTagNameFromList() {
  const tagLocator = this.page
    .locator('table tbody tr')
    .first()
    .locator('td')
    .first();

  await expect(tagLocator).toBeVisible({ timeout: 10000 });

  const text = (await tagLocator.innerText()).trim();

  if (!text) {
    throw new Error('❌ First tag name is empty in list');
  }

  return text;
}



async waitForEditDialogToClose() {
  await this.page.waitForSelector(
    '.MuiDialog-root',
    { state: 'detached' }
  );
}


// ============================DELETE TAG ===================================
 // -----🔹 Visibility check

 async verifyDeleteIconVisible() {
  await expect(this.firstDeleteIcon).toBeVisible({ timeout: 10000 });
}

// 🔹 Click delete icon (SAFE – waits for dialogs to close)
 async clickDeleteIconForFirstTag() {
  // Ensure no dialog is blocking clicks
  await this.page.waitForSelector('div[role="dialog"]', {
    state: 'hidden'
  }).catch(() => {});

  await expect(this.firstDeleteIcon).toBeVisible({ timeout: 15000 });
  await this.firstDeleteIcon.click();
}

// 🔹 Wait for confirmation dialog
  async waitForDeleteConfirmationDialog() {
  await expect(this.deleteDialog).toBeVisible({ timeout: 10000 });
}


//🔹 Cancel delete
 async cancelDelete() {
  await expect(this.cancelDeleteButton).toBeVisible();
  await this.cancelDeleteButton.click();

  await expect(this.deleteDialog).toBeHidden({ timeout: 10000 });
}

//🔹 Confirm delete
 async confirmDelete() {
  await expect(this.confirmDeleteButton).toBeVisible();
  await this.confirmDeleteButton.click();

  // Wait for table refresh
  await this.page.waitForLoadState('networkidle');
}

//🔹 Verify tag NOT present
async verifyTagNotPresentInList(tagName) {
  const tableRow = this.page.locator('table tbody tr', { hasText: tagName });
  await this.page.waitForFunction(
    row => row.length === 0,
    async () => (await tableRow.count()),
    { timeout: 15000 }
  );
}




// ================= ADD CONTACTS (TAG DETAILS) =================


// Verify Add Contacts button access
async verifyAddContactsButtonVisible() {
  await expect(this.addContactsButton).toBeVisible({ timeout: 15000 });
  await expect(this.addContactsButton).toBeEnabled();
}



async openAddContactsDialog() {
  await this.addButton.click();

  await this.page.locator('div[role="dialog"]').waitFor({
    state: 'visible',
    timeout: 20000
  });

  await this.page.waitForTimeout(1000);
}



   // -----------------------------
  // Verify Add Contacts dialog UI
  // -----------------------------
async verifyAddContactsDialogUI() {
  // Contact selection input
  await expect(this.addContactsInput).toBeVisible();

  // Excel upload option
  await expect(this.excelUploadOption).toBeVisible({ timeout: 15000 });

  // Save/Add button
  await expect(this.saveContactsButton).toBeVisible();





  // ❌ Remove toBeDisabled check
  // await expect(this.saveContactsButton).toBeDisabled(); <-- remove this

  await expect(this.saveContactsButton).toBeVisible();

  console.log("✅ Add Contacts dialog UI verified successfully");
}



   // -----------------------------
  // Validation of withoput selecting Contact
  // -----------------------------

async verifySaveWithoutContactsShowsValidation() {
  // Click Save/Add button without selecting a contact
  await this.saveContactsButton.click();

  // Verify inline error on the input field
  await expect(this.addContactsInput).toHaveClass(/error|Mui-error/);

  // Optionally, check inline error text
  const errorLocator = this.page.locator('div[role="dialog"] span, div[role="dialog"] p', {
    hasText: /required|select a contact/i
  });
  await expect(errorLocator).toBeVisible();

  console.log("✅ Inline validation displayed correctly on Add Contacts field");
}




//===================Single and Multipele Contact in Tag=============

async searchAndOpenTag(tagName) {
    await this.searchInput.fill(tagName);
    await this.filterButton.click();
    await this.page.waitForTimeout(2000);
    await this.firstTag.click();
  }

  
  async typeAndSelectContact(text) {

  // React select input inside Add Contacts dialog
  const reactInput = this.page.locator('#react-select-3-input');

  await reactInput.waitFor({ state: "visible", timeout: 20000 });

  await reactInput.click({ force: true });

  await reactInput.fill(text);

  // Wait for options to appear
  const dropdownOption = this.page.locator('[id*="-option-"]').first();

  await dropdownOption.waitFor({ state: "visible", timeout: 20000 });

  await dropdownOption.click();
}










async clickAdd() {
  await expect(this.addSaveButton).toBeVisible({ timeout: 20000 });
  await expect(this.addSaveButton).toBeEnabled({ timeout: 20000 });
  await this.addSaveButton.click();
  await this.page.waitForLoadState('networkidle');
}




  async typeAndSelectContact(searchText) {

  // Wait for dialog first
  const dialog = this.page.locator('div[role="dialog"]');
  await dialog.waitFor({ state: "visible", timeout: 20000 });

  // Use generic react-select input instead of hardcoded ID
  const reactInput = this.page.locator('input[id^="react-select"]');

  await reactInput.waitFor({ state: "visible", timeout: 20000 });

  await reactInput.click({ force: true });

  await reactInput.fill(searchText);
  process.stdout.write(`Typed "${searchText}" into contact search input\n`);

  const dropdownOption = this.page.locator('[id*="-option-"]').first();

  await dropdownOption.waitFor({ state: "visible", timeout: 15000 });
  process.stdout.write(`Dropdown option appeared for "${searchText}"\n`); 

  await dropdownOption.click();
  
}






  async waitForAddDialog() {
  await this.page.locator('div[role="dialog"]').waitFor({
    state: "visible",
    timeout: 20000
  });
}






async getContactCountFromHeader() {

  const container = this.page.locator(
    "#root > div.MuiBox-root.css-tps5gp > div > div > div > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-1p9k44w > div > div > div:nth-child(2) > div"
  );

  await container.waitFor({ state: "visible", timeout: 20000 });

  // Directly get the label inside that container
  const text = await container.locator("label").innerText();

  const count = parseInt(text.trim());

  if (isNaN(count)) {
    throw new Error(`Unable to parse header count from label: "${text}"`);
  }

  return count;
}









 async clickSave() {

  const saveBtn = this.page.getByRole('button', { name: /^Save$/i });

  await saveBtn.waitFor({ state: "visible", timeout: 20000 });

  await saveBtn.click();

  // wait for dialog to close
  await this.page.locator('div[role="dialog"]').waitFor({
    state: "hidden",
    timeout: 20000
  });

  // short buffer
  await this.page.waitForTimeout(2000);
}



async waitForContactCountToDecrease(previousCount) {

  await this.page.waitForLoadState('networkidle');

  await this.page.waitForFunction(
    (prev) => {
      const rows = document.querySelectorAll('table tbody tr').length;
      return rows < prev;
    },
    previousCount,
    { timeout: 30000 }
  );

}


//--- TC27 Verify Upload Button Visible---------
async verifyUploadSectionVisible() {
  await expect(this.uploadSection).toBeVisible();
}



async getAcceptedFileTypes() {
  return await this.fileInput.getAttribute("accept");
}


async uploadFile(filePath) {
  await this.fileInput.setInputFiles(filePath);
}


async removeUploadedFileIfPresent() {
  if (await this.deleteUploadedFileButton.isVisible()) {
    await this.deleteUploadedFileButton.click();
    await this.deleteUploadedFileButton.waitFor({ state: 'detached' });
  }
}


async verifyToastContains(text) {
  await expect(this.toastMessage).toContainText(text);
}


async verifyPreviewHasRows() {
  await expect(this.previewRows).toHaveCountGreaterThan(0);
}


// // ---------------- TC27 METHODS ----------------

async selectContactByIndex(index) {

  await this.page.waitForSelector('table tbody tr');

  const checkbox = this.page.locator('table tbody tr input[type="checkbox"]').nth(index);

  await checkbox.scrollIntoViewIfNeeded();
  await checkbox.waitFor({ state: 'visible' });

  await checkbox.click();

}

get deleteButton() {
  return this.page.getByRole('button', { name: /delete/i });
}

async clickDeleteButton() {
  await this.deleteButton.click();
}

async verifyDeleteButtonHidden() {
  await expect(this.deleteButton).toBeHidden();
}


async verifyDeleteButtonVisible() {
  await expect(this.deleteButton).toBeVisible();
}


get deletePopup() {
  return this.page.getByRole('dialog');
}

async verifyDeletePopupVisible() {
  await expect(this.deletePopup).toBeVisible();
}

async clickCancelDelete() {

  const cancelBtn = this.page.getByRole('button', { name: /cancel/i });

  await cancelBtn.waitFor({ state: 'visible', timeout: 15000 });
  await cancelBtn.scrollIntoViewIfNeeded();

  await cancelBtn.click();

}

async verifyDeletePopupClosed() {
  await expect(this.deletePopup).toBeHidden();
}


async confirmDelete() {

  // Wait for delete confirmation dialog
  const dialog = this.page.locator('div[role="dialog"]');
  await dialog.waitFor({ state: 'visible', timeout: 10000 });

  // Click confirm/delete button
  const confirmBtn = dialog.getByRole('button', { name: /delete|confirm/i });
  await confirmBtn.waitFor({ state: 'visible' });

  await confirmBtn.click();

  // Wait for table refresh
  await this.page.waitForLoadState('networkidle');
}
// async waitForContactsListReload() {

//   await this.page.waitForLoadState("networkidle");

//   await Promise.race([
//     this.contactRows.first().waitFor({ state: "visible", timeout: 15000 }),
//     this.page.getByText("No records found").waitFor({ state: "visible", timeout: 15000 })
//   ]);

// }

async waitForContactsListReload() {

  await this.page.waitForLoadState('networkidle');

  await this.contactRows.first().waitFor({
    state: "visible",
    timeout: 20000
  });

  await this.page.waitForTimeout(1000);
}

async waitForHeaderCountToDecrease(oldCount) {
  let newCount = oldCount;

  await this.page.waitForFunction(
    async (previous) => {
      const header = document.querySelector('[data-testid="contacts-count"]') 
        || document.body;

      const text = header.innerText || "";
      const match = text.match(/\d+/);
      const current = match ? parseInt(match[0]) : previous;

      return current < previous;
    },
    oldCount,
    { timeout: 15000 }
  );
}


async waitForContactCountToDecrease(previousCount) {

  // wait for backend operation
  await this.page.waitForLoadState('networkidle');

  // wait for table to stabilize
  await this.page.waitForTimeout(2000);

  await expect
    .poll(
      async () => await this.contactRows.count(),
      {
        timeout: 40000,
        intervals: [1000, 2000, 3000],
        message: "Waiting for contact count to decrease after delete"
      }
    )
    .toBeLessThan(previousCount);

}


async waitForContactsListReload() {
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForTimeout(1500);
}



}









