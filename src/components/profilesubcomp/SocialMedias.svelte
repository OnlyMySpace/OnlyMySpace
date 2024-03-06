<script lang="ts">
	import type { UserProfile } from "$lib";

    let socialUrlMap: { [key: string]: string } = {
        'discord': 'https://discord.gg/',
        'twitter': 'https://twitter.com/',
        'youtube': 'https://youtube.com/@',
        'instagram': 'https://instagram.com/',
        'twitch': 'https://twitch.tv/',
        'patreon': 'https://www.patreon.com/',
        'spotify': 'https://open.spotify.com/user/',
        'telegram': 'https://t.me/',
        'tiktok': 'https://www.tiktok.com/@',
        'paypal': 'https://paypal.me/',
        'reddit': 'https://reddit.com/u/',
    }

	export let profile: UserProfile;
</script>
<div class="flex justify-center gap-4 backdrop-blur-lg px-4 py-2 bg-base-100 bg-opacity-20 rounded-lg">
    {#each profile.socials as social}
        {#if social.type == 'handle'}
            <div class="tooltip" data-tip={social.value}>
                <img class="w-6 h-6" src={social.icon} alt={social.name} />
            </div>
        {:else}
            <a href={socialUrlMap[social.icon.split('.')[0].split('/')[2]] + social.value} class="tooltip" data-tip={social.name}>
                <img class="w-6 h-6" src={social.icon} alt={social.name} />
            </a>
        {/if}
    {/each}
</div>
