/**
 * In-Memory Token Management
 * 
 * Stores the short-lived access token in JavaScript memory (module singleton).
 * This token is NOT persisted to localStorage, cookies, or any other storage.
 * It will be cleared when the page is refreshed or the application is closed.
 * 
 * The refresh token is managed by the server via HttpOnly cookies.
 */

let accessToken: string | null = null;

/**
 * Get the current access token from memory
 * @returns The access token or null if not set
 */
export const getAccessToken = (): string | null => {
  return accessToken;
};

/**
 * Set the access token in memory
 * @param token - The access token to store, or null to clear
 */
export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};

/**
 * Clear the access token from memory
 */
export const clearAccessToken = (): void => {
  accessToken = null;
};

