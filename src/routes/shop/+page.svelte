<script lang="ts">
	import { dev } from '$app/environment';
	import { items, type Item } from '$lib/effects';
	import type { PageData } from './$types';
	export let data: PageData;
	let ownedEffects = data.ownedEffects ?? [];
</script>

<svelte:head>
	<title>Shop - OnlyMySpace</title>
</svelte:head>
<main>

	{#if dev}
		<div
			class="grid grid-cols-2 lg:grid-cols-6 grid-flow-row gap-4 md:gap-5 lg:gap-6 p-4 w-full h-full lg:h-screen bg-inherit"
		>
			{#each Object.keys(items) as item}
				{@const owned = ownedEffects.includes(item)}
				<div
					class="w-full h-fit bg-black bg-opacity-30 rounded-lg p-2 shadow-sm shadow-black hover:scale-105 hover:transition hover:duration-300 after:transition hover:duration-300"
				>
					<img src={items[item].image} alt={item} class="w-full h-1/2 object-cover rounded-lg" />
					<p class="text-2xl font-bold pt-1">{item}</p>
					<p class="text-lg">{items[item].description}</p>
					<button
						class="btn w-full mt-4"
						class:btn-ghost={!owned}
						class:btn-success={owned}
						class:nodef={owned}
						on:click={() => (window.location.href = `/shop/${item}`)}
						>{owned ? 'You already own this' : 'Buy'}</button
					>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col justify-center items-center w-full h-full lg:h-screen">
			<h1 class="text-3xl font-bold text-center py-4">Something is being built here!</h1>
			<p class="text-center">The shop isn't avaible yet. But heres a cat picture as compensation</p>
			<img src="https://cataas.com/cat" class="w-fit max-w-md h-fit rounded-lg m-4 border-solid border-2 border-pink-400 shadow-sm shadow-black" alt="" />
		</div>
	{/if}
</main>

<style lang="postcss">
	@import './shop.css';
</style>
