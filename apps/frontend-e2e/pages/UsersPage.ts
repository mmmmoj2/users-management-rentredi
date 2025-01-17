import { Page } from "@playwright/test";
import createWrapper from "@cloudscape-design/components/test-utils/selectors";
import { CommonPage } from "./CommonPage";

export class UsersPage extends CommonPage {
  constructor(page: Page) {
    super(page);
  }

  usersCount() {
    const tableWrapper = createWrapper().findTable();

    return tableWrapper?.findRows().getElement().length || 0;
  }

  async createUser() {
    const createBtn = this.page.getByTestId("create-user-btn");
    const nameInput = this.page.getByTestId("user-name");
    const zipInput = this.page.getByTestId("user-zip");
    const createBtnAction = this.page.getByTestId("create-user");
    createBtn.click({ force: true });
    nameInput.locator("input").fill("e2e user");
    zipInput.locator("input").fill("07080");
    createBtnAction.click({ force: true });
  }
}
