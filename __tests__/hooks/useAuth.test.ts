import "@testing-library/jest-dom";
import apiRequest from "@/services/apiService";
import { getJwtToken } from "@/services/storage";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import useAuth from "@/hooks/useauth";

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

// Mock apiRequest import
jest.mock("@/services/apiService");
const mockedApiRequest = jest.mocked(apiRequest);

// Mock local storage methods
jest.mock("@/services/storage");
const mockedGetJwtToken = jest.mocked(getJwtToken);

describe("use auth hook", () => {
    afterEach(() => {
        cleanup();
    });

    test.each(["", "files"])(
        "redirects to login because of no token, with callback URL %p",
        async (callbackUrl) => {
            // Mock dependencies
            mockedGetJwtToken.mockReturnValue("");
            mockPathName.mockReturnValue("/" + callbackUrl);

            // Use hook under test
            const { result } = renderHook(() => useAuth());

            // Assert result
            await waitFor(() => {
                expect(result.current).toBeFalsy();
            });

            // Assert calls to API
            expect(apiRequest).not.toHaveBeenCalled();

            // Assert navigation
            const loginUrl = `/login?callbackUrl=${callbackUrl}`;
            expect(mockRouterPush).toHaveBeenCalledWith(loginUrl);
        }
    );

    test.each(["", "files"])(
        "redirects to login because of auth fails, with callback URL %p",
        async (callbackUrl) => {
            // Mock dependencies
            mockedApiRequest.mockRejectedValue(new Error("Token inválido, vuelva a loguearse"));
            mockedGetJwtToken.mockReturnValue("VALID_TOKEN");
            mockPathName.mockReturnValue("/" + callbackUrl);

            // Use hook under test
            const { result } = renderHook(() => useAuth());

            // Assert result
            await waitFor(() => {
                expect(result.current).toBeFalsy();
            });

            // Assert calls to API
            expect(apiRequest).toHaveBeenCalled();

            // Assert navigation
            const loginUrl = `/login?callbackUrl=${callbackUrl}`;
            expect(mockRouterPush).toHaveBeenCalledWith(loginUrl);
        }
    );

    it("redirects to index due to lack of permissions", async () => {
        // Mock dependencies
        mockedApiRequest.mockResolvedValue({
            message: "Mocked response from the API",
            data: {
                id: 1,
                name: "User",
                email: "user@test.com",
                role: "user",
            },
        });
        mockedGetJwtToken.mockReturnValue("VALID_TOKEN");
        mockPathName.mockReturnValue("");

        // Use hook under test
        const { result } = renderHook(() => useAuth(true));

        // Assert result
        await waitFor(() => {
            expect(result.current).toBeFalsy();
        });

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalled();

        // Assert navigation
        expect(mockRouterPush).toHaveBeenCalledWith("/");
    });

    test.each([false, true])("successfull authentication", async (admin) => {
        // Mock dependencies
        mockedApiRequest.mockResolvedValue({
            message: "Mocked response from the API",
            data: {
                id: 2,
                name: "Admin",
                email: "admin@test.com",
                role: "admin",
            },
        });
        mockedGetJwtToken.mockReturnValue("VALID_TOKEN");
        mockPathName.mockReturnValue("");

        // Use hook under test
        const { result } = renderHook(() => useAuth(admin));

        // Assert result
        await waitFor(() => {
            expect(result.current).toBeTruthy();
        });

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalled();

        // Assert navigation
        expect(mockRouterPush).not.toHaveBeenCalled();
    });
});
