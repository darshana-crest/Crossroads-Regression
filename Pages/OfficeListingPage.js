
import { expect } from '@playwright/test';

export class OfficeListingPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // --- Navigation Locators ---
        this.officeModuleButton = page.getByRole('link', { name: 'Office' });
        
        // --- Page & Header Locators ---
        this.officeListingPageHeader = page.getByRole('heading', { name: 'All Offices' });
        
        // --- Filter & Action Locators ---
        this.searchInput = page.locator('#search'); 
        this.countryDropdown = page.locator('#rfs-btn'); 
        this.islandDropdown = page.locator('#island'); 
        
        this.filterButton = page.getByRole('button', { name: 'Filter' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.addButton = page.getByRole('button', { name: 'Add' });
        
        // --- Table Locators ---
        this.tableHeaders = page.locator('.MuiTableHead-root th'); 
        this.dataRow = page.locator('.MuiTableBody-root tr').first();
        this.countryColumnLocator = page.locator('.MuiTableBody-root td').nth(2); 
        this.islandColumnLocator = page.locator('.MuiTableBody-root td').nth(3);  

        // 🌟 PAGINATION LOCATORS (MUST BE PRESENT) 🌟
        this.paginationInfo = page.locator('.MuiTablePagination-caption'); 
        this.nextPageButton = page.locator('button[title="Go to next page"]'); 
        this.firstRowName = page.locator('.MuiTableBody-root tr').first().locator('td').nth(0); 
    }

    // ----------------------------------------------------
    // ⬇️ NAVIGATION & CORE ACTIONS 
    // ----------------------------------------------------

    /**
     * Navigates to the Office Listing Page.
     */
    async navigateToOfficeListing() {
        await this.officeModuleButton.click({ timeout: 60000 }); 
        await expect(this.officeListingPageHeader).toBeVisible({ timeout: 30000 });
        await this.page.waitForLoadState('networkidle');
    }
    
    /**
     * Executes a search on the office listing page by keyword.
     * @param {string} keyword - The text to search for.
     */
    async searchByKeyword(keyword) {
        await this.searchInput.fill(keyword);
        await this.filterButton.click();
        await this.page.waitForLoadState('networkidle');
    }
    

    // ----------------------------------------------------
    // ⬇️ FILTERING METHODS 
    // ----------------------------------------------------

    /**
     * Generic method to handle opening a dropdown, selecting an option, and clicking Filter.
     * @param {import('@playwright/test').Locator} dropdownLocator - The locator for the dropdown button.
     * @param {string} selectionName - The name of the item to select.
     */
    async selectDropdownFilterAndApply(dropdownLocator, selectionName) {
        await dropdownLocator.click({ timeout: 30000 }); 
        const selectionOption = this.page.getByRole('option', { name: selectionName, exact: true });
        await selectionOption.waitFor({ state: 'visible', timeout: 15000 });
        await selectionOption.click();
        await this.filterButton.click();
        await this.page.waitForLoadState('networkidle');
    }
    
    async filterByCountry(countryName) {
        await this.selectDropdownFilterAndApply(this.countryDropdown, countryName);
    }
    
    async filterByIsland(islandName) {
        await this.selectDropdownFilterAndApply(this.islandDropdown, islandName);
    }


    // ----------------------------------------------------
    // ⬇️ PAGINATION METHOD 
    // ----------------------------------------------------

    /**
     * Clicks the next page button.
     */
    async goToNextPage() {
        await this.nextPageButton.click();
        await this.page.waitForLoadState('networkidle');
    }
    
    
    // ----------------------------------------------------
    // ⬇️ VERIFICATION METHODS 
    // ----------------------------------------------------

    async verifyTableStructure() {
        const requiredHeaders = [
            'Name', 
            'Address', 
            'Contact Info', 
            'Country', 
            'Island', 
            'City', 
            'Postal Code', 
            'Creation Date'
        ];

        for (const header of requiredHeaders) {
            await expect(this.tableHeaders.filter({ hasText: header })).toBeVisible();
        }
    }
}