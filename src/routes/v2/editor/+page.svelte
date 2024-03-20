<script lang="ts">
	import Loading from '$components/Loading.svelte';
	import ImportantBasics from '$components/editor/ImportantBasics.svelte';
	import LittleThings from '$components/editor/LittleThings.svelte';
	import WidgetEditor from '$components/editor/WidgetEditor.svelte';
	import { exampleProfile } from '$lib';
	import { assetsStore, profileStore } from '$lib/stores';
	import type { PageData } from './$types';
	import { fly } from 'svelte/transition';

	const options = ['Basic', 'The Little Things & Socials', 'Widgets'];
	let selected = options[0];
	export let data: PageData;
	if (!data.profile) profileStore.set(exampleProfile);
	else profileStore.set(data.profile);
	let badges = data.badges;

	let updatedProfile = false;

	async function updateProfile() {
		if ($profileStore == null) return;
		let fdata = new FormData();
		for (let key in $assetsStore) {
			let f = $assetsStore[key];
			if (f) fdata.append(key, f);
		}
		fdata.append('profile', JSON.stringify($profileStore));
		let res = await fetch(window.location.href, {
			method: 'POST',
			body: fdata
		});
		if (res.status == 200) {
			updatedProfile = true;
			setTimeout(() => {
				updatedProfile = false;
			}, 3000);
		}
	}
</script>

<svelte:head>
	<title>Editor - OnlyMySpace</title>
</svelte:head>

{#if $profileStore != null}
	{#if updatedProfile}
		<div class="fixed top-0 left-1/2 -translate-x-1/2 z-50" transition:fly|local={{ y: -100 }}>
			<div
				class="flex flex-row justify-center w-96 h-16 items-center gap-2 border-solid bg-opacity-80 backdrop-blur-md bg-gray-700 rounded-lg"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						class="fill-green-500"
						d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
					/></svg
				>
				<p class="text-1xl font-bold">Successfully updated your profile</p>
			</div>
		</div>
	{/if}
	<div role="tablist" class="tabs tabs-bordered h-16 lg:h-10 backdrop-blur-lg sticky top-0 z-50">
		{#each options as option}
			<button
				role="tab"
				aria-selected={option === selected}
				class="tab tab-bordered text-white hover:text-white/50 text-xl font-bold bg-black bg-opacity-20 h-16 lg:h-10"
				class:tab-active={option === selected}
				on:click={() => (selected = option)}
			>
				{option}
			</button>
		{/each}
	</div>
	<div class="flex flex-col pt-4 items-center gap-2 h-screen w-screen">
		{#if selected === 'Basic'}
			<ImportantBasics />
		{:else if selected === 'The Little Things & Socials'}
			<LittleThings {badges} />
		{:else if selected === 'Widgets'}
			<WidgetEditor />
		{/if}
		<button
			type="submit"
			on:click={() => updateProfile()}
			class="btn bg-[rgba(255,255,255,0.1)] max-w-xs w-32 shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur-lg border-2 border-solid border-[rgba(255,255,255,0.3)] my-4 rounded-md"
			>Save</button
		>
		<footer class="flex flex-col justify-center items-center gap-2 p-4">
			<p>Copyright © 2023 - {new Date().getFullYear()} - All Rights Reserved</p>
			<p>
				Made with ❤️ by <a class="link link-primary" href="https://only-my.space/nano">nano</a>
			</p>
			<p>
				Join our <a class="link link-primary" href="https://discord.gg/SVsSQXf7HR">Discord</a>
			</p>
		</footer>
	</div>
{:else}
	<Loading />
	<footer class="flex flex-col justify-center items-center gap-2 p-4">
		<p>Copyright © 2023 - {new Date().getFullYear()} - All Rights Reserved</p>
		<p>
			Made with ❤️ by <a class="link link-primary" href="https://only-my.space/nano">nano</a>
		</p>
		<p>
			Join our <a class="link link-primary" href="https://discord.gg/SVsSQXf7HR">Discord</a>
		</p>
	</footer>
{/if}

<style lang="postcss">
	:global(body) {
		--cp-bg-color: rgba(51, 51, 51, 0.5);
		--cp-border-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
	}
	:global(html) {
		@apply bg-gradient-to-r from-[#feac5e]/90 via-[#c77d90] to-[#4bc0c8]/80 bg-repeat;
	}
	:global(.grouped) {
		@apply border-black border-4 border-opacity-10 bg-[rgba(0,0,0,0.1)] rounded-md max-w-xs w-full shadow-lg flex flex-col items-center justify-center p-2;
	}
</style>
