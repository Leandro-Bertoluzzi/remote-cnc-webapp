export interface ApiRequestOptions {
    body?: unknown;
    json?: boolean;
}

export interface ApiClient {
    request(relativeUrl: string, method: string, options?: ApiRequestOptions): Promise<unknown>;
    stream(channel: string): EventSource;
}

export interface TokenProvider {
    getToken: () => string;
}
