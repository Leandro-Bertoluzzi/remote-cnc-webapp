import { faker } from "@faker-js/faker/locale/en";
import { test, expect } from "@playwright/test";

const authed_json = {
    message: "Mocked response from the API",
    data: {
        id: 2,
        name: "Admin",
        email: "admin@test.com",
        role: "admin",
    },
};

const test_users = [
    {
        id: 1,
        name: "User",
        email: "user@test.com",
        role: "user",
    },
    {
        id: 2,
        name: "Admin",
        email: "admin@test.com",
        role: "admin",
    },
];

test.describe("Users page", () => {
    test.beforeEach(async ({ page }) => {
        // Mock auth API request
        await page.route(/.*\/users\/auth/, async (route) => {
            await route.fulfill({ json: authed_json });
        });
    });

    test("Adds a user", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/users\?token=/, async (route) => {
            await route.fulfill({ json: test_users });
        });

        // Go to page under test
        await page.goto("/users");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle("Usuarios");

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Usuarios", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "User" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Admin" })).toBeVisible();

        // Click button to add a new entry
        const addButton = page.getByRole("button", { name: "Agregar usuario" });
        await expect(addButton).toBeVisible();
        await addButton.click();

        // Expect form to appear
        await expect(page.getByText("Nuevo usuario")).toBeVisible();

        // Fill form fields
        const name = faker.person.fullName();
        await page.getByLabel("Nombre").fill(name);
        const email = faker.internet.email();
        await page.getByLabel("Correo electrónico").fill(email);
        const password = faker.internet.password({ length: 10 });
        const correctPassword = password[0].toUpperCase() + password.slice(1) + "@123";
        await page.getByLabel("Contraseña").fill(correctPassword);
        const role = faker.helpers.arrayElement(["user", "admin"]);
        await page.getByLabel("Rol de usuario").selectOption({ label: role });

        // Click submit button
        const acceptButton = page.getByRole("button", { name: "Crear", exact: true });
        await acceptButton.click();

        // TO DO: Should update the list of users
    });

    test("Edit existing users", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/users\?token=/, async (route) => {
            await route.fulfill({ json: test_users });
        });

        // Go to page under test
        await page.goto("/users");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle("Usuarios");

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Usuarios", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "User" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Admin" })).toBeVisible();

        // Click button to edit an entry
        const editButton = page.getByRole("button", { name: "Editar" }).first();
        await editButton.click();

        // Expect form to appear
        await expect(page.getByText("Editar usuario")).toBeVisible();

        // Fill form fields
        const name = faker.person.fullName();
        await page.getByLabel("Nombre").fill(name);
        const email = faker.internet.email();
        await page.getByLabel("Correo electrónico").fill(email);
        const role = faker.helpers.arrayElement(["user", "admin"]);
        await page.getByLabel("Rol de usuario").selectOption({ label: role });

        // Click submit button
        await page.getByRole("button", { name: "Actualizar" }).click();

        // TO DO: Should update the list of users

        // Click button to remove an entry
        const removeButton = page.getByRole("button", { name: "Eliminar" }).first();
        await removeButton.click();

        // Expect dialog to appear
        await expect(
            page.getByRole("heading", { name: "Eliminar usuario", exact: true })
        ).toBeVisible();

        // Click submit button
        await page.getByRole("button", { name: "Eliminar" }).click();

        // TO DO: Should update the list of users
    });

    test("Cancel buttons work ok", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/users\?token=/, async (route) => {
            await route.fulfill({ json: test_users });
        });

        // Go to page under test
        await page.goto("/users");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle("Usuarios");

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Usuarios", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "User" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Admin" })).toBeVisible();

        // Click button to edit an entry
        const editButton = page.getByRole("button", { name: "Editar" }).first();
        await editButton.click();

        // Expect form to appear
        await expect(page.getByText("Editar usuario")).toBeVisible();

        // Fill form fields
        const name = faker.person.fullName();
        await page.getByLabel("Nombre").fill(name);
        const email = faker.internet.email();
        await page.getByLabel("Correo electrónico").fill(email);
        const role = faker.helpers.arrayElement(["user", "admin"]);
        await page.getByLabel("Rol de usuario").selectOption({ label: role });

        // Click cancel button
        await page.getByLabel("Close").click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "User" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Admin" })).toBeVisible();

        // Click button to remove an entry
        const removeButton = page.getByRole("button", { name: "Eliminar" }).first();
        await removeButton.click();

        // Expect dialog to appear
        await expect(
            page.getByRole("heading", { name: "Eliminar usuario", exact: true })
        ).toBeVisible();

        // Click cancel button
        await page.getByRole("button", { name: "Cancel" }).click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "User" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Admin" })).toBeVisible();
    });
});
