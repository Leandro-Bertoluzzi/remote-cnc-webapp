import { SessionStoragePort } from "@/domain/ports/sessionStorage";

export function createSessionStorageClient(storageKey: string): SessionStoragePort {
    return {
        getToken: () => localStorage.getItem(storageKey) || "",
        setToken: (token: string) => {
            localStorage.setItem(storageKey, token);
        },
    };
}
