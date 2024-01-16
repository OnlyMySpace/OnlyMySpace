<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Profile from '../components/Profile.svelte';
	let isMobileDevice: boolean;
	onMount(() => {
		isMobileDevice =
			window.navigator.userAgent.includes('Mobile') ||
			window.navigator.userAgent.includes('Android') ||
			window.navigator.userAgent.includes('iPhone');
	});
</script>

<svelte:body data-theme="dracula" />
<svelte:head>
	<title>OnlyMySpace</title>
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
	<meta
		property="twitter:description"
		content="Your own place on the web that is only yours!"
	/>
</svelte:head>
<div class="flex flex-col justify-center items-center h-screen">
	<div class="z-50 flex justify-center items-center flex-col">
		<h1 class="text-3xl font-bold text-center">Welcome to OnlyMySpace!</h1>
		<p class="text-center text-2xl">
			A place where you can make your dream profile that is only your own!
		</p>
		<button on:click={() => goto('/auth/signup')} class="btn-primary btn my-4 rounded-md"
			>Make your own profile now!</button
		>
		<p class="text-lg text-center">
			Got an account already? <a href="/auth/login" class="link link-primary">Log in</a>!
		</p>
	</div>
	{#if !isMobileDevice}
		<div
			style="transform: rotateX(20deg)rotateZ(calc(-20deg * 1))skewY(calc(8deg * 1))"
			class="fixed w-2/3 h-1/2 opacity-20 top-0 left-0"
		>
			<div class="mockup-browser border border-base-300">
				<div class="mockup-browser-toolbar">
					<div class="input border border-base-300">https://only-my.space/nano -- Click Play!</div>
				</div>
				<div class="flex justify-center px-4 py-16 border-t border-base-300">
					<Profile isExample={true} />
				</div>
			</div>
		</div>
	{/if}
</div>
