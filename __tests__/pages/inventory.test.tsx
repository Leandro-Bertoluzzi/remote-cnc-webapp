import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import InventoryView from "@/app/inventory/page";
import apiRequest from "@/services/apiService";
import Tool from "@/types/Tool";
import Material from "@/types/Material";
import { MaterialCardProps } from "@/components/cards/materialCard";
import { MaterialFormProps } from "@/components/forms/materialForm";
import MessageDialogProps from "@/types/MessageDialogProps";
import { NotificationProvider } from "@/contexts/notificationContext";
import NotificationsWrapper from "@/components/wrappers/notificationsWrapper";
import { ToolCardProps } from "@/components/cards/toolCard";
import { ToolFormProps } from "@/components/forms/toolForm";
import useAuth from "@/hooks/useauth";

// Mock authentication
jest.mock("@/hooks/useauth");
const mockedAuth = jest.mocked(useAuth);

// Mock apiRequest import
jest.mock("@/services/apiService");
const mockedApiRequest = jest.mocked(apiRequest);

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
    ({ exitAction }: MaterialFormProps) => (
        <div data-testid="material-form">
            <button onClick={exitAction}>Close form</button>
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
    ({ exitAction }: ToolFormProps) => (
        <div data-testid="tool-form">
            <button onClick={exitAction}>Close form</button>
        </div>
    )
);

jest.mock("@/components/dialogs/messageDialog", () =>
    // eslint-disable-next-line react/display-name
    ({ onClose, text }: MessageDialogProps) => (
        <div data-testid="message-dialog">
            {text}
            <button onClick={onClose}>Close dialog</button>
        </div>
    )
);

describe("InventoryView", () => {
    beforeEach(() => {
        mockedAuth.mockReturnValue(true);
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the view after successful login", async () => {
        // Mock API calls
        mockedApiRequest.mockResolvedValueOnce(materials).mockResolvedValueOnce(tools);

        // Instantiate widget under test
        render(
            <NotificationProvider>
                <NotificationsWrapper>
                    <InventoryView />
                </NotificationsWrapper>
            </NotificationProvider>
        );

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
        expect(apiRequest).toHaveBeenCalledTimes(2);
    });

    it("renders the load screen before authenticating", async () => {
        // Mock authentication hook
        mockedAuth.mockReturnValue(false);

        // Instantiate widget under test
        render(
            <NotificationProvider>
                <NotificationsWrapper>
                    <InventoryView />
                </NotificationsWrapper>
            </NotificationProvider>
        );

        // Assert components in widget
        const loader = screen.queryByTestId("loader");
        expect(loader).toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(0);
    });

    it("renders the view with no tools", async () => {
        // Mock API calls
        mockedApiRequest.mockResolvedValueOnce(materials).mockResolvedValueOnce([]);

        // Instantiate widget under test
        render(
            <NotificationProvider>
                <NotificationsWrapper>
                    <InventoryView />
                </NotificationsWrapper>
            </NotificationProvider>
        );

        // Assert components in widget
        const materialCards = await screen.findAllByTestId("material-card");
        expect(materialCards).toHaveLength(4);
        const toolCards = screen.queryAllByTestId("tool-card");
        expect(toolCards).toHaveLength(0);
        const emptyCardText = screen.getByText("No hay herramientas configuradas");
        expect(emptyCardText).toBeInTheDocument();
    });

    it("renders the view with no materials", async () => {
        // Mock API calls
        mockedApiRequest.mockResolvedValueOnce([]).mockResolvedValueOnce(tools);

        // Instantiate widget under test
        render(
            <NotificationProvider>
                <NotificationsWrapper>
                    <InventoryView />
                </NotificationsWrapper>
            </NotificationProvider>
        );

        // Assert components in widget
        const toolCards = await screen.findAllByTestId("tool-card");
        expect(toolCards).toHaveLength(4);
        const materialCards = screen.queryAllByTestId("material-card");
        expect(materialCards).toHaveLength(0);
        const emptyCardText = screen.getByText("No hay materiales guardados");
        expect(emptyCardText).toBeInTheDocument();
    });

    it("notifies error querying items from API", async () => {
        // Mock API calls
        mockedApiRequest.mockRejectedValueOnce(new Error("Error retornando materiales"));

        // Instantiate widget under test
        render(
            <NotificationProvider>
                <NotificationsWrapper>
                    <InventoryView />
                </NotificationsWrapper>
            </NotificationProvider>
        );

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
        // Mock API calls
        mockedApiRequest.mockResolvedValueOnce(materials).mockResolvedValueOnce(tools);

        // Instantiate widget under test
        render(
            <NotificationProvider>
                <NotificationsWrapper>
                    <InventoryView />
                </NotificationsWrapper>
            </NotificationProvider>
        );

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
        // Mock API calls
        mockedApiRequest.mockResolvedValueOnce(materials).mockResolvedValueOnce(tools);

        // Instantiate widget under test
        render(
            <NotificationProvider>
                <NotificationsWrapper>
                    <InventoryView />
                </NotificationsWrapper>
            </NotificationProvider>
        );

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
});
