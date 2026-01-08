/**
 * TypeScript types for Telegram WebApp API
 * Based on https://core.telegram.org/bots/webapps
 */

export interface TelegramUser {
	id: number;
	first_name: string;
	last_name?: string;
	username?: string;
	language_code?: string;
	is_premium?: boolean;
	photo_url?: string;
}

export interface TelegramThemeParams {
	bg_color?: string;
	text_color?: string;
	hint_color?: string;
	link_color?: string;
	button_color?: string;
	button_text_color?: string;
	secondary_bg_color?: string;
	header_bg_color?: string;
	section_bg_color?: string;
	section_header_text_color?: string;
	section_separator_color?: string;
	subtitle_text_color?: string;
}

export interface TelegramWebApp {
	initData: string;
	initDataUnsafe: TelegramInitDataUnsafe;
	version: string;
	colorScheme: 'light' | 'dark';
	themeParams: TelegramThemeParams;
	isExpanded: boolean;
	viewportHeight: number;
	viewportStableHeight: number;
	headerColor: string;
	backgroundColor: string;
	isClosingConfirmationEnabled: boolean;
	backButton: TelegramBackButton;
	mainButton: TelegramMainButton;
	hapticFeedback: TelegramHapticFeedback;
	ready: () => void;
	expand: () => void;
	close: () => void;
	enableClosingConfirmation: () => void;
	disableClosingConfirmation: () => void;
	onEvent: (eventType: string, callback: () => void) => void;
	offEvent: (eventType: string, callback: () => void) => void;
}

export interface TelegramInitDataUnsafe {
	query_id?: string;
	user?: TelegramUser;
	auth_date?: number;
	hash?: string;
	start_param?: string;
	chat_type?: string;
	chat_instance?: string;
}

export interface TelegramBackButton {
	isVisible: boolean;
	onClick: (callback: () => void) => void;
	offClick: (callback: () => void) => void;
	show: () => void;
	hide: () => void;
}

export interface TelegramMainButton {
	text: string;
	textColor: string;
	color: string;
	isVisible: boolean;
	isActive: boolean;
	isProgressVisible: boolean;
	setText: (text: string) => void;
	onClick: (callback: () => void) => void;
	offClick: (callback: () => void) => void;
	show: () => void;
	hide: () => void;
	enable: () => void;
	disable: () => void;
	showProgress: (leaveActive: boolean) => void;
	hideProgress: () => void;
	setParams: (params: {
		text?: string;
		color?: string;
		textColor?: string;
		isActive?: boolean;
		isVisible?: boolean;
	}) => void;
}

export interface TelegramHapticFeedback {
	impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
	notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
	selectionChanged: () => void;
}

// Declare global Window interface for Telegram WebApp
declare global {
	interface Window {
		Telegram?: {
			WebApp: TelegramWebApp;
		};
	}
}

export {};
