/**
 * Telegram WebApp Store
 * Reactive store for Telegram WebApp data and state
 */

import { writable, derived } from 'svelte/store';
import type { TelegramUser, TelegramThemeParams } from '$lib/types/telegram';

interface TelegramState {
	user: TelegramUser | null;
	themeParams: TelegramThemeParams;
	colorScheme: 'light' | 'dark';
	initData: string;
	version: string;
	viewportHeight: number;
	viewportStableHeight: number;
	isExpanded: boolean;
	isAvailable: boolean;
}

const initialState: TelegramState = {
	user: null,
	themeParams: {},
	colorScheme: 'light',
	initData: '',
	version: '',
	viewportHeight: 0,
	viewportStableHeight: 0,
	isExpanded: false,
	isAvailable: false
};

function createTelegramStore() {
	const { subscribe, update, set } = writable<TelegramState>(initialState);

	return {
		subscribe,
		update,
		set,
		initialize: () => {
			if (typeof window === 'undefined') return;

			const webApp = window.Telegram?.WebApp;
			if (!webApp) return;

			webApp.ready();

			update((state) => ({
				...state,
				user: webApp.initDataUnsafe.user || null,
				themeParams: webApp.themeParams,
				colorScheme: webApp.colorScheme,
				initData: webApp.initData,
				version: webApp.version,
				viewportHeight: webApp.viewportHeight,
				viewportStableHeight: webApp.viewportStableHeight,
				isExpanded: webApp.isExpanded,
				isAvailable: true
			}));

			// Listen for viewport changes
			webApp.onEvent('viewportChanged', () => {
				update((state) => ({
					...state,
					viewportHeight: webApp.viewportHeight,
					viewportStableHeight: webApp.viewportStableHeight,
					isExpanded: webApp.isExpanded
				}));
			});

			// Listen for theme changes
			webApp.onEvent('themeChanged', () => {
				update((state) => ({
					...state,
					themeParams: webApp.themeParams,
					colorScheme: webApp.colorScheme
				}));
			});
		}
	};
}

export const telegram = createTelegramStore();

// Derived stores for convenient access
export const user = derived(telegram, ($telegram) => $telegram.user);
export const themeParams = derived(telegram, ($telegram) => $telegram.themeParams);
export const colorScheme = derived(telegram, ($telegram) => $telegram.colorScheme);
export const initData = derived(telegram, ($telegram) => $telegram.initData);
export const version = derived(telegram, ($telegram) => $telegram.version);
export const isAvailable = derived(telegram, ($telegram) => $telegram.isAvailable);
