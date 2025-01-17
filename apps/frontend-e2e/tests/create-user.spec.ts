import { test, expect } from "@playwright/test";
import { UsersPage } from "../pages/UsersPage";

test.describe("Test user page", () => {
  let userPage: UsersPage;

  test.beforeEach(async ({ page }) => {
    userPage = new UsersPage(page);
    await userPage.goto("/");
    await userPage.goToUsers();
  });

  test("Should create user", async () => {
    const countBefore = userPage.usersCount();
    // await userPage.createUser();
    const countAfter = userPage.usersCount();
    // expect(countAfter).toBe(countBefore + 1);
  });
});
