<script lang="ts">
	import { profileStore } from '$lib/stores';
	import type { QuoteWidgetData } from '$lib/widgets';

	let quotes = ($profileStore?.widget?.widgetData as QuoteWidgetData).quotes ?? [];
</script>

{#if $profileStore != null && $profileStore.widget != null}
	<button
		type="button"
		class="btn-primary btn my-4 rounded-md"
		on:click={() => {
			quotes.push({ text: '', author: '' });
			quotes = quotes;
		}}>Add Quote</button
	>
	{#each quotes as quote}
		<div class="flex flex-row justify-center items-center gap-2 grouped">
			<input
				type="text"
				placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				class="input w-full max-w-xs"
				bind:value={quote.text}
			/>
			<input
				type="text"
				placeholder="John Doe"
				class="input w-full max-w-xs"
				bind:value={quote.author}
			/>
			<button type="button" on:click={() => (quotes = quotes.filter((q) => q !== quote))}
				>Remove Quote</button
			>
		</div>
	{/each}
{/if}

<style lang="postcss">
	input,
	textarea,
	select {
		@apply bg-[rgba(0,0,0,0.1)] backdrop-blur-lg text-white placeholder:text-white/70 border-4 border-black border-opacity-10;
	}

	button {
		@apply btn btn-ghost bg-[rgba(255,255,255,0.1)] shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur-lg border-2 border-solid border-[rgba(255,255,255,0.3)] my-2 rounded-md;
	}
</style>
