// pages/TemplatePage.js
import { expect } from '@playwright/test';

export default class TemplatePage {
  constructor(page) {
    this.page = page;
    // Locators
    this.loader = page.locator('.app-loader');
    this.marketingMenu = page.locator('text=Marketing');
    this.templatesMenu = page.locator('text=Templates');
    this.newTemplateButton = page.locator('button:has-text("New Template")');
    this.filterAll = page.locator('button:has-text("All Templates")');
    this.filterGlobal = page.locator('button:has-text("Global Templates")');
    this.filterMy = page.locator('button:has-text("My Templates")');
    this.searchBox = page.locator('[placeholder="Search email template"]');
    this.templateCards = page.locator('[data-testid="template-card"]');
    this.noResultMessage = page.locator('text=/No templates found/i');
    this.widgetSelectionPanel = page.getByRole('heading', { name: 'Content widgets' });
    this.livePreviewArea = page.locator('#livePreviewArea');
  }

  async navigateToTemplates() {
    await this.marketingMenu.waitFor({ state: 'visible', timeout: 10000 });
    await this.marketingMenu.click();
    await this.templatesMenu.waitFor({ state: 'visible', timeout: 10000 });
    await this.templatesMenu.click();
    await this.page.waitForURL(/\/templates$/);
  }

  async clickNewTemplate() {
    await Promise.all([
      this.page.waitForURL(/\/templates\/create$/),
      this.newTemplateButton.click(),
    ]);
    await this.widgetSelectionPanel.waitFor({ state: 'visible', timeout: 20000 });
  }

  async applyFilter(filterName) {
    const filterBtn = this.page.locator(`button:has-text("${filterName}")`);
    await filterBtn.click();
    await this.waitForLoaderToDisappear();
    await expect(this.templateCards.first()).toBeVisible({ timeout: 15000 });
  }

  async waitForLoaderToDisappear() {
    await expect(this.loader).toBeHidden({ timeout: 30000 });
  }

  async searchTemplate(searchText) {
    await this.searchBox.fill(searchText);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2000);
  }

  async verifySearchResults(expectedFound) {
    if (expectedFound) {
      await expect(this.templateCards.first()).toBeVisible();
    } else {
      await expect(this.noResultMessage).toBeVisible();
    }
  }


async verifyInfiniteScroll() {
  await this.waitForLoaderToDisappear();

  // Reset filters to ensure data is available
  if (this.clearFiltersBtn) {
    const hasFilters = await this.clearFiltersBtn.isVisible();
    if (hasFilters) {
      console.log('Clearing filters...');
      await this.clearFiltersBtn.click();
      await this.waitForLoaderToDisappear();
    }
  }

  // Wait until at least one template appears
  await this.templateCards.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
    throw new Error('No templates found on the page to perform infinite scroll.');
  });

  let initialCount = await this.templateCards.count();
  console.log(`Initial templates loaded: ${initialCount}`);

  if (initialCount < 12) {
    console.log(`Less than 12 templates found (${initialCount}), skipping deep scroll.`);
    expect(initialCount).toBeGreaterThan(0);
    return;
  }

  let newCount = initialCount;
  let hasLoadedMore = false;
  let noChangeAttempts = 0;

  while (noChangeAttempts < 3) {
    await this.page.mouse.wheel(0, 4000);
    await this.page.waitForTimeout(1500);

    if (await this.loader.isVisible()) {
      await this.waitForLoaderToDisappear();
    }

    const currentCount = await this.templateCards.count();
    if (currentCount > newCount) {
      console.log(`Templates loaded: ${newCount} → ${currentCount}`);
      newCount = currentCount;
      hasLoadedMore = true;
      noChangeAttempts = 0;
    } else {
      noChangeAttempts++;
    }
  }

  expect(hasLoadedMore).toBeTruthy();
  console.log(`Final total templates after scrolling: ${newCount}`);
}


  async verifyLivePreview() {
    await this.livePreviewArea.waitFor({ state: 'visible', timeout: 10000 });
    const previewContent = await this.livePreviewArea.textContent();
    expect(previewContent).toContain('Live Preview'); // Adjust based on actual content
  }
}