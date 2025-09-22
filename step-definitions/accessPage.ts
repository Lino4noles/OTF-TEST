import { Given } from '@cucumber/cucumber';
import { getBaseUrl } from '../config/env.config';

Given('The user is navigate on "(.*)" page', async function (pageName: string) {
  const baseUrl = getBaseUrl();
  const path = pageName.toLowerCase() === 'home' ? '/' : `/${pageName.toLowerCase()}`;

  await this.page.goto(`${baseUrl}${path}`);
  console.log(`🌐 Navigated to: ${baseUrl}${path}`);

});
