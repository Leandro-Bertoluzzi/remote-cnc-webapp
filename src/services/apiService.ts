import config from '../config';
import { getJwtToken } from './storage'

/*  Function: apiRequest
*   Description: Makes a request to the API
*/
export default async function apiRequest(
    relativeUrl: string,
    method: string,
    body?: any,
    json: boolean = false
): Promise<any> {
    const { API_PORT, API_HOST } = config;

    // Adds the JWT token to the URL as a query parameter
    const token = (relativeUrl.includes('?') ? '&' : '?')
        + 'token='
        + getJwtToken();
    const apiUrl = `http://${API_HOST}:${API_PORT}/${relativeUrl}${token}`;

    let response;

    try {
        response = await fetch(apiUrl, {
            method: method,
            headers: json ? {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } :
                undefined,
            body: json ? JSON.stringify(body) : body,
        });
    }  catch(error) {
        throw Error("Falló la conexión con la API");
    }

    if (!response.ok) {
        const res = await response.json();
        const detail = res.detail ? `: ${res.detail}` : ""
        throw Error(`${response.status} ${response.statusText} ${detail}`);
    }
    return await response.json();
};
