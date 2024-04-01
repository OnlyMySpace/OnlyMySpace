<script lang="ts">
	import type { PageData } from './$types';
	import { items } from '$lib/effects';

	export let data: PageData;
	let coins = data.coins;
	let item = items[data.slug];
	let owned = (data.ownedEffects ?? []).includes(data.slug);
</script>

<svelte:head>
	<title>{data.slug} - OnlyMySpace</title>
</svelte:head>
<main>
	<div class="flex flex-col items-center p-4 h-screen w-screen">
		<div class="bg-black bg-opacity-25 rounded-lg shadow-lg shadow-black p-4 w-full sm:w-96">
			<img src={item.image} alt={data.slug} class="w-full h-64 object-cover rounded-t-lg rounded-b-sm" />
			<h1 class="text-2xl font-bold pt-2">{data.slug}</h1>
			<p class="text-lg pt-2 pb-4">{item.description}</p>
			<div class="flex items-center" class:justify-between={!owned} class:justify-center={owned}>
				<p class:hidden={owned} class="font-bold">Cost: {item.cost} coins</p>
				<button class="btn" class:btn-ghost={!owned} class:nodef={owned} class:btn-success={owned}>{owned ? "You already own this" : "Buy"} </button>
			</div>
		</div>
	</div>
</main>


<style lang="postcss">
    @import '../shop.css';
</style>