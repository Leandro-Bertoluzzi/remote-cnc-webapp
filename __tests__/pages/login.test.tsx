import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Login from "@/app/(outside)/login/page";
import { AuthClient } from "@/application/auth/authClient";
import MessageDialogProps from "@/types/MessageDialogProps";
import { NotificationProvider } from "@/contexts/notificationContext";
import NotificationsWrapper from "@/components/wrappers/notificationsWrapper";
import { AppClientsProvider } from "@/contexts/appClientsContext";

// Mock navigation hooks
const mockRouterPush = jest.fn();
const mockGetSearchParams = jest.fn().mockReturnValue("");
jest.mock("next/navigation", () => {
    return {
        __esModule: true,
        useRouter: () => ({
            push: mockRouterPush,
            replace: jest.fn(),
            prefetch: jest.fn(),
        }),
        useSearchParams: () => ({
            get: mockGetSearchParams,
        }),
    };
});

// Mock child React components
jest.mock("@/components/dialogs/messageDialog", () =>
    // eslint-disable-next-line react/display-name
    ({ onClose, text }: MessageDialogProps) => (
        <div data-testid="message-dialog">
            {text}
            <button onClick={onClose}>Close dialog</button>
        </div>
    )
);

function createAuthClient(isError: boolean = false): AuthClient {
    return {
        login: jest.fn((_email, _password) => {
            if (isError) {
                return Promise.reject(new Error("Error during login"));
            }
            return Promise.resolve({ data: { token: "test-token" } });
        }),
        verify: jest.fn(() => Promise.resolve({ data: { role: "user" } })),
    };
}

// View component with its wrappers for context
const WrappedComponent = ({ client }: { client: AuthClient }) => (
    <AppClientsProvider clients={{ authClient: client }}>
        <NotificationProvider>
            <NotificationsWrapper>
                <Login />
            </NotificationsWrapper>
        </NotificationProvider>
    </AppClientsProvider>
);

describe("Login", () => {
    afterEach(() => {
        cleanup();
    });

    it("renders the login view", () => {
        const client = createAuthClient();

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Assert components in widget
        const title = screen.getByText("Identificación de usuario");
        expect(title).toBeInTheDocument();
    });

    it("notifies error querying the API", async () => {
        const client = createAuthClient(true);

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Trigger event to query API
        const form = screen.getByTestId("login-form");
        fireEvent.submit(form);

        // Assert notification popup appeared
        const notification = await screen.findByTestId("message-dialog");
        expect(notification).toBeInTheDocument();
        const notificationText = await screen.findByText("Error during login");
        expect(notificationText).toBeInTheDocument();

        // Trigger event to close window
        const button = screen.getByText("Close dialog");
        fireEvent.click(button);

        // Assert notification popup is gone
        expect(notification).not.toBeInTheDocument();
        expect(notificationText).not.toBeInTheDocument();

        // Assert calls to router
        expect(mockRouterPush).not.toHaveBeenCalled();
    });

    test.each(["", "files"])("login success with callback URL %p", async (callbackUrl) => {
        const client = createAuthClient();

        // Mock navigation
        mockGetSearchParams.mockImplementation((key: string) => {
            if (key === "callbackUrl") return callbackUrl;
            return "";
        });

        // Instantiate widget under test
        render(<WrappedComponent client={client} />);

        // Trigger event to query API
        const form = screen.getByTestId("login-form");
        fireEvent.submit(form);

        // Wait for promises to resolve
        await new Promise(process.nextTick);

        // Assert calls to router
        const expected = callbackUrl.length ? callbackUrl : "/";
        expect(mockRouterPush).toHaveBeenCalledWith(expected);
    });
});
