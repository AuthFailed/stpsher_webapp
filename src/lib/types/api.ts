// API Error Types
export class ApiError extends Error {
	constructor(
		message: string,
		public status?: number,
		public code?: string
	) {
		super(message);
		this.name = 'ApiError';
	}
}

export class NetworkError extends ApiError {
	constructor(message: string) {
		super(message, 0, 'NETWORK_ERROR');
		this.name = 'NetworkError';
	}
}

// API Response Types
export interface Employee {
	id: number;
	user_id: number;
	fullname: string;
	username: string;
	role: number;
	division: string;
	position: string;
	head: string;
	email: string;
	is_trainee: boolean;
	is_casino_allowed: boolean;
	is_exchange_banned: boolean;
}

export interface EmployeesResponse {
	employees: Employee[];
}

// API Configuration
export const API_CONFIG = {
	get URL(): string {
		return import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
	},
	get BEARER_TOKEN(): string {
		const token = import.meta.env.VITE_API_BEARER_TOKEN;
		if (!token) {
			throw new Error('VITE_API_BEARER_TOKEN is not configured');
		}
		return token;
	}
};