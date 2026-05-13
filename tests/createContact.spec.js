import { test } from '@playwright/test';

import { LoginPageFaker } from '../pages/LoginPageFaker';
import { ContactPage } from '../Pages/ContactPage';

import { generateContactData } from '../utils/testData';


test('TC01 - Create Contact', async ({ page }) => {

    // Generate Fake Data
    const contactData = generateContactData();

    // Page Objects
    const loginPage = new LoginPageFaker(page);
    const contactPage = new ContactPage(page);

    // Login
    await loginPage.goto();

    await loginPage.login(
        'dptesthgc@gmail.com',
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
  await page.goto('https://stage-crossroads20.hgchristie.net/signin');
 
  await page.getByRole('textbox', { name: 'Email' }).fill('dptesthgc@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://stage-crossroads20.hgchristie.net/dashboard');
  await page.getByRole('button', { name: 'Contacts' }).click();
  await page.getByRole('link', { name: 'All Contacts' }).click();
  await page.getByRole('row', { name: 'testing Automate data +1 242' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: 'testing Automation +1 242 121' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: 'Test Listing Announcement +1' }).getByRole('checkbox').check();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download', exact: true }).click();
  const download = await downloadPromise;
});
