import { test, expect } from "@playwright/test";

test.describe("MainMenu", () => {
    test.beforeEach(async ({ page }) => {
        // Mock auth API request
        await page.route(/.*\/users\/auth/, async (route) => {
            const json = {
                data: "user_data",
            };
            await route.fulfill({ json });
        });
    });

    const options = [
        {
            name: "Ver estado de tareas",
            path: "/tasks",
        },
        //{ name: "Monitorizar equipo", path: "#", },
        {
            name: "Administrar archivos",
            path: "/files",
        },
        //{ name: "Control manual y calibración", path: "#", },
        {
            name: "Administrar usuarios",
            path: "/users",
        },
        {
            name: "Administrar inventario",
            path: "/inventory",
        },
    ];

    for (const option of options) {
        test(`Selects option -> ${option.name}`, async ({ page }) => {
            await page.goto("./");

            // Click option
            await page.getByRole("link", { name: option.name }).click();

            // Expect to redirect to login page, with a query string
            await expect(page).toHaveURL(option.path);
        });
    }
});
