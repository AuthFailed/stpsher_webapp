/**
 * Telegram WebApp API Wrapper
 * Provides type-safe access to Telegram WebApp functionality
 */

import type { TelegramWebApp, TelegramThemeParams, TelegramUser } from '$lib/types/telegram';

class TelegramWebAppWrapper {
	private webApp: TelegramWebApp | null = null;

	constructor() {
		if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
			this.webApp = window.Telegram.WebApp;
			this.webApp.ready();
		}
	}

	getWebApp(): TelegramWebApp | null {
		return this.webApp;
	}

	getUser(): TelegramUser | null {
		return this.webApp?.initDataUnsafe.user || null;
	}

	getThemeParams(): TelegramThemeParams {
		return this.webApp?.themeParams || {};
	}

	getColorScheme(): 'light' | 'dark' {
		return this.webApp?.colorScheme || 'light';
	}

	getInitData(): string {
		return this.webApp?.initData || '';
	}

	getVersion(): string {
		return this.webApp?.version || '';
	}

	getViewportHeight(): number {
		return this.webApp?.viewportHeight || window.innerHeight;
	}

	getViewportStableHeight(): number {
		return this.webApp?.viewportStableHeight || window.innerHeight;
	}

	isExpanded(): boolean {
		return this.webApp?.isExpanded || false;
	}

	expand(): void {
		this.webApp?.expand();
	}

	ready(): void {
		this.webApp?.ready();
	}

	close(): void {
		this.webApp?.close();
	}

	hapticImpact(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void {
		this.webApp?.hapticFeedback.impactOccurred(style);
	}

	hapticNotification(type: 'error' | 'success' | 'warning'): void {
		this.webApp?.hapticFeedback.notificationOccurred(type);
	}

	hapticSelectionChanged(): void {
		this.webApp?.hapticFeedback.selectionChanged();
	}

	backButtonShow(): void {
		this.webApp?.backButton.show();
	}

	backButtonHide(): void {
		this.webApp?.backButton.hide();
	}

	backButtonOnClick(callback: () => void): void {
		this.webApp?.backButton.onClick(callback);
	}

	backButtonOffClick(callback: () => void): void {
		this.webApp?.backButton.offClick(callback);
	}

	mainButtonShow(): void {
		this.webApp?.mainButton.show();
	}

	mainButtonHide(): void {
		this.webApp?.mainButton.hide();
	}

	mainButtonEnable(): void {
		this.webApp?.mainButton.enable();
	}

	mainButtonDisable(): void {
		this.webApp?.mainButton.disable();
	}

	mainButtonText(text: string): void {
		this.webApp?.mainButton.setText(text);
	}

	mainButtonOnClick(callback: () => void): void {
		this.webApp?.mainButton.onClick(callback);
	}

	mainButtonOffClick(callback: () => void): void {
		this.webApp?.mainButton.offClick(callback);
	}

	isAvailable(): boolean {
		return this.webApp !== null;
	}
}

// Export singleton instance
export const telegramWebApp = new TelegramWebAppWrapper();
