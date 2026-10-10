export interface LoginResponse {
    token: string;
}

export interface AuthResponse {
    data?: {
        role?: string;
    };
}

export interface AuthClient {
    login: (email: string, password: string) => Promise<LoginResponse>;
    verify: () => Promise<AuthResponse>;
}
