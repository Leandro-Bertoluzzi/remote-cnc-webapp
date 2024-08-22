import { faker } from "@faker-js/faker/locale/en";
import { test, expect } from "@playwright/test";

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login page", () => {
    test("Renders correctly", async ({ page }) => {
        await page.goto("/login");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle("Acceso");

        // Expect elements to appear
        await expect(
            page.getByRole("heading", { name: "Identificación de usuario" })
        ).toBeVisible();
        await expect(page.getByText("¡Bienvenido!")).toBeVisible();
        await expect(page.getByRole("textbox", { name: "email" })).toBeVisible();
        await expect(page.getByTestId("input-password")).toBeVisible();
        await expect(page.getByText("¿No tiene cuenta? Contáctenos")).toBeVisible();
        await expect(page.getByRole("button", { name: "Enviar" })).toBeVisible();
    });

    test("Successful login", async ({ page }) => {
        // Mock API request
        await page.route(/.*\/users\/login/, async (route) => {
            const json = {
                data: {
                    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjI1NTYxMjI0MDB9.2ISWda0JDBdD-Ee-7zibI6sVpB5hreinj3k_vLQExDU",
                },
            };
            await route.fulfill({ json });
        });

        // Go to login page
        await page.goto("/login");

        // Fill in form
        const email = faker.internet.email();
        const password = faker.internet.password({ length: 10 });
        const correctPassword = password[0].toUpperCase() + password.slice(1) + "@123";
        await page.getByRole("textbox", { name: "email" }).fill(email);
        await page.getByTestId("input-password").fill(correctPassword);

        // Click submit button
        await page.getByRole("button", { name: "Enviar" }).click();

        // Expect redirection
        await expect(page).toHaveURL("./");
        await expect(page).not.toHaveURL(/.*login/);
    });

    test("Successful login from home page", async ({ page }) => {
        // Mock API request
        await page.route(/.*\/users\/login/, async (route) => {
            const json = {
                data: {
                    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjI1NTYxMjI0MDB9.2ISWda0JDBdD-Ee-7zibI6sVpB5hreinj3k_vLQExDU",
                },
            };
            await route.fulfill({ json });
        });

        // Go to login page
        await page.goto("/login?callbackUrl=");

        // Fill in form
        const email = faker.internet.email();
        const password = faker.internet.password({ length: 10 });
        const correctPassword = password[0].toUpperCase() + password.slice(1) + "@123";
        await page.getByRole("textbox", { name: "email" }).fill(email);
        await page.getByTestId("input-password").fill(correctPassword);

        // Click submit button
        await page.getByRole("button", { name: "Enviar" }).click();

        // Expect redirection
        await expect(page).toHaveURL("./");
        await expect(page).not.toHaveURL(/.*login/);
    });

    const pages = ["files", "inventory", "requests", "tasks", "users"];
    for (const page_name of pages) {
        test(`Successful login from ${page_name}`, async ({ page }) => {
            // Mock API request
            await page.route(/.*\/users\/login/, async (route) => {
                const json = {
                    data: {
                        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjI1NTYxMjI0MDB9.2ISWda0JDBdD-Ee-7zibI6sVpB5hreinj3k_vLQExDU",
                    },
                };
                await route.fulfill({ json });
            });

            // Go to login page
            await page.goto(`/login?callbackUrl=${page_name}`);

            // Fill in form
            const email = faker.internet.email();
            const password = faker.internet.password({ length: 10 });
            const correctPassword = password[0].toUpperCase() + password.slice(1) + "@123";
            await page.getByRole("textbox", { name: "email" }).fill(email);
            await page.getByTestId("input-password").fill(correctPassword);

            // Click submit button
            await page.getByRole("button", { name: "Enviar" }).click();

            // Expect redirection
            await expect(page).toHaveURL(`./${page_name}`);
            await expect(page).not.toHaveURL(/.*login/);
        });
    }
});
