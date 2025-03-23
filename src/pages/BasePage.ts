import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Base Page class that provides common functionality for all page objects
 */
export class BasePage {
  readonly page: Page;
  readonly baseUrl: string;
  private locators: any;

  /**
   * Constructor for BasePage
   * @param page Playwright page object
   * @param baseUrl Base URL for the application
   */
  constructor(page: Page, baseUrl: string = 'http://localhost:3000') {
    this.page = page;
    this.baseUrl = baseUrl;
    this.loadLocators();
  }

  /**
   * Load locators from the JSON file
   * @param locatorFile Optional locator file path
   */
  private loadLocators(locatorFile: string = path.resolve(__dirname, '../locators/search-page-locators.json')): void {
    try {
      this.locators = JSON.parse(fs.readFileSync(locatorFile, 'utf8'));
    } catch (error) {
      console.error(`Failed to load locators: ${error}`);
      this.locators = {};
    }
  }

  /**
   * Get a locator from the loaded locator file
   * @param pageName The page section in the locator file
   * @param locatorName The name of the locator
   * @returns Playwright Locator object
   */
  getLocator(pageName: string, locatorName: string): Locator {
    if (!this.locators[pageName] || !this.locators[pageName][locatorName]) {
      throw new Error(`Locator ${pageName}.${locatorName} not found in locators file`);
    }
    return this.page.locator(this.locators[pageName][locatorName]);
  }

  /**
   * Navigate to a URL
   * @param path The path to navigate to (will be appended to baseUrl)
   */
  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(`${this.baseUrl}/${path}`);
  }

  /**
   * Wait for the page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get the page title
   * @returns The page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Take a screenshot
   * @param name Name of the screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `./reports/screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Check if an element is visible
   * @param locator Playwright Locator object
   * @param timeoutMs Timeout in milliseconds
   * @returns True if the element is visible, false otherwise
   */
  async isVisible(locator: Locator, timeoutMs: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: timeoutMs });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Assert that an element is visible
   * @param locator Playwright Locator object
   * @param message Optional assertion message
   */
  async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Click on an element
   * @param locator Playwright Locator object
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Type text into an input field
   * @param locator Playwright Locator object
   * @param text Text to type
   */
  async type(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Get text from an element
   * @param locator Playwright Locator object
   * @returns The element's text content
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }
} 