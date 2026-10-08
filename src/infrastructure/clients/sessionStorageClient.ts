import { SessionStoragePort } from "@/domain/ports/sessionStorage";

const SESSION_STORAGE_KEY = "jwt_token";

export function createSessionStorageClient(): SessionStoragePort {
    return {
        getToken: () => localStorage.getItem(SESSION_STORAGE_KEY) || "",
        setToken: (token: string) => {
            localStorage.setItem(SESSION_STORAGE_KEY, token);
        },
    };
}
