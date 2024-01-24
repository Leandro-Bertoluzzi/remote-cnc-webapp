import { faker } from "@faker-js/faker/locale/en";
import { test, expect } from "@playwright/test";
import FileInfo from "@/types/FileInfo";

const test_files = [
    {
        id: 1,
        name: "file_1.gcode",
        user_id: 1,
        created_at: "2000-01-01T00:00:00",
    },
    {
        id: 2,
        name: "file_2.gcode",
        user_id: 1,
        created_at: "2000-01-01T00:00:00",
    },
];

test.describe("Files page", () => {
    test.beforeEach(async ({ page }) => {
        // Mock auth API request
        await page.route(/.*\/users\/auth/, async (route) => {
            const json = {
                data: "user_data",
            };
            await route.fulfill({ json });
        });
    });

    test("Adds the first file", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/files\?token=/, async (route) => {
            const json = [] as FileInfo[];
            await route.fulfill({ json });
        });

        // Go to page under test
        await page.goto("/files");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Files/);

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Archivos", exact: true })).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "No hay archivos guardados" })
        ).toBeVisible();

        // Click button to add a new entry
        const addButton = page.getByRole("button", { name: "Subir archivo" });
        await expect(addButton).toBeVisible();
        await addButton.click();

        // Expect form to appear
        await expect(
            page.getByRole("heading", { name: "Nuevo archivo", exact: true })
        ).toBeVisible();

        // Fill form fields
        await page.getByLabel("Archivo", { exact: true }).setInputFiles({
            name: "example-file.txt",
            mimeType: "text/plain",
            buffer: Buffer.from("G1 X10 Y20\nG1 X30 Y40\nG1 X50 Y60"),
        });
        const file_name = faker.system.commonFileName("gcode");
        await page.getByLabel("Nombre de archivo").fill(file_name);

        // Click submit button
        const acceptButton = page.getByRole("button", { name: "Subir", exact: true });
        await acceptButton.click();

        // TO DO: Should update the list of files
    });

    test("Edit existing files", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/files\?token=/, async (route) => {
            await route.fulfill({ json: test_files });
        });

        // Go to page under test
        await page.goto("/files");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Files/);

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Archivos", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "file_1.gcode" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "file_2.gcode" })).toBeVisible();

        // Click button to edit an entry
        const editButton = page.getByRole("button", { name: "Editar" }).first();
        await editButton.click();

        // Expect form to appear
        await expect(
            page.getByRole("heading", { name: "Editar archivo", exact: true })
        ).toBeVisible();

        // Fill form fields
        const file_name = faker.system.commonFileName("gcode");
        await page.getByLabel("Nombre de archivo").fill(file_name);

        // Click submit button
        await page.getByRole("button", { name: "Actualizar" }).click();

        // TO DO: Should update the list of files

        // Click button to remove an entry
        const removeButton = page.getByRole("button", { name: "Eliminar" }).first();
        await removeButton.click();

        // Expect dialog to appear
        await expect(
            page.getByRole("heading", { name: "Eliminar archivo", exact: true })
        ).toBeVisible();

        // Click submit button
        await page.getByRole("button", { name: "Eliminar" }).click();

        // TO DO: Should update the list of files
    });

    test("Cancel buttons work ok", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/files\?token=/, async (route) => {
            await route.fulfill({ json: test_files });
        });

        // Go to page under test
        await page.goto("/files");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Files/);

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Archivos", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "file_1.gcode" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "file_2.gcode" })).toBeVisible();

        // Click button to edit an entry
        const editButton = page.getByRole("button", { name: "Editar" }).first();
        await editButton.click();

        // Expect form to appear
        await expect(
            page.getByRole("heading", { name: "Editar archivo", exact: true })
        ).toBeVisible();

        // Fill form fields
        const file_name = faker.system.commonFileName("gcode");
        await page.getByLabel("Nombre de archivo").fill(file_name);

        // Click cancel button
        await page.getByLabel("Close").click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "file_1.gcode" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "file_2.gcode" })).toBeVisible();

        // Click button to remove an entry
        const removeButton = page.getByRole("button", { name: "Eliminar" }).first();
        await removeButton.click();

        // Expect dialog to appear
        await expect(
            page.getByRole("heading", { name: "Eliminar archivo", exact: true })
        ).toBeVisible();

        // Click cancel button
        await page.getByRole("button", { name: "Cancel" }).click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "file_1.gcode" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "file_2.gcode" })).toBeVisible();
    });
});
