import config from "../config";
import { createSessionStorageClient } from "@/infrastructure/clients/sessionStorageClient";

const { JWT_NAME } = config;

const sessionStorageClient = createSessionStorageClient(JWT_NAME);

/**
 * Gets the JWT token from local storage.
 *
 * @returns The JWT token, or null if the token is not set.
 */
export function getJwtToken(): string {
    return sessionStorageClient.getToken();
}

/**
 * Sets the JWT token in local storage.
 *
 * @param token The JWT token to set.
 */
export function setJwtToken(token: string) {
    sessionStorageClient.setToken(token);
}
