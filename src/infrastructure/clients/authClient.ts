import { AuthClient, AuthResponse, LoginResponse } from "@/application/auth/authClient";
import { createApiClient } from "@/infrastructure/clients/apiClient";
import { createSessionStorageClient } from "@/infrastructure/clients/sessionStorageClient";

const apiClient = createApiClient(createSessionStorageClient());

export function createAuthClient(): AuthClient {
    return {
        login: (email: string, password: string) =>
            apiClient.request("users/login", "POST", {
                body: { email, password },
                json: true,
            }) as Promise<LoginResponse>,
        verify: () => apiClient.request("users/auth", "GET") as Promise<AuthResponse>,
    };
}
