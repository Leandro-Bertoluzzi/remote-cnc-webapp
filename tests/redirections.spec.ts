import { test, expect } from "@playwright/test";

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Redirect to login page", () => {
    const pages = ["", "control", "files", "inventory", "tasks", "users"];
    for (const page_name of pages) {
        test(`Redirects from ${page_name || "index"}`, async ({ page }) => {
            await page.goto(`/${page_name}`);

            // Expect to redirect to login page, with a query string
            await expect(page).toHaveURL(`./login?callbackUrl=${page_name}`);
        });
    }
});
