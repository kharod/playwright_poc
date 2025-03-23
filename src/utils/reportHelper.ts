import { test, TestInfo } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Helper class for reporting and test artifacts
 */
export class ReportHelper {
  /**
   * Take a screenshot and attach it to the test report
   * @param testInfo Test info object
   * @param page Page object
   * @param name Name of the screenshot
   */
  static async takeScreenshot(testInfo: TestInfo, page: any, name: string): Promise<void> {
    const screenshotPath = path.join(testInfo.outputDir, `${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(`${name}.png`, { path: screenshotPath, contentType: 'image/png' });
  }

  /**
   * Attach HTML content to the test report
   * @param testInfo Test info object
   * @param name Name of the HTML content
   * @param html HTML content
   */
  static async attachHTML(testInfo: TestInfo, name: string, html: string): Promise<void> {
    const htmlPath = path.join(testInfo.outputDir, `${name}.html`);
    fs.writeFileSync(htmlPath, html);
    await testInfo.attach(`${name}.html`, { path: htmlPath, contentType: 'text/html' });
  }

  /**
   * Ensure the screenshots directory exists
   */
  static ensureScreenshotsDir(): void {
    const screenshotsDir = path.join(process.cwd(), 'reports', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  }

  /**
   * Create a test step and execute the function
   * @param name Name of the step
   * @param func Function to execute
   */
  static async step<T>(name: string, func: () => Promise<T>): Promise<T> {
    return await test.step(name, func);
  }

  /**
   * Extract test data from JSON file
   * @param filePath Path to the JSON file
   * @param key Key to extract from the JSON file
   * @returns The extracted data
   */
  static getTestData(filePath: string, key?: string): any {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return key ? data[key] : data;
    } catch (error) {
      console.error(`Failed to load test data: ${error}`);
      return null;
    }
  }

  /**
   * Log a message to the test report
   * @param testInfo Test info object
   * @param message Message to log
   */
  static async log(testInfo: TestInfo, message: string): Promise<void> {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
    
    // Also log to a file in the test output directory
    const logPath = path.join(testInfo.outputDir, 'test.log');
    fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`);
    
    // Attach the log file to the test report
    await testInfo.attach('test.log', { path: logPath, contentType: 'text/plain' });
  }
} 