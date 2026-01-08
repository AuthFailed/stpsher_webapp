<script lang="ts">
    import {user} from '$lib/stores/telegram';
    import {employeeFullname} from '$lib/stores/employee';
</script>

<div class="container mx-auto px-4 py-8">
    <header class="mb-8">
        <h1 class="text-2xl font-bold text-tg-text mb-2">Главная</h1>
    </header>

    {#if $user}
        <section class="bg-tg-secondary-bg rounded-lg p-4 mb-6">
            <h2 class="text-lg font-semibold text-tg-text mb-3">Информация о пользователе</h2>
            <div class="space-y-2 text-sm">
                <p class="text-tg-text">
                    <span class="text-tg-hint">Имя:</span>
                    {#if $employeeFullname}
                        {$employeeFullname}
                    {:else}
                        {$user.first_name}
                        {#if $user.last_name} {$user.last_name}{/if}
                    {/if}
                </p>
                {#if $user.username}
                    <p class="text-tg-text">
                        <span class="text-tg-hint">Username:</span> @{$user.username}
                    </p>
                {/if}
                <p class="text-tg-text">
                    <span class="text-tg-hint">ID:</span> {$user.id}
                </p>
                {#if $user.language_code}
                    <p class="text-tg-text">
                        <span class="text-tg-hint">Язык:</span> {$user.language_code}
                    </p>
                {/if}
                {#if $user.is_premium}
                    <p class="text-tg-button">✨ Premium</p>
                {/if}
            </div>
        </section>
    {/if}

    <section class="bg-tg-secondary-bg rounded-lg p-6 text-center">
        <p class="text-tg-subtitle-text text-sm mt-2">MVP версия</p>
    </section>
</div>
