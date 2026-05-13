export class ContactsPage {

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

    async navigateToAddContact() {

        await this.contactsButton.click();
        await this.allContactsLink.click();
        await this.addButton.click();
    }

    async createContact(data) {

        await this.firstNameTextbox.fill(data.firstName);

        await this.lastNameTextbox.fill(data.lastName);

        await this.phoneTextbox.fill(data.phone);

        await this.emailTextbox.fill(data.email);
    }

    async saveContact() {
        await this.saveButton.click();
    }

    async selectContact(rowName) {
    await this.page
      .getByRole('row', { name: rowName })
      .getByRole('checkbox')
      .check();
  }

  async downloadContacts() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadBtn.click();
    return await downloadPromise;
  }
}

module.exports = { ContactsPage };