import { expect, test, type Page } from "@playwright/test";

/** Fails the test if the page logs an error or throws. */
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  return errors;
}

test("the home page loads without errors", async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Eyad Oraby" }),
  ).toBeVisible();
  await expect(page.getByText("Open to work").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("See all my apps opens Experience with the work history", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: /See all my apps/ }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Where I've worked" }),
  ).toBeVisible();
});

test("the command palette finds a page", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard shortcut");
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const search = page
    .getByRole("combobox")
    .or(page.getByRole("searchbox"))
    .first();
  await expect(search).toBeVisible();
  await search.fill("projects");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#projects$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Projects" }),
  ).toBeVisible();
});

test("Arabic switches the page to right to left", async ({ page }) => {
  await page.goto("/?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
});

test("the travel map marks 29 places", async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto("/#off-duty/travelling");
  await expect(page.locator(".travel-map svg")).toBeVisible();
  await expect(page.locator(".stamp")).toHaveCount(29);
  await page.getByRole("button", { name: /^Africa/ }).click();
  await expect(page.locator(".stamp")).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("the garage switches cars and credits each photo", async ({ page }) => {
  await page.goto("/#off-duty/cars");
  const stage = page.locator(".showroom-label strong");
  await expect(stage).toHaveText("Golf R");
  await page.getByRole("tab", { name: /RS6 Avant/ }).click();
  await expect(stage).toHaveText("RS6 Avant");
  const credit = page.locator(".showroom-credit a").first();
  await expect(credit).toHaveAttribute("href", /commons\.wikimedia\.org/);
  await expect(page.locator(".showroom-photo")).toHaveJSProperty(
    "complete",
    true,
  );
});

test("launching before green is a red light", async ({ page }) => {
  await page.goto("/#off-duty/cars");
  await page.getByRole("button", { name: "Stage the car" }).click();
  await page.getByRole("button", { name: /Launch/ }).click();
  await expect(
    page.getByText("Red light: you jumped the start."),
  ).toBeVisible();
});

test("the coin cabinet explains it is empty", async ({ page }) => {
  await page.goto("/#off-duty/coins-and-banknotes");
  await expect(
    page.getByRole("heading", { name: "I built an app for it" }),
  ).toBeVisible();
  await expect(page.getByText(/Empty for now/)).toBeVisible();
});
