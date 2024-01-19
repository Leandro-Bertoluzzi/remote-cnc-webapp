import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import InventoryView from "@/pages/inventory";
import apiRequest from "../../src/services/apiService";
import { getJwtToken } from "../../src/services/storage";
import mockRouter from "next-router-mock";
import Tool from "../../src/types/Tool";
import Material from "../../src/types/Material";

// Mock Next.js router
jest.mock("next/router", () => require("next-router-mock"));

// Mock apiRequest import
jest.mock("../../src/services/apiService");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

// Mock getJwtToken import
jest.mock("../../src/services/storage");
const mockedGetJwtToken = getJwtToken as jest.MockedFunction<typeof getJwtToken>;

// Mock response from API
const tools: Tool[] = [
    {
        id: 1,
        name: "Mecha 5mm",
        description: "Mecha de taladro de 5 [mm] de acero rápido",
    },
    {
        id: 2,
        name: "Fresa para ranurar",
        description: "Fresa para ranurar",
    },
    {
        id: 3,
        name: "Láser 1W",
        description: "Láser de 1W para grabado de madera/plástico y corte de láminas delgadas",
    },
    {
        id: 4,
        name: "Extrusor de filamento",
        description: "Extrusor de filamento para impresiones 3D",
    },
];

const materials: Material[] = [
    {
        id: 1,
        name: "Madera",
        description: "Madera",
    },
    {
        id: 2,
        name: "Aluminio",
        description: "Aluminio",
    },
    {
        id: 3,
        name: "Cartón",
        description: "Cartón",
    },
    {
        id: 4,
        name: "PLA",
        description: "PLA",
    },
];

describe("InventoryView", () => {
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
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(materials))
            )
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(tools))
            );
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<InventoryView />);

        //console.log("DOM is:");
        //screen.debug();

        // Assert components in widget
        const inventoryCards = await screen.findAllByTestId("item-card");
        expect(inventoryCards).toHaveLength(8);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("item-form");
        expect(form).not.toBeInTheDocument();
        const buttonMaterial = screen.getByText("Agregar material");
        expect(buttonMaterial).toBeInTheDocument();
        const buttonTool = screen.getByText("Agregar herramienta");
        expect(buttonTool).toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(3);

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
        render(<InventoryView />);

        // Assert calls to API
        expect(apiRequest).not.toHaveBeenCalled();

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/login?callbackUrl=inventory",
            pathname: "/login",
            query: { callbackUrl: "inventory" },
        });
    });

    it("redirects to login because of auth fails", async () => {
        // Mock implementations of functions
        mockedApiRequest.mockRejectedValue(new Error("Token inválido, vuelva a loguearse"));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<InventoryView />);

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(1);
        await expect(apiRequest).rejects.toEqual(Error("Token inválido, vuelva a loguearse"));

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/login?callbackUrl=inventory",
            pathname: "/login",
            query: { callbackUrl: "inventory" },
        });
    });

    it("renders the view with no tools", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(materials))
            )
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<InventoryView />);

        // Assert components in widget
        const inventoryCards = await screen.findAllByTestId("item-card");
        expect(inventoryCards).toHaveLength(4);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("item-form");
        expect(form).not.toBeInTheDocument();
        const emptyCardText = screen.getByText("No hay herramientas configuradas");
        expect(emptyCardText).toBeInTheDocument();

        // Assert calls to API
        //expect(apiRequest).toHaveBeenCalledTimes(3);

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });

    it("renders the view with no materials", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve([]))
            )
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve(tools)));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<InventoryView />);

        // Assert components in widget
        const inventoryCards = await screen.findAllByTestId("item-card");
        expect(inventoryCards).toHaveLength(4);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("item-form");
        expect(form).not.toBeInTheDocument();
        const emptyCardText = screen.getByText("No hay materiales guardados");
        expect(emptyCardText).toBeInTheDocument();

        // Assert calls to API
        //expect(apiRequest).toHaveBeenCalledTimes(3);

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
            .mockRejectedValueOnce(new Error("Error retornando materiales"));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<InventoryView />);

        // Assert notification popup appeared
        const notification = await screen.findByTestId("message-dialog");
        expect(notification).toBeInTheDocument();
        const notificationText = await screen.findByText("Error retornando materiales");
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

    it("opens the form to upload a new tool", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(materials))
            )
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(tools))
            );
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<InventoryView />);

        // Assert components in widget
        const inventoryCards = await screen.findAllByTestId("item-card");
        expect(inventoryCards).toHaveLength(8);
        const button = screen.getByText("Agregar herramienta");
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
        expect(apiRequest).toHaveBeenCalledTimes(3);

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });

    it("opens the form to upload a new material", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(materials))
            )
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(tools))
            );
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<InventoryView />);

        // Assert components in widget
        const inventoryCards = await screen.findAllByTestId("item-card");
        expect(inventoryCards).toHaveLength(8);
        const button = screen.getByText("Agregar material");
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
        expect(apiRequest).toHaveBeenCalledTimes(3);

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });
});
