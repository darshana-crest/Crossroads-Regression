export class CreateContactPage {

    constructor(page) {

        this.page = page;

        this.contactsButton = page.getByRole('button', { name: 'Contacts' });
        this.allContactsLink = page.getByRole('link', { name: 'All Contacts' });
        this.addButton = page.getByRole('button', { name: 'Add' });

        this.firstNameTextbox = page.getByRole('textbox', { name: 'Enter first name' });
        this.lastNameTextbox = page.getByRole('textbox', { name: 'Enter last name' });

        this.phoneTextbox = page.getByRole('textbox', {
            name: 'Enter cell phone number'
        });

        this.emailTextbox = page.getByRole('textbox', {
            name: 'Enter email address'
        });

        this.saveButton = page.getByRole('button', { name: 'Save' });

        this.allContactsLink = page.getByRole('link', { name: 'All Contacts' });

        this.downloadBtn = page.getByRole('button', { name: 'Download', exact: true });
    }


// Navigate to Add Contact Page
    async navigateToAddContact() {

    await this.contactsButton.click();

    await this.allContactsLink.click();

    await this.page.waitForLoadState('networkidle');

    await this.addButton.waitFor({ state: 'visible' });

    await this.addButton.click();
}

// Navigate to All Contacts Page
    async createContact(data) {

        await this.firstNameTextbox.fill(data.firstName);

        await this.lastNameTextbox.fill(data.lastName);

        await this.phoneTextbox.fill(data.phone);

        await this.emailTextbox.fill(data.email);
    }

    // Save Contact
    async saveContact() {
        await this.saveButton.click();
    }


// Navigate to All Contacts Page
async navigateToAllContacts() {

    await this.contactsButton.click();

    await this.allContactsLink.click();

    await this.page.waitForLoadState('networkidle');
}


// Select Contact
  async selectTopThreeContacts() {

    const checkboxes = this.page.locator(
        'tbody input[type="checkbox"]'
    );

    await checkboxes.nth(0).check();

    await checkboxes.nth(1).check();

    await checkboxes.nth(2).check();
}

  async downloadContacts() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadBtn.click();
    return await downloadPromise;
  }
}

