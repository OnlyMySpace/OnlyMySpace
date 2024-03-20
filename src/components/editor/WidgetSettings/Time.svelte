<script lang="ts">
	// Ello
	import Loading from '$components/Loading.svelte';
	import { profileStore } from '$lib/stores';
	import type { TimeWidgetData } from '$lib/widgets';

	let voiding: boolean;

	function validateTimezone(tz: string): boolean {
		try {
			Intl.DateTimeFormat(undefined, { timeZone: tz });
			return true;
		} catch (ex) {
			return false;
		}
	}

	let tz: string;
	let displayTZ: boolean;
	tz = ($profileStore?.widget?.widgetData as TimeWidgetData).timezone ?? 'Europe/London';
	displayTZ = ($profileStore?.widget?.widgetData as TimeWidgetData).displayTimezone ?? true;
	$: {
		if ($profileStore != null && $profileStore.widget != null) {
			($profileStore.widget.widgetData as TimeWidgetData).timezone = tz;
			($profileStore.widget.widgetData as TimeWidgetData).displayTimezone = displayTZ;
		}
	}
	$: timezoneValid = validateTimezone(tz);
</script>

{#if $profileStore != null && $profileStore.widget != null && Object.keys($profileStore.widget.widgetData).includes('timezone')}
	<label for="timezone" class="label text-white text-xl font-bold">Timezone</label>
	<input
		type="text"
		class="input w-full max-w-xs"
		id="timezone"
		bind:value={tz}
		placeholder="Europe/London"
		class:input-error={!timezoneValid}
		class:input-success={timezoneValid}
	/>
	<label for="displayTimezone" class="label text-white text-xl font-bold">Display Timezone</label>
	<input
		type="checkbox"
		id="displayTimezone"
		class="toggle toggle-ghost hover:bg-[rgba(0,0,0,0.2)]"
		bind:checked={displayTZ}
	/>
{:else}
	<Loading />
{/if}

<style lang="postcss">
	input,
	textarea,
	select {
		@apply bg-[rgba(0,0,0,0.1)] backdrop-blur-lg text-white placeholder:text-white/70 border-4 border-black border-opacity-10;
	}
</style>
