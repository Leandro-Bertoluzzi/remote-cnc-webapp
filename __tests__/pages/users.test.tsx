import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import UsersView from "@/app/(authenticated)/users/page";
import { ItemsClient } from "@/application/items/itemsClient";
import User from "@/types/User";
import { UserCardProps } from "@/components/cards/userCard";
import { UserFormProps } from "@/components/forms/userForm";
import MessageDialogProps from "@/types/MessageDialogProps";
import { NotificationProvider } from "@/contexts/notificationContext";
import NotificationsWrapper from "@/components/wrappers/notificationsWrapper";
import useAuth from "@/hooks/useauth";
import { ItemsProvider } from "@/contexts/itemsContext";

// Mock authentication
jest.mock("@/hooks/useauth");
const mockedAuth = jest.mocked(useAuth);

// Mock response from API
const users: User[] = [
    {
        id: 1,
        name: "Testing admin",
        email: "testingadmin@test.com",
        role: "admin",
    },
    {
        id: 2,
        name: "Fulano Mengano",
        email: "fulano.mengano@test.com",
        role: "user",
    },
    {
        id: 3,
        name: "Testing user 1",
        email: "testinguser1@test.com",
        role: "user",
    },
    {
        id: 4,
        name: "Testing user 2",
        email: "testinguser2@test.com",
        role: "user",
    },
];

// Mock child React components
jest.mock("@/components/cards/userCard", () =>
    // eslint-disable-next-line react/display-name
    ({ user }: UserCardProps) => (
        <div data-testid="user-card">
            {user.id} - {user.name} - {user.email}
        </div>
    )
);

jest.mock("@/components/forms/userForm", () =>
    // eslint-disable-next-line react/display-name
    ({ exitAction }: UserFormProps) => (
        <div data-testid="user-form">
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

function createItemsClient(usersToReturn: User[] | Error): ItemsClient {
    return {
        getFiles: jest.fn(() => Promise.resolve([])),
        getMaterials: jest.fn(() => Promise.resolve([])),
        getTasks: jest.fn(() => Promise.resolve([])),
        getTools: jest.fn(() => Promise.resolve([])),
        getUsers: jest.fn(() =>
            usersToReturn instanceof Error ? Promise.reject(usersToReturn) : Promise.resolve(usersToReturn)
        ),
    };
}

// View component with its wrappers for context
const WrappedComponent = ({ client }: { client: ItemsClient }) => (
    <NotificationProvider>
        <NotificationsWrapper>
            <ItemsProvider client={client}>
                <UsersView />
            </ItemsProvider>
        </NotificationsWrapper>
    </NotificationProvider>
);

describe("UsersView", () => {
    beforeEach(() => {
        mockedAuth.mockReturnValue(true);
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the view after successful login", async () => {
        const client = createItemsClient(users);

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Assert components in widget
        const userCards = await screen.findAllByTestId("user-card");
        expect(userCards).toHaveLength(4);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("user-form");
        expect(form).not.toBeInTheDocument();
        const button = screen.getByText("Agregar usuario");
        expect(button).toBeInTheDocument();

        // Assert calls to port client
        expect(client.getUsers).toHaveBeenCalledTimes(1);
    });

    it("renders the load screen before authenticating", async () => {
        // Mock authentication hook
        mockedAuth.mockReturnValue(false);
        const client = createItemsClient(users);

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Assert components in widget
        const loader = screen.queryByTestId("loader");
        expect(loader).toBeInTheDocument();

        // Assert calls to port client
        expect(client.getUsers).toHaveBeenCalledTimes(0);
    });

    it("notifies error querying users from API", async () => {
        const client = createItemsClient(new Error("Error retornando usuarios"));

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Assert notification popup appeared
        const notification = await screen.findByTestId("message-dialog");
        expect(notification).toBeInTheDocument();
        const notificationText = await screen.findByText("Error retornando usuarios");
        expect(notificationText).toBeInTheDocument();

        // Trigger event to close window
        const button = screen.getByText("Close dialog");
        fireEvent.click(button);

        // Assert notification popup is gone
        expect(notification).not.toBeInTheDocument();
        expect(notificationText).not.toBeInTheDocument();
    });

    it("opens the form to upload a new user", async () => {
        const client = createItemsClient(users);

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Assert components in widget
        const button = screen.getByText("Agregar usuario");
        expect(button).toBeInTheDocument();

        // Trigger event to open form
        fireEvent.click(button);

        // Assert form appeared
        const form = await screen.findByTestId("user-form");
        expect(form).toBeInTheDocument();

        // Close form
        const closeFormBtn = screen.getByText("Close form");
        expect(closeFormBtn).toBeInTheDocument();
        fireEvent.click(closeFormBtn);

        // Assert form is gone
        expect(form).not.toBeInTheDocument();
    });
});
