<script lang="ts">
    import {colorScheme, version, user} from '$lib/stores/telegram';
    import * as Card from '$lib/components/ui/card/index.js';
    import * as Field from '$lib/components/ui/field/index.js';
    import {Separator} from '$lib/components/ui/separator/index.js';
    import {Switch} from '$lib/components/ui/switch/index.js';
    import {Checkbox} from '$lib/components/ui/checkbox/index.js';

    // Settings state (mocked - will be replaced with API calls later)
    const notifications = $state({
        push: true,
        email: false,
        sms: false,
        mentions: true,
        updates: true
    });

    const privacy = $state({
        profileVisible: true,
        showActivity: true,
        allowMessages: true,
        showOnline: true
    });

    const appearance = $state({
        darkMode: $colorScheme === 'dark',
        reducedMotion: false,
        compactMode: false
    });

    const account = $state({
        twoFactor: false,
        loginAlerts: true,
        dataCollection: false
    });

    // Mock save function (will be replaced with API call later)
    function saveSettings() {
        console.log('Saving settings:', {
            notifications: {...notifications},
            privacy: {...privacy},
            appearance: {...appearance},
            account: {...account}
        });
        // TODO: Replace with actual API call
        // await fetch('/api/settings', {
        //   method: 'POST',
        //   body: JSON.stringify({ notifications, privacy, appearance, account })
        // });
    }

    // Watch for changes and save automatically
    $effect(() => {
        saveSettings();
    });
</script>

<div class="container mx-auto px-4 py-6 pb-24">
    <header class="mb-6">
        <h1 class="text-2xl font-bold text-tg-text mb-2">Настройки</h1>
        <p class="text-tg-hint text-sm">Управление настройками приложения</p>
    </header>

    <!-- User Info Card -->
    {#if $user}
        <Card.Root class="mb-6 bg-tg-secondary-bg border-tg-section-separator">
            <Card.Content class="p-4">
                <div class="flex items-center gap-3">
                    {#if $user.photo_url}
                        <img
                            src={$user.photo_url}
                            alt={$user.first_name}
                            class="w-12 h-12 rounded-full object-cover"
                        />
                    {:else}
                        <div class="w-12 h-12 rounded-full bg-tg-button flex items-center justify-center text-tg-button-text text-lg font-bold">
                            {$user.first_name[0]}
                        </div>
                    {/if}
                    <div>
                        <p class="font-semibold text-tg-text">
                            {$user.first_name} {$user.last_name || ''}
                        </p>
                        <p class="text-sm text-tg-hint">@{$user.username || 'user'}</p>
                    </div>
                </div>
            </Card.Content>
        </Card.Root>
    {/if}

    <!-- Notifications Section -->
    <Card.Root class="mb-4 bg-tg-secondary-bg border-tg-section-separator">
        <Card.Content class="p-4">
            <h2 class="text-lg font-semibold text-tg-text mb-4">Уведомления</h2>
            <Field.Group class="gap-4">
                <Field.Field orientation="horizontal">
                    <Switch
                            bind:checked={notifications.push}
                            class="data-[state=checked]:bg-tg-button"
                            id="notif-push"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="notif-push">
                            Push-уведомления
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Получать уведомления на устройстве
                        </Field.Description>
                    </Field.Content>
                </Field.Field>

                <Separator/>

                <Field.Field orientation="horizontal">
                    <Switch
                            bind:checked={notifications.mentions}
                            class="data-[state=checked]:bg-tg-button"
                            id="notif-mentions"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="notif-mentions">Упоминания</Field.Label>
                        <Field.Description class="text-tg-hint">
                            Когда вас упоминают в сообщениях
                        </Field.Description>
                    </Field.Content>
                </Field.Field>

                <Separator/>

                <Field.Field orientation="horizontal">
                    <Switch
                            bind:checked={notifications.updates}
                            class="data-[state=checked]:bg-tg-button"
                            id="notif-updates"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="notif-updates">
                            Обновления приложения
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Новости и новые функции
                        </Field.Description>
                    </Field.Content>
                </Field.Field>

                <Separator/>

                <Field.Field orientation="horizontal">
                    <Switch
                            bind:checked={notifications.email}
                            class="data-[state=checked]:bg-tg-button"
                            id="notif-email"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="notif-email">
                            Email-уведомления
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Получать копию на email
                        </Field.Description>
                    </Field.Content>
                </Field.Field>
            </Field.Group>
        </Card.Content>
    </Card.Root>

    <!-- Privacy Section -->
    <Card.Root class="mb-4 bg-tg-secondary-bg border-tg-section-separator">
        <Card.Content class="p-4">
            <h2 class="text-lg font-semibold text-tg-text mb-4">Приватность</h2>
            <Field.Group class="gap-4">
                <Field.Field orientation="horizontal">
                    <Checkbox
                            bind:checked={privacy.profileVisible}
                            class="border-tg-section-separator data-[state=checked]:bg-tg-button data-[state=checked]:border-tg-button"
                            id="privacy-profile"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="privacy-profile">
                            Показывать профиль
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Другие пользователи могут видеть ваш профиль
                        </Field.Description>
                    </Field.Content>
                </Field.Field>

                <Separator/>

                <Field.Field orientation="horizontal">
                    <Checkbox
                            bind:checked={privacy.showActivity}
                            class="border-tg-section-separator data-[state=checked]:bg-tg-button data-[state=checked]:border-tg-button"
                            id="privacy-activity"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="privacy-activity">
                            Показывать активность
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Видно, когда вы были в сети
                        </Field.Description>
                    </Field.Content>
                </Field.Field>

                <Separator/>

                <Field.Field orientation="horizontal">
                    <Checkbox
                            bind:checked={privacy.allowMessages}
                            class="border-tg-section-separator data-[state=checked]:bg-tg-button data-[state=checked]:border-tg-button"
                            id="privacy-messages"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="privacy-messages">
                            Сообщения от всех
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Разрешить писать незнакомым пользователям
                        </Field.Description>
                    </Field.Content>
                </Field.Field>

                <Separator/>

                <Field.Field orientation="horizontal">
                    <Checkbox
                            bind:checked={privacy.showOnline}
                            class="border-tg-section-separator data-[state=checked]:bg-tg-button data-[state=checked]:border-tg-button"
                            id="privacy-online"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="privacy-online">
                            Статус онлайн
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Показывать, что вы онлайн
                        </Field.Description>
                    </Field.Content>
                </Field.Field>
            </Field.Group>
        </Card.Content>
    </Card.Root>

    <!-- Appearance Section -->
    <Card.Root class="mb-4 bg-tg-secondary-bg border-tg-section-separator">
        <Card.Content class="p-4">
            <h2 class="text-lg font-semibold text-tg-text mb-4">Внешний вид</h2>
            <Field.Group class="gap-4">
                <Field.Field orientation="horizontal">
                    <Switch
                            bind:checked={appearance.darkMode}
                            class="data-[state=checked]:bg-tg-button"
                            id="appearance-dark"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="appearance-dark">
                            Темная тема
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Использовать темную тему оформления
                        </Field.Description>
                    </Field.Content>
                </Field.Field>

                <Separator/>

                <Field.Field orientation="horizontal">
                    <Switch
                            bind:checked={appearance.compactMode}
                            class="data-[state=checked]:bg-tg-button"
                            id="appearance-compact"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="appearance-compact">
                            Компактный режим
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Больше контента на экране
                        </Field.Description>
                    </Field.Content>
                </Field.Field>

                <Separator/>

                <Field.Field orientation="horizontal">
                    <Switch
                            bind:checked={appearance.reducedMotion}
                            class="data-[state=checked]:bg-tg-button"
                            id="appearance-motion"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="appearance-motion">
                            Снижение анимации
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Уменьшить движение на экране
                        </Field.Description>
                    </Field.Content>
                </Field.Field>
            </Field.Group>
        </Card.Content>
    </Card.Root>

    <!-- Account Section -->
    <Card.Root class="mb-4 bg-tg-secondary-bg border-tg-section-separator">
        <Card.Content class="p-4">
            <h2 class="text-lg font-semibold text-tg-text mb-4">Аккаунт</h2>
            <Field.Group class="gap-4">
                <Field.Field orientation="horizontal">
                    <Checkbox
                            bind:checked={account.twoFactor}
                            class="border-tg-section-separator data-[state=checked]:bg-tg-button data-[state=checked]:border-tg-button"
                            id="account-2fa"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="account-2fa">
                            Двухфакторная аутентификация
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Дополнительный слой защиты
                        </Field.Description>
                    </Field.Content>
                </Field.Field>

                <Separator/>

                <Field.Field orientation="horizontal">
                    <Checkbox
                            bind:checked={account.loginAlerts}
                            class="border-tg-section-separator data-[state=checked]:bg-tg-button data-[state=checked]:border-tg-button"
                            id="account-alerts"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="account-alerts">
                            Оповещения о входе
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Уведомлять о новых входах в аккаунт
                        </Field.Description>
                    </Field.Content>
                </Field.Field>

                <Separator/>

                <Field.Field orientation="horizontal">
                    <Checkbox
                            bind:checked={account.dataCollection}
                            class="border-tg-section-separator data-[state=checked]:bg-tg-button data-[state=checked]:border-tg-button"
                            id="account-data"
                    />
                    <Field.Content>
                        <Field.Label class="text-tg-text" for="account-data">
                            Сбор аналитики
                        </Field.Label>
                        <Field.Description class="text-tg-hint">
                            Помогать улучшать приложение
                        </Field.Description>
                    </Field.Content>
                </Field.Field>
            </Field.Group>
        </Card.Content>
    </Card.Root>

    <!-- App Info -->
    <Card.Root class="bg-tg-secondary-bg border-tg-section-separator">
        <Card.Content class="p-4">
            <h2 class="text-lg font-semibold text-tg-text mb-3">О приложении</h2>
            <div class="space-y-2 text-sm">
                <p class="text-tg-text">
                    <span class="text-tg-hint">Версия:</span> 1.0.0
                </p>
                {#if $version}
                    <p class="text-tg-text">
                        <span class="text-tg-hint">Telegram WebApp:</span> {$version}
                    </p>
                {/if}
                <p class="text-tg-text">
                    <span class="text-tg-hint">Тема:</span>
                    {$colorScheme === 'light' ? 'Светлая' : 'Темная'}
                </p>
            </div>
        </Card.Content>
    </Card.Root>
</div>
