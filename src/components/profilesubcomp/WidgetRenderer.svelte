<script lang="ts">
	import { dev } from '$app/environment';
	import Cube from '$components/widgets/Cube.svelte';
	import MusicPlayer from '$components/widgets/MusicPlayer.svelte';
	import Quote from '$components/widgets/Quote.svelte';
	import TimeIs from '$components/widgets/TimeIs.svelte';
	import type { DynamicWidget, MusicWidgetData } from '$lib/widgets';
	import { onMount } from 'svelte';

	export let widget: DynamicWidget | null;

    let musicPlayerData: MusicWidgetData;
    let loadedMusicData = false;

    onMount(async () => {
        if (widget && widget.type == 'Music') {
			let widgetData: MusicWidgetData = widget.widgetData as MusicWidgetData;
			let req = await fetch('/api/fetchYT', {
				body: JSON.stringify({
					songURL: widgetData.songUrl
				}),
				method: 'POST'
			});
			if (req.ok) {
				let resp = await req.json();
				if (resp && resp.url && resp.cover) {
					musicPlayerData = {
						songName: widgetData.songName,
						songUrl: resp.url,
						songArtist: widgetData.songArtist,
						songCover: resp.cover
					};
					loadedMusicData = true;
				}
			} else {
				widget = null;
				console.error('Failed to fetch music player data');
				if (dev) {
					console.error(await req.text());
					console.error(req.status);
				}
			}
		}
    })
</script>
{#each [widget] as widget}
{#if widget}
	{#if widget.type == 'Music'}
		<div>
			{#if loadedMusicData}
				<MusicPlayer {...musicPlayerData} />
			{:else}
				<div class="card card-compact w-fit h-fit bg-base-100 shadow-xl skeleton">
					<div class="flex justify-center">
						<figure class="rounded-lg skeleton h-52 w-52"></figure>
					</div>
					<div class="card-body w-60">
						<div class="h-6 skeleton rounded-md w-3/4 mb-4"></div>
						<div class="h-4 skeleton rounded-md w-1/2 mb-4"></div>
						<div class="h-3 skeleton rounded-md w-1/3"></div>
					</div>
				</div>
			{/if}
		</div>
	{:else if widget.type == 'Cube'}
		<Cube />
	{:else if widget.type == 'Time' && 'timezone' in widget.widgetData}
		<TimeIs
			timezone={widget.widgetData.timezone}
			displayTimezone={widget.widgetData.displayTimezone}
		/>
	{:else if widget.type == 'Quote' && 'quotes' in widget.widgetData}
		<Quote {...widget.widgetData} />
	{/if}
{/if}
{/each}