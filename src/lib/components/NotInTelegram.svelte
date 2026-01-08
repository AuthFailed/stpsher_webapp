<script lang="ts">
    import {Button} from '$lib/components/ui/button';

    const BOT_USERNAME = 'stpsher_bot';
    const botUrl = `https://t.me/${BOT_USERNAME}`;
</script>

<div class="flex items-center justify-center min-h-screen p-6">
    <div class="text-center max-w-md">
        <!-- Telegram Icon -->
        <div class="mb-6">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-tg-button/10">
                <svg
                        class="w-10 h-10 text-tg-button"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
            </div>
        </div>

        <!-- Error Message -->
        <h1 class="text-2xl font-bold text-tg-text mb-3">
            Открой в Telegram
        </h1>

        <p class="text-tg-hint mb-6">
            Это приложение работает только внутри Telegram. Нажми кнопку ниже, чтобы открыть бота.
        </p>

        <!-- Open Bot Button -->
        <a href={botUrl} rel="noopener noreferrer" target="_blank">
            <Button class="gap-2" size="lg" variant="default">
                Открыть @{BOT_USERNAME}
            </Button>
        </a>
    </div>
</div>
