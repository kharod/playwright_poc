import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for the MyLocalSearch home page
 */
export class SearchPage extends BasePage {
  // Locators
  readonly logoLocator: Locator;
  readonly searchBoxLocator: Locator;
  readonly searchButtonLocator: Locator;
  readonly luckyButtonLocator: Locator;
  readonly footerLocator: Locator;

  /**
   * Constructor for SearchPage
   * @param page Playwright page object
   * @param baseUrl Base URL for the application
   */
  constructor(page: Page, baseUrl: string = 'http://localhost:3000') {
    super(page, baseUrl);
    
    // Initialize locators
    this.logoLocator = this.getLocator('homePage', 'logo');
    this.searchBoxLocator = this.getLocator('homePage', 'searchBox');
    this.searchButtonLocator = this.getLocator('homePage', 'searchButton');
    this.luckyButtonLocator = this.getLocator('homePage', 'luckyButton');
    this.footerLocator = this.getLocator('homePage', 'footer');
  }

  /**
   * Navigate to the search page
   */
  async navigateToHomePage(): Promise<void> {
    await this.navigate();
    await this.waitForPageLoad();
  }

  /**
   * Search for a query using the search button
   * @param query The search query
   */
  async search(query: string): Promise<void> {
    await this.type(this.searchBoxLocator, query);
    await this.click(this.searchButtonLocator);
    await this.waitForPageLoad();
  }

  /**
   * Search using the "I'm Feeling Lucky" button
   * @param query The search query
   */
  async searchLucky(query: string): Promise<void> {
    await this.type(this.searchBoxLocator, query);
    await this.click(this.luckyButtonLocator);
    await this.waitForPageLoad();
  }

  /**
   * Check if the search page is loaded
   * @returns True if the page is loaded
   */
  async isPageLoaded(): Promise<boolean> {
    const isLogoVisible = await this.isVisible(this.logoLocator);
    const isSearchBoxVisible = await this.isVisible(this.searchBoxLocator);
    return isLogoVisible && isSearchBoxVisible;
  }

  /**
   * Get the placeholder text of the search box
   * @returns The placeholder text
   */
  async getSearchBoxPlaceholder(): Promise<string> {
    return await this.searchBoxLocator.getAttribute('placeholder') || '';
  }

  /**
   * Get the text of the search button
   * @returns The search button text
   */
  async getSearchButtonText(): Promise<string> {
    return await this.getText(this.searchButtonLocator);
  }

  /**
   * Get the text of the "I'm Feeling Lucky" button
   * @returns The button text
   */
  async getLuckyButtonText(): Promise<string> {
    return await this.getText(this.luckyButtonLocator);
  }

  /**
   * Get the text of the footer
   * @returns The footer text
   */
  async getFooterText(): Promise<string> {
    return await this.getText(this.footerLocator);
  }

  /**
   * Get the text of the logo
   * @returns The logo text
   */
  async getLogoText(): Promise<string> {
    return await this.getText(this.logoLocator);
  }
} 