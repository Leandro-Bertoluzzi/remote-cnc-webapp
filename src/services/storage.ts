import config from '../config';

const { JWT_NAME } = config;

/**
 * Gets the JWT token from local storage.
 *
 * @returns The JWT token, or null if the token is not set.
 */
export function getJwtToken(): string {
    return localStorage.getItem(JWT_NAME) || '';
}

/**
 * Sets the JWT token in local storage.
 *
 * @param token The JWT token to set.
 */
export function setJwtToken(token: string) {
    localStorage.setItem(JWT_NAME, token);
}
