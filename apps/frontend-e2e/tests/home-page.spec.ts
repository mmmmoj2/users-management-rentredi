import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Test home page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto("/");
  });

  test("Should render map", async () => {
    const map = await homePage.getMap();
    expect(map).toBeTruthy();
  });
});
