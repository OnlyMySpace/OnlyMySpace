<script lang="ts">
	import Navbar from "$components/navbar.svelte";
import type { PageData } from "./$types";

	export let data: PageData;
	let coins = data.coins;
</script>
	<Navbar coins={coins}/>
	<main>

	<slot />
</main>

<style lang="postcss">
	@import './shop.css';
</style>
