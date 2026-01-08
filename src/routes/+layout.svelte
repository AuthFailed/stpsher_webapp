<script lang="ts">
	import "../app.css";
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { telegram } from '$lib/stores/telegram';
	import NavigationBar from '$lib/components/NavigationBar.svelte';

	let { children } = $props();

	// Initialize Telegram WebApp on mount
	onMount(() => {
		if (browser) {
			telegram.initialize();
			applyTelegramTheme();
		}
	});

	// Apply Telegram theme CSS variables
	function applyTelegramTheme() {
		const webApp = window.Telegram?.WebApp;
		if (!webApp) return;

		const root = document.documentElement;
		const theme = webApp.themeParams;

		// Map Telegram theme colors to CSS variables
		if (theme.bg_color) root.style.setProperty('--tg-theme-bg-color', theme.bg_color);
		if (theme.text_color) root.style.setProperty('--tg-theme-text-color', theme.text_color);
		if (theme.hint_color) root.style.setProperty('--tg-theme-hint-color', theme.hint_color);
		if (theme.link_color) root.style.setProperty('--tg-theme-link-color', theme.link_color);
		if (theme.button_color) root.style.setProperty('--tg-theme-button-color', theme.button_color);
		if (theme.button_text_color)
			root.style.setProperty('--tg-theme-button-text-color', theme.button_text_color);
		if (theme.secondary_bg_color)
			root.style.setProperty('--tg-theme-secondary-bg-color', theme.secondary_bg_color);
		if (theme.header_bg_color)
			root.style.setProperty('--tg-theme-header-bg-color', theme.header_bg_color);
		if (theme.section_bg_color)
			root.style.setProperty('--tg-theme-section-bg-color', theme.section_bg_color);
		if (theme.section_header_text_color)
			root.style.setProperty('--tg-theme-section-header-text-color', theme.section_header_text_color);
		if (theme.section_separator_color)
			root.style.setProperty('--tg-theme-section-separator-color', theme.section_separator_color);
		if (theme.subtitle_text_color)
			root.style.setProperty('--tg-theme-subtitle-text-color', theme.subtitle_text_color);

		// Listen for theme changes
		webApp.onEvent('themeChanged', () => {
			const updatedTheme = webApp.themeParams;
			if (updatedTheme.bg_color) root.style.setProperty('--tg-theme-bg-color', updatedTheme.bg_color);
			if (updatedTheme.text_color)
				root.style.setProperty('--tg-theme-text-color', updatedTheme.text_color);
			if (updatedTheme.hint_color)
				root.style.setProperty('--tg-theme-hint-color', updatedTheme.hint_color);
			if (updatedTheme.link_color)
				root.style.setProperty('--tg-theme-link-color', updatedTheme.link_color);
			if (updatedTheme.button_color)
				root.style.setProperty('--tg-theme-button-color', updatedTheme.button_color);
			if (updatedTheme.button_text_color)
				root.style.setProperty('--tg-theme-button-text-color', updatedTheme.button_text_color);
			if (updatedTheme.secondary_bg_color)
				root.style.setProperty('--tg-theme-secondary-bg-color', updatedTheme.secondary_bg_color);
			if (updatedTheme.header_bg_color)
				root.style.setProperty('--tg-theme-header-bg-color', updatedTheme.header_bg_color);
			if (updatedTheme.section_bg_color)
				root.style.setProperty('--tg-theme-section-bg-color', updatedTheme.section_bg_color);
			if (updatedTheme.section_header_text_color)
				root.style.setProperty(
					'--tg-theme-section-header-text-color',
					updatedTheme.section_header_text_color
				);
			if (updatedTheme.section_separator_color)
				root.style.setProperty(
					'--tg-theme-section-separator-color',
					updatedTheme.section_separator_color
				);
			if (updatedTheme.subtitle_text_color)
				root.style.setProperty('--tg-theme-subtitle-text-color', updatedTheme.subtitle_text_color);
		});
	}
</script>

<svelte:head>
	<title>Telegram Web App</title>
	<meta name="description" content="Telegram Web App built with SvelteKit" />
</svelte:head>

<div class="flex flex-col min-h-screen bg-tg-bg text-tg-text">
	<!-- Main content area -->
	<main class="flex-1 overflow-y-auto pb-20">
		{@render children()}
	</main>

	<!-- Bottom navigation bar -->
	<NavigationBar />
</div>
