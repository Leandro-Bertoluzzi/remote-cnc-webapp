import { test, expect } from "@playwright/test";
import Task from "@/types/Task";

const test_requests = [
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
        status: "pending_approval",
        priority: 1,
        user_id: 1,
        file_id: 1,
        tool_id: 1,
        material_id: 1,
        note: "A note",
        admin_id: null,
        cancellation_reason: null,
        created_at: "2000-01-01T00:00:00",
    },
];

test.describe("Requests page", () => {
    test.beforeEach(async ({ page }) => {
        // Mock auth API request
        await page.route(/.*\/users\/auth/, async (route) => {
            const json = {
                data: "user_data",
            };
            await route.fulfill({ json });
        });
    });

    test("No requests", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/tasks\?status=pending_approval&token=/, async (route) => {
            const json = [] as Task[];
            await route.fulfill({ json });
        });

        // Go to page under test
        await page.goto("/requests");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Requests/);

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Solicitudes", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "No hay solicitudes" })).toBeVisible();
    });

    test("Edit existing requests", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/tasks\?status=pending_approval&token=/, async (route) => {
            await route.fulfill({ json: test_requests });
        });

        // Go to page under test
        await page.goto("/requests");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Requests/);

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Solicitudes", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 2" })).toBeVisible();

        // Click button to approve a request
        const approveButton = page.getByRole("button", { name: "Aprobar" }).first();
        await approveButton.click();

        // Expect form to appear
        await expect(
            page.getByRole("heading", { name: "Aprobar solicitud", exact: true })
        ).toBeVisible();

        // Click submit button
        await page.getByRole("button", { name: "Aprobar" }).click();

        // TO DO: Should update the list of requests

        // Click button to reject a request
        const rejectButton = page.getByRole("button", { name: "Rechazar" }).first();
        await rejectButton.click();

        // Expect dialog to appear
        await expect(
            page.getByRole("heading", { name: "Rechazar solicitud", exact: true })
        ).toBeVisible();

        // Click submit button
        await page.getByRole("button", { name: "Rechazar" }).click();

        // TO DO: Should update the list of requests
    });

    test("Cancel buttons work ok", async ({ page }) => {
        // Mock API requests
        await page.route(/.*\/tasks\?status=pending_approval&token=/, async (route) => {
            await route.fulfill({ json: test_requests });
        });

        // Go to page under test
        await page.goto("/requests");

        // Expect the page title "to contain" a substring.
        await expect(page).toHaveTitle(/Requests/);

        // Expect elements to appear
        await expect(page.getByRole("heading", { name: "Solicitudes", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 2" })).toBeVisible();

        // Click button to approve a request
        const approveButton = page.getByRole("button", { name: "Aprobar" }).first();
        await approveButton.click();

        // Expect form to appear
        await expect(
            page.getByRole("heading", { name: "Aprobar solicitud", exact: true })
        ).toBeVisible();

        // Click cancel button
        await page.getByRole("button", { name: "Cancel" }).click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "Task 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 2" })).toBeVisible();

        // Click button to reject a request
        const rejectButton = page.getByRole("button", { name: "Rechazar" }).first();
        await rejectButton.click();

        // Expect dialog to appear
        await expect(
            page.getByRole("heading", { name: "Rechazar solicitud", exact: true })
        ).toBeVisible();

        // Click cancel button
        await page.getByRole("button", { name: "Cancel" }).click();

        // Expect items to be unchanged
        await expect(page.getByRole("heading", { name: "Task 1" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Task 2" })).toBeVisible();
    });
});
