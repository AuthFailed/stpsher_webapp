import type {Employee, EmployeesResponse, ApiError, NetworkError} from '$lib/types/api';
import {API_CONFIG} from '$lib/types/api';

/**
 * API client for employee-related operations
 */
class EmployeeApi {
    private readonly baseUrl: string;
    private readonly bearerToken: string;

    constructor() {
        this.baseUrl = API_CONFIG.URL;
        this.bearerToken = API_CONFIG.BEARER_TOKEN;
    }

    /**
     * Check if user is allowed to access the webapp by checking if they exist in the employee database
     * @param userId - Telegram user ID
     * @returns Employee data if found, null if not found
     * @throws {ApiError} If the API request fails
     * @throws {NetworkError} If there's a network error
     */
    async checkAccess(userId: number): Promise<Employee | null> {
        const url = `${this.baseUrl}/v1/employees/?user_id=${userId}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.bearerToken}`
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    return null; // Employee not found
                }
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data: EmployeesResponse = await response.json();

            // Return first employee if found, null otherwise
            return data.employees?.[0] || null;
        } catch (error) {
            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error('Network error: Unable to connect to API server');
            }
            throw error;
        }
    }
}

// Export singleton instance
export const employeeApi = new EmployeeApi();

// Export convenience function for backward compatibility
export async function checkEmployeeAccess(userId: number): Promise<Employee | null> {
    return employeeApi.checkAccess(userId);
}
