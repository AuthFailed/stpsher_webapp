import { writable, derived, type Readable } from 'svelte/store';
import type { Employee } from '$lib/types/api';

/**
 * Employee authentication state
 * Provides reactive state for employee access control
 */

interface EmployeeState {
	employee: Employee | null;
	isLoading: boolean;
	error: string | null;
	hasChecked: boolean;
}

const initialState: EmployeeState = {
	employee: null,
	isLoading: false,
	error: null,
	hasChecked: false
};

// Track if we're currently checking to prevent duplicate calls
let isChecking = false;

function createEmployeeStore() {
	const { subscribe, set, update } = writable<EmployeeState>(initialState);

	return {
		subscribe,

		/**
		 * Check employee access and update state
		 */
		checkAccess: async (userId: number): Promise<void> => {
			// Prevent duplicate calls
			if (isChecking) {
				return;
			}

			// Mark as checking FIRST to prevent race conditions
			isChecking = true;

			// Set loading state
			update((state) => {
				// Don't proceed if already checked
				if (state.hasChecked) {
					isChecking = false;
					return state;
				}
				return { ...state, isLoading: true, error: null };
			});

			try {
				const { checkEmployeeAccess: checkApi } = await import('$lib/api/employees');
				const result = await checkApi(userId);

				update((state) => ({
					...state,
					employee: result,
					hasChecked: true,
					isLoading: false
				}));
			} catch (err) {
				update((state) => ({
					...state,
					employee: null,
					error: err instanceof Error ? err.message : 'Failed to verify access',
					hasChecked: true,
					isLoading: false
				}));
			} finally {
				isChecking = false;
			}
		},

		/**
		 * Reset employee state (for testing or logout)
		 */
		reset: (): void => {
			set(initialState);
			isChecking = false;
		}
	};
}

export const employeeStore = createEmployeeStore();

// Derived stores for convenient access
export const employee: Readable<Employee | null> = derived(
	employeeStore,
	($store) => $store.employee
);

export const isLoading: Readable<boolean> = derived(
	employeeStore,
	($store) => $store.isLoading
);

export const hasAccess: Readable<boolean> = derived(
	employeeStore,
	($store) => $store.hasChecked && $store.employee !== null
);

export const error: Readable<string | null> = derived(
	employeeStore,
	($store) => $store.error
);

export const employeeFullname: Readable<string | undefined> = derived(
	employeeStore,
	($store) => $store.employee?.fullname
);

export const hasChecked: Readable<boolean> = derived(
	employeeStore,
	($store) => $store.hasChecked
);
