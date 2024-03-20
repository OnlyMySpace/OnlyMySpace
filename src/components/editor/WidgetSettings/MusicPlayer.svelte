<script lang="ts">
	import { profileStore } from '$lib/stores';
    import type { MusicWidgetData } from '$lib/widgets';

    let songname: string, songartist: string, songurl: string;

    $: {
        if ($profileStore != null && $profileStore.widget != null) {
            ($profileStore.widget.widgetData as MusicWidgetData).songName = songname;
            ($profileStore.widget.widgetData as MusicWidgetData).songArtist = songartist;
            ($profileStore.widget.widgetData as MusicWidgetData).songUrl = songurl;
        }
    }
</script>

{#if $profileStore != null && $profileStore.widget != null}
	<label for="songname" class="label text-white text-xl font-bold">Song name</label>
	<input
		id="songname"
		class="input w-full max-w-xs"
		bind:value={songname}
	/>

    <label for="songartist" class="label text-white text-xl font-bold">Song artist</label>
    <input
        id="songartist"
        class="input w-full max-w-xs"
        bind:value={songartist}
    />

    <label for="songurl" class="label text-white text-xl font-bold">Song url</label>
    <input
        id="songurl"
        class="input w-full max-w-xs"
        bind:value={songurl}
        placeholder="https://youtu.be/..."
        />
{/if}

<style lang="postcss">
	input,
	textarea,
	select {
		@apply bg-[rgba(0,0,0,0.1)] backdrop-blur-lg text-white placeholder:text-white/70 border-4 border-black border-opacity-10;
	}
</style>
