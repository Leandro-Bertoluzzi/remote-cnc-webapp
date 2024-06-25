import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Login from "@/app/login/page";
import apiRequest from "@/services/apiService";
import { setJwtToken } from "@/services/storage";
import mockRouter from "next-router-mock";
import MessageDialogProps from "@/types/MessageDialogProps";

// Mock Next.js router
jest.mock("next/router", () => require("next-router-mock"));

// Mock apiRequest import
jest.mock("@/services/apiService");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

// Mock getJwtToken import
jest.mock("@/services/storage");
const mockedSetJwtToken = setJwtToken as jest.MockedFunction<typeof setJwtToken>;

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
    beforeEach(() => {
        mockRouter.setCurrentUrl("/");
    });

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

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });

    it("notifies error querying the API", async () => {
        // Mock API calls
        mockedApiRequest.mockRejectedValue(new Error("Error durante login"));

        // Instantiate widget under test
        render(<Login />);

        // Trigger event to query API
        const submitBtn = screen.getByText("Enviar");
        fireEvent.click(submitBtn);

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

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });

    test.each(["", "files"])("login success with callback URL %p", async (callbackUrl) => {
        // Mock API calls
        mockedApiRequest.mockImplementation(
            (url, method) =>
                new Promise((resolve, reject) =>
                    resolve({
                        data: {
                            token: "a-valid-token",
                        },
                    })
                )
        );
        // Mock router
        const routerUrl = callbackUrl ? `/login?callbackUrl=${callbackUrl}` : "/login";
        mockRouter.setCurrentUrl(routerUrl);

        // Instantiate widget under test
        render(<Login />);

        // Trigger event to query API
        const submitBtn = screen.getByText("Enviar");
        fireEvent.click(submitBtn);

        // Wait for promises to resolve
        await new Promise(process.nextTick);

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalled();

        // Assert calls to local storage
        expect(setJwtToken).toHaveBeenCalled();
        expect(setJwtToken).toHaveBeenCalledWith("a-valid-token");

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: `/${callbackUrl}`,
            pathname: `/${callbackUrl}`,
            query: {},
        });
    });
});
