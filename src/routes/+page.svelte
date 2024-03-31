<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	let cards = [
		{
			title: 'Free forever',
			description:
				'We are committed to making this service free forever. No credit card. No bullshit. Just you.'
		},
		{
			title: 'Privacy-first',
			description:
				'We do not collect any personal information than needed to make the service work. We do not sell your data or share it with anyone.'
		},
		{
			title: 'Easy to use',
			description: 'We make our site fast and easy to use. Just sign up and see!'
		},
		{
			title: 'Make everything your own!',
			description: "You don't need to be a designer to create your own profile."
		},
		{
			title: 'No ads',
			description: "We don't want to annoy you with advertisements."
		},
		{
			title: 'Open Source',
			description: 'We are open source. Feel free to contribute!'
		}
	];

	function rndb(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

	onMount(() => {
		if (browser) {
			sm = window.innerWidth < 916;
			// Randomly halve the cards
			if (sm) {
				let newCards: {title: string, description: string}[] = [];
				while (newCards.length != cards.length/2) {
					let card = cards[rndb(0, cards.length-1)];
					if (!newCards.includes(card)) newCards.push(card);
				}
				cards = newCards;
			}
		}
	});

	let sm = false;
	let scrollY = 0;
	let pscroll = 0;
	let page2: HTMLDivElement;
	$: {
		let scrolldir = scrollY - pscroll > 0 ? 'down' : 'up';
		if (scrolldir == 'down' && page2) {
			page2.scrollIntoView({
				behavior: 'smooth'
			});
		} else if (scrolldir == 'up' && browser) {
			window.scroll({
				behavior: 'smooth',
				top: 0,
				left: 0
			});
		}
		pscroll = scrollY;
	}
</script>

<svelte:window bind:scrollY />

<svelte:body data-theme="dracula" />
<svelte:head>
	<title>OnlyMySpace</title>

	<link rel="canonical" href="https://only-my.space" />
	<meta name="description" content="Your own place on the web that is only yours!" />
	<meta name="keywords" content="profile, OnlyMySpace, bio, my bio" />
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://only-my.space/" />
	<meta property="og:title" content="OnlyMySpace" />
	<meta property="og:description" content="Your own place on the web that is only yours!" />
	<!-- Twitter -->
	<meta property="twitter:url" content="https://only-my.space/" />
	<meta property="twitter:title" content="OnlyMySpace" />
	<meta property="twitter:description" content="Your own place on the web that is only yours!" />
</svelte:head>
<div class="bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 bg-repeat">
	{#if scrollY > 10}
		<nav class="navbar text-neutral-content fixed top-0 bg-black bg-opacity-20 z-50">
			<div class="flex-1" in:fade={{ duration: 500, delay: 200 }}>
				<a class="normal-case text-xl" href="/"
					><img src="/favicon.png" class="w-10 h-10 md:w-16 md:h-16" alt="OnlyMySpace logo" />
				</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1" in:fade={{ duration: 500, delay: 200 }}>
					{#if dev}
						<li><a href="/shop">Shop</a></li>
					{/if}
					<li><a href="/editor">Editor</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>
			</div>
		</nav>
	{/if}
	<div class="flex flex-col justify-center items-center h-screen">
		{#if scrollY < 10}
			<h1
				class="text-5xl md:text-7xl font-bold text-center py-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
				transition:slide={{ duration: 500 }}
			>
				only-my.space
			</h1>
		{/if}
		<p class="text-2xl text-center py-4">
			Your own place on the web that is only <span
				class="text-transparent inline-block bg-clip-text bg-gradient-to-r font-extrabold from-primary via-secondary to-accent"
				>yours</span
			>!
		</p>
		{#if scrollY < 10}
		<button out:fade={{ duration: 200 }} class="rounded-full w-16 h-16 fixed bottom-5" on:click={() => page2.scrollIntoView({behavior: 'smooth'})}>
			<svg class="w-16 h-16 fill-white hover:fill-white/30 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
		</button>
		{/if}
	</div>
	<div class="flex flex-col justify-center items-center h-screen" bind:this={page2}>
		<h2 class="text-2xl font-bold text-center py-4">Features</h2>
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 md:w-2/3 gap-4 justify-items-center"
		>
			{#each cards as card}
				<div
					class="card card-compact w-96 min-h-fit md:max-h-32 bg-[rgba(255,255,255,0.1)] bg-blur backdrop-blur hover:bg-[rgba(255,255,255,0.2)] shadow-xl hover:shadow-2xl hover:scale-105 hover:transition hover:duration-400"
				>
					<div class="card-body">
						<h2 class="card-title">{card.title}</h2>
						<p>{card.description}</p>
					</div>
				</div>
			{/each}
		</div>
		<h2 class="text-2xl font-bold text-center py-4">So what are you waiting for?</h2>
		<div class="flex flex-col w-11/12 md:w-2/3 lg:w-1/2 lg:flex-row pt-2 max-h-44 min-h-16">
			<button class="btn grid flex-grow h-16 place-items-center text-white">Sign Up</button>
			<div class="divider lg:divider-horizontal"></div>
			<button class="btn grid flex-grow h-16 place-items-center text-white">Log In</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.btn {
		@apply btn-ghost shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur-lg my-2 rounded-md border-2 border-solid border-[rgba(255,255,255,0.3)] hover:border-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)];
	}
</style>
