import { test, expect } from '@playwright/test';
import { SearchPage } from '../src/pages/SearchPage';
import { LuckyPage } from '../src/pages/LuckyPage';
import { ReportHelper } from '../src/utils/reportHelper';
import * as path from 'path';

const testDataPath = path.resolve(__dirname, '../src/data/search-data.json');

test.describe('I\'m Feeling Lucky Button Tests', () => {
  let searchPage: SearchPage;
  let luckyPage: LuckyPage;
  
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    luckyPage = new LuckyPage(page);
    ReportHelper.ensureScreenshotsDir();
    
    // Navigate to the search page before each test
    await searchPage.navigateToHomePage();
  });
  
  test('Verify I\'m Feeling Lucky button with valid query', async ({ page }, testInfo) => {
    // Get test data
    const testData = ReportHelper.getTestData(testDataPath, 'validSearchQueries');
    const query = testData[0].query;
    
    await ReportHelper.step('Enter search query: ' + query, async () => {
      await searchPage.type(searchPage.searchBoxLocator, query);
    });
    
    await ReportHelper.step('Click I\'m Feeling Lucky button', async () => {
      await searchPage.click(searchPage.luckyButtonLocator);
      await searchPage.waitForPageLoad();
    });
    
    await ReportHelper.step('Verify Lucky page is loaded', async () => {
      const isLoaded = await luckyPage.isPageLoaded();
      expect(isLoaded).toBe(true);
    });
    
    await ReportHelper.step('Verify page title contains query', async () => {
      const title = await luckyPage.getTitle();
      expect(title).toContain(query);
    });
    
    await ReportHelper.step('Verify title text contains query', async () => {
      const titleText = await luckyPage.getTitleText();
      expect(titleText).toContain(query);
    });
    
    await ReportHelper.step('Verify URL text contains query', async () => {
      const urlText = await luckyPage.getUrlText();
      expect(urlText).toContain(query.replace(/\s+/g, '-').toLowerCase());
    });
    
    // Take a screenshot
    await ReportHelper.takeScreenshot(testInfo, page, 'lucky-page');
  });
  
  test('Verify I\'m Feeling Lucky button with empty query', async ({ page }, testInfo) => {
    await ReportHelper.step('Click I\'m Feeling Lucky button without entering a query', async () => {
      await searchPage.click(searchPage.luckyButtonLocator);
      await searchPage.waitForPageLoad();
    });
    
    await ReportHelper.step('Verify Lucky page is loaded with default content', async () => {
      const isLoaded = await luckyPage.isPageLoaded();
      expect(isLoaded).toBe(true);
      
      const titleText = await luckyPage.getTitleText();
      expect(titleText).toContain('random'); // The default query is 'random' when no query is provided
    });
    
    // Take a screenshot
    await ReportHelper.takeScreenshot(testInfo, page, 'lucky-page-empty-query');
  });
  
  test('Verify Back button on Lucky page returns to home page', async ({ page }, testInfo) => {
    // Get test data
    const testData = ReportHelper.getTestData(testDataPath, 'validSearchQueries');
    const query = testData[0].query;
    
    await ReportHelper.step('Search with query using Lucky button: ' + query, async () => {
      await searchPage.searchLucky(query);
    });
    
    await ReportHelper.step('Verify Lucky page is loaded', async () => {
      const isLoaded = await luckyPage.isPageLoaded();
      expect(isLoaded).toBe(true);
    });
    
    await ReportHelper.takeScreenshot(testInfo, page, 'lucky-page-before-back');
    
    await ReportHelper.step('Click Back button on Lucky page', async () => {
      await luckyPage.clickBackButton();
    });
    
    await ReportHelper.step('Verify returned to home page', async () => {
      const isLoaded = await searchPage.isPageLoaded();
      expect(isLoaded).toBe(true);
      
      const title = await searchPage.getTitle();
      expect(title).toBe('MyLocalSearch');
    });
    
    await ReportHelper.takeScreenshot(testInfo, page, 'home-page-after-back');
  });
}); 