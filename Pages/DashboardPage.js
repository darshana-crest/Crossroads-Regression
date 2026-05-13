export default class DashboardPage {
  constructor(page) {
    this.page = page;
    this.listingMenu = page.locator('text=Listings');
    this.addListingBtn = page.locator('button:has-text("Add Listing")');
  }

  async goToAddListing() {
    await this.listingMenu.click();
    await this.addListingBtn.click();
  }
}
