import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Login from "@/app/login/page";
import apiRequest from "@/services/apiService";
import { setJwtToken } from "@/services/storage";
import MessageDialogProps from "@/types/MessageDialogProps";

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

// Mock apiRequest import
jest.mock("@/services/apiService");
const mockedApiRequest = jest.mocked(apiRequest);

// Mock local storage methods
jest.mock("@/services/storage");

// Mock child React components
jest.mock("@/components/dialogs/messageDialog", () =>
    // eslint-disable-next-line react/display-name
    ({ onClose, text }: MessageDialogProps) => (
        <div data-testid="message-dialog">
            {text}
            <button onClick={() => onClose()}>Close dialog</button>
        </div>
    )
);

describe("Login", () => {
    afterEach(() => {
        cleanup();
    });

    it("renders the login view", () => {
        // Instantiate widget under test
        render(<Login />);

        // Assert components in widget
        const title = screen.getByText("Identificación de usuario");
        expect(title).toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).not.toHaveBeenCalled();
    });

    it("notifies error querying the API", async () => {
        // Mock API calls
        mockedApiRequest.mockRejectedValue(new Error("Error durante login"));

        // Instantiate widget under test
        render(<Login />);

        // Trigger event to query API
        const form = screen.getByTestId("login-form");
        fireEvent.submit(form);

        // Assert notification popup appeared
        const notification = await screen.findByTestId("message-dialog");
        expect(notification).toBeInTheDocument();
        const notificationText = await screen.findByText("Error durante login");
        expect(notificationText).toBeInTheDocument();

        // Trigger event to close window
        const button = screen.getByText("Close dialog");
        fireEvent.click(button);

        // Assert notification popup is gone
        expect(notification).not.toBeInTheDocument();
        expect(notificationText).not.toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalled();

        // Assert calls to router
        expect(mockRouterPush).not.toHaveBeenCalled();
    });

    test.each(["", "files"])("login success with callback URL %p", async (callbackUrl) => {
        // Mock API calls
        mockedApiRequest.mockResolvedValueOnce({
            data: {
                token: "a-valid-token",
            },
        });
        // Mock navigation
        mockGetSearchParams.mockImplementation((key: string) => {
            if (key === "callbackUrl") return callbackUrl;
            return "";
        });

        // Instantiate widget under test
        render(<Login />);

        // Trigger event to query API
        const form = screen.getByTestId("login-form");
        fireEvent.submit(form);

        // Wait for promises to resolve
        await new Promise(process.nextTick);

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalled();

        // Assert calls to local storage
        expect(setJwtToken).toHaveBeenCalled();
        expect(setJwtToken).toHaveBeenCalledWith("a-valid-token");

        // Assert calls to router
        expect(mockRouterPush).toHaveBeenCalled();
        expect(mockRouterPush).toHaveBeenCalledWith(callbackUrl);
    });
});
