export interface SessionStoragePort {
    getToken: () => string;
    setToken: (token: string) => void;
}
