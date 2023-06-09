import config from '../config';

/*  Function: apiRequest
*   Description: Makes a request to the API
*/
export default function apiRequest(
    relativeUrl: string,
    method: string,
    body?: any,
    json: boolean = false
): Promise<any> {
    const { API_PORT, API_HOST, JWT_NAME } = config;

    // Adds the JWT token to the URL as a query parameter
    const token = (relativeUrl.includes('?') ? '&' : '?')
        + 'token='
        + localStorage.getItem(JWT_NAME);
    const apiUrl = `http://${API_HOST}:${API_PORT}/${relativeUrl}${token}`;

    return fetch(apiUrl,{
        method: method,
        headers: json ? {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } :
        undefined,
        body: json ? JSON.stringify(body) : body,
    })
    .then((res) => res.json());
};
