import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import FilesView from "@/app/(authenticated)/files/page";
import { ItemsClient } from "@/application/items/itemsClient";
import FileInfo from "@/types/FileInfo";
import { FileCardProps } from "@/components/cards/fileCard";
import { FileFormProps } from "@/components/forms/fileForm";
import { ItemsProvider } from "@/contexts/itemsContext";
import MessageDialogProps from "@/types/MessageDialogProps";
import { NotificationProvider } from "@/contexts/notificationContext";
import NotificationsWrapper from "@/components/wrappers/notificationsWrapper";
import useAuth from "@/hooks/useauth";

// Mock authentication
jest.mock("@/hooks/useauth");
const mockedAuth = jest.mocked(useAuth);

// Mock response from API
const files: FileInfo[] = [
    {
        id: 1,
        name: "archivo1.gcode",
        created_at: "Mon, 15 May of 2023",
    },
    {
        id: 2,
        name: "archivo2.gcode",
        created_at: "Mon, 15 May of 2023",
    },
    {
        id: 3,
        name: "archivo1-20230502-190205.gcode",
        created_at: "Mon, 15 May of 2023",
    },
    {
        id: 4,
        name: "example.txt",
        created_at: "Mon, 15 May of 2023",
    },
];

// Mock child React components
jest.mock("@/components/cards/fileCard", () =>
    // eslint-disable-next-line react/display-name
    ({ file }: FileCardProps) => (
        <div data-testid="file-card">
            {file.id} - {file.name} - {file.created_at}
        </div>
    )
);

jest.mock("@/components/forms/fileForm", () =>
    // eslint-disable-next-line react/display-name
    ({ exitAction }: FileFormProps) => (
        <div data-testid="file-form">
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

function createItemsClient(filesToReturn: FileInfo[] | Error): ItemsClient {
    return {
        getFiles: jest.fn(() =>
            filesToReturn instanceof Error ? Promise.reject(filesToReturn) : Promise.resolve(filesToReturn)
        ),
        getMaterials: jest.fn(() => Promise.resolve([])),
        getTasks: jest.fn(() => Promise.resolve([])),
        getTools: jest.fn(() => Promise.resolve([])),
        getUsers: jest.fn(() => Promise.resolve([])),
    };
}

// View component with its wrappers for context
const WrappedComponent = ({ client }: { client: ItemsClient }) => (
    <NotificationProvider>
        <NotificationsWrapper>
            <ItemsProvider client={client}>
                <FilesView />
            </ItemsProvider>
        </NotificationsWrapper>
    </NotificationProvider>
);

describe("FilesView", () => {
    beforeEach(() => {
        mockedAuth.mockReturnValue(true);
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the view after successful login", async () => {
        const client = createItemsClient(files);

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Assert components in widget
        const fileCards = await screen.findAllByTestId("file-card");
        expect(fileCards).toHaveLength(4);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("file-form");
        expect(form).not.toBeInTheDocument();
        const button = screen.getByText("Subir archivo");
        expect(button).toBeInTheDocument();

        // Assert calls to port client
        expect(client.getFiles).toHaveBeenCalledTimes(1);
    });

    it("renders the load screen before authenticating", async () => {
        // Mock authentication hook
        mockedAuth.mockReturnValue(false);
        const client = createItemsClient(files);

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Assert components in widget
        const loader = screen.queryByTestId("loader");
        expect(loader).toBeInTheDocument();

        // Assert calls to port client
        expect(client.getFiles).toHaveBeenCalledTimes(0);
    });

    it("renders the view with no files", async () => {
        const client = createItemsClient([]);

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Assert components in widget
        const fileCards = screen.queryAllByTestId("file-card");
        expect(fileCards).toHaveLength(0);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("file-form");
        expect(form).not.toBeInTheDocument();
        const emptyCardText = screen.getByText("No hay archivos guardados");
        expect(emptyCardText).toBeInTheDocument();
    });

    it("notifies error querying files from API", async () => {
        const client = createItemsClient(new Error("Error retornando archivos"));

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Assert notification popup appeared
        const notification = await screen.findByTestId("message-dialog");
        expect(notification).toBeInTheDocument();
        const notificationText = await screen.findByText("Error retornando archivos");
        expect(notificationText).toBeInTheDocument();

        // Trigger event to close window
        const button = screen.getByText("Close dialog");
        fireEvent.click(button);

        // Assert notification popup is gone
        expect(notification).not.toBeInTheDocument();
        expect(notificationText).not.toBeInTheDocument();
    });

    it("opens the form to upload a new file", async () => {
        const client = createItemsClient(files);

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Assert components in widget
        const button = screen.getByText("Subir archivo");
        expect(button).toBeInTheDocument();

        // Trigger event to open form
        fireEvent.click(button);

        // Assert form appeared
        const form = await screen.findByTestId("file-form");
        expect(form).toBeInTheDocument();

        // Close form
        const closeFormBtn = screen.getByText("Close form");
        expect(closeFormBtn).toBeInTheDocument();
        fireEvent.click(closeFormBtn);

        // Assert form is gone
        expect(form).not.toBeInTheDocument();

        // Assert calls to port client
        expect(client.getFiles).toHaveBeenCalledTimes(1);
    });
});
