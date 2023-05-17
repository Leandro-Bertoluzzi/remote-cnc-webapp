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
    const { API_PORT, API_HOST } = config;
    const apiUrl = `http://${API_HOST}:${API_PORT}/${relativeUrl}`;

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
