<script lang="ts">
    import "../app.css";
    import {onMount} from 'svelte';
    import {browser} from '$app/environment';
    import {telegram, user} from '$lib/stores/telegram';
    import {hasAccess, isLoading, hasChecked, employeeStore} from '$lib/stores/employee';
    import NavigationBar from '$lib/components/NavigationBar.svelte';
    import AccessDenied from '$lib/components/AccessDenied.svelte';
    import NotInTelegram from '$lib/components/NotInTelegram.svelte';

    let {children} = $props();
    let userId = $derived($user?.id);
    let hasTelegramWebApp = $state(false);

    // Synchronous check for Telegram WebApp (runs before render)
    // We check initData because it only exists when actually inside Telegram
    if (browser && window.Telegram?.WebApp?.initData) {
        hasTelegramWebApp = true;
    }

    // Initialize Telegram WebApp on mount
    onMount(() => {
        if (browser && hasTelegramWebApp) {
            telegram.initialize();
            applyTelegramTheme();
        }
    });

    // Check employee access when user ID becomes available AND we're in Telegram
    $effect(() => {
        if (userId && !$hasChecked && hasTelegramWebApp) {
            employeeStore.checkAccess(userId);
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
    <meta content="Telegram Web App" name="description"/>
</svelte:head>

<div class="flex flex-col min-h-screen bg-tg-bg text-tg-text">
    <!-- Main content area -->
    <main class="flex-1 overflow-y-auto pb-20">
        {#if !browser}
            <!-- SSR fallback - show loading -->
            <div class="flex items-center justify-center min-h-screen">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-tg-button mx-auto mb-4"></div>
                    <p class="text-tg-hint">Загрузка...</p>
                </div>
            </div>
        {:else if !hasTelegramWebApp}
            <!-- Not in Telegram WebApp -->
            <NotInTelegram/>
        {:else if $isLoading}
            <!-- Loading state -->
            <div class="flex items-center justify-center min-h-screen">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-tg-button mx-auto mb-4"></div>
                    <p class="text-tg-hint">Проверка доступа...</p>
                </div>
            </div>
        {:else if $hasAccess === false && $hasChecked}
            <!-- Access denied -->
            <AccessDenied/>
        {:else}
            <!-- User has access, render children -->
            {@render children()}

            <NavigationBar/>
        {/if}
    </main>
</div>
