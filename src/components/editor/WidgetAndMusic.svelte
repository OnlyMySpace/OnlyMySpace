<script lang="ts">
	import Loading from '$components/Loading.svelte';
	import { Widgets, type DynamicWidget } from '$lib/widgets';
	import { profileStore } from '$lib/stores';
	import { SvelteComponent, type ComponentType } from 'svelte';
	import { onMount } from 'svelte';

	let wmap = {
		// 'Music Player': Widgets.Music, @note: This is deprecated
		Cube: Widgets.Cube,
		'Current Time': Widgets.Time,
		Quotes: Widgets.Quote,
		None: null
	};

	async function renderWidget(name: string): Promise<ComponentType<SvelteComponent>> {
		if (name == 'Music Player') {
			return (await import('./WidgetSettings/MusicPlayer.svelte')).default; // @NOTE: This is deprecated
		} else if (name == 'Current Time') {
			return (await import('./WidgetSettings/Time.svelte')).default;
		} else if (name == 'Quotes') {
			return (await import('./WidgetSettings/Quotes.svelte')).default;
		}
		// Unreachable
		return (await import('./WidgetSettings/None.svelte')).default;
	}

	$: widgetVal = widgetToValue($profileStore ? $profileStore.widget : null);

	function widgetToValue(widget: DynamicWidget | null): string {
		if (!widget) return 'None';

		return Object.keys(wmap).find((w) => wmap[w as keyof typeof wmap] === widget.type) ?? 'None';
	}

	function handleSelect(ev: Event) {
		if (!ev.target || (ev.target as HTMLSelectElement).value == null || !$profileStore) return;
		let target = ev.target as HTMLSelectElement;
		$profileStore.widget = {
			type: wmap[target.value as keyof typeof wmap] as DynamicWidget['type'],
			widgetData: {}
		};
	}

	onMount(() => {
		if ($profileStore && $profileStore.music == null) {
			$profileStore.music = {
				songUrl: '',
				autoplayClickMessage: 'Click me!',
				autoplayDelay: 0
			}
		}
	})
</script>

{#if $profileStore != null}
	<div class="grouped">
		<label for="musicsettings" class="text-white text-xl font-bold">Music Player</label>
		<div id="musicsettings" class="w-full flex flex-col gap-2 max-w-xs">
			{#if $profileStore.music}
			<label class="label text-white text-lg font-bold" for="songurl">Youtube URL</label>
			<input id="songurl" class="input w-full max-w-xs" placeholder="Youtube URL" bind:value={$profileStore.music.songUrl} type="text">
			<label class="label text-white text-lg font-bold" for="autoclick">Autoplay click message</label>
			<input id="autoclick" class="input w-full max-w-xs" placeholder="Click me!" bind:value={$profileStore.music.autoplayClickMessage} type="text">
			<label class="label text-white text-lg font-bold" for="autodelay">Autoplay delay (seconds)</label>
			<input id="autodelay" class="input w-full max-w-xs" min="0" placeholder="Autoplay delay (seconds)" bind:value={$profileStore.music.autoplayDelay} type="number">
			{/if}
		</div>
	</div>
	<div class="grouped">
		<label class="label text-white text-xl font-bold" for="selectwidget">Widgets</label>
		<select
			id="selectwidget"
			class="select select-ghost w-full max-w-xs"
			on:change={handleSelect}
			bind:value={widgetVal}
		>
			<option disabled selected>Select a widget</option>
			{#each Object.keys(wmap) as widget}
				<option class="text-black" value={widget}>{widget}</option>
			{/each}
		</select>
	</div>
	<div class="grouped">
		<label
			aria-label="Widget Settings"
			class="label text-white text-xl font-bold"
			for="widgetsettings">Settings</label
		>
		{#if widgetVal != 'None'}
			{#await renderWidget(widgetVal) then C}
				<svelte:component this={C} />
			{/await}
		{:else}
			<p class="text-white/50">No settings for this widget</p>
		{/if}
	</div>
{:else}
	<Loading />
{/if}

<style lang="postcss">
	input,
	textarea,
	select {
		@apply bg-[rgba(0,0,0,0.1)] backdrop-blur-lg text-white placeholder:text-white/70 border-4 border-black border-opacity-10;
	}

	button {
		@apply btn bg-[rgba(255,255,255,0.1)] shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur-lg border-2 border-solid border-[rgba(255,255,255,0.3)] my-2 rounded-md;
	}
	button:not(.cbtn) {
		@apply max-w-xs w-32;
	}
</style>
