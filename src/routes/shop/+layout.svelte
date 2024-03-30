<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	let coins = data.coins;
</script>
	<nav class="navbar bg-black bg-opacity-20 text-neutral-content">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl" href="/"
				><img src="/favicon.png" class="w-10 h-10 md:w-16 md:h-16" alt="OnlyMySpace logo" />
			</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li><a href="/shop">Shop</a></li>
				<li><a href="/editor">Editor</a></li>
				<li><a href="/contact">Contact</a></li>
				<!-- Coin display -->
				<li><a href="/shop">Coins: {coins}</a></li>
			</ul>
		</div>
	</nav>
	<main>

	<slot />
</main>

<style lang="postcss">
	button {
		@apply btn bg-[rgba(255,255,255,0.1)] shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur-lg border-2 border-solid border-[rgba(255,255,255,0.3)] my-2 rounded-md hover:bg-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.5)];
	}
</style>
