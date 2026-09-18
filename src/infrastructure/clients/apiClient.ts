import config from "@/config";
import { ApiClient, ApiRequestOptions, TokenProvider } from "@/domain/ports/apiClient";

function appendToken(relativeUrl: string, token: string): string {
    return `${relativeUrl}${relativeUrl.includes("?") ? "&" : "?"}token=${token}`;
}

function buildHeaders(json = false): HeadersInit | undefined {
    if (!json) {
        return undefined;
    }

    return {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
}

async function parseError(response: Response): Promise<Error> {
    const res = await response.json();
    if (!res.detail) {
        return Error(`${response.status} ${response.statusText}`);
    }

    let detail = "";
    res.detail.forEach((item: { msg: string }) => {
        detail += `${item.msg}\n`;
    });

    return Error(`${response.status} ${response.statusText}: ${detail}`);
}

export function createApiClient(tokenProvider: TokenProvider): ApiClient {
    return {
        async request(relativeUrl: string, method: string, options: ApiRequestOptions = {}) {
            const apiUrl = `${config.API_URL}/${appendToken(relativeUrl, tokenProvider.getToken())}`;

            let response: Response;

            try {
                response = await fetch(apiUrl, {
                    method,
                    headers: buildHeaders(options.json),
                    body: options.json ? JSON.stringify(options.body) : (options.body as BodyInit | null | undefined),
                });
            } catch {
                throw Error("Falló la conexión con la API");
            }

            if (!response.ok) {
                throw await parseError(response);
            }

            return await response.json();
        },

        stream(channel: string): EventSource {
            const relativeUrl = `monitor/stream/${channel}`;
            const apiUrl = `${config.API_URL}/${appendToken(relativeUrl, tokenProvider.getToken())}`;

            return new EventSource(apiUrl);
        },
    };
}
