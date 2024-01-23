import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import InventoryView from "@/pages/inventory";
import apiRequest from "../../src/services/apiService";
import { getJwtToken } from "../../src/services/storage";
import mockRouter from "next-router-mock";
import Tool from "../../src/types/Tool";
import Material from "../../src/types/Material";
import MaterialCardProps from "@/types/MaterialCardProps";
import MaterialFormProps from "@/types/MaterialFormProps";
import MessageDialogProps from "@/types/MessageDialogProps";
import ToolCardProps from "@/types/ToolCardProps";
import ToolFormProps from "@/types/ToolFormProps";

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

// Mock child React components
jest.mock("@/components/cards/materialCard", () =>
    // eslint-disable-next-line react/display-name
    ({ material }: MaterialCardProps) => (
        <div data-testid="material-card">
            {material.id} - {material.name} - {material.description}
        </div>
    )
);

jest.mock("@/components/forms/materialForm", () =>
    // eslint-disable-next-line react/display-name
    ({ exitAction, setError, setNotification }: MaterialFormProps) => (
        <div data-testid="material-form">
            <button onClick={() => setNotification("Éxito en formulario")}>Notify success</button>
            <button onClick={() => setError("Error en formulario")}>Notify error</button>
            <button onClick={() => exitAction()}>Close form</button>
        </div>
    )
);

jest.mock("@/components/cards/toolCard", () =>
    // eslint-disable-next-line react/display-name
    ({ tool }: ToolCardProps) => (
        <div data-testid="tool-card">
            {tool.id} - {tool.name} - {tool.description}
        </div>
    )
);

jest.mock("@/components/forms/toolForm", () =>
    // eslint-disable-next-line react/display-name
    ({ exitAction, setError, setNotification }: ToolFormProps) => (
        <div data-testid="tool-form">
            <button onClick={() => setNotification("Éxito en formulario")}>Notify success</button>
            <button onClick={() => setError("Error en formulario")}>Notify error</button>
            <button onClick={() => exitAction()}>Close form</button>
        </div>
    )
);

jest.mock("@/components/dialogs/messageDialog", () =>
    // eslint-disable-next-line react/display-name
    ({ onClose, text }: MessageDialogProps) => (
        <div data-testid="message-dialog">
            {text}
            <button onClick={() => onClose()}>Close dialog</button>
        </div>
    )
);

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
        const materialCards = await screen.findAllByTestId("material-card");
        expect(materialCards).toHaveLength(4);
        const toolCards = await screen.findAllByTestId("tool-card");
        expect(toolCards).toHaveLength(4);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const materialForm = screen.queryByTestId("material-form");
        expect(materialForm).not.toBeInTheDocument();
        const toolForm = screen.queryByTestId("tool-form");
        expect(toolForm).not.toBeInTheDocument();
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
        const materialCards = await screen.findAllByTestId("material-card");
        expect(materialCards).toHaveLength(4);
        const toolCards = screen.queryAllByTestId("tool-card");
        expect(toolCards).toHaveLength(0);
        const emptyCardText = screen.getByText("No hay herramientas configuradas");
        expect(emptyCardText).toBeInTheDocument();
    });

    it("renders the view with no materials", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])))
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(tools))
            );
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<InventoryView />);

        // Assert components in widget
        const toolCards = await screen.findAllByTestId("tool-card");
        expect(toolCards).toHaveLength(4);
        const materialCards = screen.queryAllByTestId("material-card");
        expect(materialCards).toHaveLength(0);
        const emptyCardText = screen.getByText("No hay materiales guardados");
        expect(emptyCardText).toBeInTheDocument();
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
        const button = screen.getByText("Close dialog");
        fireEvent.click(button);

        // Assert notification popup is gone
        expect(notification).not.toBeInTheDocument();
        expect(notificationText).not.toBeInTheDocument();
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
        const button = screen.getByText("Agregar herramienta");
        expect(button).toBeInTheDocument();

        // Trigger event to open form
        fireEvent.click(button);

        // Assert form appeared
        const form = await screen.findByTestId("tool-form");
        expect(form).toBeInTheDocument();

        // Close form
        const closeFormBtn = screen.getByText("Close form");
        expect(closeFormBtn).toBeInTheDocument();
        fireEvent.click(closeFormBtn);

        // Assert form is gone
        expect(form).not.toBeInTheDocument();
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
        const button = screen.getByText("Agregar material");
        expect(button).toBeInTheDocument();

        // Trigger event to open form
        fireEvent.click(button);

        // Assert form appeared
        const form = await screen.findByTestId("material-form");
        expect(form).toBeInTheDocument();

        // Close form
        const closeFormBtn = screen.getByText("Close form");
        expect(closeFormBtn).toBeInTheDocument();
        fireEvent.click(closeFormBtn);

        // Assert form is gone
        expect(form).not.toBeInTheDocument();
    });

    it("notifies error from child component", async () => {
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

        // Trigger event to open form
        const button = screen.getByText("Agregar herramienta");
        fireEvent.click(button);

        // Trigger error notification
        const errorBtn = screen.getByText("Notify error");
        fireEvent.click(errorBtn);

        // Assert notification popup appeared
        const notification = await screen.findByTestId("message-dialog");
        expect(notification).toBeInTheDocument();
        const notificationText = await screen.findByText("Error en formulario");
        expect(notificationText).toBeInTheDocument();

        // Trigger event to close window
        const closeBtn = screen.getByText("Close dialog");
        fireEvent.click(closeBtn);

        // Assert notification popup is gone
        expect(notification).not.toBeInTheDocument();
        expect(notificationText).not.toBeInTheDocument();
    });

    it("notifies success from child component", async () => {
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

        // Trigger event to open form
        const button = screen.getByText("Agregar herramienta");
        fireEvent.click(button);

        // Trigger error notification
        const successBtn = screen.getByText("Notify success");
        fireEvent.click(successBtn);

        // Assert notification popup appeared
        const notification = await screen.findByTestId("message-dialog");
        expect(notification).toBeInTheDocument();
        const notificationText = await screen.findByText("Éxito en formulario");
        expect(notificationText).toBeInTheDocument();

        // Trigger event to close window
        const closeBtn = screen.getByText("Close dialog");
        fireEvent.click(closeBtn);

        // Assert notification popup is gone
        expect(notification).not.toBeInTheDocument();
        expect(notificationText).not.toBeInTheDocument();
    });
});
