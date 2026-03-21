import { expect, test } from "@playwright/test";

test("user can add an item and see it in the wardrobe", async ({ page }) => {
  await page.goto("/items/new");
  await page.getByLabel("标题").fill("黑色风衣");
  await page.getByLabel("颜色").fill("black");
  await page.getByLabel("场景标签").fill("commute");
  await page.getByRole("button", { name: "保存" }).click();

  await expect(page).toHaveURL(/\/wardrobe$/);
  await expect(page.getByText("黑色风衣")).toBeVisible();
});
