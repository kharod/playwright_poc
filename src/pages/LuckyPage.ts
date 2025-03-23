import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for the "I'm Feeling Lucky" page
 */
export class LuckyPage extends BasePage {
  // Locators
  readonly titleLocator: Locator;
  readonly urlLocator: Locator;
  readonly contentLocator: Locator;
  readonly backButtonLocator: Locator;
  readonly footerLocator: Locator;

  /**
   * Constructor for LuckyPage
   * @param page Playwright page object
   * @param baseUrl Base URL for the application
   */
  constructor(page: Page, baseUrl: string = 'http://localhost:3000') {
    super(page, baseUrl);
    
    // Initialize locators
    this.titleLocator = this.getLocator('luckyPage', 'title');
    this.urlLocator = this.getLocator('luckyPage', 'url');
    this.contentLocator = this.getLocator('luckyPage', 'content');
    this.backButtonLocator = this.getLocator('luckyPage', 'backButton');
    this.footerLocator = this.getLocator('luckyPage', 'footer');
  }

  /**
   * Navigate to the lucky page with a query
   * @param query The search query
   */
  async navigateWithQuery(query: string): Promise<void> {
    await this.navigate(`lucky.html?q=${encodeURIComponent(query)}`);
    await this.waitForPageLoad();
  }

  /**
   * Check if the lucky page is loaded
   * @returns True if the page is loaded
   */
  async isPageLoaded(): Promise<boolean> {
    const isTitleVisible = await this.isVisible(this.titleLocator);
    const isUrlVisible = await this.isVisible(this.urlLocator);
    const isContentVisible = await this.isVisible(this.contentLocator);
    return isTitleVisible && isUrlVisible && isContentVisible;
  }

  /**
   * Get the title text
   * @returns The title text
   */
  async getTitleText(): Promise<string> {
    return await this.getText(this.titleLocator);
  }

  /**
   * Get the URL text
   * @returns The URL text
   */
  async getUrlText(): Promise<string> {
    return await this.getText(this.urlLocator);
  }

  /**
   * Get the content text
   * @returns The content text
   */
  async getContentText(): Promise<string> {
    return await this.getText(this.contentLocator);
  }

  /**
   * Click the back button to return to the home page
   */
  async clickBackButton(): Promise<void> {
    await this.click(this.backButtonLocator);
    await this.waitForPageLoad();
  }

  /**
   * Get the footer text
   * @returns The footer text
   */
  async getFooterText(): Promise<string> {
    return await this.getText(this.footerLocator);
  }
} 