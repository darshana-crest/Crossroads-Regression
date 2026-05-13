import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';




test('test', async ({ page }) => {
  await page.goto('https://stage-crossroads20.hgchristie.net/signin');
  await page.getByRole('textbox', { name: 'Email' }).fill('dptesthgc@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Contacts' }).click();
  await page.getByRole('link', { name: 'All Contacts' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox', { name: 'Enter first name' }).fill('testingy');
  await page.getByRole('textbox', { name: 'Enter last name' }).fill('Automatey data');
  await page.locator('div').filter({ hasText: 'GeneralPersonal info NotesFirst Name Middle NameOptionalLast Name Nick Name' }).nth(3).click();
  await page.getByRole('textbox', { name: 'Enter cell phone number' }).fill('+1242 124 5124');
  await page.getByRole('textbox', { name: 'Enter email address' }).fill('testautomatedata@tsep.com');
  await page.getByText('Select profile type', { exact: true }).click();
  await page.locator('#menu-profile_types').getByText('Sales listing owner').click();
  await page.locator('#menu-profile_types > .MuiBackdrop-root').click();
  await page.locator('.css-1c9o21k-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-3-input').fill('test');
  await page.locator('.css-1cfo1cf').click();
  await page.locator('div').filter({ hasText: /^Tags \(type and press enter\)$/ }).nth(3).click();
  await page.locator('#react-select-3-input').fill('test');
  await page.getByRole('option', { name: 'Test', exact: true }).click();
  await page.locator('#primary_agent').click();
  await page.locator('#primary_agent').fill('2May Test');
  await page.getByRole('option', { name: '2May Test' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
});






test.only('Create Contact using Faker Data', async ({ page }) => {

  // Generate Fake Data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName
  });

  const phoneNumber = `+1242 ${faker.string.numeric(3)} ${faker.string.numeric(4)}`;

  // Login
  await page.goto('https://stage-crossroads20.hgchristie.net/signin');

  await page.getByRole('textbox', { name: 'Email' })
    .fill('dptesthgc@gmail.com');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('Test@1234');

  await page.getByRole('button', { name: 'Login' }).click();

  // Navigate to Contacts
  await page.getByRole('button', { name: 'Contacts' }).click();

  await page.getByRole('link', { name: 'All Contacts' }).click();

  await page.getByRole('button', { name: 'Add' }).click();

  // Fill Contact Details using Faker
  await page.getByRole('textbox', { name: 'Enter first name' })
    .fill(firstName);

  await page.getByRole('textbox', { name: 'Enter last name' })
    .fill(lastName);

  await page.locator('div')
    .filter({
      hasText: 'GeneralPersonal info NotesFirst Name Middle NameOptionalLast Name Nick Name'
    })
    .nth(3)
    .click();

  await page.getByRole('textbox', { name: 'Enter cell phone number' })
    .fill(phoneNumber);

  await page.getByRole('textbox', { name: 'Enter email address' })
    .fill(email);

  // Profile Type
  await page.getByText('Select profile type', { exact: true }).click();

  await page.locator('#menu-profile_types')
    .getByText('Sales listing owner')
    .click();

  await page.locator('#menu-profile_types > .MuiBackdrop-root')
    .click();

  // Tags
  await page.locator('.css-1c9o21k-control > .css-hlgwow > .css-19bb58m')
    .click();

  await page.locator('#react-select-3-input').fill('test');

  await page.locator('.css-1cfo1cf').click();

  await page.locator('div')
    .filter({ hasText: /^Tags \(type and press enter\)$/ })
    .nth(3)
    .click();

  await page.locator('#react-select-3-input').fill('test');

  await page.getByRole('option', { name: 'Test', exact: true }).click();

  // Primary Agent
  await page.locator('#primary_agent').click();

  await page.locator('#primary_agent').fill('2May Test');

  await page.getByRole('option', { name: '2May Test' }).click();

  // Save
  await page.getByRole('button', { name: 'Save' }).click();

  // Console Logs (Optional)
  console.log('First Name:', firstName);
  console.log('Last Name:', lastName);
  console.log('Email:', email);
  console.log('Phone:', phoneNumber);

});



