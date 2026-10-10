import "@testing-library/jest-dom";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import { useAppClients } from "@/contexts/appClientsContext";

// Mock navigation hooks
const mockRouterPush = jest.fn();
const mockPathName = jest.fn();
jest.mock("next/navigation", () => {
    return {
        __esModule: true,
        useRouter: () => ({
            push: mockRouterPush,
            replace: jest.fn(),
            prefetch: jest.fn(),
        }),
        usePathname: () => mockPathName(),
    };
});

// Mock auth/session clients
jest.mock("@/contexts/appClientsContext");

const mockedVerify = jest.fn();
const mockedGetToken = jest.fn();

const mockedUseAppClients = jest.mocked(useAppClients);

const useAuth = require("@/hooks/useauth").default;

describe("use auth hook", () => {
    beforeEach(() => {
        mockedUseAppClients.mockReturnValue({
            authClient: {
                login: jest.fn(),
                verify: mockedVerify,
            },
            sessionStorageClient: {
                getToken: mockedGetToken,
                setToken: jest.fn(),
            },
            // @ts-ignore
            taskClient: {},
            // @ts-ignore
            controllerClient: {},
            // @ts-ignore
            managementClient: {},
        });
    });

    afterEach(() => {
        cleanup();
    });

    test.each(["", "files"])(
        "redirects to login because of no token, with callback URL %p",
        async (callbackUrl) => {
            // Mock dependencies
            mockedGetToken.mockReturnValue("");
            mockPathName.mockReturnValue("/" + callbackUrl);

            // Use hook under test
            const { result } = renderHook(() => useAuth());

            // Assert result
            await waitFor(() => {
                expect(result.current).toBeFalsy();
            });

            // Assert calls to API
            expect(mockedVerify).not.toHaveBeenCalled();

            // Assert navigation
            const loginUrl = `/login?callbackUrl=${callbackUrl}`;
            expect(mockRouterPush).toHaveBeenCalledWith(loginUrl);
        }
    );

    test.each(["", "files"])(
        "redirects to login because of auth fails, with callback URL %p",
        async (callbackUrl) => {
            // Mock dependencies
            mockedVerify.mockRejectedValue(new Error("Token inválido, vuelva a loguearse"));
            mockedGetToken.mockReturnValue("VALID_TOKEN");
            mockPathName.mockReturnValue("/" + callbackUrl);

            // Use hook under test
            const { result } = renderHook(() => useAuth());

            // Assert result
            await waitFor(() => {
                expect(result.current).toBeFalsy();
            });

            // Assert calls to API
            expect(mockedVerify).toHaveBeenCalled();

            // Assert navigation
            const loginUrl = `/login?callbackUrl=${callbackUrl}`;
            expect(mockRouterPush).toHaveBeenCalledWith(loginUrl);
        }
    );

    it("redirects to index due to lack of permissions", async () => {
        // Mock dependencies
        mockedVerify.mockResolvedValue({
            message: "Mocked response from the API",
            data: {
                id: 1,
                name: "User",
                email: "user@test.com",
                role: "user",
            },
        });
        mockedGetToken.mockReturnValue("VALID_TOKEN");
        mockPathName.mockReturnValue("");

        // Use hook under test
        const { result } = renderHook(() => useAuth(true));

        // Assert result
        await waitFor(() => {
            expect(result.current).toBeFalsy();
        });

        // Assert calls to API
        expect(mockedVerify).toHaveBeenCalled();

        // Assert navigation
        expect(mockRouterPush).toHaveBeenCalledWith("/");
    });

    test.each([false, true])("successfull authentication", async (admin) => {
        // Mock dependencies
        mockedVerify.mockResolvedValue({
            message: "Mocked response from the API",
            data: {
                id: 2,
                name: "Admin",
                email: "admin@test.com",
                role: "admin",
            },
        });
        mockedGetToken.mockReturnValue("VALID_TOKEN");
        mockPathName.mockReturnValue("");

        // Use hook under test
        const { result } = renderHook(() => useAuth(admin));

        // Assert result
        await waitFor(() => {
            expect(result.current).toBeTruthy();
        });

        // Assert calls to API
        expect(mockedVerify).toHaveBeenCalled();

        // Assert navigation
        expect(mockRouterPush).not.toHaveBeenCalled();
    });
});
