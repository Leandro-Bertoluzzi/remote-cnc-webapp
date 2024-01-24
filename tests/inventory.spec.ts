import { faker } from "@faker-js/faker/locale/en";
import { test, expect } from "@playwright/test";
import Material from "@/types/Material";
import Tool from "@/types/Tool";

const test_materials = [
    {
        id: 1,
        name: "Material 1",
        description: "A very useful material",
        added_at: "2000-01-01T00:00:00",
    },
    {
        id: 2,
        name: "Material 2",
        description: "A not so useful material",
        added_at: "2000-01-01T00:00:00",
    },
];

const test_tools = [
    {
        id: 1,
        name: "Tool 1",
        description: "A very useful tool",
        added_at: "2000-01-01T00:00:00",
    },
    {
        id: 2,
        name: "Tool 2",
        description: "A not so useful tool",
        added_at: "2000-01-01T00:00:00",
    },
];

test.describe("Inventory page", () => {
    test.beforeEach(async ({ page }) => {
        // Mock auth API request
        await page.route(/.*\/users\/auth/, async (route) => {
            const json = {
                data: "user_data",
            };
            await route.fulfill({ json });
        });
    });

    test("Adds the first items", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/materials\?token=/, async (route) => {
            const json = [] as Material[];
            await route.fulfill({ json });
        });
        await page.route(/.*\/tools\?token=/, async (route) => {
            const json = [] as Tool[];
            await route.fulfill({ json });
        });

        // Go to page under test
        await page.goto("/inventory");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Inventory/);

        // Expect elements to appear
        await expect(
            page.getByRole("heading", { name: "Herramientas", exact: true })
        ).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "No hay herramientas configuradas" })
        ).toBeVisible();
        await expect(page.getByRole("heading", { name: "Materiales", exact: true })).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "No hay materiales guardados" })
        ).toBeVisible();

        // Click button to add a new tool
        await page.getByRole("button", { name: "Agregar herramienta" }).click();

        // Expect form to appear
        await expect(page.getByText("Nueva herramienta")).toBeVisible();

        // Fill form fields
        const tool_name = faker.lorem.sentence({ min: 3, max: 5 });
        await page.getByLabel("Nombre").fill(tool_name);
        const tool_description = faker.lorem.sentence({ min: 5, max: 10 });
        await page.getByLabel("Descripción").fill(tool_description);

        // Click submit button
        await page.getByRole("button", { name: "Guardar", exact: true }).click();

        // Expect notification dialog to appear
        await expect(page.getByRole("heading", { name: "¡Éxito!", exact: true })).toBeVisible();

        // Close notification
        await page.getByRole("button", { name: "Entendido" }).click();

        // TO DO: Should update the list of inventory

        // Click button to add a new material
        await page.getByRole("button", { name: "Agregar material" }).click();

        // Expect form to appear
        await expect(page.getByText("Nuevo material")).toBeVisible();

        // Fill form fields
        const material_name = faker.lorem.sentence({ min: 3, max: 5 });
        await page.getByLabel("Nombre").fill(material_name);
        const material_description = faker.lorem.sentence({ min: 5, max: 10 });
        await page.getByLabel("Descripción").fill(material_description);

        // Click submit button
        await page.getByRole("button", { name: "Guardar", exact: true }).click();

        // TO DO: Should update the list of inventory
    });

    test("Edit existing inventory", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/materials\?token=/, async (route) => {
            await route.fulfill({ json: test_materials });
        });
        await page.route(/.*\/tools\?token=/, async (route) => {
            await route.fulfill({ json: test_tools });
        });

        // Go to page under test
        await page.goto("/inventory");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Inventory/);

        // Expect elements to appear
        await expect(
            page.getByRole("heading", { name: "Herramientas", exact: true })
        ).toBeVisible();
        await expect(page.getByRole("heading", { name: "Tool 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Tool 2" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Materiales", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 2" })).toBeVisible();

        // Click button to edit a tool
        await page.getByRole("button", { name: "Editar" }).first().click();

        // Expect form to appear
        await expect(page.getByText("Editar herramienta")).toBeVisible();

        // Fill form fields
        const tool_name = faker.lorem.sentence({ min: 3, max: 5 });
        await page.getByLabel("Nombre").fill(tool_name);
        const tool_description = faker.lorem.sentence({ min: 5, max: 10 });
        await page.getByLabel("Descripción").fill(tool_description);

        // Click submit button
        await page.getByRole("button", { name: "Guardar" }).click();

        // TO DO: Should update the list of inventory

        // Click button to remove a tool
        await page.getByRole("button", { name: "Eliminar" }).first().click();

        // Expect dialog to appear
        await expect(
            page.getByRole("heading", { name: "Eliminar herramienta", exact: true })
        ).toBeVisible();

        // Click submit button
        await page.getByRole("button", { name: "Eliminar" }).click();

        // TO DO: Should update the list of inventory

        // Click button to edit a material
        await page.getByRole("button", { name: "Editar" }).nth(2).click();

        // Expect form to appear
        await expect(page.getByText("Editar material")).toBeVisible();

        // Fill form fields
        const material_name = faker.lorem.sentence({ min: 3, max: 5 });
        await page.getByLabel("Nombre").fill(material_name);
        const material_description = faker.lorem.sentence({ min: 5, max: 10 });
        await page.getByLabel("Descripción").fill(material_description);

        // Click submit button
        await page.getByRole("button", { name: "Guardar" }).click();

        // TO DO: Should update the list of inventory

        // Click button to remove a tool
        await page.getByRole("button", { name: "Eliminar" }).nth(2).click();

        // Expect dialog to appear
        await expect(
            page.getByRole("heading", { name: "Eliminar material", exact: true })
        ).toBeVisible();

        // Click submit button
        await page.getByRole("button", { name: "Eliminar" }).click();

        // TO DO: Should update the list of inventory
    });

    test("Cancel buttons work ok", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/materials\?token=/, async (route) => {
            await route.fulfill({ json: test_materials });
        });
        await page.route(/.*\/tools\?token=/, async (route) => {
            await route.fulfill({ json: test_tools });
        });

        // Go to page under test
        await page.goto("/inventory");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Inventory/);

        // Expect elements to appear
        await expect(
            page.getByRole("heading", { name: "Herramientas", exact: true })
        ).toBeVisible();
        await expect(page.getByRole("heading", { name: "Tool 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Tool 2" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Materiales", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 2" })).toBeVisible();

        // Click button to edit a tool
        await page.getByRole("button", { name: "Editar" }).first().click();

        // Expect form to appear
        await expect(page.getByText("Editar herramienta")).toBeVisible();

        // Fill form fields
        const tool_name = faker.lorem.sentence({ min: 3, max: 5 });
        await page.getByLabel("Nombre").fill(tool_name);
        const tool_description = faker.lorem.sentence({ min: 5, max: 10 });
        await page.getByLabel("Descripción").fill(tool_description);

        // Click cancel button
        await page.getByLabel("Close").click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "Tool 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Tool 2" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 2" })).toBeVisible();

        // Click button to remove a tool
        await page.getByRole("button", { name: "Eliminar" }).first().click();

        // Expect dialog to appear
        await expect(
            page.getByRole("heading", { name: "Eliminar herramienta", exact: true })
        ).toBeVisible();

        // Click cancel button
        await page.getByRole("button", { name: "Cancel" }).click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "Tool 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Tool 2" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 2" })).toBeVisible();

        // Click button to edit a material
        await page.getByRole("button", { name: "Editar" }).nth(2).click();

        // Expect form to appear
        await expect(page.getByText("Editar material")).toBeVisible();

        // Fill form fields
        const material_name = faker.lorem.sentence({ min: 3, max: 5 });
        await page.getByLabel("Nombre").fill(material_name);
        const material_description = faker.lorem.sentence({ min: 5, max: 10 });
        await page.getByLabel("Descripción").fill(material_description);

        // Click cancel button
        await page.getByLabel("Close").click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "Tool 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Tool 2" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 2" })).toBeVisible();

        // Click button to remove a tool
        await page.getByRole("button", { name: "Eliminar" }).nth(2).click();

        // Expect dialog to appear
        await expect(
            page.getByRole("heading", { name: "Eliminar material", exact: true })
        ).toBeVisible();

        // Click cancel button
        await page.getByRole("button", { name: "Cancel" }).click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "Tool 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Tool 2" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Material 2" })).toBeVisible();
    });
});
