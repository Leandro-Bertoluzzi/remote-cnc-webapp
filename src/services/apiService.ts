import config from "../config";
import { getJwtToken } from "./storage";

/*  Function: apiRequest
 *   Description: Makes a request to the API
 */
export default async function apiRequest(
    relativeUrl: string,
    method: string,
    body?: any,
    json = false
): Promise<any> {
    const { API_URL } = config;

    // Adds the JWT token to the URL as a query parameter
    const token = (relativeUrl.includes("?") ? "&" : "?") + "token=" + getJwtToken();
    const apiUrl = `${API_URL}/${relativeUrl}${token}`;

    let response;

    try {
        response = await fetch(apiUrl, {
            method: method,
            headers: json
                ? {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                  }
                : undefined,
            body: json ? JSON.stringify(body) : body,
        });
    } catch (error) {
        throw Error("Falló la conexión con la API");
    }

    if (!response.ok) {
        const res = await response.json();
        if (!res.detail) {
            throw Error(`${response.status} ${response.statusText}`);
        }
        let detail = "";
        res.detail.forEach((item: {msg: string}) => {
            detail += (item.msg + "\n");
        });
        throw Error(`${response.status} ${response.statusText}: ${detail}`);
    }
    return await response.json();
}

export function getEventSource(channel: string): EventSource {
    const { API_URL } = config;

    // Generate URL and add the JWT token as a query parameter
    const relativeUrl = "monitor/stream/" + channel;
    const token = getJwtToken();
    const apiUrl = `${API_URL}/${relativeUrl}?token=${token}`;

    return new EventSource(apiUrl);
}
