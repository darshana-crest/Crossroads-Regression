import { test } from '@playwright/test';

import { LoginPageFaker } from '../pages/LoginPageFaker';
import { CreateContactPage } from '../Pages/CreateContactPage';

import { generateContactData } from '../utils/testData';


test('TC01 - Create Contact', async ({ page }) => {

    // Generate Fake Data
    const contactData = generateContactData();

    // Page Objects
    const loginPage = new LoginPageFaker(page);
    const contactPage = new CreateContactPage(page);

    // Login
    await loginPage.goto();

    await loginPage.login(
        'darshana.p@crestinfosystems.com',
        'Test@1234'
    );

    // Navigate to Add Contact
    await contactPage.navigateToAddContact();

    // Create Contact
    await contactPage.createContact(contactData);

    // Save Contact
    await contactPage.saveContact();

    // Logs
    console.log(contactData);
});





test('TC02 - selected Contact get Download', async ({ page }) => {

    const loginPage = new LoginPageFaker(page);

    const createContactPage = new CreateContactPage(page);

    // Login
    await loginPage.goto();

    await loginPage.login(
        'darshana.p@crestinfosystems.com',
        'Test@1234'
    );

    // Navigate
    await createContactPage.navigateToAllContacts();

    // Select top 3 contacts
    await createContactPage.selectTopThreeContacts();
    // Download
    const download = await createContactPage.downloadContacts();

});
