import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

export class CustomWorld extends World {
  page!: Page;
  context!: BrowserContext;
  browser!: Browser;

  async init(browserInstance?: Browser, contextInstance?: BrowserContext, pageInstance?: Page) {
    if (browserInstance && contextInstance && pageInstance) {
      this.browser = browserInstance;
      this.context = contextInstance;
      this.page = pageInstance;
    } else {
      this.browser = await chromium.launch({ headless: true });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    }
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
