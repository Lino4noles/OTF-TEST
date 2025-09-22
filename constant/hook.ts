import { Before, After } from '@cucumber/cucumber';

Before(async function () {
  await this.init(); // initializes the page if running locally
});

After(async function () {
  await this.close();
});
