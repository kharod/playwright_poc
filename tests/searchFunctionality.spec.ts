import { test, expect } from '@playwright/test';
import { SearchPage } from '../src/pages/SearchPage';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';
import { ReportHelper } from '../src/utils/reportHelper';
import * as path from 'path';

const testDataPath = path.resolve(__dirname, '../src/data/search-data.json');

test.describe('Search Functionality Tests', () => {
  let searchPage: SearchPage;
  let searchResultsPage: SearchResultsPage;
  
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    searchResultsPage = new SearchResultsPage(page);
    ReportHelper.ensureScreenshotsDir();
    
    // Navigate to the search page before each test
    await searchPage.navigateToHomePage();
  });
  
  test('Verify search with valid query returns results', async ({ page }, testInfo) => {
    // Get test data
    const testData = ReportHelper.getTestData(testDataPath, 'validSearchQueries');
    const query = testData[0].query;
    const expectedTitle = testData[0].expectedTitle;
    
    await ReportHelper.step('Perform search with query: ' + query, async () => {
      await searchPage.search(query);
    });
    
    await ReportHelper.step('Verify search results page is loaded', async () => {
      const isLoaded = await searchResultsPage.isPageLoaded();
      expect(isLoaded).toBe(true);
    });
    
    await ReportHelper.step('Verify page title contains search query', async () => {
      const title = await searchResultsPage.getTitle();
      expect(title).toBe(expectedTitle);
    });
    
    await ReportHelper.step('Verify search results are displayed', async () => {
      const resultsCount = await searchResultsPage.getResultsCount();
      expect(resultsCount).toBeGreaterThan(0);
    });
    
    // Take a screenshot of the search results
    await ReportHelper.takeScreenshot(testInfo, page, 'search-results');
  });
  
  test('Verify empty search query keeps user on home page', async ({ page }, testInfo) => {
    // Get test data
    const testData = ReportHelper.getTestData(testDataPath, 'emptySearchQuery');
    const query = testData.query;
    
    await ReportHelper.step('Perform search with empty query', async () => {
      await searchPage.search(query);
    });
    
    await ReportHelper.step('Verify user remains on the search page', async () => {
      const isLoaded = await searchPage.isPageLoaded();
      expect(isLoaded).toBe(true);
      
      const title = await searchPage.getTitle();
      expect(title).toBe('MyLocalSearch');
    });
    
    // Take a screenshot
    await ReportHelper.takeScreenshot(testInfo, page, 'empty-search');
  });
  
  test('Verify search with special characters', async ({ page }, testInfo) => {
    // Get test data
    const testData = ReportHelper.getTestData(testDataPath, 'specialCharacterQuery');
    const query = testData.query;
    const expectedTitle = testData.expectedTitle;
    
    await ReportHelper.step('Perform search with special characters: ' + query, async () => {
      await searchPage.search(query);
    });
    
    await ReportHelper.step('Verify search results page is loaded', async () => {
      const isLoaded = await searchResultsPage.isPageLoaded();
      expect(isLoaded).toBe(true);
    });
    
    await ReportHelper.step('Verify page title contains search query with special characters', async () => {
      const title = await searchResultsPage.getTitle();
      expect(title).toBe(expectedTitle);
    });
    
    // Take a screenshot
    await ReportHelper.takeScreenshot(testInfo, page, 'special-chars-search');
  });
  
  test('Verify long search query functionality', async ({ page }, testInfo) => {
    // Get test data
    const testData = ReportHelper.getTestData(testDataPath, 'longQuery');
    const query = testData.query;
    const expectedTitle = testData.expectedTitle;
    
    await ReportHelper.step('Perform search with long query', async () => {
      await searchPage.search(query);
    });
    
    await ReportHelper.step('Verify search results page is loaded', async () => {
      const isLoaded = await searchResultsPage.isPageLoaded();
      expect(isLoaded).toBe(true);
    });
    
    await ReportHelper.step('Verify page title contains long search query', async () => {
      const title = await searchResultsPage.getTitle();
      expect(title).toBe(expectedTitle);
    });
    
    // Take a screenshot
    await ReportHelper.takeScreenshot(testInfo, page, 'long-query-search');
  });
  
  // Intentionally failing test
  test('Verify non-existent element (intentionally failing test)', async ({ page }, testInfo) => {
    // Get test data for non-existent element
    const testData = ReportHelper.getTestData(testDataPath, 'nonExistentElement');
    const nonExistentLocator = testData.locator;
    const errorMessage = testData.errorMessage;
    
    await ReportHelper.step('Navigate to search page', async () => {
      await searchPage.navigateToHomePage();
    });
    
    await ReportHelper.step('Try to find a non-existent element', async () => {
      // Using direct page locator to find a non-existent element
      const nonExistentElement = page.locator(nonExistentLocator);
      
      // This should fail since the element doesn't exist
      await ReportHelper.takeScreenshot(testInfo, page, 'before-failure');
      await expect(nonExistentElement).toBeVisible({ timeout: 5000 });
    });
  });
}); 