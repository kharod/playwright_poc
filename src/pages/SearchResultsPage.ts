import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for the Search Results page
 */
export class SearchResultsPage extends BasePage {
  // Locators
  readonly smallLogoLocator: Locator;
  readonly topSearchBoxLocator: Locator;
  readonly resultsCountLocator: Locator;
  readonly searchTimeLocator: Locator;
  readonly resultsContainerLocator: Locator;
  readonly resultItemsLocator: Locator;
  readonly footerLocator: Locator;

  /**
   * Constructor for SearchResultsPage
   * @param page Playwright page object
   * @param baseUrl Base URL for the application
   */
  constructor(page: Page, baseUrl: string = 'http://localhost:3000') {
    super(page, baseUrl);
    
    // Initialize locators
    this.smallLogoLocator = this.getLocator('resultsPage', 'smallLogo');
    this.topSearchBoxLocator = this.getLocator('resultsPage', 'topSearchBox');
    this.resultsCountLocator = this.getLocator('resultsPage', 'resultsCount');
    this.searchTimeLocator = this.getLocator('resultsPage', 'searchTime');
    this.resultsContainerLocator = this.getLocator('resultsPage', 'resultsContainer');
    this.resultItemsLocator = this.getLocator('resultsPage', 'resultItems');
    this.footerLocator = this.getLocator('resultsPage', 'footer');
  }

  /**
   * Navigate to the results page with a query
   * @param query The search query
   */
  async navigateWithQuery(query: string): Promise<void> {
    await this.navigate(`results.html?q=${encodeURIComponent(query)}`);
    await this.waitForPageLoad();
  }

  /**
   * Check if the results page is loaded
   * @returns True if the page is loaded
   */
  async isPageLoaded(): Promise<boolean> {
    const isLogoVisible = await this.isVisible(this.smallLogoLocator);
    const isSearchBoxVisible = await this.isVisible(this.topSearchBoxLocator);
    const isResultsContainerVisible = await this.isVisible(this.resultsContainerLocator);
    return isLogoVisible && isSearchBoxVisible && isResultsContainerVisible;
  }

  /**
   * Get the search query from the search box
   * @returns The search query
   */
  async getSearchQuery(): Promise<string> {
    return await this.topSearchBoxLocator.inputValue();
  }

  /**
   * Get the results count text
   * @returns The results count text
   */
  async getResultsCountText(): Promise<string> {
    return await this.getText(this.resultsCountLocator);
  }

  /**
   * Get the search time text
   * @returns The search time text
   */
  async getSearchTimeText(): Promise<string> {
    return await this.getText(this.searchTimeLocator);
  }

  /**
   * Get the number of search results displayed
   * @returns The number of search results
   */
  async getResultsCount(): Promise<number> {
    return await this.resultItemsLocator.count();
  }

  /**
   * Click on the first result
   */
  async clickFirstResult(): Promise<void> {
    const firstResult = this.getLocator('resultsPage', 'resultTitle').first();
    await this.click(firstResult);
    await this.waitForPageLoad();
  }

  /**
   * Get all result titles
   * @returns Array of result titles
   */
  async getResultTitles(): Promise<string[]> {
    const resultTitles = this.getLocator('resultsPage', 'resultTitle');
    const count = await resultTitles.count();
    const titles: string[] = [];
    
    for (let i = 0; i < count; i++) {
      titles.push(await resultTitles.nth(i).textContent() || '');
    }
    
    return titles;
  }

  /**
   * Perform a new search from the results page
   * @param query The new search query
   */
  async searchFromResults(query: string): Promise<void> {
    await this.type(this.topSearchBoxLocator, query);
    await this.page.keyboard.press('Enter');
    await this.waitForPageLoad();
  }

  /**
   * Go back to the home page by clicking the logo
   */
  async goBackToHomePage(): Promise<void> {
    await this.click(this.smallLogoLocator);
    await this.waitForPageLoad();
  }
} 