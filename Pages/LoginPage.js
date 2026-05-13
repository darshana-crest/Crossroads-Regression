
import { expect } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.emailInput = page.locator('input[placeholder="Email"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.passwordToggleIcon = page.locator('button[aria-label="toggle password visibility"]');
    this.loginBtn = page.locator('button:has-text("Login")');
    this.logoutBtn = page.locator('button:has-text("Logout")');
    this.loader = page.locator('.app-loader'); // loader during login or page transitions
    this.errorMessage = page.locator('.error-message'); // generic error message
  }

  /** Navigate to login page */
  async gotoLoginPage() {
    await this.page.goto('https://stage-crossroads20.hgchristie.net/signin');
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Enter email */
  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  /** Enter password */
  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  /** Click login button */
  async clickLogin() {
    await this.loginBtn.click();
  }

  /** Complete login process */
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /** Click login button without entering any credentials */
  async clickLoginWithoutCredentials() {
    await this.loginBtn.click();
  }

  /** Wait for loader to appear */
  async waitForLoaderToAppear() {
    await expect(this.loader).toBeVisible({ timeout: 10000 });
  }

  /** Wait for loader to disappear */
  async waitForLoaderToDisappear() {
    await expect(this.loader).toBeHidden({ timeout: 15000 });
  }
  
   /** Wait for loader to disappear */
async waitForLoaderToDisappear() {
    if (await this.loader.isVisible({ timeout: 3000 }).catch(() => false)) {
        await this.page.waitForSelector('.app-loader', { state: 'hidden', timeout: 30000 });
    }
}

  /** Validate both email and password fields have aria-invalid="true" */
  async validateEmptyFieldErrors() {
    await expect(this.emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(this.passwordInput).toHaveAttribute('aria-invalid', 'true');
  }

  /** Validate only email field has aria-invalid="true" */
  async validateEmailFieldError() {
    await expect(this.emailInput).toHaveAttribute('aria-invalid', 'true');
  }

  /** Validate only password field has aria-invalid="true" */
  async validatePasswordFieldError() {
    await expect(this.passwordInput).toHaveAttribute('aria-invalid', 'true');
  }

  /** Verify error message text is visible and matches expected */
  async verifyErrorMessage(expectedText) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }

  /** Toggle password visibility and verify type attribute */
  async togglePasswordVisibility(expectedType) {
    await this.passwordToggleIcon.click();
    await expect(this.passwordInput).toHaveAttribute('type', expectedType, { timeout: 5000 });
  }

 

  /** Logout */
  async logout() {
    await this.logoutBtn.click();
  }
}

export default LoginPage;

