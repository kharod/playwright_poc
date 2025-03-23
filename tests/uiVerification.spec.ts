import { test, expect } from '@playwright/test';
import { SearchPage } from '../src/pages/SearchPage';
import { ReportHelper } from '../src/utils/reportHelper';
import * as path from 'path';

const testDataPath = path.resolve(__dirname, '../src/data/search-data.json');

test.describe('UI Elements Verification Tests', () => {
  let searchPage: SearchPage;
  
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    ReportHelper.ensureScreenshotsDir();
    
    // Navigate to the search page before each test
    await searchPage.navigateToHomePage();
  });
  
  test('Verify home page UI elements', async ({ page }, testInfo) => {
    // Get test data
    const testData = ReportHelper.getTestData(testDataPath, 'verifyUI').homePage;
    
    await ReportHelper.step('Verify page title', async () => {
      const title = await searchPage.getTitle();
      expect(title).toBe(testData.title);
    });
    
    await ReportHelper.step('Verify logo is visible', async () => {
      await searchPage.assertVisible(searchPage.logoLocator);
    });
    
    await ReportHelper.step('Verify logo text', async () => {
      const logoText = await searchPage.getLogoText();
      expect(logoText.replace(/\s+/g, '')).toBe(testData.logoText);
    });
    
    await ReportHelper.step('Verify search box is visible', async () => {
      await searchPage.assertVisible(searchPage.searchBoxLocator);
    });
    
    await ReportHelper.step('Verify search box placeholder', async () => {
      const placeholder = await searchPage.getSearchBoxPlaceholder();
      expect(placeholder).toBe(testData.searchBoxPlaceholder);
    });
    
    await ReportHelper.step('Verify search button is visible and has correct text', async () => {
      await searchPage.assertVisible(searchPage.searchButtonLocator);
      const searchButtonText = await searchPage.getSearchButtonText();
      expect(searchButtonText).toBe(testData.buttonTexts.search);
    });
    
    await ReportHelper.step('Verify lucky button is visible and has correct text', async () => {
      await searchPage.assertVisible(searchPage.luckyButtonLocator);
      const luckyButtonText = await searchPage.getLuckyButtonText();
      expect(luckyButtonText).toBe(testData.buttonTexts.lucky);
    });
    
    await ReportHelper.step('Verify footer is visible and has correct text', async () => {
      await searchPage.assertVisible(searchPage.footerLocator);
      const footerText = await searchPage.getFooterText();
      expect(footerText).toBe(testData.footerText);
    });
    
    // Take a screenshot of the home page UI
    await ReportHelper.takeScreenshot(testInfo, page, 'home-page-ui');
  });
  
  test('Verify responsive design on mobile viewport', async ({ page }, testInfo) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    
    await ReportHelper.step('Navigate to home page with mobile viewport', async () => {
      await searchPage.navigateToHomePage();
    });
    
    await ReportHelper.step('Verify all elements are visible on mobile viewport', async () => {
      await searchPage.assertVisible(searchPage.logoLocator);
      await searchPage.assertVisible(searchPage.searchBoxLocator);
      await searchPage.assertVisible(searchPage.searchButtonLocator);
      await searchPage.assertVisible(searchPage.luckyButtonLocator);
      await searchPage.assertVisible(searchPage.footerLocator);
    });
    
    // Take a screenshot of the mobile view
    await ReportHelper.takeScreenshot(testInfo, page, 'mobile-home-page');
    
    // Set viewport back to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });
    await searchPage.navigateToHomePage();
    
    // Take a screenshot of the desktop view for comparison
    await ReportHelper.takeScreenshot(testInfo, page, 'desktop-home-page');
  });
  
  test('Verify search button hover effect', async ({ page }, testInfo) => {
    await ReportHelper.step('Hover over search button', async () => {
      await searchPage.searchButtonLocator.hover();
    });
    
    // Take a screenshot with hover state
    await ReportHelper.takeScreenshot(testInfo, page, 'search-button-hover');
    
    // No assertion here as we're just capturing visual changes,
    // which will be visible in the screenshot comparison
  });
}); 