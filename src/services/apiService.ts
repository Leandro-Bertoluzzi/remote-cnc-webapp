import { getJwtToken } from "./storage";
import { createApiClient } from "@/infrastructure/clients/apiClient";

const apiClient = createApiClient({
    getToken: getJwtToken,
});

/*  Function: apiRequest
 *   Description: Makes a request to the API
 */
export default async function apiRequest(
    relativeUrl: string,
    method: string,
    // The API request payload is intentionally flexible because this helper
    // is shared by many endpoints with different request bodies.
    body?: any,
    json = false
): Promise<unknown> {
    return await apiClient.request(relativeUrl, method, { body, json });
}

export function getEventSource(channel: string): EventSource {
    return apiClient.stream(channel);
}
