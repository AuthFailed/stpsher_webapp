<script lang="ts">
    import {user} from '$lib/stores/telegram';
</script>

<div class="flex items-center justify-center min-h-screen p-6">
    <div class="text-center max-w-md">
        <!-- Error Icon -->
        <div class="mb-6">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10">
                <svg
                        class="w-10 h-10 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                    ></path>
                </svg>
            </div>
        </div>

        <!-- Error Message -->
        <h1 class="text-2xl font-bold text-tg-text mb-3">
            Доступ запрещён
        </h1>

        <p class="text-tg-hint mb-6">
            Для получения доступа обратись к своему руководителю.
        </p>

        <!-- User Info (if available) -->
        {#if $user}
            <div class="bg-tg-secondary-bg rounded-lg p-4 mb-4">
                <p class="text-sm text-tg-hint">
                    Telegram ID:
                    <span class="text-tg-text font-mono ml-2">{$user.id}</span>
                </p>
                {#if $user.username}
                    <p class="text-sm text-tg-hint mt-1">
                        Username:
                        <span class="text-tg-text ml-2">@{$user.username}</span>
                    </p>
                {/if}
            </div>
        {/if}
    </div>
</div>
