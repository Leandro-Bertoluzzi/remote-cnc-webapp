import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import TasksView from "@/pages/tasks";
import apiRequest from "../../src/services/apiService";
import { getJwtToken } from "../../src/services/storage";
import mockRouter from "next-router-mock";
import Task from "../../src/types/Task";

// Mock Next.js router
jest.mock("next/router", () => require("next-router-mock"));

// Mock apiRequest import
jest.mock("../../src/services/apiService");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

// Mock getJwtToken import
jest.mock("../../src/services/storage");
const mockedGetJwtToken = getJwtToken as jest.MockedFunction<typeof getJwtToken>;

// Mock response from API
const tasks: Task[] = [
    {
        id: 1,
        name: "An example project 1",
        user_id: 1,
        material_id: 1,
        tool_id: 1,
        file_id: 1,
        note: "Additional instructions for admin",
        priority: 20,
        created_at: "El lunes pasado",
        status: "pending_approval",
        status_updated_at: "El lunes pasado",
        cancellation_reason: "",
    },
    {
        id: 2,
        name: "An example project 2",
        user_id: 1,
        material_id: 2,
        tool_id: 1,
        file_id: 2,
        note: "Additional instructions for admin",
        priority: 10,
        created_at: "El martes pasado",
        status: "on_hold",
        admin_id: 1,
        status_updated_at: "El martes pasado",
        cancellation_reason: "",
    },
    {
        id: 3,
        name: "An example project 3",
        user_id: 1,
        material_id: 3,
        tool_id: 3,
        file_id: 3,
        note: "Additional instructions for admin",
        priority: 5,
        created_at: "El martes pasado",
        status: "on_hold",
        admin_id: 1,
        status_updated_at: "El martes pasado",
        cancellation_reason: "",
    },
    {
        id: 4,
        name: "An example project 4",
        user_id: 1,
        material_id: 4,
        tool_id: 4,
        file_id: 4,
        note: "Additional instructions for admin",
        priority: 30,
        created_at: "Hace un mes",
        status: "in_progress",
        admin_id: 1,
        status_updated_at: "El lunes pasado",
        cancellation_reason: "",
    },
];

describe("TasksView", () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl("/");
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the view after successful login", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])))
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])))
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])))
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(tasks))
            );
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<TasksView />);

        // Assert components in widget
        const taskCards = await screen.findAllByTestId("item-card");
        expect(taskCards).toHaveLength(3); // There should be 3 because of filter
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("item-form");
        expect(form).not.toBeInTheDocument();
        const button = screen.getByText("Solicitar pedido");
        expect(button).toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(5);

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });

    it("redirects to login because of no token", () => {
        // Mock implementations of functions
        mockedGetJwtToken.mockImplementation(() => "");

        // Instantiate widget under test
        render(<TasksView />);

        // Assert calls to API
        expect(apiRequest).not.toHaveBeenCalled();

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/login?callbackUrl=tasks",
            pathname: "/login",
            query: { callbackUrl: "tasks" },
        });
    });

    it("redirects to login because of auth fails", async () => {
        // Mock implementations of functions
        mockedApiRequest.mockRejectedValue(new Error("Token inválido, vuelva a loguearse"));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<TasksView />);

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(1);
        await expect(apiRequest).rejects.toEqual(Error("Token inválido, vuelva a loguearse"));

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/login?callbackUrl=tasks",
            pathname: "/login",
            query: { callbackUrl: "tasks" },
        });
    });

    it("renders the view with no tasks", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])))
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])))
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])))
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<TasksView />);

        // Assert components in widget
        const taskCards = screen.queryAllByTestId("item-card");
        expect(taskCards).toHaveLength(0);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("item-form");
        expect(form).not.toBeInTheDocument();
        const emptyCardText = screen.getByText("No hay tareas programadas");
        expect(emptyCardText).toBeInTheDocument();

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });

    it("notifies error querying items from API", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockRejectedValue(new Error("Error en comunicación con API"));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<TasksView />);

        // Assert notification popup appeared
        const notification = await screen.findByTestId("message-dialog");
        expect(notification).toBeInTheDocument();
        const notificationText = await screen.findByText("Error en comunicación con API");
        expect(notificationText).toBeInTheDocument();

        // Trigger event to close window
        const button = screen.getByText("Entendido");
        fireEvent.click(button);

        // Assert notification popup is gone
        expect(notification).not.toBeInTheDocument();
        expect(notificationText).not.toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(2);

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });

    it("opens the form to upload a new task", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])))
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])))
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])))
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(tasks))
            );
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<TasksView />);

        // Assert components in widget
        const taskCards = await screen.findAllByTestId("item-card");
        expect(taskCards).toHaveLength(3);
        const button = screen.getByText("Solicitar pedido");
        expect(button).toBeInTheDocument();

        // Trigger event to open form
        fireEvent.click(button);

        // Assert form appeared
        const form = await screen.findByTestId("item-form");
        expect(form).toBeInTheDocument();

        // Trigger event to close form
        fireEvent.keyDown(form, {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27,
        });

        // Assert form is gone
        expect(form).not.toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(5);

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });
});
