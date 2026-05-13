import { expect } from '@playwright/test';

class AddListingPage {
  constructor(page) {
    this.page = page;

    // Sidebar navigation locators (scoped to nav so we don’t match notifications/emails)
    this.listingsMenu = page.locator('nav .nav-item-text:has-text("Listing")');
    this.addListingBtn = page.locator('nav .nav-item-text:has-text("Add Listing")');

    // Heading on Add Listing form
    this.listingDetailsHeading = page.getByRole('heading', { name: 'Listing Details' });

    // Show Required Fields button
    this.showRequiredBtn = page.getByRole('button', { name: 'Show Required Fields' });

    // Required field selectors (already used in TC01)
    this.requiredFields = [
      { label: 'Primary Agent', locator: page.locator('#primaryAgent, [name="primaryAgent"]') },
      { label: 'Listing Type', locator: page.locator('#listingType, [name="listingType"]') },
      { label: 'Transaction Type', locator: page.locator('#transactionType, [name="transactionType"]') },
      { label: 'Owner Information', locator: page.locator('#ownerInfo, [name="ownerInfo"]') },
      { label: 'Commission Split', locator: page.locator('#commissionSplit, [name="commissionSplit"]') },
      { label: 'Property Name', locator: page.locator('#propertyName, [name="propertyName"]') },
      { label: 'Island', locator: page.locator('#island, [name="island"]') },
      { label: 'Area', locator: page.locator('#area, [name="area"]') }
    ];

    // --- New locators for TC02 ---
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.successToast = page.getByText('Listing created successfully', { exact: false });
    this.allListingsMenu = page.locator('nav .nav-item-text:has-text("All Listings")');
    this.listingGrid = page.locator('.listing-grid'); // adjust if your grid has a different selector
  }

  // --- Existing methods (unchanged) ---
  async navigateToAddListing() {
    await this.listingsMenu.click();
    await this.addListingBtn.click();
    await expect(this.listingDetailsHeading).toBeVisible({ timeout: 10000 });
  }

  async clickShowRequiredFields() {
    await this.showRequiredBtn.click();
  }

  async validateRequiredFieldHighlights() {
    for (const field of this.requiredFields) {
      const locator = field.locator;
      const count = await locator.count();

      if (count === 0) {
        console.log(`❌ Field not found: ${field.label}`);
        continue;
      }

      await expect(locator.first()).toHaveClass(/(Mui-error|redborder)/, { timeout: 5000 });
      console.log(`✅ Field "${field.label}" is highlighted correctly.`);
    }
  }

  // --- New methods for TC02 ---
  async fillMandatoryFields(data) {
    await this.requiredFields[0].locator.fill(data.primaryAgent);
    await this.requiredFields[1].locator.selectOption(data.listingType);
    await this.requiredFields[2].locator.selectOption(data.transactionType);
    await this.requiredFields[3].locator.fill(data.ownerInfo);
    await this.requiredFields[4].locator.fill(data.commissionSplit);
    await this.requiredFields[5].locator.fill(data.propertyName);
    await this.requiredFields[6].locator.selectOption(data.island);
    await this.requiredFields[7].locator.fill(data.area);
  }

  async submitListing() {
    await this.submitBtn.click();
    await expect(this.successToast).toBeVisible({ timeout: 10000 });
  }

  async verifyListingInGrid(expectedName) {
    await this.allListingsMenu.click();
    await expect(this.listingGrid).toContainText(expectedName, { timeout: 10000 });
  }
}

export default AddListingPage;





