
import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage.js';
import users from '../fixtures/users.json';

test('TC01 - Login to Web App and verify Dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.login(users.validUser.email, users.validUser.password);

  // Assertion: wait for logout button visible after login
  await expect(loginPage.logoutBtn).toBeVisible({ timeout: 10000 });
});



test('TC-02: Login fails with invalid email and valid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Go to the login page
  await loginPage.gotoLoginPage();

  // 2. Attempt login with invalid email and valid password from users.json
  await loginPage.login(users.invalidUser.email, users.validUser.password);

  // 3. Assert: Error message should be visible
  const errorMessage = page.locator('text=Invalid email or password. Please try again.');
  await expect(errorMessage).toBeVisible();

  // 4. Assert: User remains on the login page URL
  await expect(page).toHaveURL('https://stage-crossroads20.hgchristie.net/signin');
});



test('TC-03: Login fails with valid email and invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Go to the login page
  await loginPage.gotoLoginPage();

  // 2. Login with valid email and invalid password from users.json
  await loginPage.login(users.validUser.email, users.invalidUser.password);

  // 3. Assert: Error message is visible
  const errorMessage = page.locator('text=Invalid email or password. Please try again.');
  await expect(errorMessage).toBeVisible();

  // 4. Ensure user stays on login page
  await expect(page).toHaveURL('https://stage-crossroads20.hgchristie.net/signin');
});



test('TC-04: Login fails when both email and password fields are empty', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Go to the login page
  await loginPage.gotoLoginPage();

  // Step 2: Click login without entering credentials
  await loginPage.clickLoginWithoutCredentials();

  // Step 3: Assert user is still on login page
  await expect(page).toHaveURL('https://stage-crossroads20.hgchristie.net/signin');

  // Step 4: Validate fields are marked invalid
  await loginPage.validateEmptyFieldErrors();

  // Step 5: Confirm URL has not changed (already done in Step 3, optional)
  await expect(page).toHaveURL('https://stage-crossroads20.hgchristie.net/signin');
});



test('TC05: Login attempts with only one field filled (email or password)', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Navigate to login page
  await loginPage.gotoLoginPage();

  // Step 2: Enter a valid email and leave password empty
  await loginPage.enterEmail('testadminadd@tset.com');
  await loginPage.enterPassword('');
  await loginPage.clickLogin();

  // Step 3: Assert password field shows error
  await loginPage.validatePasswordFieldError();

  // Step 4: Reload the page
  await page.reload();

  // Step 5: Enter a valid password and leave email empty
  await loginPage.enterEmail('');
  await loginPage.enterPassword('Test@123');
  await loginPage.clickLogin();

  // Step 6: Assert email field shows error
  await loginPage.validateEmailFieldError();
});



test('TC06: Password Masking and Toggle Functionality', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.enterPassword('Test@123');

  // Initially masked
  await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

  // Toggle to visible
  await loginPage.togglePasswordVisibility('text');

  // Toggle back to masked
  await loginPage.togglePasswordVisibility('password');
});






// // // test('TC07: Remember Me Functionality', async ({ page }) => {
// // //     const loginPage = new LoginPage(page);

// // //     // Step 1: Navigate to login page
// // //     await loginPage.gotoLoginPage();

// // //     // Step 2: Perform login with "Remember Me"
// // //     await loginPage.login('testadminadd@tset.com', 'Test@123', true);

// // //     // Step 3: Verify dashboard (Logout button visible)
// // //     await expect(loginPage.logoutButton).toBeVisible();

// // //     // Step 4: Logout
// // //     await loginPage.logout();

// // //     // Step 5: Wait until redirected to login page
// // //     await page.waitForURL('https://stage-crossroads20.hgchristie.net/signin');
// // //     await loginPage.emailInput.waitFor({ state: 'visible', timeout: 5000 });

// // //     // Step 6: Verify remembered email
// // //     const rememberedEmail = await loginPage.getRememberedEmail();
// // //     expect(rememberedEmail).toBe('testadminadd@tset.com');
// // // });




test('TC-09: Handle Network During Login', async ({ page, context }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Simulate slow network (delay all requests by 3s)
  await context.route('**/*', route => route.continue({ delay: 3000 }));

  // Step 2: Navigate to login page via POM
  await loginPage.gotoLoginPage();

  // Step 3: Wait for login fields to be visible before typing
  await loginPage.emailInput.waitFor({ state: 'visible', timeout: 15000 });
  await loginPage.passwordInput.waitFor({ state: 'visible', timeout: 15000 });

  // Step 4: Login with valid credentials from users.json
  await loginPage.login(users.validUser.email, users.validUser.password);

  // Step 5: Wait for loader to appear after login
  const loader = page.locator('.app-loader');
  await expect(loader).toBeVisible({ timeout: 15000 });

  // Step 6: Wait for loader to disappear after dashboard load
  await expect(loader).toBeHidden({ timeout: 20000 });

  // Step 7: Validate dashboard URL and logout button visible
  await expect(page).toHaveURL('https://stage-crossroads20.hgchristie.net/dashboard');
  await expect(loginPage.logoutBtn).toBeVisible();
});



test('TC-10: Case Sensitivity Check - Both Email and Password Should Be Case-Sensitive', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // ===== Test Case 1: Email with wrong case (should fail) =====
  await loginPage.gotoLoginPage();
  await loginPage.enterEmail(users.validUser.email.toUpperCase()); // incorrect case
  await loginPage.enterPassword(users.validUser.password); // correct password
  await loginPage.clickLogin();

  const errorMsg1 = page.locator('text=Invalid email or password. Please try again.');
  await expect(errorMsg1).toBeVisible({ timeout: 5000 });
  console.log('✅ Email case-sensitivity enforced (login failed as expected)');

  // ===== Test Case 2: Password with wrong case (should fail) =====
  await loginPage.gotoLoginPage();
  await loginPage.enterEmail(users.validUser.email); // correct email
  await loginPage.enterPassword(users.validUser.password.toLowerCase()); // wrong case password
  await loginPage.clickLogin();

  const errorMsg2 = page.locator('text=Invalid email or password. Please try again.');
  await expect(errorMsg2).toBeVisible({ timeout: 5000 });
  console.log('✅ Password case-sensitivity enforced (login failed as expected)');
});


test('TC-11: Browser Back Navigation After Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Go to login page
  await loginPage.gotoLoginPage();

  // Step 2: Login with valid credentials from users.json
  await loginPage.login(users.validUser.email, users.validUser.password);

  // Step 3: Wait for dashboard URL and element
  await expect(page).toHaveURL('https://stage-crossroads20.hgchristie.net/dashboard', { timeout: 10000 });
  const dashboardHeader = page.locator('.MuiList-root.MuiList-padding >> text=Dashboard');
  await expect(dashboardHeader).toBeVisible({ timeout: 5000 });

  // Step 4: Go back in browser history
  await page.goBack();

  // Step 5: Wait for page navigation and verify user is still logged in or redirected properly
  await page.waitForLoadState('networkidle');

  // Optional: Validate URL is not login page (depends on app logic)
  expect(page.url()).not.toBe('https://stage-crossroads20.hgchristie.net/signin');

  console.log('✅ Browser back navigation handled.');
});







// // feature is not yet developed

// test('TC-14: Forgot Password Link Navigation', async ({ page }) => {
//   await page.goto('https://stage-crossroads20.hgchristie.net/signin');

//   await page.click('text=Forgot Your Password?');

//   await expect(page).toHaveURL('https://stage-crossroads20.hgchristie.net/signin');

//   // Use correct selector based on your page HTML
//   const heading = page.locator('text=Forgot Your Password?');

//   // Ensure element is visible before assertion
//   await heading.waitFor({ state: 'visible' });
//   await expect(heading).toHaveText('Forgot Your Password?');
// });



// test('TC-15: Forgot Password Request with Valid & Invalid Email', async ({ page }) => {

//   // Test data
//   const validEmail = 'admin@gmail.com';
//   const invalidEmail = 'unregistered@example.com';

//   // Navigate to login page
//   await page.goto('https://stage-crossroads20.hgchristie.net/signin');

//   // Click "Forgot Password" link
//   await page.getByRole('link', { name: 'Forgot Your Password?' }).click();

//   // ==============================
//   // Scenario A: Registered Email
//   // ==============================
//   await page.getByLabel('Email').fill(validEmail);
//   await page.getByRole('button', { name: 'Submit' }).click();

//   // Wait for and verify success message
//   await expect(page.locator('.success-message')).toHaveText(/password reset email has been sent/i, { timeout: 5000 });

//   // Optional: If your app shows a toast instead, use this:
//   // await expect(page.getByText(/password reset email has been sent/i)).toBeVisible();

//   // ==============================
//   // Scenario B: Unregistered Email
//   // ==============================
//   await page.getByLabel('Email').fill(invalidEmail);
//   await page.getByRole('button', { name: 'Submit' }).click();

//   // Wait for and verify error message
//   await expect(page.locator('.error-message')).toHaveText(/email address not found/i, { timeout: 5000 });

// });







