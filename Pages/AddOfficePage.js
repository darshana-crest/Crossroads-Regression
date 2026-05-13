// import { expect } from '@playwright/test';

// export class AddOfficePage {
//     /**
//      * @param {import('@playwright/test').Page} page
//      */
//     constructor(page) {
//         this.page = page;

//         // --- Header Locator (Using regex and increased timeout for stability) ---
//         this.addOfficeFormHeader = page.getByRole('heading', { name: /Add.*Office/i });
        
//          // --- Form Locators ---
//         this.nameInput = page.getByLabel('Name').or(page.getByPlaceholder('Name')).or(page.getByPlaceholder('Office Name'));
        
//         // 🔥 FIX: Use the specific placeholder text and element type (textarea or textbox role)
//         // to uniquely identify the Address input on the Add Office form.
//         this.addressInput = page.getByRole('textbox', { name: 'Enter office address' });
        
//         this.contactInfoInput = page.getByLabel('Contact Info').or(page.getByPlaceholder('Contact Info'));
        
//         // --- Action Buttons ---
//         this.saveButton = page.getByRole('button', { name: 'Save' });
//         this.cancelButton = page.getByRole('button', { name: 'Cancel' });
//     }

//     /**
//      * Verifies the visibility of all required elements on the Add Office Form.
//      */
//     async verifyFormElementsVisibility() {
//         // Explicitly wait 15s for the critical first element (Header)
//         await expect(this.addOfficeFormHeader).toBeVisible({ timeout: 15000 }); 
        
//         // Check subsequent fields (which will use Playwright's default auto-wait)
//         await expect(this.nameInput).toBeVisible(); 
//         await expect(this.addressInput).toBeVisible();
//         await expect(this.contactInfoInput).toBeVisible();
//         await expect(this.saveButton).toBeVisible();
//         await expect(this.cancelButton).toBeVisible();
//     }
    
//     /**
//      * Clicks the Cancel button and waits for the form to disappear.
//      */
//     async cancelForm() {
//         await this.cancelButton.click();
//         await expect(this.addOfficeFormHeader).toBeHidden(); 
//     }
// }















// import { expect } from '@playwright/test';

// export class AddOfficePage {
//     /**
//      * @param {import('@playwright/test').Page} page
//      */
//     constructor(page) {
//         this.page = page;

//         // --- Header Locator (Using regex for flexibility) ---
//         this.addOfficeFormHeader = page.getByRole('heading', { name: /Add.*Office/i });
        
//         // --- Form Locators (Stabilized with .or() and specific role checks) ---
//         this.nameInput = page.getByLabel('Name').or(page.getByPlaceholder('Name')).or(page.getByPlaceholder('Office Name'));
        
//         // 🔥 STABILITY FIX: Use specific role and placeholder text to avoid conflict with search bar.
//         this.addressInput = page.getByRole('textbox', { name: 'Enter office address' }); 
        
//         // 🔥 STABILITY FIX: Use regex to cover variations like "Contact Info," "Phone," "Email."
//         this.contactInfoInput = page.getByLabel(/Contact|Phone|Email/i).or(page.getByPlaceholder(/Contact|Phone|Email/i));
        
//         // --- Action Buttons ---
//         this.saveButton = page.getByRole('button', { name: 'Save' });
//         this.cancelButton = page.getByRole('button', { name: 'Cancel' });
//     }

//     /**
//      * Verifies the visibility of all required elements on the Add Office Form.
//      */
//     async verifyFormElementsVisibility() {
//         // Explicitly wait 15s for the critical first element (Header)
//         await expect(this.addOfficeFormHeader).toBeVisible({ timeout: 15000 }); 
        
//         // Verification of stabilized input fields
//         await expect(this.nameInput).toBeVisible(); 
//         await expect(this.addressInput).toBeVisible();
//         await expect(this.contactInfoInput).toBeVisible();
        
//         // Verification of buttons
//         await expect(this.saveButton).toBeVisible();
//         await expect(this.cancelButton).toBeVisible();
//     }
    
//     /**
//      * Clicks the Cancel button and waits for the form to disappear.
//      */
//     async cancelForm() {
//         await this.cancelButton.click();
//         await expect(this.addOfficeFormHeader).toBeHidden(); 
//     }
// }

























