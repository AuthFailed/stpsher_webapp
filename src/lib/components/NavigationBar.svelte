<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import HouseIcon from 'lucide-svelte/icons/house';
	import SettingsIcon from 'lucide-svelte/icons/settings';
	import {CalendarDaysIcon, ChartAreaIcon, Gamepad2Icon} from "lucide-svelte";

	interface NavItem {
		path: string;
		label: string;
		icon: typeof HouseIcon;
	}

	const navItems: NavItem[] = [
		{ path: '/', label: 'Главная', icon: HouseIcon },
		{ path: '/schedules', label: 'Графики', icon: CalendarDaysIcon },
		{ path: '/kpi', label: 'Показатели', icon: ChartAreaIcon },
		{ path: '/game', label: 'Игра', icon: Gamepad2Icon },
		{ path: '/settings', label: 'Настройки', icon: SettingsIcon }
	];

	let navContainer: HTMLElement;
	let indicators: HTMLElement[] = [];

	// Animate indicator position
	function updateIndicator() {
		if (typeof window === 'undefined') return;

		indicators.forEach((indicator, index) => {
			if (!indicator) return;
			const isActive = $page.url.pathname === navItems[index].path;
			indicator.style.opacity = isActive ? '1' : '0';
			indicator.style.transform = isActive ? 'scale(1)' : 'scale(0.8)';
		});
	}

	onMount(() => {
		updateIndicator();
	});

	// Watch page changes
	$effect(() => {
		// Trigger update when page changes
		const pathname = $page.url.pathname;
		setTimeout(updateIndicator, 0);
	});
</script>

<nav
	bind:this={navContainer}
	class="fixed bottom-0 left-0 right-0 z-50 bg-tg-header-bg/80 backdrop-blur-xl border-t border-tg-section-separator/50 safe-area-inset-bottom"
>
	<div class="max-w-screen-xl mx-auto px-2">
		<div class="flex items-center justify-around h-[72px]">
			{#each navItems as item, index}
				{@const isActive = $page.url.pathname === item.path}
				<a
					href={item.path}
					class="nav-item group relative flex flex-col items-center justify-center flex-1 h-full py-2"
					aria-label={item.label}
					aria-current={isActive ? 'page' : undefined}
				>
					<!-- Active indicator background -->
					<div
						bind:this={indicators[index]}
						class="absolute inset-0 rounded-xl transition-all duration-500 ease-out {isActive
							? 'bg-tg-button/10 scale-100 opacity-100'
							: 'bg-transparent scale-95 opacity-0'}"
					></div>

					<!-- Active indicator glow -->
					{#if isActive}
						<div class="absolute inset-0 rounded-xl bg-tg-button/20 blur-xl animate-pulse"></div>
					{/if}

					<!-- Icon container -->
					<div class="relative z-10 flex flex-col items-center justify-center">
						<!-- Icon with smooth animations -->
						<div
							class="relative transition-all duration-300 ease-out {isActive
								? 'text-tg-button scale-110'
								: 'text-tg-hint group-hover:text-tg-text group-hover:scale-105'}"
						>
							<item.icon class="w-6 h-6" />
						</div>

						<!-- Label with fade animation -->
						<span
							class="mt-1 text-[11px] font-medium transition-all duration-300 ease-out {isActive
								? 'text-tg-button opacity-100 translate-y-0'
								: 'text-tg-hint opacity-70 group-hover:opacity-100 group-hover:translate-y-0 translate-y-0.5'}"
						>
							{item.label}
						</span>
					</div>

					<!-- Ripple effect container -->
					<div class="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
						<div class="ripple"></div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</nav>

<style>
	/* Add safe area support for notched devices */
	:global(.safe-area-inset-bottom) {
		padding-bottom: env(safe-area-inset-bottom, 0px);
	}

	/* Smooth touch feedback */
	.nav-item {
		-webkit-tap-highlight-color: transparent;
		touch-action: manipulation;
	}

	/* Subtle hover effect */
	.nav-item:hover .ripple {
		animation: ripple 0.6s ease-out;
	}

	@keyframes ripple {
		0% {
			transform: scale(0);
			opacity: 0.5;
		}
		100% {
			transform: scale(4);
			opacity: 0;
		}
	}

	/* Prevent text selection */
	.nav-item {
		user-select: none;
		-webkit-user-select: none;
	}

	/* Smooth transitions for theme changes */
	nav {
		transition: background-color 0.3s ease, border-color 0.3s ease;
	}

	/* Enhanced active state animations */
	.nav-item .animate-pulse {
		animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse-subtle {
		0%,
		100% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.15;
		}
	}

	/* Improve contrast and readability */
	.nav-item span {
		letter-spacing: 0.01em;
	}
</style>
