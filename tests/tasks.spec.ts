import { faker } from "@faker-js/faker/locale/en";
import { test, expect } from "@playwright/test";
import Task from "@/types/Task";

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

const test_tasks = [
    {
        id: 1,
        name: "Task 1",
        status: "pending_approval",
        priority: 0,
        user_id: 1,
        file_id: 1,
        tool_id: 1,
        material_id: 1,
        note: "A note",
        admin_id: null,
        cancellation_reason: null,
        created_at: "2000-01-01T00:00:00",
    },
    {
        id: 2,
        name: "Task 2",
        status: "on_hold",
        priority: 1,
        user_id: 1,
        file_id: 1,
        tool_id: 1,
        material_id: 1,
        note: "A note",
        admin_id: 1,
        cancellation_reason: null,
        created_at: "2000-01-01T00:00:00",
    },
];

test.describe("Tasks page", () => {
    test.beforeEach(async ({ page }) => {
        // Mock auth API request
        await page.route(/.*\/users\/auth/, async (route) => {
            const json = {
                data: "user_data",
            };
            await route.fulfill({ json });
        });

        // Mock API requests
        await page.route(/.*\/files\?token=/, async (route) => {
            await route.fulfill({ json: test_files });
        });
        await page.route(/.*\/materials\?token=/, async (route) => {
            await route.fulfill({ json: test_materials });
        });
        await page.route(/.*\/tools\?token=/, async (route) => {
            await route.fulfill({ json: test_tools });
        });
    });

    test("Adds the first task", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/tasks\?token=/, async (route) => {
            const json = [] as Task[];
            await route.fulfill({ json });
        });

        // Go to page under test
        await page.goto("/tasks");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Tasks/);

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Tareas", exact: true })).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "No hay tareas programadas" })
        ).toBeVisible();

        // Click button to add a new entry
        const addButton = page.getByRole("button", { name: "Solicitar pedido" });
        await expect(addButton).toBeVisible();
        await addButton.click();

        // Expect form to appear
        await expect(page.getByText("Nuevo pedido")).toBeVisible();

        // Fill form fields
        const name = faker.lorem.sentence({ min: 3, max: 5 });
        await page.getByLabel("Nombre").fill(name);
        const file = faker.helpers.arrayElement(["file_1.gcode", "file_1.gcode"]);
        await page.getByLabel("Archivo").selectOption({ label: file });
        const material = faker.helpers.arrayElement(["Material 1", "Material 2"]);
        await page.getByLabel("Material").selectOption({ label: material });
        const tool = faker.helpers.arrayElement(["Tool 1", "Tool 2"]);
        await page.getByLabel("Herramienta").selectOption({ label: tool });
        const note = faker.lorem.paragraph({ min: 1, max: 3 });
        await page.getByLabel("Nota adicional").fill(note);

        // Click submit button
        const acceptButton = page.getByRole("button", { name: "Crear", exact: true });
        await acceptButton.click();

        // TO DO: Should update the list of tasks
    });

    test("Filter tasks", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/tasks\?token=/, async (route) => {
            await route.fulfill({ json: test_tasks });
        });

        // Go to page under test
        await page.goto("/tasks");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Tasks/);

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Tareas", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 1" })).not.toBeVisible(); // Due to filter
        await expect(page.getByRole("heading", { name: "Task 2" })).toBeVisible();

        // Update filter
        await page.getByText("Filtrar estados").click();
        await page.getByLabel("Pending approval").check();
        await page.getByText("Filtrar estados").click();

        // Expect items list to update
        await expect(page.getByRole("heading", { name: "Task 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 2" })).toBeVisible();

        // Update filter
        await page.getByText("Filtrar estados").click();
        await page.getByLabel("On hold").uncheck();
        await page.getByText("Filtrar estados").click();

        // Expect items list to update
        await expect(page.getByRole("heading", { name: "Task 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 2" })).not.toBeVisible();
    });

    test("Edit existing tasks", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/tasks\?token=/, async (route) => {
            await route.fulfill({ json: test_tasks });
        });

        // Go to page under test
        await page.goto("/tasks");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Tasks/);

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Tareas", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 1" })).not.toBeVisible(); // Due to filter
        await expect(page.getByRole("heading", { name: "Task 2" })).toBeVisible();

        // Click button to edit an entry
        const editButton = page.getByRole("button", { name: "Editar" }).first();
        await editButton.click();

        // Expect form to appear
        await expect(page.getByText("Editar pedido")).toBeVisible();

        // Fill form fields
        const name = faker.lorem.sentence({ min: 3, max: 5 });
        await page.getByLabel("Nombre").fill(name);
        const file = faker.helpers.arrayElement(["file_1.gcode", "file_1.gcode"]);
        await page.getByLabel("Archivo").selectOption({ label: file });
        const material = faker.helpers.arrayElement(["Material 1", "Material 2"]);
        await page.getByLabel("Material").selectOption({ label: material });
        const tool = faker.helpers.arrayElement(["Tool 1", "Tool 2"]);
        await page.getByLabel("Herramienta").selectOption({ label: tool });
        const note = faker.lorem.paragraph({ min: 1, max: 3 });
        await page.getByLabel("Nota adicional").fill(note);

        // Click submit button
        await page.getByRole("button", { name: "Actualizar" }).click();

        // TO DO: Should update the list of tasks

        // Click button to remove an entry
        const cancelButton = page.getByRole("button", { name: "Cancelar" }).first();
        await cancelButton.click();

        // Expect form to appear
        await expect(page.getByText("Cancelar pedido")).toBeVisible();

        // Fill form fields
        const cancellationReason = faker.lorem.paragraph({ min: 1, max: 3 });
        await page.getByLabel("Razón de cancelación").fill(cancellationReason);

        // Click submit button
        await page.getByRole("button", { name: "Aceptar" }).click();

        // TO DO: Should update the list of tasks
    });

    test("Cancel buttons work ok", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/tasks\?token=/, async (route) => {
            await route.fulfill({ json: test_tasks });
        });

        // Go to page under test
        await page.goto("/tasks");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Tasks/);

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Tareas", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 1" })).not.toBeVisible(); // Due to filter
        await expect(page.getByRole("heading", { name: "Task 2" })).toBeVisible();

        // Click button to edit an entry
        const editButton = page.getByRole("button", { name: "Editar" }).first();
        await editButton.click();

        // Expect form to appear
        await expect(page.getByText("Editar pedido")).toBeVisible();

        // Fill form fields
        const name = faker.lorem.sentence({ min: 3, max: 5 });
        await page.getByLabel("Nombre").fill(name);
        const file = faker.helpers.arrayElement(["file_1.gcode", "file_1.gcode"]);
        await page.getByLabel("Archivo").selectOption({ label: file });
        const material = faker.helpers.arrayElement(["Material 1", "Material 2"]);
        await page.getByLabel("Material").selectOption({ label: material });
        const tool = faker.helpers.arrayElement(["Tool 1", "Tool 2"]);
        await page.getByLabel("Herramienta").selectOption({ label: tool });
        const note = faker.lorem.paragraph({ min: 1, max: 3 });
        await page.getByLabel("Nota adicional").fill(note);

        // Click cancel button
        await page.getByLabel("Close").click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "Task 1" })).not.toBeVisible(); // Due to filter
        await expect(page.getByRole("heading", { name: "Task 2" })).toBeVisible();

        // Click button to remove an entry
        const cancelButton = page.getByRole("button", { name: "Cancelar" }).first();
        await cancelButton.click();

        // Expect form to appear
        await expect(page.getByText("Cancelar pedido")).toBeVisible();

        // Fill form fields
        const cancellationReason = faker.lorem.paragraph({ min: 1, max: 3 });
        await page.getByLabel("Razón de cancelación").fill(cancellationReason);

        // Click cancel button
        await page.getByLabel("Close").click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "Task 1" })).not.toBeVisible(); // Due to filter
        await expect(page.getByRole("heading", { name: "Task 2" })).toBeVisible();
    });
});
