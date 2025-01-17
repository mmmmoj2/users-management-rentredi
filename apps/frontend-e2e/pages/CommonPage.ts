import { Page } from "@playwright/test";
import createWrapper from "@cloudscape-design/components/test-utils/selectors";

export const BASE_URL = "http://localhost:3200";

export class CommonPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(`${BASE_URL}${url}`);
  }

  async goToUsers() {
    const usersLink = createWrapper()
      .findSideNavigation()
      ?.findLinkByHref("/users")
      .toSelector();
    await this.page.locator(usersLink).click({ force: true });
  }
}
