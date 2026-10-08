import { AuthClient, AuthResponse, LoginResponse } from "@/application/auth/authClient";
import apiRequest from "@/services/apiService";

export function createAuthClient(): AuthClient {
    return {
        login: (email: string, password: string) =>
            apiRequest("users/login", "POST", { email, password }, true) as Promise<LoginResponse>,
        verify: () => apiRequest("users/auth", "GET") as Promise<AuthResponse>,
    };
}