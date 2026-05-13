// contactDetailsPage.js

import { Locator, Page } from '@playwright/test';

// C:\Users\DarshnaParekh\Playwright\Pages\contactDetailsPage.js

export class ContactDetailsPage {
    constructor(page) {
        this.page = page;
        
        // Header locator (as you provided)
        this.contactDetailsHeader = page.getByRole('heading', { name: 'Contact Details' });
        
        // Edit button locator (as you provided)
        this.editButton = page.getByRole('button', { name: 'Edit' });
        
        // --- Updated Success Toast Locator ---
        // Using the exact success message that appeared in your test logs.
       this.successToast = page.locator('.MuiAlert-message', { hasText: /Successfully/i, // Searches for "successfully" (case-insensitive) in the toast container
        });        
        // If the success message is generic, a robust fallback could be:
        // this.successToastGeneric = page.getByRole('alert', { name: 'Success' }); 
    }
}





export class EditContactModal {
    constructor(page) {
        this.page = page;
        
        // --- Main Modal Locators ---
        this.modalTitle = page.getByRole('heading', { name: 'Edit Contact' }); 
        this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        
        // --- Tabs ---
        this.personalInfoTab = page.getByRole('tab', { name: 'Personal Info' });
        this.generalInfoTab = page.getByRole('tab', { name: 'General Info' });
        
        // --- Personal Info Fields ---
        this.birthdayField = page.locator('input[name="birth_date"]'); 
        this.anniversaryField = page.locator('input[name="anniversary_date"]');
        this.additionalInfoField = page.locator('[name="additional_info"]');
        
        // --- Family Member List Controls ---
        // This is the '+ Add' button on the Personal Info tab that opens the Family Member modal.
        // We use a combination of role and parent tab to ensure we click the correct 'Add' button.
        this.addFamilyMemberButton = page.getByRole('tabpanel', { name: 'Personal Info' }).getByRole('button', { name: 'Add' });

        
        // --- Add Family Member Modal Locators (Nested Modal) ---
        this.familyModalTitle = page.getByRole('heading', { name: 'Add Family Member' });
        this.familyNameField = page.getByPlaceholder('Add name');
        this.familyContactField = page.getByPlaceholder('Add contact');
        
        // Assuming the Relationship dropdown is identifiable by its name or accessibility role
        this.familyRelationshipDropdown = page.getByRole('combobox', { name: 'Select relationship type' }); 
        
        this.familyNoteField = page.getByPlaceholder('Type note here');
        
        // CRUCIAL: The 'Add' button inside the Family Member modal, using type="submit" for reliability.
        // We ensure we find the button with 'Add' text AND the submit type, and take the last one found in the DOM.
        this.familyAddButton = page.getByRole('button', { name: 'Add', exact: true, type: 'submit' }).last();
        

        // --- Family Member List Controls ---
        this.addFamilyMemberButton = page.getByRole('tabpanel', { name: 'Personal Info' }).getByRole('button', { name: 'Add' });

        // ✅ FIX: Ensure this line is present and correct
        this.familyMemberListWrapper = page.locator('.family-member-list-wrapper'); 

        
    }
}


