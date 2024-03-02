<script lang="ts">
	import type { UserProfile } from "$lib";

	export let profile: UserProfile;
</script>
<div class="flex justify-center gap-4 backdrop-blur-lg px-4 py-2 bg-base-100 bg-opacity-20 rounded-lg">
    {#each profile.socials as social}
        {#if social.type == 'handle'}
            <div class="tooltip" data-tip={social.value}>
                <img class="w-6 h-6" src={social.icon} alt={social.name} />
            </div>
        {:else}
            <a href={social.value} class="tooltip" data-tip={social.name}>
                <img class="w-6 h-6" src={social.icon} alt={social.name} />
            </a>
        {/if}
    {/each}
</div>
